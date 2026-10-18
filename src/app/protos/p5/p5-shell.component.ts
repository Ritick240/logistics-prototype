import { Component } from '@angular/core';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { IconComponent } from '../../shared/icon.component';
import { NewsletterComponent } from '../../shared/widgets.component';
import { ProtoShellBase } from '../proto-base';

@Component({
  selector: 'app-p5-shell',
  standalone: true,
  imports: [RouterLink, NewsletterComponent, IconComponent, DatePipe],
  template: `
    <div class="strip">
      <div class="wrap strip__in">
        <span>{{ today | date: 'EEEE, MMMM d, y' }}</span>
        <span class="hide-sm">Licensed &amp; bonded property broker · Est. {{ brand.founded }}</span>
        <a [href]="tel(brand.phones[0])">{{ brand.phones[0] }}</a>
      </div>
    </div>
    <header class="mast">
      <div class="wrap mast__in">
        <a routerLink="/" class="mast__logo" (click)="close()">{{ brand.name }}</a>
        <p class="mast__sub">Freight · Intermodal · Drayage · Hazmat</p>
        <button class="burger" (click)="open.set(!open())" aria-label="Menu"><app-icon [name]="open() ? 'close' : 'menu'" /></button>
      </div>
    </header>
    <nav class="nav" [class.nav--open]="open()" [class.nav--s]="scrolled()">
      <div class="wrap nav__in">
        @for (item of nav; track item.label) {
          <div class="nav__item" [class.nav__item--x]="expanded() === item.label">
            @if (item.children) {
              <button (click)="toggle(item.label)">{{ item.label }} <app-icon name="chevron" [size]="12" /></button>
              <div class="dd">
                @for (c of item.children; track c.label) {
                  <a [routerLink]="c.link" [fragment]="c.fragment" (click)="close()">{{ c.label }}</a>
                }
              </div>
            } @else {
              <a [routerLink]="item.link" (click)="close()">{{ item.label }}</a>
            }
          </div>
        }
        <a class="nav__cta" routerLink="/request-a-quote" (click)="close()">Request A Quote</a>
      </div>
    </nav>

    <main id="main"><ng-content /></main>

    <footer class="ft">
      <div class="wrap">
        <div class="ft__logo">{{ brand.name }}</div>
        <div class="ft__grid">
          <div><h5>The Company</h5><p>Founded in {{ brand.founded }}, we connect shippers with dependable carriers across North America.</p>
            <div class="nl-wrap"><small>Freight market updates, monthly.</small><app-newsletter /></div>
            <div class="soc">
              <a [href]="brand.social.facebook" target="_blank" rel="noopener" aria-label="Facebook"><app-icon name="facebook" [size]="16" /></a>
              <a [href]="brand.social.linkedin" target="_blank" rel="noopener" aria-label="LinkedIn"><app-icon name="linkedin" [size]="16" /></a>
              <a [href]="brand.social.twitter" target="_blank" rel="noopener" aria-label="Twitter"><app-icon name="twitter" [size]="16" /></a>
            </div></div>
          <div><h5>Useful Links</h5><a routerLink="/about">About</a><a routerLink="/why-choose-us">Why Choose Us</a>
            <a routerLink="/become-a-carrier">Become a Carrier</a><a routerLink="/contact">Contact</a><a routerLink="/faqs">FAQs</a></div>
          <div><h5>Services</h5>@for (s of services; track s.slug) { <a [routerLink]="['/services', s.slug]">{{ s.title }}</a> }
            <a routerLink="/" fragment="blog">Blogs</a></div>
          <div><h5>Correspondence</h5>@for (p of brand.phones; track p) { <a [href]="tel(p)">{{ p }}</a> }
            @for (e of brand.emails; track e) { <a [href]="'mailto:' + e">{{ e }}</a> }</div>
        </div>
        <div class="ft__legal">
          <em>Motor carriers bear responsibility and liability for goods while in transit.</em>
          <span>© {{ year }} {{ brand.name }} · <a routerLink="/terms">Terms</a> · <a routerLink="/privacy-policy">Privacy</a></span>
        </div>
      </div>
    </footer>
  `,
  styles: [`
    .wrap { max-width: 1240px; margin: 0 auto; padding: 0 20px; }
    .strip { background: var(--primary); color: #d8e3dc; font-size: 12px; letter-spacing: .5px; }
    .strip__in { display: flex; justify-content: space-between; gap: 16px; height: 34px; align-items: center; }
    .strip a { color: var(--accent); font-weight: 600; }
    .mast { background: var(--bg); }
    .mast__in { text-align: center; padding: 26px 20px 18px; position: relative; border-bottom: 1px solid var(--ink); }
    .mast__logo { font-family: var(--font-head); font-size: clamp(30px, 5vw, 60px); font-weight: 700; color: var(--heading); letter-spacing: -.02em; line-height: 1; }
    .mast__sub { margin: 10px 0 0; font-size: 12px; text-transform: uppercase; letter-spacing: 4px; color: var(--muted); }
    .burger { display: none; position: absolute; right: 16px; top: 50%; transform: translateY(-50%); background: none; border: 0; cursor: pointer; color: var(--heading); }
    .nav { position: sticky; top: var(--sw-h); z-index: 50; background: var(--bg); border-bottom: 3px double var(--ink); transition: box-shadow .2s; }
    .nav--s { box-shadow: 0 6px 18px rgba(29,42,36,.08); }
    .nav__in { display: flex; justify-content: center; align-items: center; gap: 4px; height: 52px; }
    .nav__item { position: relative; }
    .nav button, .nav__item > a { font: inherit; font-size: 13px; font-weight: 600; text-transform: uppercase; letter-spacing: 1.5px; color: var(--ink);
      background: none; border: 0; padding: 8px 14px; cursor: pointer; display: inline-flex; align-items: center; gap: 4px; }
    .nav button:hover, .nav__item > a:hover { color: var(--accent); }
    .dd { position: absolute; top: calc(100% + 10px); left: 50%; transform: translateX(-50%); min-width: 220px; background: var(--surface);
      border: 1px solid var(--ink); padding: 6px 0; display: none; text-align: center; }
    .dd a { display: block; padding: 10px 16px; font-family: var(--font-head); font-size: 17px; }
    .dd a:hover { color: var(--accent); font-style: italic; }
    .nav__item:hover .dd, .nav__item:focus-within .dd { display: block; }
    .nav__cta { margin-left: 16px; background: var(--primary); color: #fff; padding: 9px 16px; font-size: 13px; font-weight: 700;
      text-transform: uppercase; letter-spacing: 1.5px; }
    .nav__cta:hover { background: var(--accent); }

    .ft { background: var(--primary); color: #d8e3dc; padding: 64px 0 28px; }
    .ft__logo { font-family: var(--font-head); font-size: clamp(34px, 6vw, 80px); color: #fff; text-align: center; padding-bottom: 28px;
      border-bottom: 1px solid rgba(255,255,255,.25); }
    .ft__grid { display: grid; grid-template-columns: repeat(4, 1fr); padding: 36px 0; }
    .ft__grid > div { padding: 0 24px; border-right: 1px solid rgba(255,255,255,.18); }
    .ft__grid > div:first-child { padding-left: 0; } .ft__grid > div:last-child { border: 0; }
    h5 { font-family: var(--font-head); font-size: 20px; font-weight: 500; font-style: italic; color: #fff; margin: 0 0 14px; }
    .ft__grid p { line-height: 1.7; font-size: 14px; }
    .ft__grid a { display: block; padding: 4px 0; font-size: 14px; }
    .ft__grid a:hover { color: var(--accent); }
    .soc { display: flex; gap: 8px; } .soc a { width: 36px; height: 36px; display: grid !important; place-items: center; border: 1px solid rgba(255,255,255,.35); }
    .ft__legal { display: flex; justify-content: space-between; gap: 16px; flex-wrap: wrap; border-top: 3px double rgba(255,255,255,.3);
      padding-top: 20px; font-size: 13px; }

    @media (max-width: 1000px) {
      .hide-sm { display: none; }
      .burger { display: block; }
      .nav { display: none; position: static; } .nav--open { display: block; }
      .nav__in { flex-direction: column; height: auto; padding: 12px 20px; align-items: stretch; }
      .nav button, .nav__item > a { width: 100%; justify-content: center; padding: 12px; }
      .dd { position: static; transform: none; border: 0; background: none; display: none; }
      .nav__item:hover .dd { display: none; } .nav__item--x .dd, .nav__item--x:hover .dd { display: block; }
      .nav__cta { margin: 8px 0 0; text-align: center; }
      .ft__grid { grid-template-columns: 1fr 1fr; gap: 28px 0; }
      .ft__grid > div:nth-child(odd) { padding-left: 0; } .ft__grid > div:nth-child(2) { border: 0; }
    }
    @media (max-width: 560px) { .ft__grid { grid-template-columns: 1fr; } .ft__grid > div { padding: 0; border: 0; } }
  `],
})
export class P5ShellComponent extends ProtoShellBase {
  today = new Date();
}
