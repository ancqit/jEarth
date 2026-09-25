import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import {
  LocationPickerModalComponent,
  PickerOption,
} from '../../components/location-picker-modal/location-picker-modal.component';
import {
  SearchableOption,
  SearchableSelectComponent,
} from '../../components/searchable-select/searchable-select.component';
import { EarthApartment, EarthFarmApi, EarthGrower } from '../../core/earth-farm.api';
import { downloadFarmOrderPdf } from '../../core/farm-order-pdf';
import { I18nService } from '../../core/i18n/i18n.service';
import { LocationsApi } from '../../core/locations.api';
import { OrdersApi } from '../../core/orders.api';
import { TranslatePipe } from '../../core/i18n/translate.pipe';

type FarmTab = 'growers' | 'apartments';
type ActivePicker = 'city' | 'locality' | null;

@Component({
  selector: 'app-mushrooms',
  imports: [
    FormsModule,
    RouterLink,
    TranslatePipe,
    LocationPickerModalComponent,
    SearchableSelectComponent,
  ],
  templateUrl: './mushrooms.component.html',
  styleUrl: './mushrooms.component.scss',
})
export class MushroomsComponent implements OnInit {
  private readonly farmApi = inject(EarthFarmApi);
  private readonly locations = inject(LocationsApi);
  private readonly orders = inject(OrdersApi);
  readonly i18n = inject(I18nService);

  readonly tab = signal<FarmTab>('growers');
  readonly city = signal('');
  readonly locality = signal('');
  readonly cities = signal<PickerOption[]>([]);
  readonly localities = signal<PickerOption[]>([]);
  readonly citiesLoading = signal(false);
  readonly localitiesLoading = signal(false);
  readonly activePicker = signal<ActivePicker>(null);
  readonly searching = signal(false);
  readonly growers = signal<EarthGrower[]>([]);
  readonly apartments = signal<EarthApartment[]>([]);
  readonly selectedGrowerId = signal<string | null>(null);
  readonly orderApartment = signal<EarthApartment | null>(null);
  readonly flatNumber = signal('');
  readonly flatOpen = signal(false);
  readonly orderOpen = signal(false);
  readonly orderGrowerId = signal<string | null>(null);
  readonly units = signal(1);
  readonly customerName = signal('');
  readonly submitting = signal(false);
  readonly message = signal('');
  readonly error = signal('');

  readonly areaLabel = computed(() => {
    const city = this.city().trim();
    const locality = this.locality().trim();
    if (city && locality) {
      return `${locality}, ${city}`;
    }
    return city || locality;
  });

  readonly selectedGrower = computed(() => {
    const id = this.selectedGrowerId();
    return this.growers().find((g) => g.id === id) ?? null;
  });

  readonly growerOptions = computed<SearchableOption[]>(() =>
    this.growers().map((g) => ({
      value: g.id,
      label: `${g.name} · ${g.crop_name} · ${g.currency} ${g.unit_price}`,
    })),
  );

  readonly orderGrower = computed(() => {
    const id = this.orderGrowerId();
    return this.growers().find((g) => g.id === id) ?? null;
  });

  readonly orderTotal = computed(() => {
    const grower = this.orderGrower();
    const qty = Math.max(1, this.units());
    return grower ? grower.unit_price * qty : 0;
  });

  ngOnInit(): void {
    this.loadCities();
  }

  openCityPicker(): void {
    this.activePicker.set('city');
    if (!this.cities().length) {
      this.loadCities();
    }
  }

  openLocalityPicker(): void {
    if (!this.city().trim()) {
      this.error.set(this.i18n.t('farm.cityFirst'));
      return;
    }
    this.activePicker.set('locality');
    this.loadLocalities(this.city());
  }

  onPickerDismiss(): void {
    this.activePicker.set(null);
  }

  onCityPicked(name: string): void {
    this.city.set(name.trim());
    this.locality.set('');
    this.localities.set([]);
    this.activePicker.set(null);
    this.clearResults();
  }

  onLocalityPicked(name: string): void {
    this.locality.set(name.trim());
    this.activePicker.set(null);
    this.searchArea();
  }

  searchArea(): void {
    const area = this.areaLabel();
    if (!area) {
      this.error.set(this.i18n.t('farm.pickArea'));
      return;
    }
    this.searching.set(true);
    this.error.set('');
    this.message.set('');
    this.farmApi.search(area).subscribe({
      next: (res) => {
        this.growers.set(res.growers);
        this.apartments.set(res.apartments);
        this.selectedGrowerId.set(res.growers[0]?.id ?? null);
        this.searching.set(false);
        if (!res.growers.length && !res.apartments.length) {
          this.message.set(this.i18n.t('farm.emptyArea'));
        }
      },
      error: () => {
        this.searching.set(false);
        this.error.set(this.i18n.t('farm.searchError'));
      },
    });
  }

  setTab(tab: FarmTab): void {
    this.tab.set(tab);
  }

  selectGrower(id: string): void {
    this.selectedGrowerId.set(id);
  }

  openApartment(apartment: EarthApartment): void {
    this.orderApartment.set(apartment);
    this.flatNumber.set('');
    this.flatOpen.set(true);
    this.error.set('');
  }

  closeFlat(): void {
    this.flatOpen.set(false);
  }

  confirmFlat(): void {
    const flat = this.flatNumber().trim();
    if (!flat) {
      this.error.set(this.i18n.t('farm.flatRequired'));
      return;
    }
    this.flatOpen.set(false);
    this.orderGrowerId.set(this.growers()[0]?.id ?? null);
    this.units.set(1);
    this.customerName.set('');
    this.orderOpen.set(true);
  }

  closeOrder(): void {
    this.orderOpen.set(false);
  }

  onOrderGrowerChange(id: string | null): void {
    this.orderGrowerId.set(id);
  }

  setUnits(value: number | string): void {
    this.units.set(Math.max(1, Math.floor(Number(value) || 1)));
  }

  placeOrder(): void {
    const grower = this.orderGrower();
    const apartment = this.orderApartment();
    const name = this.customerName().trim();
    const flat = this.flatNumber().trim();
    const qty = Math.max(1, this.units());
    if (!grower || !apartment) {
      this.error.set(this.i18n.t('farm.orderIncomplete'));
      return;
    }
    if (!name) {
      this.error.set(this.i18n.t('farm.nameRequired'));
      return;
    }
    const total = grower.unit_price * qty;
    this.submitting.set(true);
    this.error.set('');
    this.orders
      .create({
        store_id: grower.id,
        customer_name: name,
        items: [
          {
            product_name: `${grower.crop_name} · ${grower.name}`,
            sku: grower.id,
            quantity: qty,
            unit_price: grower.unit_price,
          },
        ],
        billing: {
          subtotal: total,
          tax_amount: 0,
          total_amount: total,
          currency: grower.currency || 'INR',
          payment_method: 'cash',
          payment_status: 'pending',
        },
        status: 'pending',
        notes: `apartment=${apartment.name}; flat=${flat}; area=${this.areaLabel()}`,
        source: 'junction.earth',
      })
      .subscribe({
        next: (order) => {
          this.submitting.set(false);
          this.orderOpen.set(false);
          this.message.set(this.i18n.t('farm.orderOk', { number: order.order_number }));
          downloadFarmOrderPdf({
            orderNumber: order.order_number || order.id,
            customerName: name,
            apartmentName: apartment.name,
            flatNumber: flat,
            growerName: grower.name,
            cropName: grower.crop_name,
            units: qty,
            unitPrice: grower.unit_price,
            currency: grower.currency || 'INR',
            area: this.areaLabel(),
            createdAt: order.created_at || new Date().toISOString(),
          });
        },
        error: () => {
          this.submitting.set(false);
          this.error.set(this.i18n.t('farm.orderError'));
        },
      });
  }

  stageLabel(stage: string): string {
    return this.i18n.t(`farm.stage.${stage}`);
  }

  private loadCities(): void {
    this.citiesLoading.set(true);
    this.locations.cities().subscribe({
      next: (rows) => {
        this.cities.set(rows.map((name) => ({ id: name, label: name })));
        this.citiesLoading.set(false);
      },
      error: () => this.citiesLoading.set(false),
    });
  }

  private loadLocalities(city: string): void {
    this.localitiesLoading.set(true);
    this.locations.localities(city).subscribe({
      next: (rows) => {
        this.localities.set(rows.map((name) => ({ id: name, label: name })));
        this.localitiesLoading.set(false);
      },
      error: () => this.localitiesLoading.set(false),
    });
  }

  private clearResults(): void {
    this.growers.set([]);
    this.apartments.set([]);
    this.selectedGrowerId.set(null);
  }
}
