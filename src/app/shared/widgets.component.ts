import { Component, HostListener, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ToastService } from '../core/toast.service';
import { FormService } from '../core/form.service';
import { BRAND } from '../site-data';
import { IconComponent } from './icon.component';

// Small site-wide pieces that sit on top of every design.

/** Stack of toast messages (bottom-centre), announced to screen readers. */
@Component({
  selector: 'app-toasts',
  standalone: true,
  template: `
    <div class="toasts" aria-live="polite" aria-atomic="false">
      @for (t of toast.toasts(); track t.id) {
        <div class="toast" [class]="'toast toast--' + t.kind" role="status">
          <span>{{ t.text }}</span>
          <button (click)="toast.dismiss(t.id)" aria-label="Dismiss">×</button>
        </div>
      }
    </div>
  `,
  styles: [`
    .toasts { position: fixed; left: 50%; bottom: 24px; transform: translateX(-50%); z-index: 1100; display: flex; flex-direction: column;
      gap: 8px; width: min(440px, calc(100vw - 32px)); }
    .toast { display: flex; align-items: center; gap: 12px; padding: 14px 16px; border-radius: 10px; background: #15202e; color: #fff;
      box-shadow: 0 12px 30px rgba(0,0,0,.25); font: 600 14px/1.4 system-ui, sans-serif; animation: in .25s ease; }
    .toast--success { background: #146c43; } .toast--error { background: #b02a37; }
    .toast span { flex: 1; }
    .toast button { background: none; border: 0; color: inherit; font-size: 20px; cursor: pointer; line-height: 1; opacity: .8; }
    @keyframes in { from { opacity: 0; transform: translateY(10px); } }
  `],
})
export class ToastsComponent { toast = inject(ToastService); }

/** Floating "Call now" + back-to-top buttons. */
@Component({
  selector: 'app-floating-actions',
  standalone: true,
  imports: [IconComponent],
  template: `
    @if (scrolled()) {
      <button class="fab fab--top" (click)="top()" aria-label="Back to top"><app-icon name="chevron" [size]="20" /></button>
    }
    <a class="fab fab--call" [href]="tel" [attr.aria-label]="'Call ' + phone"><app-icon name="phone" [size]="20" /><span>Call Now</span></a>
  `,
  styles: [`
    :host { position: fixed; right: 20px; bottom: 20px; z-index: 40; display: flex; flex-direction: column; align-items: flex-end; gap: 10px; }
    .fab { display: flex; align-items: center; justify-content: center; gap: 8px; border: 0; cursor: pointer; font: 700 14px system-ui, sans-serif;
      box-shadow: 0 10px 24px rgba(0,0,0,.25); transition: transform .2s; }
    .fab:hover { transform: translateY(-2px); }
    .fab--top { width: 44px; height: 44px; border-radius: 50%; background: var(--surface); color: var(--heading); border: 1px solid var(--line); }
    .fab--top app-icon { transform: rotate(180deg); }
    .fab--call { padding: 14px 20px; border-radius: 40px; background: var(--accent); color: var(--accent-ink); }
    @media (max-width: 560px) { .fab--call span { display: none; } .fab--call { width: 52px; height: 52px; padding: 0; } }
  `],
})
export class FloatingActionsComponent {
  phone = BRAND.phones[0];
  tel = 'tel:' + BRAND.phones[0].replace(/\D/g, '');
  scrolled = signal(false);
  @HostListener('window:scroll') onScroll() { this.scrolled.set(window.scrollY > 800); }
  top() { window.scrollTo({ top: 0, behavior: 'smooth' }); }
}

/** "How did we do?" tab that opens a short rating survey. */
@Component({
  selector: 'app-feedback',
  standalone: true,
  imports: [FormsModule],
  template: `
    <button class="tab" (click)="open.set(true)" [attr.aria-expanded]="open()">How did we do?</button>
    @if (open()) {
      <div class="backdrop" (click)="close()"></div>
      <div class="panel" role="dialog" aria-modal="true" aria-labelledby="fb-title">
        <button class="x" (click)="close()" aria-label="Close">×</button>
        @if (sent()) {
          <h3 id="fb-title">Thank you!</h3>
          <p>Your feedback goes straight to our operations manager.</p>
          <button class="btn btn--primary" (click)="close()">Close</button>
        } @else {
          <h3 id="fb-title">How did we do?</h3>
          <p>Takes 20 seconds. All questions are optional.</p>
          @for (q of questions; track q.key) {
            <fieldset>
              <legend>{{ q.label }}</legend>
              <div class="scale">
                @for (n of [1, 2, 3, 4, 5]; track n) {
                  <label [class.on]="answers[q.key] === n">
                    <input type="radio" [name]="q.key" [value]="n" [(ngModel)]="answers[q.key]" /> {{ n }}
                  </label>
                }
              </div>
            </fieldset>
          }
          <label class="field">Anything we could do better?
            <textarea rows="3" [(ngModel)]="comment"></textarea>
          </label>
          <button class="btn btn--primary" [disabled]="sending()" (click)="submit()" style="width: 100%">
            {{ sending() ? 'Sending…' : 'Send feedback' }}
          </button>
        }
      </div>
    }
  `,
  styles: [`
    .tab { position: fixed; right: 0; top: 50%; z-index: 39; transform: translateY(-50%) rotate(-90deg); transform-origin: right bottom;
      translate: 0 -100%; background: var(--primary); color: var(--primary-ink); border: 0; padding: 10px 16px; border-radius: 8px 8px 0 0;
      font: 700 13px system-ui, sans-serif; cursor: pointer; box-shadow: 0 -4px 14px rgba(0,0,0,.15); }
    .backdrop { position: fixed; inset: 0; background: rgba(0,0,0,.45); z-index: 1001; }
    .panel { position: fixed; z-index: 1002; right: 20px; top: 50%; transform: translateY(-50%); width: min(400px, calc(100vw - 32px));
      max-height: calc(100vh - 80px); overflow: auto; background: var(--surface); color: var(--ink); border-radius: var(--radius);
      border: 1px solid var(--line); padding: 26px; box-shadow: 0 30px 60px rgba(0,0,0,.3); }
    h3 { margin: 0 0 4px; color: var(--heading); } p { color: var(--muted); margin: 0 0 16px; font-size: 14px; }
    .x { position: absolute; right: 12px; top: 8px; background: none; border: 0; font-size: 26px; cursor: pointer; color: var(--muted); }
    fieldset { border: 0; padding: 0; margin: 0 0 14px; }
    legend { font-weight: 700; font-size: 14px; color: var(--heading); margin-bottom: 8px; }
    .scale { display: flex; gap: 6px; }
    .scale label { flex: 1; text-align: center; padding: 8px 0; border: 1px solid var(--line); border-radius: 8px; cursor: pointer;
      font-weight: 700; background: var(--mist); }
    .scale label.on { background: var(--accent); color: var(--accent-ink); border-color: var(--accent); }
    .scale input { position: absolute; opacity: 0; pointer-events: none; }
    .scale label:has(input:focus-visible) { outline: 3px solid var(--accent); outline-offset: 2px; }
    @media (max-width: 560px) { .tab { display: none; } }
  `],
})
export class FeedbackComponent {
  private forms = inject(FormService);
  open = signal(false);
  sent = signal(false);
  sending = signal(false);
  questions = [
    { key: 'satisfaction', label: 'Overall satisfaction' },
    { key: 'responsiveness', label: 'Responsiveness of our team' },
    { key: 'agent', label: 'Your agent / account rep' },
  ];
  answers: Record<string, number | undefined> = {};
  comment = '';

  @HostListener('document:keydown.escape') close() { this.open.set(false); }

  /** Lets any link open the survey: window.dispatchEvent(new Event('open-feedback')). */
  @HostListener('window:open-feedback') show() { this.sent.set(false); this.open.set(true); }

  async submit() {
    this.sending.set(true);
    const ok = await this.forms.submit('feedback', { ...this.answers, comment: this.comment });
    this.sending.set(false);
    if (ok) { this.sent.set(true); this.answers = {}; this.comment = ''; }
  }
}

const CONSENT_KEY = 'cookie-consent-v2';
type Consent = { functional: true; preferences: boolean; statistics: boolean; marketing: boolean };

/** Cookie banner with per-category choices (mirrors the original site's categories). */
@Component({
  selector: 'app-cookie-consent',
  standalone: true,
  imports: [FormsModule, RouterLink],
  template: `
    @if (visible()) {
      <div class="cc" role="dialog" aria-label="Cookie preferences">
        <h4>We value your privacy</h4>
        <p>We use cookies to run this site and, with your permission, to understand how it's used.
          See our <a routerLink="/privacy-policy">privacy policy</a>.</p>
        @if (details()) {
          <ul>
            <li><label><input type="checkbox" checked disabled /> <b>Functional</b> <span>Always on — needed for the site to work.</span></label></li>
            <li><label><input type="checkbox" [(ngModel)]="choice.preferences" /> <b>Preferences</b> <span>Remember settings like your chosen design.</span></label></li>
            <li><label><input type="checkbox" [(ngModel)]="choice.statistics" /> <b>Statistics</b> <span>Anonymous usage analytics.</span></label></li>
            <li><label><input type="checkbox" [(ngModel)]="choice.marketing" /> <b>Marketing</b> <span>Measure ads and campaigns.</span></label></li>
          </ul>
        }
        <div class="cc__btns">
          @if (details()) {
            <button class="btn btn--outline" (click)="save(choice)">Save choices</button>
          } @else {
            <button class="btn btn--outline" (click)="details.set(true)">Customise</button>
            <button class="btn btn--outline" (click)="save(none)">Reject optional</button>
          }
          <button class="btn btn--primary" (click)="save(all)">Accept all</button>
        </div>
      </div>
    }
  `,
  styles: [`
    .cc { position: fixed; left: 20px; bottom: 20px; z-index: 1050; width: min(440px, calc(100vw - 32px)); background: var(--surface); color: var(--ink);
      border: 1px solid var(--line); border-radius: var(--radius); padding: 22px; box-shadow: 0 18px 44px rgba(0,0,0,.25); }
    h4 { margin: 0 0 6px; color: var(--heading); font-size: 17px; }
    p { margin: 0 0 14px; font-size: 14px; line-height: 1.6; color: var(--muted); }
    a { color: var(--accent); text-decoration: underline; }
    ul { list-style: none; margin: 0 0 14px; padding: 0; }
    li { padding: 8px 0; border-top: 1px solid var(--line); font-size: 14px; }
    li label { display: grid; grid-template-columns: auto auto 1fr; gap: 4px 10px; align-items: center; cursor: pointer; }
    li span { grid-column: 2 / 4; color: var(--muted); font-size: 12px; }
    input { accent-color: var(--accent); }
    .cc__btns { display: flex; gap: 8px; flex-wrap: wrap; }
    .cc__btns .btn { flex: 1; padding: 10px 12px; font-size: 13px; white-space: nowrap; }
    @media (max-width: 560px) { .cc { left: 16px; bottom: 84px; } }
  `],
})
export class CookieConsentComponent {
  readonly all: Consent = { functional: true, preferences: true, statistics: true, marketing: true };
  readonly none: Consent = { functional: true, preferences: false, statistics: false, marketing: false };
  choice: Consent = { ...this.none };
  visible = signal(this.read() === null);
  details = signal(false);

  save(c: Consent) {
    try { localStorage.setItem(CONSENT_KEY, JSON.stringify(c)); } catch {}
    // Hook analytics/marketing scripts here based on c.statistics / c.marketing.
    this.visible.set(false);
  }

  private read(): Consent | null {
    try { return JSON.parse(localStorage.getItem(CONSENT_KEY) ?? 'null'); } catch { return null; }
  }
}

/** Inline newsletter signup used in footers. */
@Component({
  selector: 'app-newsletter',
  standalone: true,
  imports: [FormsModule],
  template: `
    @if (done()) {
      <p class="nl__ok">✓ You're subscribed. Watch your inbox for freight market updates.</p>
    } @else {
      <form class="nl" (ngSubmit)="submit()">
        <label class="sr" for="nl-email">Email address</label>
        <input id="nl-email" type="email" name="email" [(ngModel)]="email" placeholder="Your email" required autocomplete="email" />
        <button type="submit" [disabled]="sending()">{{ sending() ? '…' : 'Subscribe' }}</button>
      </form>
      @if (bad()) { <p class="nl__err">Please enter a valid email.</p> }
    }
  `,
  styles: [`
    .nl { display: flex; gap: 6px; max-width: 360px; }
    input { flex: 1; min-width: 0; padding: 11px 12px; border-radius: 8px; border: 1px solid rgba(127,127,127,.4); background: rgba(255,255,255,.08);
      color: inherit; font: inherit; font-size: 14px; }
    button { padding: 0 16px; border-radius: 8px; border: 0; background: var(--accent); color: var(--accent-ink); font: 700 14px system-ui, sans-serif; cursor: pointer; }
    .nl__ok { font-size: 14px; } .nl__err { font-size: 12px; color: #ff8a8a; margin: 6px 0 0; }
    .sr { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0 0 0 0); }
  `],
})
export class NewsletterComponent {
  private forms = inject(FormService);
  email = '';
  done = signal(false);
  sending = signal(false);
  bad = signal(false);

  async submit() {
    this.bad.set(!/^\S+@\S+\.\S+$/.test(this.email));
    if (this.bad()) return;
    this.sending.set(true);
    const ok = await this.forms.submit('newsletter', { email: this.email });
    this.sending.set(false);
    if (ok) this.done.set(true);
  }
}
