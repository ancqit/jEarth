import { DecimalPipe } from '@angular/common';
import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { catchError, of, switchMap } from 'rxjs';
import { CatalogApi } from '../../core/catalog.api';
import { OrdersApi } from '../../core/orders.api';
import { resolveProductImageSource } from '../../core/product-image.util';
import { InatPhoto, PublicApisService, WeatherNow } from '../../core/public-apis.service';
import { SessionService } from '../../core/session.service';
import { FALLBACK_MUSHROOMS, FARM_CAMERAS, MushroomOffer } from '../../data/mushrooms';
import { MUSHROOM_CYCLES } from '../../data/growing-cycle';
import { Product, Shop } from '../../models/catalog.model';

@Component({
  selector: 'app-mushrooms',
  imports: [FormsModule, DecimalPipe, RouterLink],
  templateUrl: './mushrooms.component.html',
  styleUrl: './mushrooms.component.scss',
})
export class MushroomsComponent implements OnInit {
  private readonly catalog = inject(CatalogApi);
  private readonly orders = inject(OrdersApi);
  private readonly session = inject(SessionService);
  private readonly publicApis = inject(PublicApisService);

  readonly cameras = FARM_CAMERAS;
  readonly cycles = MUSHROOM_CYCLES;
  readonly cycleId = signal(MUSHROOM_CYCLES[0].id);
  readonly activeCam = signal(this.cameras[0].id);
  readonly offers = signal<MushroomOffer[]>(FALLBACK_MUSHROOMS);
  readonly shop = signal<Shop | null>(null);
  readonly catalogNote = signal(
    'Showing today’s harvest list. Live junctionBack stock loads if a mushroom shop exists.',
  );
  readonly quantity = signal(1);
  readonly selectedId = signal(FALLBACK_MUSHROOMS[0].id);
  readonly customerName = signal('');
  readonly customerEmail = signal('');
  readonly bookingMessage = signal('');
  readonly bookingError = signal('');
  readonly submitting = signal(false);
  readonly wild = signal<InatPhoto[]>([]);
  readonly climate = signal<WeatherNow | null>(null);
  readonly gbifCount = signal<number | null>(null);
  readonly climatePlace = signal('Bengaluru (default farm climate)');

  readonly selectedCam = computed(
    () => this.cameras.find((cam) => cam.id === this.activeCam()) ?? this.cameras[0],
  );
  readonly selectedCycle = computed(
    () => this.cycles.find((cycle) => cycle.id === this.cycleId()) ?? this.cycles[0],
  );
  readonly selectedOffer = computed(
    () => this.offers().find((offer) => offer.id === this.selectedId()) ?? this.offers()[0],
  );

  openStageCamera(cameraId: string | undefined): void {
    if (cameraId) {
      this.activeCam.set(cameraId);
    }
  }

  setQuantity(value: number | string): void {
    this.quantity.set(Math.max(1, Number(value) || 1));
  }

  readonly yieldText = computed(() => {
    const offer = this.selectedOffer();
    const qty = Math.max(1, this.quantity());
    const grams = offer.packGrams * qty;
    const kilos = (grams / 1000).toFixed(grams >= 1000 ? 2 : 3);
    return `${grams} g (${kilos} kg) of ${offer.variety} · ${offer.harvestWindow}`;
  });

  ngOnInit(): void {
    this.loadPublicBiology();
    this.session
      .ensureSession()
      .pipe(
        switchMap(() => this.catalog.allShops()),
        catchError(() => of([] as Shop[])),
      )
      .subscribe((shops) => {
        const match =
          shops.find((shop) => /mush|fungi|spawn|oyster/i.test(`${shop.name} ${shop.shop_type ?? ''}`)) ??
          shops[0];
        if (!match) {
          this.catalogNote.set(
            'junctionBack returned no shops yet. Fallback harvest packs stay bookable against the farm store id when the shop exists.',
          );
          return;
        }
        this.shop.set(match);
        this.catalog
          .productsForShop(match.id)
          .pipe(catchError(() => of([] as Product[])))
          .subscribe((products) => {
            const live = products.filter((product) => product.status !== 'inactive');
            if (!live.length) {
              this.catalogNote.set(
                `Connected to shop “${match.name}” but it has no products yet. Showing the farm harvest list. Bookings still POST /orders to junctionBack with this store id.`,
              );
              this.offers.set(FALLBACK_MUSHROOMS.map((offer) => ({ ...offer, store_id: match.id })));
              return;
            }
            this.catalogNote.set(`Live harvest from junctionBack shop “${match.name}”.`);
            this.offers.set(live.map((product) => this.toOffer(product, match.id)));
            this.selectedId.set(this.offers()[0].id);
          });
      });
  }

  book(): void {
    const offer = this.selectedOffer();
    const name = this.customerName().trim();
    if (!name) {
      this.bookingError.set('Name is required so the farm can label the crate.');
      return;
    }
    const qty = Math.max(1, Math.floor(this.quantity()));
    const subtotal = round2(offer.price * qty);
    const email = this.customerEmail().trim();
    this.submitting.set(true);
    this.bookingError.set('');
    this.bookingMessage.set('');
    this.orders
      .create({
        store_id: this.shop()?.id ?? offer.store_id,
        customer_name: name,
        customer_email: email || undefined,
        items: [
          {
            product_id: offer.id.startsWith('mush-') ? undefined : offer.id,
            product_name: offer.name,
            sku: offer.sku,
            quantity: qty,
            unit_price: offer.price,
          },
        ],
        billing: {
          subtotal,
          tax_amount: 0,
          total_amount: subtotal,
          currency: offer.currency || 'INR',
          payment_method: 'cash',
          payment_status: 'pending',
        },
        status: 'pending',
        notes: `jEarth fresh mushroom order · ${this.yieldText()}`,
        source: 'junction.today',
      })
      .subscribe({
        next: (order) => {
          this.submitting.set(false);
          this.bookingMessage.set(
            `Booked ${qty} × ${offer.name}. Order ${order.order_number}. Pay cash / UPI when the farm confirms harvest.`,
          );
        },
        error: () => {
          this.submitting.set(false);
          this.bookingError.set(
            'junctionBack did not accept the order (shop id, session, or validation). The harvest list still stands — retry after the farm shop is live, or book with a real product id from /shops.',
          );
        },
      });
  }

  private loadPublicBiology(): void {
    this.publicApis.inatMushrooms('Pleurotus').subscribe((photos) => this.wild.set(photos));
    this.publicApis.gbifCount('Pleurotus ostreatus').subscribe((count) => this.gbifCount.set(count));
    const applyClimate = (lat: number, lon: number, label: string) => {
      this.climatePlace.set(label);
      this.publicApis.climate(lat, lon).subscribe((row) => this.climate.set(row));
    };
    if (typeof navigator !== 'undefined' && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => applyClimate(pos.coords.latitude, pos.coords.longitude, 'Your location (Open-Meteo)'),
        () => applyClimate(12.9716, 77.5946, 'Bengaluru default (Open-Meteo)'),
        { timeout: 4000 },
      );
    } else {
      applyClimate(12.9716, 77.5946, 'Bengaluru default (Open-Meteo)');
    }
  }

  private toOffer(product: Product, storeId: string): MushroomOffer {
    const packGrams = guessPackGrams(product);
    return {
      id: product.id,
      store_id: storeId,
      sku: product.sku,
      name: product.name,
      description: product.description || 'Fresh mushrooms from the Junction shop catalogue.',
      variety: product.category || 'Mushroom',
      price: product.price,
      currency: product.currency || 'INR',
      packGrams,
      harvestWindow: 'Weight as listed by the shop; picked when the farm confirms stock.',
      grownOn: product.unit || 'Farm harvest',
      stock_quantity: product.stock_quantity,
      image: resolveProductImageSource(product),
    };
  }
}

function round2(value: number): number {
  return Math.round(value * 100) / 100;
}

function guessPackGrams(product: Product): number {
  const unit = (product.unit || '').toLowerCase();
  if (unit.includes('kg')) {
    return 1000;
  }
  if (unit.includes('g')) {
    const parsed = Number.parseInt(unit, 10);
    return Number.isFinite(parsed) && parsed > 0 ? parsed : 250;
  }
  return 250;
}
