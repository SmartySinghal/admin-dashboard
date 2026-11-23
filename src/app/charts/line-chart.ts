import { Component, computed, input } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { Point } from '../data/store.service';

/** Lightweight SVG area chart (no chart library needed). */
@Component({
  selector: 'app-line-chart',
  imports: [DecimalPipe],
  template: `
    <svg [attr.viewBox]="'0 0 ' + W + ' ' + H" class="h-64 w-full" role="img" aria-label="Revenue chart">
      <defs>
        <linearGradient id="area" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#6366f1" stop-opacity="0.35" />
          <stop offset="100%" stop-color="#6366f1" stop-opacity="0" />
        </linearGradient>
      </defs>
      @for (g of grid(); track g.y) {
        <line [attr.x1]="P" [attr.x2]="W - 10" [attr.y1]="g.y" [attr.y2]="g.y" stroke="#e2e8f0" stroke-dasharray="4 4" />
        <text [attr.x]="P - 8" [attr.y]="g.y + 4" text-anchor="end" font-size="11" fill="#94a3b8">{{ g.label }}</text>
      }
      <path [attr.d]="areaPath()" fill="url(#area)" />
      <path [attr.d]="linePath()" fill="none" stroke="#6366f1" stroke-width="3" stroke-linejoin="round" stroke-linecap="round" />
      @for (p of points(); track p.label) {
        <circle [attr.cx]="p.x" [attr.cy]="p.y" r="4" fill="#fff" stroke="#6366f1" stroke-width="2">
          <title>{{ p.label }}: \${{ p.value | number }}</title>
        </circle>
        <text [attr.x]="p.x" [attr.y]="H - 6" text-anchor="middle" font-size="11" fill="#94a3b8">{{ p.label }}</text>
      }
    </svg>
  `,
})
export class LineChart {
  data = input.required<Point[]>();
  readonly W = 640;
  readonly H = 260;
  readonly P = 48; // left padding for axis labels

  private max = computed(() => Math.ceil(Math.max(...this.data().map(d => d.value)) / 10000) * 10000);

  points = computed(() => {
    const d = this.data();
    const step = (this.W - this.P - 20) / (d.length - 1);
    return d.map((p, i) => ({ ...p, x: this.P + 10 + i * step, y: 20 + (1 - p.value / this.max()) * (this.H - 50) }));
  });

  grid = computed(() => [0, 0.25, 0.5, 0.75, 1].map(f => ({
    y: 20 + (1 - f) * (this.H - 50),
    label: '$' + Math.round((this.max() * f) / 1000) + 'k',
  })));

  linePath = computed(() => this.points().map((p, i) => `${i ? 'L' : 'M'}${p.x},${p.y}`).join(' '));
  areaPath = computed(() => {
    const pts = this.points();
    const base = this.H - 30;
    return `${this.linePath()} L${pts[pts.length - 1].x},${base} L${pts[0].x},${base} Z`;
  });
}
