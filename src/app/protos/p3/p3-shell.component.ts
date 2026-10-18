import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IconComponent } from '../../shared/icon.component';
import { NewsletterComponent } from '../../shared/widgets.component';
import { ProtoShellBase } from '../proto-base';

@Component({
  selector: 'app-p3-shell',
  standalone: true,
  imports: [RouterLink, NewsletterComponent, IconComponent],
  template: `
    <header class="hd" [class.hd--s]="scrolled()">
      <div class="wrap hd__in">
        <a routerLink="/" class="logo" (click)="close()"><span class="logo__m">{{ brand.short }}</span>{{ brand.name }}</a>
        <nav class="nav" [class.nav--open]="open()">
          @for (item of nav; track item.label) {
            <div class="nav__item" [class.nav__item--x]="expanded() === item.label">
              @if (item.children) {
                <button (click)="toggle(item.label)">{{ item.label }} <app-icon name="chevron" [size]="13" /></button>
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
        </nav>
        <a class="cta" routerLink="/request-a-quote">Request A Quote</a>
        <button class="burger" (click)="open.set(!open())" aria-label="Menu"><app-icon [name]="open() ? 'close' : 'menu'" /></button>
      </div>
    </header>

    <main id="main"><ng-content /></main>

    <footer class="ft">
      <div class="wrap">
        <div class="ft__card">
          <div class="ft__grid">
            <div>
              <a routerLink="/" class="logo logo--w"><span class="logo__m">{{ brand.short }}</span>{{ brand.name }}</a>
              <p>Founded in {{ brand.founded }} — a licensed, bonded 3PL connecting shippers with trusted carriers across North America.</p>
            <div class="nl-wrap"><small>Freight market updates, monthly.</small><app-newsletter /></div>
              <div class="soc">
                <a [href]="brand.social.facebook" target="_blank" rel="noopener" aria-label="Facebook"><app-icon name="facebook" [size]="16" /></a>
                <a [href]="brand.social.linkedin" target="_blank" rel="noopener" aria-label="LinkedIn"><app-icon name="linkedin" [size]="16" /></a>
                <a [href]="brand.social.twitter" target="_blank" rel="noopener" aria-label="Twitter"><app-icon name="twitter" [size]="16" /></a>
              </div>
            </div>
            <div><h5>Useful links</h5><a routerLink="/about">About</a><a routerLink="/why-choose-us">Why choose us</a>
              <a routerLink="/become-a-carrier">Become a carrier</a><a routerLink="/contact">Contact</a><a routerLink="/faqs">FAQs</a></div>
            <div><h5>Services</h5>@for (s of services; track s.slug) { <a [routerLink]="['/services', s.slug]">{{ s.title }}</a> }
              <a routerLink="/" fragment="blog">Blogs</a></div>
            <div><h5>Contact</h5>@for (p of brand.phones; track p) { <a [href]="tel(p)">{{ p }}</a> }
              @for (e of brand.emails; track e) { <a [href]="'mailto:' + e">{{ e }}</a> }</div>
          </div>
          <div class="ft__legal">
            <span>Motor carriers bear liability for goods in transit.</span>
            <span>© {{ year }} {{ brand.name }} · <a routerLink="/terms">Terms</a> · <a routerLink="/privacy-policy">Privacy</a></span>
          </div>
        </div>
      </div>
    </footer>
  `,
  styles: [`
    .wrap { max-width: 1260px; margin: 0 auto; padding: 0 20px; }
    /* Inner-page banners sit under the floating glass header */
    :host ::ng-deep app-page-banner .banner { padding-top: 190px; }
    .hd { position: fixed; top: var(--sw-h); left: 0; right: 0; z-index: 50; padding: 14px 0; transition: .3s; }
    .hd--s { padding: 8px 0; }
    .hd__in { display: flex; align-items: center; gap: 20px; height: 64px; padding: 0 10px 0 18px; border-radius: 22px;
      background: rgba(255,255,255,.14); border: 1px solid rgba(255,255,255,.28); backdrop-filter: blur(18px) saturate(1.4);
      color: #fff; transition: .3s; }
    .hd--s .hd__in { background: rgba(255,255,255,.78); color: var(--ink); border-color: rgba(108,76,255,.15); box-shadow: 0 12px 40px rgba(60,40,160,.12); }
    .logo { display: flex; align-items: center; gap: 10px; font-weight: 800; font-size: 16px; }
    .logo__m { background: linear-gradient(135deg, #6c4cff, #19b6d6); color: #fff; padding: 8px 10px; border-radius: 12px; font-size: 14px; }
    .nav { display: flex; gap: 2px; margin: 0 auto; }
    .nav__item { position: relative; }
    .nav button, .nav__item > a { font: inherit; font-weight: 600; font-size: 14px; color: inherit; background: none; border: 0; cursor: pointer;
      padding: 9px 13px; border-radius: 999px; display: inline-flex; gap: 4px; align-items: center; }
    .nav button:hover, .nav__item > a:hover { background: rgba(255,255,255,.18); }
    .hd--s .nav button:hover, .hd--s .nav__item > a:hover { background: var(--mist); }
    .dd { position: absolute; top: calc(100% + 12px); left: 0; min-width: 220px; padding: 8px; border-radius: 20px; color: var(--ink);
      background: rgba(255,255,255,.9); backdrop-filter: blur(18px); border: 1px solid var(--line); box-shadow: var(--shadow);
      opacity: 0; visibility: hidden; transform: translateY(6px); transition: .18s; }
    .dd a { display: block; padding: 10px 14px; border-radius: 12px; font-size: 14px; font-weight: 600; }
    .dd a:hover { background: var(--mist); color: var(--accent); }
    .nav__item:hover .dd, .nav__item:focus-within .dd { opacity: 1; visibility: visible; transform: none; }
    .cta { background: linear-gradient(135deg, #6c4cff, #19b6d6); color: #fff; padding: 12px 20px; border-radius: 999px; font-weight: 700; font-size: 14px;
      box-shadow: 0 8px 24px rgba(108,76,255,.35); transition: transform .2s; }
    .cta:hover { transform: translateY(-2px); }
    .burger { display: none; background: none; border: 0; color: inherit; cursor: pointer; }

    .ft { padding: 40px 0 24px; }
    .ft__card { border-radius: 32px; padding: 56px 48px 24px; color: #e6e3ff;
      background: radial-gradient(600px 300px at 0% 0%, rgba(25,182,214,.5), transparent), radial-gradient(500px 300px at 100% 100%, rgba(255,92,170,.35), transparent), #241a6b; }
    .ft__grid { display: grid; grid-template-columns: 1.5fr 1fr 1fr 1.2fr; gap: 36px; }
    .ft__grid p { line-height: 1.7; opacity: .8; }
    .logo--w { color: #fff; }
    h5 { color: #fff; font-size: 15px; margin: 0 0 16px; }
    .ft__grid > div > a:not(.logo) { display: block; padding: 5px 0; opacity: .8; font-size: 14px; }
    .ft__grid > div > a:not(.logo):hover { opacity: 1; }
    .soc { display: flex; gap: 8px; }
    .soc a { width: 38px; height: 38px; border-radius: 50%; display: grid; place-items: center; background: rgba(255,255,255,.12);
      border: 1px solid rgba(255,255,255,.2); }
    .ft__legal { display: flex; justify-content: space-between; gap: 12px; flex-wrap: wrap; margin-top: 48px; padding-top: 20px;
      border-top: 1px solid rgba(255,255,255,.15); font-size: 13px; opacity: .75; }

    @media (max-width: 1060px) {
      .burger { display: inline-flex; margin-left: auto; } .cta { display: none; }
      .nav { display: none; position: absolute; top: calc(100% + 8px); left: 20px; right: 20px; flex-direction: column; padding: 12px;
        border-radius: 22px; background: rgba(255,255,255,.95); color: var(--ink); box-shadow: var(--shadow); }
      .wrap { position: relative; }
      .nav--open { display: flex; }
      .dd { position: static; display: none; opacity: 1; visibility: visible; transform: none; box-shadow: none; border: 0; background: none; }
      .nav__item--x .dd { display: block; }
      .ft__grid { grid-template-columns: 1fr 1fr; } .ft__card { padding: 40px 24px 20px; }
    }
    @media (max-width: 560px) { .ft__grid { grid-template-columns: 1fr; } .logo { font-size: 0; } .logo__m { font-size: 14px; } }
  `],
})
export class P3ShellComponent extends ProtoShellBase {}
