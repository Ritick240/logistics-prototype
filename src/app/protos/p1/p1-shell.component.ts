import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IconComponent } from '../../shared/icon.component';
import { NewsletterComponent } from '../../shared/widgets.component';
import { ProtoShellBase } from '../proto-base';

@Component({
  selector: 'app-p1-shell',
  standalone: true,
  imports: [RouterLink, NewsletterComponent, IconComponent],
  template: `
    <header class="hd" [class.hd--solid]="scrolled()">
      <div class="wrap hd__in">
        <a routerLink="/" class="logo" (click)="close()">{{ brand.short }}<span>.</span></a>
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
        <a class="cta" routerLink="/request-a-quote">Request a quote <app-icon name="arrow" [size]="16" /></a>
        <button class="burger" (click)="open.set(!open())" aria-label="Menu"><app-icon [name]="open() ? 'close' : 'menu'" /></button>
      </div>
    </header>

    <main id="main"><ng-content /></main>

    <footer class="ft">
      <div class="wrap">
        <div class="ft__top">
          <p class="ft__pitch">Ready to move freight?<br /><a routerLink="/request-a-quote">Get a quote →</a></p>
            <div class="nl-wrap"><small>Freight market updates, monthly.</small><app-newsletter /></div>
          <div class="ft__cols">
            <div><h5>Company</h5>
              <a routerLink="/about">About</a><a routerLink="/why-choose-us">Why us</a><a routerLink="/career">Career</a>
              <a routerLink="/become-a-carrier">Carriers</a><a routerLink="/faqs">FAQs</a></div>
            <div><h5>Services</h5>
              @for (s of services; track s.slug) { <a [routerLink]="['/services', s.slug]">{{ s.title }}</a> }</div>
            <div><h5>Contact</h5>
              @for (p of brand.phones; track p) { <a [href]="tel(p)">{{ p }}</a> }
              <a [href]="'mailto:' + brand.emails[0]">{{ brand.emails[0] }}</a></div>
          </div>
        </div>
        <div class="ft__mark">{{ brand.name }}</div>
        <div class="ft__legal">
          <span>© {{ year }} {{ brand.name }}</span>
          <span>Motor carriers are responsible for goods in transit.</span>
          <span><a routerLink="/terms">Terms</a> · <a routerLink="/privacy-policy">Privacy</a></span>
        </div>
      </div>
    </footer>
  `,
  styles: [`
    .wrap { max-width: 1320px; margin: 0 auto; padding: 0 24px; }
    .hd { position: sticky; top: var(--sw-h); z-index: 50; background: rgba(255,255,255,.85); backdrop-filter: blur(12px);
      border-bottom: 1px solid transparent; transition: border-color .2s; }
    .hd--solid { border-color: var(--line); }
    .hd__in { display: flex; align-items: center; gap: 32px; height: 72px; }
    .logo { font-size: 26px; font-weight: 800; letter-spacing: -1px; } .logo span { color: var(--accent); }
    .nav { display: flex; gap: 4px; margin: 0 auto; }
    .nav__item { position: relative; }
    .nav button, .nav__item > a { font: inherit; font-weight: 600; font-size: 14px; background: none; border: 0; cursor: pointer;
      padding: 8px 12px; border-radius: 999px; display: inline-flex; gap: 4px; align-items: center; color: var(--ink); }
    .nav button:hover, .nav__item > a:hover { background: var(--mist); }
    .dd { position: absolute; top: calc(100% + 6px); left: 0; min-width: 200px; background: #fff; border: 1px solid var(--line);
      border-radius: 16px; padding: 6px; opacity: 0; visibility: hidden; transition: .15s; }
    .dd a { display: block; padding: 10px 12px; border-radius: 10px; font-size: 14px; } .dd a:hover { background: var(--mist); }
    .nav__item:hover .dd, .nav__item:focus-within .dd { opacity: 1; visibility: visible; }
    .cta { display: inline-flex; gap: 8px; align-items: center; background: var(--ink); color: #fff; padding: 12px 20px;
      border-radius: 999px; font-weight: 700; font-size: 14px; transition: background .2s; }
    .cta:hover { background: var(--accent); }
    .burger { display: none; background: none; border: 0; cursor: pointer; }

    .ft { background: var(--ink); color: #fff; padding: 96px 0 28px; margin-top: 0; }
    .ft__top { display: grid; grid-template-columns: 1.2fr 1.5fr; gap: 48px; }
    .ft__pitch { font-size: clamp(28px, 3.5vw, 44px); font-weight: 700; line-height: 1.15; margin: 0; letter-spacing: -1px; }
    .ft__pitch a { color: var(--accent); }
    .ft__cols { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }
    h5 { font-size: 12px; text-transform: uppercase; letter-spacing: 2px; color: #8b8b90; margin: 0 0 16px; }
    .ft__cols a { display: block; padding: 5px 0; color: #d6d6d8; font-size: 15px; } .ft__cols a:hover { color: #fff; }
    .ft__mark { font-size: clamp(48px, 10.5vw, 160px); font-weight: 800; letter-spacing: -.05em; line-height: .9;
      margin: 80px 0 28px; color: #1f1f22; white-space: nowrap; overflow: hidden; }
    .ft__legal { display: flex; justify-content: space-between; gap: 16px; flex-wrap: wrap; font-size: 13px; color: #8b8b90;
      border-top: 1px solid #262629; padding-top: 22px; }

    @media (max-width: 1020px) {
      .burger { display: inline-flex; margin-left: auto; } .cta { display: none; }
      .nav { display: none; position: absolute; top: 72px; left: 0; right: 0; flex-direction: column; background: #fff;
        padding: 12px 24px 24px; border-bottom: 1px solid var(--line); }
      .nav--open { display: flex; }
      .dd { position: static; display: none; opacity: 1; visibility: visible; border: 0; padding-left: 12px; }
      .nav__item--x .dd { display: block; }
      .ft__top, .ft__cols { grid-template-columns: 1fr; }
    }
  `],
})
export class P1ShellComponent extends ProtoShellBase {}
