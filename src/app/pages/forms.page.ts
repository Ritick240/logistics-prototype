import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BRAND, IMAGES } from '../site-data';
import { IconComponent } from '../shared/icon.component';
import { ContactFormComponent } from '../shared/contact-form.component';
import { QuoteFormComponent } from '../forms/quote-form.component';
import { CarrierFormComponent } from '../forms/carrier-form.component';
import { CareerFormComponent } from '../forms/career-form.component';
import { PageBannerComponent } from './page-banner.component';

// Pages built around a form: contact, quote, carrier sign-up and careers.

const SIDE_STYLES = `
  .layout { display: grid; grid-template-columns: 1fr 1.25fr; gap: 56px; align-items: start; }
  .side h2 { margin-top: 8px; }
  .side > p { color: var(--muted); line-height: 1.75; font-size: 17px; }
  .list { list-style: none; padding: 0; margin: 24px 0; }
  .list li { display: flex; gap: 12px; align-items: flex-start; padding: 10px 0; line-height: 1.55; }
  .list app-icon { color: var(--accent); flex: none; margin-top: 2px; }
  .info { display: flex; gap: 14px; padding: 16px 0; border-top: 1px solid var(--line); line-height: 1.6; }
  .info app-icon { flex: none; width: 46px; height: 46px; border-radius: 12px; display: grid; place-items: center; background: var(--accent-soft); color: var(--accent); }
  .info b { display: block; color: var(--heading); } .info a, .info span { display: block; color: var(--muted); } .info a:hover { color: var(--accent); }
  .map { width: 100%; height: 260px; border: 1px solid var(--line); border-radius: var(--radius); margin-top: 16px; }
  .note { font-size: 14px; color: var(--muted); background: var(--mist); border: 1px solid var(--line); border-radius: min(var(--radius), 10px); padding: 14px 16px; }
  @media (max-width: 900px) { .layout { grid-template-columns: 1fr; } }
`;

@Component({
  selector: 'app-contact-page',
  standalone: true,
  imports: [IconComponent, ContactFormComponent, PageBannerComponent],
  template: `
    <app-page-banner title="Contact Us" />
    <section class="section">
      <div class="container layout">
        <div class="side">
          <span class="eyebrow">Ship with us</span>
          <h2 class="title">Let's talk about your freight</h2>
          <p>Send us a message and a logistics specialist will reply within one business day. For loads in transit, please call.</p>
          <div class="info"><app-icon name="pin" /><div><b>Office</b><span>{{ brand.address }}</span></div></div>
          <div class="info"><app-icon name="phone" /><div><b>Phone</b>@for (p of brand.phones; track p) { <a [href]="tel(p)">{{ p }}</a> }</div></div>
          <div class="info"><app-icon name="mail" /><div><b>Email</b>@for (e of brand.emails; track e) { <a [href]="'mailto:' + e">{{ e }}</a> }</div></div>
          <div class="info"><app-icon name="star" /><div><b>Hours</b><span>Mon–Fri 7:00am–7:00pm ET</span><span>24/7 support for loads in transit</span></div></div>
          <iframe class="map" title="Office location map" loading="lazy"
            src="https://www.openstreetmap.org/export/embed.html?bbox=-73.45%2C40.76%2C-73.36%2C40.81&layer=mapnik&marker=40.7934%2C-73.4151"></iframe>
        </div>
        <app-contact-form />
      </div>
    </section>
  `,
  styles: [SIDE_STYLES],
})
export class ContactPage {
  brand = BRAND;
  tel = (p: string) => 'tel:' + p.replace(/\D/g, '');
}

@Component({
  selector: 'app-quote-page',
  standalone: true,
  imports: [IconComponent, QuoteFormComponent, PageBannerComponent],
  template: `
    <app-page-banner title="Request A Quote" />
    <section class="section">
      <div class="container layout">
        <div class="side">
          <span class="eyebrow">Fast, all-in pricing</span>
          <h2 class="title">Get a rate in about an hour</h2>
          <p>Share your lane, timing and freight details. We'll come back with an all-in rate — accessorials included — and the best mode for the job.</p>
          <ul class="list">
            <li><app-icon name="check" /> No obligation and no account needed</li>
            <li><app-icon name="check" /> FTL, LTL, intermodal, drayage and hazmat</li>
            <li><app-icon name="check" /> Vetted, insured carriers on every load</li>
            <li><app-icon name="check" /> One point of contact from pickup to delivery</li>
          </ul>
          <p class="note">Need it today? Call <a [href]="'tel:' + brand.phones[0].replace(digits, '')"><b>{{ brand.phones[0] }}</b></a> for urgent or same-day freight.</p>
        </div>
        <app-quote-form />
      </div>
    </section>
  `,
  styles: [SIDE_STYLES],
})
export class QuotePage { brand = BRAND; digits = /\D/g; }

@Component({
  selector: 'app-carrier-page',
  standalone: true,
  imports: [IconComponent, RouterLink, CarrierFormComponent, PageBannerComponent],
  template: `
    <app-page-banner title="Become a Carrier" [image]="carrierImg" />
    <section class="section">
      <div class="container layout">
        <div class="side">
          <span class="eyebrow">Haul with us</span>
          <h2 class="title">Steady freight. Fair rates. Fast pay.</h2>
          <p>We work with owner-operators and fleets of every size. Get set up once and start seeing loads on your preferred lanes.</p>
          <ul class="list">
            <li><app-icon name="check" /> Consistent loads on repeat lanes</li>
            <li><app-icon name="check" /> Quick-pay options available</li>
            <li><app-icon name="check" /> Dispatchers who respect your time and HOS</li>
            <li><app-icon name="check" /> Detention and layover paid per agreement</li>
          </ul>
          <h3>What you'll need</h3>
          <ul class="list">
            <li><app-icon name="shield" /> Active MC/DOT operating authority</li>
            <li><app-icon name="shield" /> Certificate of insurance (auto liability &amp; cargo)</li>
            <li><app-icon name="shield" /> Completed W-9</li>
          </ul>
          <p class="note">Prefer paper? Download the setup packet from our <a routerLink="/documents"><b>documents page</b></a>.</p>
        </div>
        <app-carrier-form />
      </div>
    </section>
  `,
  styles: [SIDE_STYLES + ' h3 { color: var(--heading); margin: 28px 0 0; }'],
})
export class CarrierPage { carrierImg = IMAGES.carrier; }

@Component({
  selector: 'app-careers-page',
  standalone: true,
  imports: [IconComponent, CareerFormComponent, PageBannerComponent],
  template: `
    <app-page-banner title="Careers" />
    <section class="section">
      <div class="container layout">
        <div class="side">
          <span class="eyebrow">Join the team</span>
          <h2 class="title">Build a career in logistics</h2>
          <div class="note"><b>Current openings:</b> there are no open positions right now. We still welcome general applications.</div>
          <p>We hire people who like solving problems under pressure and care about doing right by customers and drivers.</p>
          <ul class="list">
            <li><app-icon name="check" /> Competitive base plus commission for sales roles</li>
            <li><app-icon name="check" /> Health, dental and retirement plans</li>
            <li><app-icon name="check" /> Paid training — no logistics experience required for entry roles</li>
            <li><app-icon name="check" /> A small team where your work is noticed</li>
          </ul>
        </div>
        <app-career-form />
      </div>
    </section>
  `,
  styles: [SIDE_STYLES + ' .note { margin: 8px 0 20px; }'],
})
export class CareersPage {}
