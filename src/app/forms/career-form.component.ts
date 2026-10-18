import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { IconComponent } from '../shared/icon.component';
import { FormBase } from './form-base';

const MAX_FILE = 10 * 1024 * 1024;
const ROLES = ['Freight Broker / Sales', 'Carrier Sales', 'Dispatcher / Operations', 'Accounting', 'Other'];

@Component({
  selector: 'app-career-form',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, RouterLink, IconComponent],
  template: `
    <div class="form-card">
      @if (done()) {
        <div class="form-done" role="status">
          <div class="tick"><app-icon name="check" [size]="30" /></div>
          <h3>Thanks for applying</h3>
          <p>We keep every application on file and will reach out when a matching role opens.</p>
        </div>
      } @else {
        <h3>General application</h3>
        <p class="form-lead">No open roles right now — send your details and we'll keep them on file.</p>
        <form [formGroup]="form" (ngSubmit)="submit()" novalidate>
          <input class="hp" tabindex="-1" autocomplete="off" aria-hidden="true" [(ngModel)]="honeypot" [ngModelOptions]="{ standalone: true }" />
          <div class="row2">
            <label class="field" [class.invalid]="show('name')">Full name <span class="req">*</span>
              <input formControlName="name" autocomplete="name" />
              @if (show('name')) { <span class="err">{{ error('name') }}</span> }
            </label>
            <label class="field" [class.invalid]="show('email')">Email <span class="req">*</span>
              <input type="email" formControlName="email" autocomplete="email" />
              @if (show('email')) { <span class="err">{{ error('email') }}</span> }
            </label>
          </div>
          <div class="row2">
            <label class="field">Phone
              <input type="tel" formControlName="phone" autocomplete="tel" />
            </label>
            <label class="field">Area of interest
              <select formControlName="role">@for (r of roles; track r) { <option>{{ r }}</option> }</select>
            </label>
          </div>
          <label class="field" [class.invalid]="show('linkedin')">LinkedIn profile
            <input type="url" formControlName="linkedin" placeholder="https://linkedin.com/in/…" />
            @if (show('linkedin')) { <span class="err">Please enter a full URL starting with https://</span> }
          </label>
          <label class="field" [class.invalid]="resumeErr">Résumé <span class="hint">(PDF or Word, max 10 MB)</span>
            <input type="file" accept=".pdf,.doc,.docx" (change)="pick($event)" />
            @if (resumeErr) { <span class="err">File must be under 10 MB.</span> }
          </label>
          <label class="field">Tell us about yourself
            <textarea rows="4" formControlName="message"></textarea>
          </label>
          <label class="consent">
            <input type="checkbox" formControlName="consent" />
            <span>I agree my details may be stored for recruitment purposes per the <a routerLink="/privacy-policy">privacy policy</a>. <span class="req">*</span></span>
          </label>
          @if (show('consent')) { <p class="field"><span class="err">Please accept to continue.</span></p> }
          <button class="btn btn--primary" type="submit" [disabled]="sending()" style="width: 100%">
            @if (sending()) { <span class="spinner"></span> Sending… } @else { Send Application }
          </button>
        </form>
      }
    </div>
  `,
  styles: [':host { display: block; }'],
})
export class CareerFormComponent extends FormBase {
  protected formName = 'career' as const;
  roles = ROLES;
  resume: File | null = null;
  resumeErr = false;

  form = this.fb.nonNullable.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    phone: [''],
    role: [ROLES[0]],
    linkedin: ['', Validators.pattern(/^https?:\/\/.+/)],
    message: [''],
    consent: [false, Validators.requiredTrue],
  });

  pick(ev: Event) {
    const file = (ev.target as HTMLInputElement).files?.[0] ?? null;
    this.resumeErr = !!file && file.size > MAX_FILE;
    this.resume = this.resumeErr ? null : file;
  }

  submit() { this.send(this.form.getRawValue(), { resume: this.resume }, 'Application sent — thank you!'); }
}
