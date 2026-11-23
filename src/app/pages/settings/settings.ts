import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-settings',
  imports: [FormsModule],
  template: `
    <div class="max-w-3xl space-y-6">
      <div>
        <h1 class="text-2xl font-bold text-slate-900">Settings</h1>
        <p class="text-sm text-slate-500">Manage your store profile and notifications.</p>
      </div>
      <form (ngSubmit)="save()" class="space-y-6">
        <section class="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 class="font-semibold text-slate-900">Store profile</h2>
          <div class="mt-4 grid gap-4 sm:grid-cols-2">
            <label class="text-sm font-medium text-slate-700">Store name
              <input name="store" [(ngModel)]="profile.store" class="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 font-normal outline-none focus:border-indigo-500" />
            </label>
            <label class="text-sm font-medium text-slate-700">Support email
              <input name="email" type="email" [(ngModel)]="profile.email" class="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 font-normal outline-none focus:border-indigo-500" />
            </label>
            <label class="text-sm font-medium text-slate-700">Currency
              <select name="currency" [(ngModel)]="profile.currency" class="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 font-normal outline-none focus:border-indigo-500">
                <option>USD</option><option>EUR</option><option>INR</option><option>GBP</option>
              </select>
            </label>
            <label class="text-sm font-medium text-slate-700">Time zone
              <select name="tz" [(ngModel)]="profile.tz" class="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 font-normal outline-none focus:border-indigo-500">
                <option>Asia/Kolkata</option><option>Europe/London</option><option>America/New_York</option>
              </select>
            </label>
          </div>
        </section>
        <section class="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 class="font-semibold text-slate-900">Notifications</h2>
          <div class="mt-4 space-y-4">
            @for (n of notifications; track n.key) {
              <label class="flex cursor-pointer items-center justify-between">
                <span><span class="block font-medium text-slate-800">{{ n.label }}</span><span class="text-sm text-slate-500">{{ n.help }}</span></span>
                <input type="checkbox" [name]="n.key" [(ngModel)]="n.on" class="h-5 w-5 accent-indigo-600" />
              </label>
            }
          </div>
        </section>
        <div class="flex items-center gap-4">
          <button type="submit" class="rounded-xl bg-indigo-600 px-6 py-2.5 font-semibold text-white hover:bg-indigo-500">Save changes</button>
          @if (saved()) { <span class="text-sm font-medium text-emerald-600">✔ Settings saved</span> }
        </div>
      </form>
    </div>
  `,
})
export class Settings {
  profile = { store: 'Nimbus Electronics', email: 'support@nimbus.example', currency: 'USD', tz: 'Asia/Kolkata' };
  notifications = [
    { key: 'orders', label: 'New orders', help: 'Get notified when a customer places an order.', on: true },
    { key: 'stock', label: 'Low stock alerts', help: 'Alert me when a product is running low.', on: true },
    { key: 'weekly', label: 'Weekly report', help: 'A summary of sales every Monday.', on: false },
  ];
  saved = signal(false);
  save() {
    this.saved.set(true);
    setTimeout(() => this.saved.set(false), 2500);
  }
}
