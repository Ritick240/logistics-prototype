import { Component, Input, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IconComponent } from './icon.component';

/** Accessible accordion list (one open at a time). */
@Component({
  selector: 'app-accordion',
  standalone: true,
  template: `
    @for (item of items; track item.q; let i = $index) {
      <div class="acc" [class.open]="open() === i">
        <h3>
          <button [id]="id + '-b' + i" [attr.aria-expanded]="open() === i" [attr.aria-controls]="id + '-p' + i"
                  (click)="open.set(open() === i ? -1 : i)">
            {{ item.q }} <span aria-hidden="true">{{ open() === i ? '−' : '+' }}</span>
          </button>
        </h3>
        <div class="acc__p" [id]="id + '-p' + i" role="region" [attr.aria-labelledby]="id + '-b' + i">
          <div><p>{{ item.a }}</p></div>
        </div>
      </div>
    }
  `,
  styles: [`
    .acc { border-bottom: 1px solid var(--line); }
    h3 { margin: 0; font-size: inherit; }
    button { width: 100%; display: flex; justify-content: space-between; align-items: center; gap: 16px; text-align: left; padding: 20px 0;
      font: inherit; font-size: 18px; font-weight: 700; color: var(--heading); background: none; border: 0; cursor: pointer; }
    button span { flex: none; width: 32px; height: 32px; display: grid; place-items: center; border-radius: 50%; background: var(--mist);
      color: var(--accent); font-size: 20px; }
    .open button span { background: var(--accent); color: var(--accent-ink); }
    .acc__p { display: grid; grid-template-rows: 0fr; transition: grid-template-rows .25s ease; }
    .acc__p > div { overflow: hidden; }
    .open .acc__p { grid-template-rows: 1fr; }
    p { margin: 0 0 20px; color: var(--muted); line-height: 1.75; max-width: 720px; }
  `],
})
export class AccordionComponent {
  @Input({ required: true }) items: { q: string; a: string }[] = [];
  @Input() id = 'acc';
  open = signal(0);
}

/** Closing call-to-action band used at the bottom of inner pages. */
@Component({
  selector: 'app-cta-band',
  standalone: true,
  imports: [RouterLink, IconComponent],
  template: `
    <section class="cta">
      <div class="container cta__in">
        <div>
          <h2>{{ title }}</h2>
          <p>{{ text }}</p>
        </div>
        <div class="cta__btns">
          <a class="btn btn--primary" routerLink="/request-a-quote">Request A Quote <app-icon name="arrow" [size]="16" /></a>
          <a class="btn btn--ghost" routerLink="/contact">Talk to us</a>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .cta { background: var(--primary); color: var(--primary-ink); padding: 64px 0; }
    .cta__in { display: flex; justify-content: space-between; align-items: center; gap: 28px; flex-wrap: wrap; }
    h2 { margin: 0 0 8px; font-size: clamp(26px, 3vw, 36px); }
    p { margin: 0; opacity: .8; max-width: 560px; line-height: 1.6; }
    .cta__btns { display: flex; gap: 12px; flex-wrap: wrap; }
  `],
})
export class CtaBandComponent {
  @Input() title = 'Ready to move your freight?';
  @Input() text = 'Get a competitive, all-in rate from a team that actually picks up the phone.';
}
