import { Component, computed, inject, input, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { TRACKING_ENDPOINT } from '../config';
import { ToastService } from '../core/toast.service';
import { BRAND, DOCUMENTS, LEGAL } from '../site-data';
import { IconComponent } from '../shared/icon.component';
import { PageBannerComponent } from './page-banner.component';

interface Tracking { status: string; origin: string; destination: string; eta?: string; events: { time: string; text: string }[]; sample?: boolean; }

@Component({
  selector: 'app-track-page',
  standalone: true,
  imports: [FormsModule, RouterLink, IconComponent, PageBannerComponent],
  template: `
    <app-page-banner title="Track a Shipment" />
    <section class="section">
      <div class="container narrow">
        <form class="lookup" (ngSubmit)="lookup()">
          <label for="ref">Load, PRO or BOL number</label>
          <div class="lookup__row">
            <input id="ref" name="ref" [(ngModel)]="ref" placeholder="e.g. NLG-482913" autocomplete="off" />
            <button class="btn btn--primary" type="submit" [disabled]="loading()">
              @if (loading()) { <span class="spinner"></span> } Track
            </button>
          </div>
          @if (bad()) { <p class="err">Please enter at least 5 letters or numbers.</p> }
        </form>

        @if (result(); as r) {
          <div class="result" aria-live="polite">
            @if (r.sample) {
              <p class="sample">Sample result — live tracking isn't connected yet (set <code>TRACKING_ENDPOINT</code> in <code>config.ts</code>).</p>
            }
            <div class="result__head">
              <div><small>Reference</small><b>{{ searched() }}</b></div>
              <span class="status">{{ r.status }}</span>
            </div>
            <div class="route"><b>{{ r.origin }}</b><app-icon name="arrow" /><b>{{ r.destination }}</b></div>
            @if (r.eta) { <p class="eta">Estimated delivery: <b>{{ r.eta }}</b></p> }
            <ol class="events">
              @for (e of r.events; track $index; let first = $first) {
                <li [class.now]="first"><time>{{ e.time }}</time><span>{{ e.text }}</span></li>
              }
            </ol>
          </div>
        }

        <p class="help">Can't find your shipment? Call <a [href]="tel">{{ phone }}</a> or <a routerLink="/contact">send us a message</a> — we'll get you a live update.</p>
      </div>
    </section>
  `,
  styles: [`
    .narrow { max-width: 760px; }
    .lookup label { display: block; font-weight: 700; color: var(--heading); margin-bottom: 8px; }
    .lookup__row { display: flex; gap: 10px; }
    .lookup input { flex: 1; min-width: 0; font: inherit; font-size: 17px; padding: 14px 16px; border: 1px solid var(--line); border-radius: min(var(--radius), 10px);
      background: var(--surface); color: var(--ink); text-transform: uppercase; }
    .lookup input:focus { outline: none; border-color: var(--accent); box-shadow: 0 0 0 3px var(--accent-soft); }
    .err { color: #d93636; font-weight: 600; font-size: 14px; }
    .result { margin-top: 32px; background: var(--surface); border: 1px solid var(--line); border-radius: var(--radius); padding: 28px; }
    .sample { margin: 0 0 18px; font-size: 13px; padding: 10px 12px; border-radius: 8px; background: var(--accent-soft); color: var(--ink); }
    .result__head { display: flex; justify-content: space-between; align-items: center; gap: 12px; }
    .result__head small { display: block; color: var(--muted); } .result__head b { font-size: 20px; color: var(--heading); }
    .status { background: #146c43; color: #fff; font-weight: 700; font-size: 13px; padding: 6px 12px; border-radius: 999px; }
    .route { display: flex; align-items: center; gap: 12px; margin: 22px 0 6px; font-size: 18px; color: var(--heading); flex-wrap: wrap; }
    .route app-icon { color: var(--accent); }
    .eta { color: var(--muted); margin: 0 0 20px; }
    .events { list-style: none; padding: 0; margin: 0; border-left: 2px solid var(--line); }
    .events li { position: relative; padding: 0 0 18px 24px; }
    .events li::before { content: ''; position: absolute; left: -7px; top: 5px; width: 12px; height: 12px; border-radius: 50%; background: var(--line); }
    .events li.now::before { background: var(--accent); box-shadow: 0 0 0 4px var(--accent-soft); }
    .events time { display: block; font-size: 13px; color: var(--muted); } .events span { color: var(--ink); font-weight: 600; }
    .help { margin-top: 32px; color: var(--muted); } .help a { color: var(--accent); font-weight: 700; }
  `],
})
export class TrackPage {
  private toast = inject(ToastService);
  ref = '';
  searched = signal('');
  loading = signal(false);
  bad = signal(false);
  result = signal<Tracking | null>(null);
  phone = BRAND.phones[0];
  tel = 'tel:' + BRAND.phones[0].replace(/\D/g, '');

  async lookup() {
    const ref = this.ref.trim().toUpperCase();
    this.bad.set(!/^[A-Z0-9-]{5,}$/.test(ref));
    if (this.bad()) return;
    this.loading.set(true);
    this.result.set(null);
    try {
      if (TRACKING_ENDPOINT) {
        const res = await fetch(`${TRACKING_ENDPOINT}?ref=${encodeURIComponent(ref)}`);
        if (res.status === 404) { this.toast.show(`No shipment found for ${ref}.`, 'error'); return; }
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        this.result.set(await res.json());
      } else {
        await new Promise(r => setTimeout(r, 700));
        this.result.set(this.sample());
      }
      this.searched.set(ref);
    } catch {
      this.toast.error('Tracking is unavailable right now. Please call us for an update.');
    } finally {
      this.loading.set(false);
    }
  }

  private sample(): Tracking {
    const d = (offset: number, time: string) => {
      const day = new Date(Date.now() + offset * 864e5).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
      return `${day}, ${time}`;
    };
    return {
      sample: true, status: 'In transit', origin: 'Newark, NJ', destination: 'Columbus, OH', eta: d(1, 'by 2:00 PM'),
      events: [
        { time: d(0, '9:40 AM'), text: 'In transit — passed Harrisburg, PA' },
        { time: d(0, '5:15 AM'), text: 'Departed pickup location' },
        { time: d(-1, '4:30 PM'), text: 'Picked up — Newark, NJ' },
        { time: d(-2, '11:05 AM'), text: 'Carrier assigned and dispatched' },
      ],
    };
  }
}

@Component({
  selector: 'app-documents-page',
  standalone: true,
  imports: [IconComponent, PageBannerComponent],
  template: `
    <app-page-banner title="Documents" />
    <section class="section">
      <div class="container">
        <p class="lead">Forms and paperwork for shippers and carriers. Click <b>Request</b> and we'll email the current version to you.</p>
        <div class="table" role="table" aria-label="Documents">
          <div class="tr th" role="row"><span role="columnheader">Document</span><span role="columnheader">For</span><span role="columnheader">Format</span><span></span></div>
          @for (d of docs; track d.name) {
            <div class="tr" role="row">
              <span role="cell" class="name"><app-icon name="boxes" [size]="18" /> {{ d.name }}</span>
              <span role="cell"><em>{{ d.audience }}</em></span>
              <span role="cell">{{ d.type }} · {{ d.size }}</span>
              <span role="cell"><a class="btn btn--outline sm" [href]="mail(d.name)">Request</a></span>
            </div>
          }
        </div>
      </div>
    </section>
  `,
  styles: [`
    .lead { color: var(--muted); font-size: 17px; margin: 0 0 28px; }
    .table { border: 1px solid var(--line); border-radius: var(--radius); overflow: hidden; background: var(--surface); }
    .tr { display: grid; grid-template-columns: 2fr 1fr 1fr auto; gap: 16px; align-items: center; padding: 14px 20px; border-top: 1px solid var(--line); }
    .th { border-top: 0; background: var(--mist); font-weight: 700; font-size: 13px; text-transform: uppercase; letter-spacing: 1px; color: var(--muted); }
    .name { display: flex; gap: 10px; align-items: center; font-weight: 700; color: var(--heading); } .name app-icon { color: var(--accent); }
    em { font-style: normal; font-size: 13px; padding: 4px 10px; border-radius: 999px; background: var(--accent-soft); color: var(--ink); }
    .sm { padding: 8px 16px; font-size: 13px; }
    @media (max-width: 700px) { .th { display: none; } .tr { grid-template-columns: 1fr auto; } .tr > span:nth-child(2), .tr > span:nth-child(3) { display: none; } }
  `],
})
export class DocumentsPage {
  docs = DOCUMENTS;
  mail = (name: string) => `mailto:${BRAND.emails[0]}?subject=${encodeURIComponent('Document request: ' + name)}`;
}

@Component({
  selector: 'app-legal-page',
  standalone: true,
  imports: [PageBannerComponent],
  template: `
    <app-page-banner [title]="kind() === 'terms' ? 'Terms & Conditions' : 'Privacy Policy'" />
    <section class="section">
      <div class="container layout">
        <nav class="toc" aria-label="On this page">
          <b>On this page</b>
          @for (s of doc().sections; track s.h; let i = $index) { <a [href]="'#s' + i" (click)="jump($event, i)">{{ s.h }}</a> }
        </nav>
        <div class="prose">
          <p><em>Last updated {{ doc().updated }}. This is template text — have it reviewed by counsel before publishing.</em></p>
          @for (s of doc().sections; track s.h; let i = $index) {
            <h2 [id]="'s' + i">{{ i + 1 }}. {{ s.h }}</h2>
            <p>{{ s.p }}</p>
          }
        </div>
      </div>
    </section>
  `,
  styles: [`
    .layout { display: grid; grid-template-columns: 240px 1fr; gap: 56px; align-items: start; }
    .toc { position: sticky; top: calc(var(--sw-h) + 110px); display: flex; flex-direction: column; gap: 4px; border-left: 2px solid var(--line); padding-left: 16px; }
    .toc b { color: var(--heading); margin-bottom: 6px; } .toc a { color: var(--muted); padding: 4px 0; font-size: 14px; } .toc a:hover { color: var(--accent); }
    @media (max-width: 900px) { .layout { grid-template-columns: 1fr; } .toc { position: static; } }
  `],
})
export class LegalPage {
  kind = input<'terms' | 'privacy'>('terms');
  doc = computed(() => LEGAL[this.kind()]);
  jump(ev: Event, i: number) { ev.preventDefault(); document.getElementById('s' + i)?.scrollIntoView({ behavior: 'smooth' }); }
}

@Component({
  selector: 'app-not-found-page',
  standalone: true,
  imports: [RouterLink],
  template: `
    <section class="nf">
      <div class="container">
        <p class="code">404</p>
        <h1>This load took a wrong turn.</h1>
        <p>The page you're looking for doesn't exist or has moved.</p>
        <div class="btns">
          <a class="btn btn--primary" routerLink="/">Back to home</a>
          <a class="btn btn--outline" routerLink="/contact">Contact us</a>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .nf { padding: 120px 0; text-align: center; }
    .code { font-family: var(--font-head); font-size: clamp(96px, 18vw, 180px); line-height: 1; margin: 0; color: var(--accent); font-weight: 800; }
    h1 { color: var(--heading); font-size: clamp(28px, 4vw, 42px); margin: 10px 0; }
    p { color: var(--muted); } .btns { display: flex; gap: 12px; justify-content: center; flex-wrap: wrap; margin-top: 28px; }
  `],
})
export class NotFoundPage {}
