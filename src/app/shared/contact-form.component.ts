import { Component, Input } from '@angular/core';
import { FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { FormBase } from '../forms/form-base';
import { IconComponent } from './icon.component';

@Component({
  selector: 'app-contact-form',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, RouterLink, IconComponent],
  template: `
    <div class="form-card">
      @if (done()) {
        <div class="form-done" role="status">
          <div class="tick"><app-icon name="check" [size]="30" /></div>
          <h3>Message sent</h3>
          <p>Thanks for reaching out. A member of our team will reply within one business day.</p>
          <button class="btn btn--outline" type="button" (click)="reset()">Send another message</button>
        </div>
      } @else {
        <h3>{{ heading }}</h3>
        <p class="form-lead">Fields marked <span class="req">*</span> are required.</p>
        <form [formGroup]="form" (ngSubmit)="submit()" novalidate>
          <input class="hp" tabindex="-1" autocomplete="off" aria-hidden="true" [(ngModel)]="honeypot" [ngModelOptions]="{ standalone: true }" />
          <div class="row2">
            <label class="field" [class.invalid]="show('first')">First name <span class="req">*</span>
              <input formControlName="first" autocomplete="given-name" />
              @if (show('first')) { <span class="err">{{ error('first') }}</span> }
            </label>
            <label class="field" [class.invalid]="show('last')">Last name <span class="req">*</span>
              <input formControlName="last" autocomplete="family-name" />
              @if (show('last')) { <span class="err">{{ error('last') }}</span> }
            </label>
          </div>
          <div class="row2">
            <label class="field" [class.invalid]="show('email')">Email <span class="req">*</span>
              <input type="email" formControlName="email" autocomplete="email" />
              @if (show('email')) { <span class="err">{{ error('email') }}</span> }
            </label>
            <label class="field">Phone
              <input type="tel" formControlName="phone" autocomplete="tel" />
            </label>
          </div>
          <div class="row2">
            <label class="field">Company
              <input formControlName="company" autocomplete="organization" />
            </label>
            <label class="field">Country
              <select formControlName="country">
                <option>United States</option>
                <option>Canada</option>
              </select>
            </label>
          </div>
          <label class="field" [class.invalid]="show('message')">How can we help? <span class="req">*</span>
            <textarea rows="5" formControlName="message"></textarea>
            @if (show('message')) { <span class="err">{{ error('message') }}</span> }
          </label>
          <label class="consent">
            <input type="checkbox" formControlName="consent" />
            <span>I agree to be contacted about my enquiry and accept the <a routerLink="/privacy-policy">privacy policy</a>. <span class="req">*</span></span>
          </label>
          @if (show('consent')) { <p class="field"><span class="err">Please accept to continue.</span></p> }
          <button class="btn btn--primary" type="submit" [disabled]="sending()" style="width: 100%">
            @if (sending()) { <span class="spinner"></span> Sending… } @else { Send Message }
          </button>
        </form>
      }
    </div>
  `,
  styles: [':host { display: block; }'],
})
export class ContactFormComponent extends FormBase {
  @Input() heading = 'Send us a message';
  protected formName = 'contact' as const;

  form = this.fb.nonNullable.group({
    first: ['', Validators.required],
    last: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    phone: [''],
    company: [''],
    country: ['United States'],
    message: ['', Validators.required],
    consent: [false, Validators.requiredTrue],
  });

  submit() { this.send(this.form.getRawValue()); }
}
