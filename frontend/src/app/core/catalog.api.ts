import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product, Shop } from '../models/catalog.model';
import { ApiService } from './api.service';

@Injectable({ providedIn: 'root' })
export class CatalogApi {
  private readonly api = inject(ApiService);

  allShops(): Observable<Shop[]> {
    return this.api.get<Shop[]>('/shops');
  }

  productsForShop(shopId: string): Observable<Product[]> {
    return this.api.get<Product[]>(`/shops/${shopId}/products`);
  }
}
