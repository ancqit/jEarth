import { inject, Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { I18nService } from './i18n/i18n.service';
import { CreatedOrder, OrdersApi } from './orders.api';

/** The Junction bill is rendered once by junctionBack and shared with junction.today and the shop back-office. */
@Injectable({ providedIn: 'root' })
export class OrderBillService {
  private readonly ordersApi = inject(OrdersApi);
  private readonly i18n = inject(I18nService);

  async download(order: Pick<CreatedOrder, 'id' | 'order_number' | 'bill_token'>): Promise<void> {
    if (!order.bill_token) {
      throw new Error('Order has no bill token');
    }
    const blob = await firstValueFrom(this.ordersApi.bill(order.id, order.bill_token, this.i18n.contentLang()));
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `junction-bill-${(order.order_number || order.id).replace(/[^\w-]+/g, '-')}.pdf`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    // Revoking straight away can cancel the download in some browsers.
    setTimeout(() => URL.revokeObjectURL(url), 60_000);
  }
}
