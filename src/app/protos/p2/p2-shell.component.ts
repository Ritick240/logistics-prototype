import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IconComponent } from '../../shared/icon.component';
import { NewsletterComponent } from '../../shared/widgets.component';
import { ProtoShellBase } from '../proto-base';

@Component({
  selector: 'app-p2-shell',
  standalone: true,
  imports: [RouterLink, NewsletterComponent, IconComponent],
  template: `
    <header class="hd">
      <div class="hd__pill" [class.hd__pill--s]="scrolled()">
        <a routerLink="/" class="logo" (click)="close()"><span class="logo__dot"></span>{{ brand.short }}</a>
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
        <a class="cta" routerLink="/request-a-quote">Get a quote</a>
        <button class="burger" (click)="open.set(!open())" aria-label="Menu"><app-icon [name]="open() ? 'close' : 'menu'" /></button>
      </div>
    </header>

    <main id="main"><ng-content /></main>

    <footer class="ft">
      <div class="wrap">
        <div class="ft__grid">
          <div class="ft__brand">
            <a routerLink="/" class="logo"><span class="logo__dot"></span>{{ brand.name }}</a>
            <p>Licensed &amp; bonded 3PL since {{ brand.founded }}. Freight, handled.</p>
            <div class="nl-wrap"><small>Freight market updates, monthly.</small><app-newsletter /></div>
            <div class="soc">
              <a [href]="brand.social.facebook" target="_blank" rel="noopener" aria-label="Facebook"><app-icon name="facebook" [size]="16" /></a>
              <a [href]="brand.social.linkedin" target="_blank" rel="noopener" aria-label="LinkedIn"><app-icon name="linkedin" [size]="16" /></a>
              <a [href]="brand.social.twitter" target="_blank" rel="noopener" aria-label="Twitter"><app-icon name="twitter" [size]="16" /></a>
            </div>
          </div>
          <div><h5>Links</h5><a routerLink="/about">About</a><a routerLink="/why-choose-us">Why us</a>
            <a routerLink="/become-a-carrier">Become a carrier</a><a routerLink="/faqs">FAQs</a><a routerLink="/contact">Contact</a></div>
          <div><h5>Services</h5>@for (s of services; track s.slug) { <a [routerLink]="['/services', s.slug]">{{ s.title }}</a> }</div>
          <div><h5>Reach us</h5>@for (p of brand.phones; track p) { <a [href]="tel(p)">{{ p }}</a> }
            @for (e of brand.emails; track e) { <a [href]="'mailto:' + e">{{ e }}</a> }</div>
        </div>
        <div class="ft__legal">
          <span>© {{ year }} {{ brand.name }} — motor carriers bear liability for goods in transit.</span>
          <span><a routerLink="/terms">Terms</a> · <a routerLink="/privacy-policy">Privacy</a></span>
        </div>
      </div>
    </footer>
  `,
  styles: [`
    :host { display: block; background: var(--bg); color: var(--ink); }
    .wrap { max-width: 1240px; margin: 0 auto; padding: 0 20px; }
    .hd { position: sticky; top: calc(var(--sw-h) + 12px); z-index: 50; display: flex; justify-content: center; padding: 0 16px; height: 0; }
    .hd__pill { display: flex; align-items: center; gap: 16px; padding: 8px 8px 8px 20px; border-radius: 999px; height: 56px;
      background: rgba(20, 22, 28, .7); border: 1px solid var(--line); backdrop-filter: blur(16px);
      transition: box-shadow .3s; width: min(100%, 1040px); }
    .hd__pill--s { box-shadow: 0 10px 40px rgba(0,0,0,.6); }
    .logo { display: flex; align-items: center; gap: 10px; font-weight: 700; font-size: 18px; color: var(--heading); }
    .logo__dot { width: 12px; height: 12px; border-radius: 50%; background: var(--accent); box-shadow: 0 0 16px var(--accent); }
    .nav { display: flex; gap: 2px; margin: 0 auto; }
    .nav__item { position: relative; }
    .nav button, .nav__item > a { font: inherit; font-size: 14px; color: var(--muted); background: none; border: 0; cursor: pointer;
      padding: 8px 12px; border-radius: 999px; display: inline-flex; gap: 4px; align-items: center; transition: color .15s; }
    .nav button:hover, .nav__item > a:hover { color: var(--heading); background: #1b1e26; }
    .dd { position: absolute; top: calc(100% + 10px); left: 0; min-width: 210px; background: #14161c; border: 1px solid var(--line);
      border-radius: 18px; padding: 6px; opacity: 0; visibility: hidden; transition: .15s; }
    .dd a { display: block; padding: 10px 12px; border-radius: 12px; font-size: 14px; color: var(--muted); }
    .dd a:hover { background: #1b1e26; color: var(--accent); }
    .nav__item:hover .dd, .nav__item:focus-within .dd { opacity: 1; visibility: visible; }
    .cta { background: var(--accent); color: var(--accent-ink); font-weight: 700; padding: 0 20px; height: 40px; display: inline-flex;
      align-items: center; border-radius: 999px; font-size: 14px; }
    .cta:hover { box-shadow: 0 0 24px rgba(198, 244, 50, .5); }
    .burger { display: none; background: none; border: 0; color: var(--heading); cursor: pointer; }

    .ft { border-top: 1px solid var(--line); padding: 72px 0 28px; background: radial-gradient(800px 300px at 15% 0%, rgba(198,244,50,.07), transparent); }
    .ft__grid { display: grid; grid-template-columns: 1.5fr 1fr 1fr 1.3fr; gap: 40px; }
    .ft__brand p { color: var(--muted); line-height: 1.6; max-width: 300px; }
    h5 { color: var(--heading); font-size: 14px; margin: 0 0 16px; }
    .ft__grid a:not(.logo) { display: block; color: var(--muted); padding: 5px 0; font-size: 14px; }
    .ft__grid a:not(.logo):hover { color: var(--accent); }
    .soc { display: flex; gap: 8px; }
    .soc a { width: 38px; height: 38px; border-radius: 12px !important; border: 1px solid var(--line); display: grid !important; place-items: center; padding: 0 !important; }
    .ft__legal { display: flex; justify-content: space-between; gap: 16px; flex-wrap: wrap; margin-top: 56px; padding-top: 22px;
      border-top: 1px solid var(--line); color: var(--muted); font-size: 13px; }

    @media (max-width: 1020px) {
      .burger { display: inline-flex; margin-left: auto; } .cta { display: none; }
      .nav { display: none; position: absolute; top: 64px; left: 0; right: 0; flex-direction: column; background: #14161c;
        border: 1px solid var(--line); border-radius: 22px; padding: 12px; }
      .nav--open { display: flex; }
      .dd { position: static; display: none; opacity: 1; visibility: visible; border: 0; background: none; }
      .nav__item--x .dd { display: block; }
      .ft__grid { grid-template-columns: 1fr 1fr; }
    }
    @media (max-width: 560px) { .ft__grid { grid-template-columns: 1fr; } }
  `],
})
export class P2ShellComponent extends ProtoShellBase {}
