import { Component, inject } from '@angular/core';
import { UiService, VARIANTS } from '../ui.service';

@Component({
  selector: 'app-design-switcher',
  standalone: true,
  template: `
    <div class="sw" role="toolbar" aria-label="Choose a design">
      <span class="sw__label">Design</span>
      <div class="sw__list">
        @for (v of variants; track v.id) {
          <button [class.on]="ui.variant() === v.id" [attr.aria-pressed]="ui.variant() === v.id"
                  [title]="v.hint" (click)="ui.set(v.id)">
            {{ v.label }} <small>{{ v.hint }}</small>
          </button>
        }
      </div>
    </div>
  `,
  styles: [`
    :host { position: fixed; inset: 0 0 auto 0; z-index: 1000; }
    .sw {
      height: var(--sw-h); display: flex; align-items: center; gap: 12px; padding: 0 12px;
      background: #111318; color: #e8eaf0; border-bottom: 1px solid #2a2e38;
      font: 600 13px/1 system-ui, -apple-system, 'Segoe UI', sans-serif;
    }
    .sw__label { text-transform: uppercase; letter-spacing: 1.5px; font-size: 11px; color: #8a91a2; flex: none; }
    .sw__list { display: flex; gap: 6px; overflow-x: auto; scrollbar-width: none; }
    .sw__list::-webkit-scrollbar { display: none; }
    button {
      flex: none; display: flex; align-items: center; gap: 6px; height: 30px; padding: 0 12px;
      border-radius: 6px; border: 1px solid #2f3440; background: #1a1d24; color: inherit;
      font: inherit; cursor: pointer; transition: background .15s, border-color .15s;
    }
    button:hover { border-color: #4b5262; }
    button.on { background: #fff; color: #111318; border-color: #fff; }
    small { font-weight: 400; opacity: .6; font-size: 12px; }
    @media (max-width: 900px) { small { display: none; } }
  `],
})
export class DesignSwitcherComponent {
  ui = inject(UiService);
  variants = VARIANTS;
}
