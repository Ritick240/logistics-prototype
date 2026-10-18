import { Component, computed, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SERVICES } from '../site-data';
import { IconComponent } from '../shared/icon.component';
import { PageBannerComponent } from './page-banner.component';

@Component({
  selector: 'app-service',
  standalone: true,
  imports: [RouterLink, IconComponent, PageBannerComponent],
  template: `
    @if (service(); as s) {
      <app-page-banner [title]="s.title === 'OTR' ? 'Over The Road' : s.title" [image]="s.image" />
      <section class="section">
        <div class="container layout">
          <aside>
            <h4>All Services</h4>
            @for (o of services; track o.slug) {
              <a [routerLink]="['/services', o.slug]" [class.active]="o.slug === s.slug">{{ o.title }} <app-icon name="arrow" [size]="16" /></a>
            }
            <div class="help">
              <h4>Need help?</h4>
              <p>Talk to a logistics specialist about your freight today.</p>
              <a class="btn btn--primary" routerLink="/request-a-quote">Request A Quote</a>
            </div>
          </aside>
          <div>
            <img [src]="s.image" [alt]="s.title" />
            <h2 class="title">{{ s.title }} Services</h2>
            <p class="lead">{{ s.short }}</p>
            @for (b of s.body; track b) { <p>{{ b }}</p> }
            <div class="points">
              @for (p of s.points; track p) { <div><app-icon name="check" [size]="18" /> {{ p }}</div> }
            </div>
          </div>
        </div>
      </section>
    } @else {
      <app-page-banner title="Service not found" />
      <section class="section container"><a class="btn btn--primary" routerLink="/">Back home</a></section>
    }
  `,
  styles: [`
    .layout { display: grid; grid-template-columns: 300px 1fr; gap: 48px; align-items: start; }
    aside { position: sticky; top: calc(var(--sw-h) + 110px); }
    aside > a { display: flex; justify-content: space-between; align-items: center; padding: 15px 18px; margin-bottom: 8px;
      background: var(--mist); border: 1px solid var(--line); border-radius: min(var(--radius), 10px); font-weight: 700; color: var(--heading); }
    aside > a:hover, aside > a.active { background: var(--primary); color: var(--primary-ink); }
    h4 { margin: 0 0 14px; font-size: 18px; color: var(--heading); }
    .help { margin-top: 24px; background: var(--primary); color: var(--primary-ink); padding: 26px; border-radius: var(--radius); }
    .help h4 { color: inherit; }
    .help p { color: inherit; opacity: .8; }
    img { width: 100%; height: 400px; object-fit: cover; border-radius: var(--radius); margin-bottom: 28px; }
    p { color: var(--muted); line-height: 1.8; }
    .lead { font-size: 18px; color: var(--ink); }
    .points { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-top: 20px; }
    .points div { display: flex; gap: 10px; align-items: center; font-weight: 600; padding: 14px; border: 1px solid var(--line);
      border-radius: min(var(--radius), 10px); background: var(--surface); }
    .points app-icon { color: var(--accent); }
    @media (max-width: 900px) { .layout { grid-template-columns: 1fr; } aside { position: static; order: 2; } .points { grid-template-columns: 1fr; } }
  `],
})
export class ServiceComponent {
  slug = input<string>();
  services = SERVICES;
  service = computed(() => SERVICES.find(s => s.slug === this.slug()));
}
