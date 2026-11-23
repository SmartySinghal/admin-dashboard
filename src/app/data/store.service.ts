import { Injectable } from '@angular/core';

export type OrderStatus = 'Paid' | 'Pending' | 'Shipped' | 'Refunded';

export interface Order {
  id: string;
  customer: string;
  email: string;
  product: string;
  category: string;
  amount: number;
  status: OrderStatus;
  date: string; // ISO date
}

export interface Customer {
  name: string;
  email: string;
  city: string;
  orders: number;
  spent: number;
}

export interface Point {
  label: string;
  value: number;
}

// Small deterministic random generator so the demo data is the same on every load
function seeded(seed: number) {
  return () => {
    seed = (seed * 9301 + 49297) % 233280;
    return seed / 233280;
  };
}

@Injectable({ providedIn: 'root' })
export class StoreService {
  private rand = seeded(42);

  private readonly names = ['Aarav Mehta', 'Emma Wilson', 'Liam Chen', 'Sofia Garcia', 'Noah Patel', 'Olivia Brown',
    'Lucas Martin', 'Mia Rossi', 'Ethan Kim', 'Ava Singh', 'James Taylor', 'Isabella Lopez'];
  private readonly cities = ['Mumbai', 'London', 'Singapore', 'Madrid', 'Delhi', 'New York', 'Paris', 'Rome', 'Seoul', 'Pune', 'Sydney', 'Mexico City'];
  private readonly products = [
    { name: 'Wireless Headphones', category: 'Audio', price: 89 },
    { name: 'Mechanical Keyboard', category: 'Accessories', price: 129 },
    { name: '4K Monitor', category: 'Displays', price: 349 },
    { name: 'USB-C Hub', category: 'Accessories', price: 39 },
    { name: 'Smart Speaker', category: 'Audio', price: 99 },
    { name: 'Gaming Mouse', category: 'Accessories', price: 59 },
    { name: 'Portable SSD 1TB', category: 'Storage', price: 119 },
    { name: 'Webcam 1080p', category: 'Video', price: 69 },
  ];
  private readonly statuses: OrderStatus[] = ['Paid', 'Paid', 'Paid', 'Shipped', 'Shipped', 'Pending', 'Refunded'];

  readonly orders: Order[] = this.buildOrders(60);

  readonly monthlyRevenue: Point[] = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    .map((label, i) => ({ label, value: Math.round(18000 + i * 1900 + this.rand() * 6000) }));

  get customers(): Customer[] {
    const map = new Map<string, Customer>();
    this.orders.forEach((o, i) => {
      const c = map.get(o.customer) ?? { name: o.customer, email: o.email, city: this.cities[this.names.indexOf(o.customer)] ?? 'Remote', orders: 0, spent: 0 };
      c.orders++;
      if (o.status !== 'Refunded') c.spent += o.amount;
      map.set(o.customer, c);
    });
    return [...map.values()].sort((a, b) => b.spent - a.spent);
  }

  get salesByCategory(): Point[] {
    const totals = new Map<string, number>();
    this.orders.filter(o => o.status !== 'Refunded').forEach(o => totals.set(o.category, (totals.get(o.category) ?? 0) + o.amount));
    return [...totals.entries()].map(([label, value]) => ({ label, value })).sort((a, b) => b.value - a.value);
  }

  get topProducts() {
    const totals = new Map<string, { name: string; sold: number; revenue: number }>();
    this.orders.filter(o => o.status !== 'Refunded').forEach(o => {
      const p = totals.get(o.product) ?? { name: o.product, sold: 0, revenue: 0 };
      p.sold++;
      p.revenue += o.amount;
      totals.set(o.product, p);
    });
    return [...totals.values()].sort((a, b) => b.revenue - a.revenue).slice(0, 5);
  }

  private buildOrders(count: number): Order[] {
    const today = new Date(2026, 10, 22);
    return Array.from({ length: count }, (_, i) => {
      const name = this.names[Math.floor(this.rand() * this.names.length)];
      const product = this.products[Math.floor(this.rand() * this.products.length)];
      const qty = 1 + Math.floor(this.rand() * 3);
      const date = new Date(today);
      date.setDate(today.getDate() - Math.floor(i * 1.5));
      return {
        id: `#${(10480 - i).toString()}`,
        customer: name,
        email: name.toLowerCase().replace(' ', '.') + '@example.com',
        product: product.name,
        category: product.category,
        amount: product.price * qty,
        status: this.statuses[Math.floor(this.rand() * this.statuses.length)],
        date: date.toISOString().slice(0, 10),
      };
    });
  }
}
