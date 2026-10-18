import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IconComponent } from '../../shared/icon.component';
import { NewsletterComponent } from '../../shared/widgets.component';
import { ProtoShellBase } from '../proto-base';

/** Prototype 4 — "Modern Corporate": a refreshed take on the classic navy/orange logistics look. */
@Component({
  selector: 'app-p4-shell',
  standalone: true,
  imports: [RouterLink, NewsletterComponent, IconComponent],
  template: `
    <header class="hd" [class.hd--solid]="scrolled() || open()">
      <div class="wrap hd__in">
        <a routerLink="/" class="logo" (click)="close()">
          <span class="logo__mark">{{ brand.short }}</span>
          <span class="logo__txt">{{ brand.name }}<small>Freight brokerage</small></span>
        </a>
        <nav class="nav" [class.nav--open]="open()" aria-label="Main">
          @for (item of nav; track item.label) {
            <div class="nav__item" [class.nav__item--x]="expanded() === item.label">
              @if (item.children) {
                <button (click)="toggle(item.label)" [attr.aria-expanded]="expanded() === item.label">{{ item.label }} <app-icon name="chevron" [size]="13" /></button>
                <div class="dd">
                  @for (c of item.children; track c.label) {
                    <a [routerLink]="c.link" [fragment]="c.fragment" (click)="close()"><app-icon name="arrow" [size]="14" /> {{ c.label }}</a>
                  }
                </div>
              } @else {
                <a [routerLink]="item.link" (click)="close()">{{ item.label }}</a>
              }
            </div>
          }
          <a class="cta cta--m" routerLink="/request-a-quote" (click)="close()">Request a Quote</a>
        </nav>
        <a class="hd__tel" [href]="tel(brand.phones[0])"><span><app-icon name="phone" [size]="16" /></span><b>{{ brand.phones[0] }}</b></a>
        <a class="cta" routerLink="/request-a-quote">Request a Quote</a>
        <button class="burger" (click)="open.set(!open())" [attr.aria-expanded]="open()" aria-label="Menu"><app-icon [name]="open() ? 'close' : 'menu'" /></button>
      </div>
    </header>

    <main id="main"><ng-content /></main>

    <footer class="ft">
      <div class="wrap">
        <div class="ft__contact">
          <a [href]="tel(brand.phones[0])"><span><app-icon name="phone" /></span><div><small>Call us</small><b>{{ brand.phones[0] }}</b></div></a>
          <a [href]="'mailto:' + brand.emails[0]"><span><app-icon name="mail" /></span><div><small>Email</small><b>{{ brand.emails[0] }}</b></div></a>
          <div class="ft__c"><span><app-icon name="pin" /></span><div><small>Office</small><b>{{ brand.address }}</b></div></div>
        </div>
        <div class="ft__grid">
          <div>
            <a routerLink="/" class="logo logo--ft"><span class="logo__mark">{{ brand.short }}</span><span class="logo__txt">{{ brand.name }}</span></a>
            <p>Licensed and bonded freight broker connecting shippers with vetted carriers across North America since {{ brand.founded }}.</p>
            <div class="nl-wrap"><small>Get monthly freight market notes.</small><app-newsletter /></div>
          </div>
          <div><h4>Company</h4>
            <a routerLink="/about">About us</a><a routerLink="/why-choose-us">Why choose us</a><a routerLink="/career">Careers</a>
            <a routerLink="/blog">Blog</a><a routerLink="/faqs">FAQs</a></div>
          <div><h4>Services</h4>
            @for (s of services; track s.slug) { <a [routerLink]="['/services', s.slug]">{{ s.slug === 'over-the-road' ? 'Over the Road' : s.title }}</a> }</div>
          <div><h4>Resources</h4>
            <a routerLink="/track">Track a shipment</a><a routerLink="/become-a-carrier">Become a carrier</a>
            <a routerLink="/documents">Documents</a><a routerLink="/contact">Contact</a></div>
        </div>
        <div class="ft__bar">
          <span>© {{ year }} {{ brand.name }}. All rights reserved.</span>
          <span class="ft__links"><a routerLink="/terms">Terms</a><a routerLink="/privacy-policy">Privacy</a></span>
          <span class="ft__soc">
            <a [href]="brand.social.facebook" target="_blank" rel="noopener" aria-label="Facebook"><app-icon name="facebook" [size]="16" /></a>
            <a [href]="brand.social.linkedin" target="_blank" rel="noopener" aria-label="LinkedIn"><app-icon name="linkedin" [size]="16" /></a>
            <a [href]="brand.social.twitter" target="_blank" rel="noopener" aria-label="Twitter"><app-icon name="twitter" [size]="16" /></a>
          </span>
        </div>
        <p class="ft__note">We arrange transportation as a licensed property broker. Motor carriers are responsible for goods while in transit.</p>
      </div>
    </footer>
  `,
  styles: [`
    .wrap { max-width: 1280px; margin: 0 auto; padding: 0 20px; }
    /* The header floats over the home hero; inner-page banners get room for it. */
    :host ::ng-deep app-page-banner .banner { padding-top: 170px; }

    .hd { position: fixed; top: var(--sw-h); left: 0; right: 0; z-index: 50; color: #fff; transition: background .25s, box-shadow .25s, color .25s; }
    .hd--solid { background: #fff; color: var(--ink); box-shadow: 0 8px 30px rgba(11,44,87,.1); }
    .hd__in { display: flex; align-items: center; gap: 20px; height: 84px; }
    .logo { display: flex; align-items: center; gap: 12px; flex: none; }
    .logo__mark { display: grid; place-items: center; width: 46px; height: 46px; border-radius: 12px; font-weight: 800; letter-spacing: .5px;
      background: linear-gradient(135deg, var(--accent), #ff9a4d); color: #fff; box-shadow: 0 8px 20px rgba(242,107,29,.35); }
    .logo__txt { font-family: var(--font-head); font-weight: 700; font-size: 16px; line-height: 1.15; }
    .logo__txt small { display: block; font-family: var(--font-body); font-weight: 500; font-size: 12px; opacity: .7; }
    .nav { display: flex; align-items: center; gap: 2px; margin: 0 auto; }
    .nav__item { position: relative; }
    .nav button, .nav__item > a { font: inherit; font-weight: 600; font-size: 15px; color: inherit; background: none; border: 0; cursor: pointer;
      padding: 10px 13px; display: inline-flex; align-items: center; gap: 4px; position: relative; }
    .nav button::after, .nav__item > a::after { content: ''; position: absolute; left: 13px; right: 13px; bottom: 4px; height: 2px; background: var(--accent);
      transform: scaleX(0); transition: transform .2s; }
    .nav__item:hover > button::after, .nav__item > a:hover::after { transform: scaleX(1); }
    .dd { position: absolute; top: calc(100% + 10px); left: 0; min-width: 230px; background: #fff; color: var(--ink); border-radius: 14px; padding: 8px;
      box-shadow: 0 24px 50px rgba(11,44,87,.18); opacity: 0; visibility: hidden; transform: translateY(8px); transition: .18s; }
    .dd a { display: flex; align-items: center; gap: 8px; padding: 11px 12px; border-radius: 10px; font-size: 14px; font-weight: 600; }
    .dd a app-icon { color: var(--accent); opacity: 0; transform: translateX(-4px); transition: .15s; }
    .dd a:hover { background: var(--mist); color: var(--heading); } .dd a:hover app-icon { opacity: 1; transform: none; }
    .nav__item:hover .dd, .nav__item:focus-within .dd { opacity: 1; visibility: visible; transform: none; }
    .hd__tel { display: flex; align-items: center; gap: 10px; font-size: 14px; flex: none; }
    .hd__tel span { width: 38px; height: 38px; border-radius: 50%; display: grid; place-items: center; border: 1px solid currentColor; opacity: .9; }
    .cta { flex: none; background: var(--accent); color: #fff; padding: 13px 22px; border-radius: 12px; font-weight: 700; font-size: 14px;
      box-shadow: 0 10px 24px rgba(242,107,29,.3); transition: transform .2s, box-shadow .2s; }
    .cta:hover { transform: translateY(-2px); box-shadow: 0 14px 30px rgba(242,107,29,.4); }
    .cta--m { display: none; }
    .burger { display: none; background: none; border: 0; color: inherit; cursor: pointer; }

    .ft { background: var(--navy-900); color: #b3c2d6; border-top: 4px solid var(--accent); }
    .ft__contact { display: grid; grid-template-columns: 1fr 1fr 1.4fr; gap: 16px; padding: 40px 0; border-bottom: 1px solid rgba(255,255,255,.1); }
    .ft__contact > * { display: flex; gap: 14px; align-items: center; padding: 18px; border-radius: 16px; background: rgba(255,255,255,.04);
      border: 1px solid rgba(255,255,255,.08); transition: background .2s; }
    .ft__contact a:hover { background: rgba(255,255,255,.08); }
    .ft__contact span { flex: none; width: 46px; height: 46px; border-radius: 12px; display: grid; place-items: center; background: var(--accent); color: #fff; }
    .ft__contact small { display: block; font-size: 12px; opacity: .7; } .ft__contact b { color: #fff; font-weight: 600; font-size: 15px; }
    .ft__grid { display: grid; grid-template-columns: 1.6fr 1fr 1fr 1fr; gap: 40px; padding: 56px 0 40px; }
    .logo--ft { color: #fff; margin-bottom: 14px; }
    .ft__grid p { line-height: 1.7; max-width: 380px; }
    h4 { color: #fff; font-size: 16px; margin: 6px 0 18px; }
    .ft__grid > div > a:not(.logo) { display: block; padding: 6px 0; transition: color .15s, padding .15s; }
    .ft__grid > div > a:not(.logo):hover { color: #fff; padding-left: 4px; }
    .ft__bar { display: flex; align-items: center; gap: 24px; flex-wrap: wrap; padding: 22px 0; border-top: 1px solid rgba(255,255,255,.1); font-size: 14px; }
    .ft__links { display: flex; gap: 18px; } .ft__links a:hover { color: #fff; }
    .ft__soc { margin-left: auto; display: flex; gap: 8px; }
    .ft__soc a { width: 38px; height: 38px; border-radius: 10px; display: grid; place-items: center; background: rgba(255,255,255,.06); transition: background .2s; }
    .ft__soc a:hover { background: var(--accent); color: #fff; }
    .ft__note { margin: 0; padding-bottom: 24px; font-size: 12px; color: #7f91a9; }

    @media (max-width: 1240px) { .hd__tel { display: none; } }
    @media (max-width: 1080px) {
      .burger { display: inline-flex; margin-left: auto; } .cta:not(.cta--m) { display: none; }
      .nav { display: none; position: absolute; top: 100%; left: 0; right: 0; flex-direction: column; align-items: stretch; margin: 0;
        background: #fff; color: var(--ink); padding: 12px 20px 22px; box-shadow: 0 20px 40px rgba(11,44,87,.15); }
      .nav--open { display: flex; }
      .nav button, .nav__item > a { width: 100%; justify-content: space-between; padding: 14px 4px; border-bottom: 1px solid var(--line); }
      .nav button::after, .nav__item > a::after { display: none; }
      .dd { position: static; opacity: 1; visibility: visible; transform: none; box-shadow: none; padding: 4px 0 4px 8px; display: none; }
      .nav__item:hover .dd { display: none; } .nav__item--x .dd, .nav__item--x:hover .dd { display: block; }
      .cta--m { display: block; text-align: center; margin-top: 14px; }
      .ft__contact { grid-template-columns: 1fr; } .ft__grid { grid-template-columns: 1fr 1fr; }
    }
    @media (max-width: 560px) { .ft__grid { grid-template-columns: 1fr; } .ft__soc { margin-left: 0; } .logo__txt small { display: none; } }
  `],
})
export class P4ShellComponent extends ProtoShellBase {}
