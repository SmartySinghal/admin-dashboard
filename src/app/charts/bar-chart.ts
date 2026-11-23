import { Component, computed, input } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { Point } from '../data/store.service';

/** Horizontal bar chart built with plain HTML + Tailwind. */
@Component({
  selector: 'app-bar-chart',
  imports: [DecimalPipe],
  template: `
    <ul class="space-y-4">
      @for (d of bars(); track d.label; let i = $index) {
        <li>
          <div class="mb-1 flex justify-between text-sm">
            <span class="font-medium text-slate-700">{{ d.label }}</span>
            <span class="text-slate-500">\${{ d.value | number }}</span>
          </div>
          <div class="h-2.5 rounded-full bg-slate-100">
            <div class="h-2.5 rounded-full transition-all" [style.width.%]="d.pct" [style.background]="colors[i % colors.length]"></div>
          </div>
        </li>
      }
    </ul>
  `,
})
export class BarChart {
  data = input.required<Point[]>();
  readonly colors = ['#6366f1', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981', '#06b6d4'];
  bars = computed(() => {
    const max = Math.max(...this.data().map(d => d.value));
    return this.data().map(d => ({ ...d, pct: (d.value / max) * 100 }));
  });
}
