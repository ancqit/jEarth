import { Component, inject, signal } from '@angular/core';
import { PublicApisService, RecyclingNode, WeatherNow } from '../../core/public-apis.service';

@Component({
  selector: 'app-nearby',
  templateUrl: './nearby.component.html',
  styleUrl: './nearby.component.scss',
})
export class NearbyComponent {
  private readonly publicApis = inject(PublicApisService);
  readonly status = signal('Allow location to query OpenStreetMap Overpass for amenity=recycling within 4 km.');
  readonly nodes = signal<RecyclingNode[]>([]);
  readonly climate = signal<WeatherNow | null>(null);
  readonly loading = signal(false);

  locate(): void {
    if (typeof navigator === 'undefined' || !navigator.geolocation) {
      this.status.set('This browser has no geolocation. Overpass cannot be aimed.');
      return;
    }
    this.loading.set(true);
    this.status.set('Asking the device, then Overpass and Open-Meteo…');
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const lat = pos.coords.latitude;
        const lon = pos.coords.longitude;
        this.publicApis.climate(lat, lon).subscribe((row) => this.climate.set(row));
        this.publicApis.recyclingNearby(lat, lon).subscribe((rows) => {
          this.loading.set(false);
          this.nodes.set(rows);
          this.status.set(
            rows.length
              ? `OpenStreetMap reports ${rows.length} recycling nodes near you. Confirm the stream on the lid — OSM tags are not a law.`
              : 'Overpass found no amenity=recycling in 4 km. That is a map gap, not permission to mix waste.',
          );
        });
      },
      () => {
        this.loading.set(false);
        this.status.set('Location denied. You can still use the guidebook colour codes and the sorting lab.');
      },
      { timeout: 8000 },
    );
  }

  mapLink(node: RecyclingNode): string {
    return `https://www.openstreetmap.org/?mlat=${node.lat}&mlon=${node.lon}#map=18/${node.lat}/${node.lon}`;
  }
}
