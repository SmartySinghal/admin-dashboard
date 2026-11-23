import { Component, signal } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './app.html',
})
export class App {
  sidebarOpen = signal(false);
  readonly nav = [
    { path: '/', label: 'Dashboard', icon: '🏠', exact: true },
    { path: '/orders', label: 'Orders', icon: '🧾', exact: false },
    { path: '/customers', label: 'Customers', icon: '👥', exact: false },
    { path: '/settings', label: 'Settings', icon: '⚙️', exact: false },
  ];
}
