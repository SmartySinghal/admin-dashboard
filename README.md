# Nimbus Admin – Angular Admin Dashboard (Angular 22 + Tailwind CSS)

A responsive e-commerce admin dashboard with mock data and no chart library dependencies.

**Live demo:** _coming soon_

## Features
- Collapsible sidebar layout with routing (Dashboard, Orders, Customers, Settings)
- KPI cards with trend indicators
- Revenue **area chart** and **sales-by-category bars** built with plain SVG/HTML
- Orders table with **search, status filter, sorting and pagination**
- Customers grid with live search
- Settings form with notification toggles
- Deterministic mock data service (same data on every load)

## Tech
Angular 22 (standalone components, signals, computed state), TypeScript, Tailwind CSS 4.

## Run locally
```bash
npm install
npm start          # http://localhost:4200
npm run build      # production build in dist/admin-dashboard/browser
npm test
```
