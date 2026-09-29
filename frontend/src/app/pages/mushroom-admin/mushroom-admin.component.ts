import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { EarthFarmApi } from '../../core/earth-farm.api';
import { TranslatePipe } from '../../core/i18n/translate.pipe';

const TOKEN_KEY = 'jearth.farm.adminToken';

@Component({
  selector: 'app-mushroom-admin',
  imports: [FormsModule, RouterLink, TranslatePipe],
  templateUrl: './mushroom-admin.component.html',
  styleUrl: './mushroom-admin.component.scss',
})
export class MushroomAdminComponent {
  private readonly farmApi = inject(EarthFarmApi);

  readonly adminToken = signal(localStorage.getItem(TOKEN_KEY) || '');
  readonly message = signal('');
  readonly error = signal('');
  readonly saving = signal(false);

  readonly growerName = signal('');
  readonly growerArea = signal('');
  readonly growerCrop = signal('Oyster');
  readonly growerStage = signal('spawn-run');
  readonly growerDay = signal(0);
  readonly growerUnits = signal(10);
  readonly growerPrice = signal(120);

  readonly aptName = signal('');
  readonly aptArea = signal('');
  readonly aptAddress = signal('');

  saveToken(): void {
    const token = this.adminToken().trim();
    localStorage.setItem(TOKEN_KEY, token);
    this.message.set('Admin token saved on this device.');
  }

  addGrower(): void {
    const token = this.adminToken().trim();
    if (!token) {
      this.error.set('Paste an admin JWT first.');
      return;
    }
    const name = this.growerName().trim();
    const area = this.growerArea().trim();
    if (!name || !area) {
      this.error.set('Grower name and area are required.');
      return;
    }
    this.saving.set(true);
    this.error.set('');
    this.farmApi
      .createGrower(
        {
          name,
          area,
          crop_name: this.growerCrop().trim() || 'Oyster',
          cycle_stage: this.growerStage(),
          cycle_day: this.growerDay(),
          units_available: this.growerUnits(),
          unit_price: this.growerPrice(),
          currency: 'INR',
          active: true,
        },
        token,
      )
      .subscribe({
        next: (row) => {
          this.saving.set(false);
          this.message.set(`Grower saved: ${row.name}`);
          this.growerName.set('');
        },
        error: () => {
          this.saving.set(false);
          this.error.set('Could not save grower. Check admin token.');
        },
      });
  }

  addApartment(): void {
    const token = this.adminToken().trim();
    if (!token) {
      this.error.set('Paste an admin JWT first.');
      return;
    }
    const name = this.aptName().trim();
    const area = this.aptArea().trim();
    if (!name || !area) {
      this.error.set('Apartment name and area are required.');
      return;
    }
    this.saving.set(true);
    this.error.set('');
    this.farmApi
      .createApartment(
        {
          name,
          area,
          address: this.aptAddress().trim(),
          active: true,
        },
        token,
      )
      .subscribe({
        next: (row) => {
          this.saving.set(false);
          this.message.set(`Apartment saved: ${row.name}`);
          this.aptName.set('');
        },
        error: () => {
          this.saving.set(false);
          this.error.set('Could not save apartment. Check admin token.');
        },
      });
  }
}
