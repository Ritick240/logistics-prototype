import { Component, Input } from '@angular/core';

// Simple line icons (24x24, stroke = currentColor).
const PATHS: Record<string, string> = {
  shield: 'M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6l8-3z M8.5 12l2.5 2.5 4.5-5',
  team: 'M9 11a3 3 0 100-6 3 3 0 000 6z M17 11a2.5 2.5 0 100-5 M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6 M15.5 14.2c3 .3 5.5 2.6 5.5 5.8',
  star: 'M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1L3.2 9.5l6.1-.9L12 3z',
  truck: 'M2 6h11v10H2z M13 9h4l4 4v3h-8z M6 19a2 2 0 100-4 2 2 0 000 4z M17 19a2 2 0 100-4 2 2 0 000 4z',
  boxes: 'M3 13h8v8H3z M13 13h8v8h-8z M8 3h8v8H8z',
  train: 'M6 3h12a2 2 0 012 2v10a3 3 0 01-3 3H7a3 3 0 01-3-3V5a2 2 0 012-2z M4 11h16 M8 15h.01 M16 15h.01 M8 18l-2 3 M16 18l2 3',
  container: 'M2 7h20v11H2z M6 7v11 M10 7v11 M14 7v11 M18 7v11 M2 4h20',
  phone: 'M5 4h4l2 5-2.5 1.5a11 11 0 005 5L15 13l5 2v4a2 2 0 01-2 2A16 16 0 013 6a2 2 0 012-2z',
  mail: 'M3 5h18v14H3z M3 6l9 7 9-7',
  pin: 'M12 22s7-6.2 7-12a7 7 0 10-14 0c0 5.8 7 12 7 12z M12 12.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5z',
  chevron: 'M6 9l6 6 6-6',
  arrow: 'M5 12h14 M13 6l6 6-6 6',
  check: 'M5 12l4 4L19 7',
  quote: 'M7 7h4v4c0 3-1.5 5-4 6 M15 7h4v4c0 3-1.5 5-4 6',
  menu: 'M3 6h18 M3 12h18 M3 18h18',
  close: 'M6 6l12 12 M18 6L6 18',
  linkedin: 'M4 9h3v11H4z M5.5 4a1.5 1.5 0 110 3 1.5 1.5 0 010-3z M10 9h3v1.6c.6-1 1.8-1.8 3.5-1.8 2.6 0 3.5 1.7 3.5 4.4V20h-3v-6c0-1.4-.4-2.4-1.8-2.4S13 12.7 13 14v6h-3z',
  facebook: 'M14 8h3V4h-3a4 4 0 00-4 4v2H7v4h3v7h4v-7h3l1-4h-4V8z',
  twitter: 'M4 4l16 16 M20 4L4 20',
};

@Component({
  selector: 'app-icon',
  standalone: true,
  template: `<svg [attr.width]="size" [attr.height]="size" viewBox="0 0 24 24" fill="none" stroke="currentColor"
    stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path [attr.d]="d"/></svg>`,
  styles: [':host{display:inline-flex;line-height:0}'],
})
export class IconComponent {
  @Input({ required: true }) name!: string;
  @Input() size = 24;
  get d() { return PATHS[this.name] ?? ''; }
}
