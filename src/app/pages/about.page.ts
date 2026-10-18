import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BRAND, IMAGES, MEMBERSHIPS, STATS, TEAM, TIMELINE, VALUES } from '../site-data';
import { IconComponent } from '../shared/icon.component';
import { CountUpDirective, RevealDirective } from '../shared/reveal.directive';
import { CtaBandComponent } from '../shared/blocks.component';
import { PageBannerComponent } from './page-banner.component';

@Component({
  selector: 'app-about-page',
  standalone: true,
  imports: [RouterLink, IconComponent, CountUpDirective, RevealDirective, CtaBandComponent, PageBannerComponent],
  template: `
    <app-page-banner title="About Us" />

    <section class="section">
      <div class="container split">
        <div reveal>
          <span class="eyebrow">Our story</span>
          <h2 class="title">Moving freight with care since {{ brand.founded }}</h2>
          <div class="prose">
            <p>{{ brand.name }} started as a two-desk truckload brokerage on Long Island. The idea was simple: shippers deserve a
              broker who answers the phone, tells the truth about the market and stays on a load until it's delivered.</p>
            <p>Today we're a federally licensed, bonded property broker arranging truckload, LTL, intermodal, drayage and hazmat
              freight across the United States and Canada — still with a named person on every account.</p>
          </div>
          <a class="btn btn--primary" routerLink="/why-choose-us">Why shippers choose us</a>
        </div>
        <img [src]="images.about" alt="Our operations team in the warehouse" reveal />
      </div>
    </section>

    <section class="stats-band">
      <div class="container stats">
        @for (s of stats; track s.label) {
          <div><strong [countUp]="s.value" [prefix]="s.prefix ?? ''" [suffix]="s.suffix"></strong><span>{{ s.label }}</span></div>
        }
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div class="head"><span class="eyebrow">Milestones</span><h2 class="title">Our journey</h2></div>
        <ol class="timeline">
          @for (t of timeline; track t.year) {
            <li reveal><b>{{ t.year }}</b><p>{{ t.text }}</p></li>
          }
        </ol>
      </div>
    </section>

    <section class="section alt">
      <div class="container">
        <div class="head"><span class="eyebrow">What we stand for</span><h2 class="title">Our values</h2></div>
        <div class="grid-3">
          @for (v of values; track v.title) {
            <div class="card" reveal><span class="ic"><app-icon [name]="v.icon" [size]="26" /></span><h3>{{ v.title }}</h3><p>{{ v.text }}</p></div>
          }
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div class="head"><span class="eyebrow">Leadership</span><h2 class="title">Meet our leadership</h2></div>
        <div class="grid-3">
          @for (m of team; track m.name) {
            <figure class="person" reveal>
              <img [src]="m.image" [alt]="'Portrait of ' + m.name" loading="lazy" />
              <figcaption><strong>{{ m.name }}</strong><span>{{ m.role }}</span></figcaption>
            </figure>
          }
        </div>
        <div class="members"><span>Credentials</span>@for (m of memberships; track m) { <b>{{ m }}</b> }</div>
      </div>
    </section>

    <app-cta-band />
  `,
  styles: [`
    .split { display: grid; grid-template-columns: 1.1fr 1fr; gap: 56px; align-items: center; }
    .split img { width: 100%; height: 460px; object-fit: cover; border-radius: var(--radius); }
    .prose { margin-bottom: 26px; }
    .stats-band { background: var(--mist); border-block: 1px solid var(--line); padding: 48px 0; }
    .stats { display: grid; grid-template-columns: repeat(4, 1fr); gap: 24px; text-align: center; }
    .stats strong { display: block; font-family: var(--font-head); font-size: clamp(30px, 3.6vw, 46px); color: var(--accent); }
    .stats span { color: var(--muted); font-weight: 600; font-size: 14px; }
    .timeline { list-style: none; padding: 0; margin: 0 auto; max-width: 760px; border-left: 2px solid var(--line); }
    .timeline li { position: relative; padding: 0 0 30px 32px; }
    .timeline li::before { content: ''; position: absolute; left: -9px; top: 4px; width: 16px; height: 16px; border-radius: 50%;
      background: var(--accent); box-shadow: 0 0 0 4px var(--bg); }
    .timeline b { font-family: var(--font-head); font-size: 22px; color: var(--heading); }
    .timeline p { margin: 6px 0 0; color: var(--muted); line-height: 1.6; }
    .alt { background: var(--mist); }
    .card { background: var(--surface); border: 1px solid var(--line); border-radius: var(--radius); padding: 28px; }
    .card h3 { margin: 16px 0 8px; color: var(--heading); } .card p { margin: 0; color: var(--muted); line-height: 1.6; }
    .ic { width: 54px; height: 54px; border-radius: 50%; display: grid; place-items: center; background: var(--accent-soft); color: var(--accent); }
    .person { margin: 0; } .person img { width: 100%; height: 340px; object-fit: cover; object-position: top; border-radius: var(--radius); }
    .person figcaption { padding-top: 14px; } .person strong { display: block; font-size: 18px; color: var(--heading); }
    .person span { color: var(--accent); font-weight: 600; font-size: 14px; }
    .members { display: flex; justify-content: center; align-items: center; gap: 36px; flex-wrap: wrap; margin-top: 56px; padding-top: 32px;
      border-top: 1px solid var(--line); color: var(--muted); }
    .members b { font-size: 22px; color: var(--heading); }
    @media (max-width: 900px) { .split { grid-template-columns: 1fr; } .stats { grid-template-columns: 1fr 1fr; } }
  `],
})
export class AboutPage {
  brand = BRAND; images = IMAGES; stats = STATS; timeline = TIMELINE; values = VALUES; team = TEAM; memberships = MEMBERSHIPS;
}
