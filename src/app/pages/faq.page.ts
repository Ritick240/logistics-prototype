import { Component, computed, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BRAND, FAQS } from '../site-data';
import { AccordionComponent } from '../shared/blocks.component';
import { PageBannerComponent } from './page-banner.component';

@Component({
  selector: 'app-faq-page',
  standalone: true,
  imports: [RouterLink, AccordionComponent, PageBannerComponent],
  template: `
    <app-page-banner title="FAQs" />
    <section class="section">
      <div class="container layout">
        <div>
          <div class="tabs" role="tablist" aria-label="Question group">
            @for (g of groups; track g) {
              <button role="tab" [attr.aria-selected]="group() === g" [class.on]="group() === g" (click)="group.set(g)">For {{ g }}</button>
            }
          </div>
          @for (g of groups; track g) {
            @if (group() === g) { <app-accordion [items]="items()" [id]="'faq-' + g" /> }
          }
        </div>
        <aside class="help">
          <h3>Still have a question?</h3>
          <p>Our team is available Monday–Friday, 7am–7pm ET, with after-hours support for loads in transit.</p>
          <a class="btn btn--primary" routerLink="/contact">Contact us</a>
          <a class="tel" [href]="tel">or call {{ phone }}</a>
        </aside>
      </div>
    </section>
  `,
  styles: [`
    .layout { display: grid; grid-template-columns: 1fr 320px; gap: 56px; align-items: start; }
    .tabs { display: inline-flex; gap: 4px; padding: 4px; border-radius: 999px; background: var(--mist); border: 1px solid var(--line); margin-bottom: 12px; }
    .tabs button { font: inherit; font-weight: 700; padding: 10px 20px; border-radius: 999px; border: 0; background: none; cursor: pointer; color: var(--muted); }
    .tabs button.on { background: var(--primary); color: var(--primary-ink); }
    .help { position: sticky; top: calc(var(--sw-h) + 110px); background: var(--mist); border: 1px solid var(--line); border-radius: var(--radius); padding: 28px; }
    .help h3 { margin: 0 0 8px; color: var(--heading); } .help p { color: var(--muted); line-height: 1.6; margin: 0 0 20px; }
    .tel { display: block; margin-top: 12px; color: var(--accent); font-weight: 700; }
    @media (max-width: 900px) { .layout { grid-template-columns: 1fr; } .help { position: static; } }
  `],
})
export class FaqPage {
  groups = ['Shippers', 'Carriers'] as const;
  group = signal<'Shippers' | 'Carriers'>('Shippers');
  items = computed(() => FAQS.filter(f => f.group === this.group()));
  phone = BRAND.phones[0];
  tel = 'tel:' + BRAND.phones[0].replace(/\D/g, '');
}
