import { Injectable, inject } from '@angular/core';
import { FORM_ENDPOINT } from '../config';
import { ToastService } from './toast.service';

export type FormName = 'contact' | 'quote' | 'carrier' | 'career' | 'newsletter' | 'feedback';

/**
 * Sends every site form to one endpoint (see config.ts). Fields are flattened into
 * FormData so file uploads work; arrays become repeated fields.
 */
@Injectable({ providedIn: 'root' })
export class FormService {
  private toast = inject(ToastService);

  async submit(form: FormName, data: Record<string, unknown>, files: Record<string, File | null> = {}): Promise<boolean> {
    try {
      if (!FORM_ENDPOINT) {
        await new Promise(r => setTimeout(r, 900));
        console.info(`[demo] "${form}" form submitted`, data, files);
        return true;
      }

      const body = new FormData();
      body.append('form', form);
      for (const [key, value] of Object.entries(data)) {
        if (Array.isArray(value)) value.forEach(v => body.append(key, String(v)));
        else if (value !== null && value !== undefined && value !== '') body.append(key, String(value));
      }
      for (const [key, file] of Object.entries(files)) if (file) body.append(key, file, file.name);

      const res = await fetch(FORM_ENDPOINT, { method: 'POST', body, headers: { Accept: 'application/json' } });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return true;
    } catch (err) {
      console.error(`Form "${form}" failed`, err);
      this.toast.error('Sorry, something went wrong sending your message. Please try again or call us.');
      return false;
    }
  }
}
