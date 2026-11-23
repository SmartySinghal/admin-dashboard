import { Component, computed, inject, signal } from '@angular/core';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Order, OrderStatus, StoreService } from '../../data/store.service';
import { StatusBadge } from '../../status-badge';

type SortKey = 'date' | 'amount' | 'customer';

@Component({
  selector: 'app-orders',
  imports: [CurrencyPipe, DatePipe, FormsModule, StatusBadge],
  templateUrl: './orders.html',
})
export class Orders {
  private store = inject(StoreService);

  readonly statuses: (OrderStatus | 'All')[] = ['All', 'Paid', 'Shipped', 'Pending', 'Refunded'];
  readonly pageSize = 10;

  search = signal('');
  status = signal<OrderStatus | 'All'>('All');
  sortKey = signal<SortKey>('date');
  sortDir = signal<1 | -1>(-1);
  page = signal(1);

  filtered = computed(() => {
    const q = this.search().trim().toLowerCase();
    const key = this.sortKey();
    const dir = this.sortDir();
    return this.store.orders
      .filter(o => this.status() === 'All' || o.status === this.status())
      .filter(o => !q || `${o.id} ${o.customer} ${o.product}`.toLowerCase().includes(q))
      .sort((a, b) => (a[key] > b[key] ? 1 : a[key] < b[key] ? -1 : 0) * dir);
  });

  totalPages = computed(() => Math.max(1, Math.ceil(this.filtered().length / this.pageSize)));
  rows = computed<Order[]>(() => this.filtered().slice((this.page() - 1) * this.pageSize, this.page() * this.pageSize));

  setSort(key: SortKey) {
    if (this.sortKey() === key) this.sortDir.update(d => (d === 1 ? -1 : 1));
    else { this.sortKey.set(key); this.sortDir.set(-1); }
  }

  // Reset to page 1 whenever the filters change
  onFilter() { this.page.set(1); }

  arrow(key: SortKey) {
    return this.sortKey() === key ? (this.sortDir() === 1 ? '▲' : '▼') : '';
  }
}
