import { Injectable, signal } from '@angular/core';

export interface Toast { id: number; kind: 'success' | 'error' | 'info'; text: string; }

@Injectable({ providedIn: 'root' })
export class ToastService {
  readonly toasts = signal<Toast[]>([]);
  private nextId = 1;

  show(text: string, kind: Toast['kind'] = 'info', ms = 5000) {
    const id = this.nextId++;
    // Replace an identical message rather than stacking duplicates
    this.toasts.update(list => [...list.filter(t => t.text !== text), { id, kind, text }]);
    setTimeout(() => this.dismiss(id), ms);
  }

  /** Success also clears any earlier error toasts, which no longer apply. */
  success(text: string) {
    this.toasts.update(list => list.filter(t => t.kind !== 'error'));
    this.show(text, 'success');
  }
  error(text: string) { this.show(text, 'error', 8000); }

  dismiss(id: number) { this.toasts.update(list => list.filter(t => t.id !== id)); }
}
