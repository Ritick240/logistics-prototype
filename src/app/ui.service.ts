import { Injectable, effect, inject, signal } from '@angular/core';
import { Router } from '@angular/router';

export type UiVariant = 'ref' | 'p1' | 'p2' | 'p3' | 'p4' | 'p5';

export const VARIANTS: { id: UiVariant; label: string; hint: string }[] = [
  { id: 'ref', label: 'Classic', hint: 'Corporate default' },
  { id: 'p1', label: 'Prototype 1', hint: 'Swiss Minimal' },
  { id: 'p2', label: 'Prototype 2', hint: 'Dark Bento' },
  { id: 'p3', label: 'Prototype 3', hint: 'Glass Gradient' },
  { id: 'p4', label: 'Prototype 4', hint: 'Modern Corporate' },
  { id: 'p5', label: 'Prototype 5', hint: 'Editorial Industrial' },
];

const KEY = 'ui-variant';
const isVariant = (v: unknown): v is UiVariant => VARIANTS.some(x => x.id === v);

// Holds the active design. Picks it up from ?ui=… first, then localStorage,
// and mirrors it onto <html data-ui="…"> so global theme tokens can switch.
@Injectable({ providedIn: 'root' })
export class UiService {
  private router = inject(Router);
  readonly variant = signal<UiVariant>(this.initial());

  constructor() {
    effect(() => {
      const v = this.variant();
      document.documentElement.dataset['ui'] = v;
      try { localStorage.setItem(KEY, v); } catch {}
    });
  }

  set(v: UiVariant) {
    if (v === this.variant()) return;
    this.variant.set(v);
    this.router.navigate([], { queryParams: { ui: v }, queryParamsHandling: 'merge', replaceUrl: true });
    window.scrollTo({ top: 0 });
  }

  private initial(): UiVariant {
    const fromUrl = new URLSearchParams(window.location.search).get('ui');
    if (isVariant(fromUrl)) return fromUrl;
    try {
      const saved = localStorage.getItem(KEY);
      if (isVariant(saved)) return saved;
    } catch {}
    return 'ref';
  }
}
