import { inject, Injectable } from '@angular/core';
import { Observable, switchMap } from 'rxjs';
import { ApiService } from './api.service';
import { SessionService } from './session.service';

export interface OrderLineItemPayload {
  product_id?: string;
  product_name: string;
  sku?: string;
  quantity: number;
  unit_price: number;
}

export interface OrderBillingPayload {
  subtotal: number;
  tax_amount: number;
  total_amount: number;
  currency: string;
  payment_method: 'cash';
  payment_status: 'pending';
}

export interface CreateOrderPayload {
  store_id: string;
  customer_name: string;
  customer_phone?: string;
  customer_email?: string;
  items: OrderLineItemPayload[];
  billing: OrderBillingPayload;
  status: 'pending';
  notes?: string;
  source?: string;
}

export interface CreatedOrder {
  id: string;
  order_number: string;
  store_id: string;
  customer_name: string;
  status: string;
  created_at: string;
}

@Injectable({ providedIn: 'root' })
export class OrdersApi {
  private readonly api = inject(ApiService);
  private readonly session = inject(SessionService);

  create(payload: CreateOrderPayload): Observable<CreatedOrder> {
    return this.session.ensureSession().pipe(
      switchMap(() => this.api.post<CreatedOrder>('/orders', payload)),
    );
  }
}
