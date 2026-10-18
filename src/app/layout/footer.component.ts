import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BRAND, SERVICES } from '../site-data';
import { IconComponent } from '../shared/icon.component';
import { NewsletterComponent } from '../shared/widgets.component';

/** Footer for the "Classic" design. */
@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink, NewsletterComponent, IconComponent],
  template: `
    <footer class="ft">
      <div class="container ft__cta">
        <div>
          <h2>Have a lane that needs covering?</h2>
          <p>Talk to a broker today — most quotes go out within the hour.</p>
        </div>
        <div class="ft__cta-btns">
          <a class="btn btn--primary" routerLink="/request-a-quote">Get a Quote</a>
          <a class="ft__phone" [href]="tel(brand.phones[0])"><app-icon name="phone" [size]="18" /> {{ brand.phones[0] }}</a>
        </div>
      </div>

      <div class="container ft__main">
        <div class="ft__brand">
          <a routerLink="/" class="ft__logo">{{ brand.name }}</a>
          <p>Licensed &amp; bonded freight brokerage arranging truckload, LTL, intermodal, drayage and hazmat since {{ brand.founded }}.</p>
          <div class="nl-wrap"><small>Freight market updates, monthly.</small><app-newsletter /></div>
        </div>
        <nav class="ft__cols" aria-label="Footer">
          <div>
            <h3>Company</h3>
            <a routerLink="/about">About</a>
            <a routerLink="/why-choose-us">Why choose us</a>
            <a routerLink="/career">Careers</a>
            <a routerLink="/blog">Insights</a>
          </div>
          <div>
            <h3>Solutions</h3>
            @for (s of services; track s.slug) { <a [routerLink]="['/services', s.slug]">{{ s.slug === 'over-the-road' ? 'Over the Road' : s.title }}</a> }
          </div>
          <div>
            <h3>Support</h3>
            <a routerLink="/track">Track a shipment</a>
            <a routerLink="/become-a-carrier">Carrier sign-up</a>
            <a routerLink="/documents">Documents</a>
            <a routerLink="/faqs">FAQs</a>
            <a routerLink="/contact">Contact</a>
          </div>
        </nav>
      </div>

      <div class="ft__bar">
        <div class="container ft__bar-in">
          <span>© {{ year }} {{ brand.name }}</span>
          <span class="ft__legal"><a routerLink="/terms">Terms</a><a routerLink="/privacy-policy">Privacy</a></span>
          <span class="ft__soc">
            <a [href]="brand.social.linkedin" target="_blank" rel="noopener" aria-label="LinkedIn"><app-icon name="linkedin" [size]="16" /></a>
            <a [href]="brand.social.facebook" target="_blank" rel="noopener" aria-label="Facebook"><app-icon name="facebook" [size]="16" /></a>
            <a [href]="brand.social.twitter" target="_blank" rel="noopener" aria-label="Twitter"><app-icon name="twitter" [size]="16" /></a>
          </span>
        </div>
        <p class="container ft__note">{{ brand.name }} arranges transportation as a licensed property broker; motor carriers are responsible for goods while in transit.</p>
      </div>
    </footer>
  `,
  styles: [`
    .ft { background: #0b1f3a; color: #b8c6d9; font-size: 15px; }
    .ft__cta { display: flex; justify-content: space-between; align-items: center; gap: 28px; flex-wrap: wrap;
      padding-top: 48px; padding-bottom: 48px; border-bottom: 1px solid rgba(255,255,255,.1); }
    .ft__cta h2 { color: #fff; margin: 0 0 6px; font-size: clamp(22px, 2.6vw, 30px); }
    .ft__cta p { margin: 0; }
    .ft__cta-btns { display: flex; align-items: center; gap: 20px; flex-wrap: wrap; }
    .ft__phone { display: inline-flex; align-items: center; gap: 8px; color: #fff; font-weight: 700; }
    .ft__phone app-icon { color: var(--accent); }
    .ft__main { display: grid; grid-template-columns: 1.2fr 2fr; gap: 56px; padding-top: 56px; padding-bottom: 48px; }
    .ft__logo { font-family: var(--font-head); color: #fff; font-size: 22px; font-weight: 700; }
    .ft__brand p { line-height: 1.7; max-width: 380px; }
    .ft__cols { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }
    h3 { color: #fff; font-size: 13px; text-transform: uppercase; letter-spacing: 1.5px; margin: 6px 0 16px; }
    .ft__cols a { display: block; padding: 6px 0; color: #b8c6d9; transition: color .15s; }
    .ft__cols a:hover { color: #fff; }
    .ft__bar { background: #081730; padding: 18px 0; font-size: 13px; }
    .ft__bar-in { display: flex; align-items: center; gap: 24px; flex-wrap: wrap; }
    .ft__legal { display: flex; gap: 18px; } .ft__legal a:hover { color: #fff; }
    .ft__soc { margin-left: auto; display: flex; gap: 8px; }
    .ft__soc a { width: 34px; height: 34px; display: grid; place-items: center; border-radius: 8px; background: rgba(255,255,255,.06); }
    .ft__soc a:hover { background: var(--accent); color: #fff; }
    .ft__note { margin: 12px auto 0; color: #7d8ea6; font-size: 12px; }
    @media (max-width: 900px) { .ft__main { grid-template-columns: 1fr; gap: 36px; } }
    @media (max-width: 560px) { .ft__cols { grid-template-columns: 1fr 1fr; } .ft__soc { margin-left: 0; } }
  `],
})
export class FooterComponent {
  brand = BRAND;
  services = SERVICES;
  year = new Date().getFullYear();
  tel = (p: string) => 'tel:' + p.replace(/\D/g, '');
}
