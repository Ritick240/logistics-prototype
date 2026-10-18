import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IMAGES } from '../site-data';

@Component({
  selector: 'app-page-banner',
  standalone: true,
  imports: [RouterLink],
  template: `
    <section class="banner" [style.background-image]="'var(--banner-overlay), url(' + (image || hero) + ')'">
      <div class="container">
        <h1>{{ title }}</h1>
        <nav><a routerLink="/">Home</a> <span>/</span> {{ title }}</nav>
      </div>
    </section>
  `,
  styles: [`
    .banner { background-size: cover; background-position: center; color: #fff; padding: 90px 0; }
    h1 { font-size: clamp(32px, 5vw, 52px); margin: 0 0 10px; }
    nav { color: #c9d4e3; font-weight: 600; } nav a { color: var(--accent); } span { margin: 0 6px; }
  `],
})
export class PageBannerComponent {
  @Input({ required: true }) title!: string;
  @Input() image?: string;
  hero = IMAGES.hero;
}
