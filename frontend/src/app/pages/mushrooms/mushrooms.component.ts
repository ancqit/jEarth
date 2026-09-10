import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { catchError, of, switchMap } from 'rxjs';
import { CatalogApi } from '../../core/catalog.api';
import { OrdersApi } from '../../core/orders.api';
import { resolveProductImageSource } from '../../core/product-image.util';
import { SessionService } from '../../core/session.service';
import { FALLBACK_BAGS, FARM_CAMERAS, GrowBag } from '../../data/mushrooms';
import { Product, Shop } from '../../models/catalog.model';

@Component({
  selector: 'app-mushrooms',
  imports: [FormsModule],
  templateUrl: './mushrooms.component.html',
  styleUrl: './mushrooms.component.scss',
})
export class MushroomsComponent implements OnInit {
  private readonly catalog = inject(CatalogApi);
  private readonly orders = inject(OrdersApi);
  private readonly session = inject(SessionService);

  readonly cameras = FARM_CAMERAS;
  readonly activeCam = signal(this.cameras[0].id);
  readonly bags = signal<GrowBag[]>(FALLBACK_BAGS);
  readonly shop = signal<Shop | null>(null);
  readonly catalogNote = signal('Showing farm catalogue. Live junctionBack stock loads if a mushroom shop exists.');
  readonly quantity = signal(1);
  readonly selectedId = signal(FALLBACK_BAGS[0].id);
  readonly customerName = signal('');
  readonly customerEmail = signal('');
  readonly bookingMessage = signal('');
  readonly bookingError = signal('');
  readonly submitting = signal(false);

  readonly selectedCam = computed(
    () => this.cameras.find((cam) => cam.id === this.activeCam()) ?? this.cameras[0],
  );
  readonly selectedBag = computed(
    () => this.bags().find((bag) => bag.id === this.selectedId()) ?? this.bags()[0],
  );
  setQuantity(value: number | string): void {
    this.quantity.set(Math.max(1, Number(value) || 1));
  }

  readonly yieldText = computed(() => {
    const bag = this.selectedBag();
    const qty = Math.max(1, this.quantity());
    const low = (bag.expectedYieldKg[0] * qty).toFixed(1);
    const high = (bag.expectedYieldKg[1] * qty).toFixed(1);
    return `${low}–${high} kg across ${bag.flushes} flushes · first pick ~${bag.daysToFirstPick} days`;
  });

  ngOnInit(): void {
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
            'junctionBack returned no shops yet. Fallback grow bags stay bookable against the farm store id when the shop exists.',
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
                `Connected to shop “${match.name}” but it has no products yet. Showing the farm’s own bag list. Bookings still POST /orders to junctionBack with this store id.`,
              );
              this.bags.set(FALLBACK_BAGS.map((bag) => ({ ...bag, store_id: match.id })));
              return;
            }
            this.catalogNote.set(`Live catalogue from junctionBack shop “${match.name}”.`);
            this.bags.set(live.map((product) => this.toBag(product, match.id)));
            this.selectedId.set(this.bags()[0].id);
          });
      });
  }

  book(): void {
    const bag = this.selectedBag();
    const name = this.customerName().trim();
    if (!name) {
      this.bookingError.set('Name is required so the farm can label the bay.');
      return;
    }
    const qty = Math.max(1, Math.floor(this.quantity()));
    const subtotal = round2(bag.price * qty);
    const email = this.customerEmail().trim();
    this.submitting.set(true);
    this.bookingError.set('');
    this.bookingMessage.set('');
    this.orders
      .create({
        store_id: this.shop()?.id ?? bag.store_id,
        customer_name: name,
        customer_email: email || undefined,
        items: [
          {
            product_id: bag.id.startsWith('bag-') ? undefined : bag.id,
            product_name: bag.name,
            sku: bag.sku,
            quantity: qty,
            unit_price: bag.price,
          },
        ],
        billing: {
          subtotal,
          tax_amount: 0,
          total_amount: subtotal,
          currency: bag.currency || 'INR',
          payment_method: 'cash',
          payment_status: 'pending',
        },
        status: 'pending',
        notes: `jEarth mushroom bag booking · expected yield ${this.yieldText()}`,
        source: 'junction.today',
      })
      .subscribe({
        next: (order) => {
          this.submitting.set(false);
          this.bookingMessage.set(
            `Booked ${qty} × ${bag.name}. Order ${order.order_number}. Pay cash / UPI when the farm confirms the slot.`,
          );
        },
        error: () => {
          this.submitting.set(false);
          this.bookingError.set(
            'junctionBack did not accept the order (shop id, session, or validation). The bag list still stands — retry after the farm shop is live, or book with a real product id from /shops.',
          );
        },
      });
  }

  private toBag(product: Product, storeId: string): GrowBag {
    const yieldGuess = guessYield(product);
    return {
      id: product.id,
      store_id: storeId,
      sku: product.sku,
      name: product.name,
      description: product.description || 'Grow bag from the Junction shop catalogue.',
      variety: product.category || 'Mushroom',
      price: product.price,
      currency: product.currency || 'INR',
      expectedYieldKg: yieldGuess,
      daysToFirstPick: 14,
      flushes: 3,
      substrate: 'Shop-listed substrate',
      stock_quantity: product.stock_quantity,
      image: resolveProductImageSource(product),
    };
  }
}

function round2(value: number): number {
  return Math.round(value * 100) / 100;
}

function guessYield(product: Product): [number, number] {
  const fromPrice = Math.max(0.4, Math.min(2, product.price / 400));
  return [round2(fromPrice), round2(fromPrice * 1.6)];
}
