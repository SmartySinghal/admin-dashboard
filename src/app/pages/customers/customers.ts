import { Component, computed, inject, signal } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { StoreService } from '../../data/store.service';

@Component({
  selector: 'app-customers',
  imports: [CurrencyPipe],
  template: `
    <div class="space-y-6">
      <div class="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 class="text-2xl font-bold text-slate-900">Customers</h1>
          <p class="text-sm text-slate-500">Sorted by total spend</p>
        </div>
        <input type="search" placeholder="Search customers…" [value]="search()" (input)="search.set($any($event.target).value)"
               class="w-64 rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/15" />
      </div>
      <div class="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        @for (c of list(); track c.email) {
          <div class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md">
            <div class="flex items-center gap-3">
              <span class="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-violet-500 font-bold text-white">{{ initials(c.name) }}</span>
              <div class="min-w-0">
                <p class="truncate font-semibold text-slate-900">{{ c.name }}</p>
                <p class="truncate text-sm text-slate-500">{{ c.email }}</p>
              </div>
            </div>
            <div class="mt-4 grid grid-cols-3 gap-2 text-center">
              <div class="rounded-xl bg-slate-50 p-2"><p class="text-xs text-slate-500">City</p><p class="truncate text-sm font-semibold">{{ c.city }}</p></div>
              <div class="rounded-xl bg-slate-50 p-2"><p class="text-xs text-slate-500">Orders</p><p class="text-sm font-semibold">{{ c.orders }}</p></div>
              <div class="rounded-xl bg-slate-50 p-2"><p class="text-xs text-slate-500">Spent</p><p class="text-sm font-semibold">{{ c.spent | currency: 'USD' : 'symbol' : '1.0-0' }}</p></div>
            </div>
          </div>
        } @empty {
          <p class="text-slate-500">No customers found.</p>
        }
      </div>
    </div>
  `,
})
export class Customers {
  private store = inject(StoreService);
  search = signal('');
  private all = this.store.customers;
  list = computed(() => {
    const q = this.search().toLowerCase();
    return this.all.filter(c => !q || c.name.toLowerCase().includes(q) || c.city.toLowerCase().includes(q));
  });
  initials(name: string) { return name.split(' ').map(p => p[0]).join(''); }
}
