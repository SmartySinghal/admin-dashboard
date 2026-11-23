import { Routes } from '@angular/router';
import { Dashboard } from './pages/dashboard/dashboard';
import { Orders } from './pages/orders/orders';
import { Customers } from './pages/customers/customers';
import { Settings } from './pages/settings/settings';

export const routes: Routes = [
  { path: '', component: Dashboard, title: 'Dashboard – Nimbus Admin' },
  { path: 'orders', component: Orders, title: 'Orders – Nimbus Admin' },
  { path: 'customers', component: Customers, title: 'Customers – Nimbus Admin' },
  { path: 'settings', component: Settings, title: 'Settings – Nimbus Admin' },
  { path: '**', redirectTo: '' },
];
