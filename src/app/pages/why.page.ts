import { Component } from '@angular/core';
import { TESTIMONIALS, WHY_US } from '../site-data';
import { IconComponent } from '../shared/icon.component';
import { RevealDirective } from '../shared/reveal.directive';
import { CtaBandComponent } from '../shared/blocks.component';
import { PageBannerComponent } from './page-banner.component';

@Component({
  selector: 'app-why-page',
  standalone: true,
  imports: [IconComponent, RevealDirective, CtaBandComponent, PageBannerComponent],
  template: `
    <app-page-banner title="Why Choose Us?" />
    <section class="section">
      <div class="container">
        <div class="head"><span class="eyebrow">The difference</span><h2 class="title">Six reasons shippers stay with us</h2></div>
        <div class="grid-3">
          @for (w of why; track w.title; let i = $index) {
            <div class="card" reveal>
              <span class="n">0{{ i + 1 }}</span>
              <span class="ic"><app-icon [name]="w.icon" [size]="24" /></span>
              <h3>{{ w.title }}</h3><p>{{ w.text }}</p>
            </div>
          }
        </div>
      </div>
    </section>
    <section class="section alt">
      <div class="container">
        <div class="head"><span class="eyebrow">In their words</span><h2 class="title">What clients say</h2></div>
        <div class="grid-3">
          @for (t of quotes; track t.name) {
            <figure class="q" reveal><p>“{{ t.text }}”</p><figcaption><b>{{ t.name }}</b> · {{ t.role }}</figcaption></figure>
          }
        </div>
      </div>
    </section>
    <app-cta-band />
  `,
  styles: [`
    .card { position: relative; background: var(--surface); border: 1px solid var(--line); border-radius: var(--radius); padding: 30px; }
    .n { position: absolute; right: 22px; top: 18px; font-family: var(--font-head); font-size: 30px; color: var(--line); font-weight: 800; }
    .ic { width: 52px; height: 52px; border-radius: 14px; display: grid; place-items: center; background: var(--accent-soft); color: var(--accent); }
    h3 { margin: 18px 0 8px; color: var(--heading); } .card p { margin: 0; color: var(--muted); line-height: 1.65; }
    .alt { background: var(--mist); }
    .q { margin: 0; background: var(--surface); border-radius: var(--radius); padding: 26px; border: 1px solid var(--line); }
    .q p { margin: 0 0 16px; line-height: 1.7; font-style: italic; } .q figcaption { color: var(--muted); font-size: 14px; } .q b { color: var(--heading); }
  `],
})
export class WhyPage { why = WHY_US; quotes = TESTIMONIALS.slice(0, 3); }
