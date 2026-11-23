import { Component, input } from '@angular/core';
import { OrderStatus } from './data/store.service';

@Component({
  selector: 'app-status-badge',
  template: `<span class="inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold" [class]="styles[status()]">{{ status() }}</span>`,
})
export class StatusBadge {
  status = input.required<OrderStatus>();
  readonly styles: Record<OrderStatus, string> = {
    Paid: 'bg-emerald-50 text-emerald-700',
    Shipped: 'bg-sky-50 text-sky-700',
    Pending: 'bg-amber-50 text-amber-700',
    Refunded: 'bg-rose-50 text-rose-700',
  };
}
