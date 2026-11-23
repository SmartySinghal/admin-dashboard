import { Component, inject } from '@angular/core';
import { CurrencyPipe, DatePipe, DecimalPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { StoreService } from '../../data/store.service';
import { LineChart } from '../../charts/line-chart';
import { BarChart } from '../../charts/bar-chart';
import { StatusBadge } from '../../status-badge';

@Component({
  selector: 'app-dashboard',
  imports: [CurrencyPipe, DatePipe, DecimalPipe, RouterLink, LineChart, BarChart, StatusBadge],
  templateUrl: './dashboard.html',
})
export class Dashboard {
  store = inject(StoreService);

  private paid = this.store.orders.filter(o => o.status !== 'Refunded');
  kpis = [
    { label: 'Revenue (90 days)', value: this.paid.reduce((s, o) => s + o.amount, 0), money: true, change: 12.4, icon: '💰' },
    { label: 'Orders (90 days)', value: this.store.orders.length, money: false, change: 8.1, icon: '🛒' },
    { label: 'Customers', value: this.store.customers.length, money: false, change: 4.3, icon: '👥' },
    { label: 'Avg. order value', value: Math.round(this.paid.reduce((s, o) => s + o.amount, 0) / this.paid.length), money: true, change: -2.1, icon: '📈' },
  ];
  recent = this.store.orders.slice(0, 6);
}
