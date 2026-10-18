import { Directive, inject, signal } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import { FormName, FormService } from '../core/form.service';
import { ToastService } from '../core/toast.service';

/** Shared state for site forms: submitting, done, per-field error display and the spam honeypot. */
@Directive()
export abstract class FormBase {
  protected fb = inject(FormBuilder);
  protected forms = inject(FormService);
  protected toast = inject(ToastService);

  abstract form: FormGroup;
  protected abstract formName: FormName;

  sending = signal(false);
  done = signal(false);
  protected attempted = signal(false);
  /** Bots fill every field; humans never see this one. */
  honeypot = '';

  show(name: string, group: AbstractControl = this.form): boolean {
    const c = group.get(name);
    return !!c && c.invalid && (c.touched || this.attempted());
  }

  error(name: string, group: AbstractControl = this.form): string {
    const e = group.get(name)?.errors ?? {};
    if (e['required'] || e['requiredTrue']) return 'This field is required.';
    if (e['email']) return 'Please enter a valid email address.';
    if (e['pattern']) return 'Please check the format.';
    if (e['min']) return `Must be at least ${e['min'].min}.`;
    if (e['maxSize']) return 'File must be under 10 MB.';
    return 'Please check this field.';
  }

  protected async send(data: Record<string, unknown>, files: Record<string, File | null> = {}, successMsg = 'Thanks! We’ll be in touch shortly.') {
    this.attempted.set(true);
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.toast.show('Please fix the highlighted fields.', 'error');
      return;
    }
    if (this.honeypot) { this.done.set(true); return; }
    this.sending.set(true);
    const ok = await this.forms.submit(this.formName, data, files);
    this.sending.set(false);
    if (ok) {
      this.done.set(true);
      this.toast.success(successMsg);
    }
  }

  reset() {
    this.form.reset();
    this.attempted.set(false);
    this.done.set(false);
  }
}
