import { TestBed } from '@angular/core/testing';
import { StoreService } from './data/store.service';

describe('StoreService', () => {
  it('builds consistent demo data', () => {
    const store = TestBed.inject(StoreService);
    expect(store.orders.length).toBe(60);
    expect(store.monthlyRevenue.length).toBe(12);
    expect(store.customers.length).toBeGreaterThan(0);
  });
});
