import { Component } from '@angular/core';
import { FormArray, FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { EQUIPMENT } from '../site-data';
import { IconComponent } from '../shared/icon.component';
import { FormBase } from './form-base';

const MAX_FILE = 10 * 1024 * 1024;

@Component({
  selector: 'app-carrier-form',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, RouterLink, IconComponent],
  template: `
    <div class="form-card">
      @if (done()) {
        <div class="form-done" role="status">
          <div class="tick"><app-icon name="check" [size]="30" /></div>
          <h3>Application received</h3>
          <p>Our carrier team will verify your authority and insurance and email your setup packet within one business day.</p>
          <button class="btn btn--outline" type="button" (click)="reset(); files = {}">Submit another carrier</button>
        </div>
      } @else {
        <h3>Carrier sign-up</h3>
        <p class="form-lead">Tell us about your company. You can upload documents now or send them later.</p>
        <form [formGroup]="form" (ngSubmit)="submit()" novalidate>
          <input class="hp" tabindex="-1" autocomplete="off" aria-hidden="true" [(ngModel)]="honeypot" [ngModelOptions]="{ standalone: true }" />
          <label class="field" [class.invalid]="show('company')">Legal company name <span class="req">*</span>
            <input formControlName="company" autocomplete="organization" />
            @if (show('company')) { <span class="err">{{ error('company') }}</span> }
          </label>
          <div class="row3">
            <label class="field" [class.invalid]="show('mc')">MC number <span class="req">*</span>
              <input formControlName="mc" placeholder="MC123456" inputmode="numeric" />
              @if (show('mc')) { <span class="err">Enter a valid MC number.</span> }
            </label>
            <label class="field" [class.invalid]="show('dot')">USDOT number <span class="req">*</span>
              <input formControlName="dot" placeholder="1234567" inputmode="numeric" />
              @if (show('dot')) { <span class="err">Enter a valid USDOT number.</span> }
            </label>
            <label class="field">Power units
              <input type="number" min="1" formControlName="trucks" />
            </label>
          </div>
          <div class="row3">
            <label class="field" [class.invalid]="show('contact')">Contact name <span class="req">*</span>
              <input formControlName="contact" autocomplete="name" />
              @if (show('contact')) { <span class="err">{{ error('contact') }}</span> }
            </label>
            <label class="field" [class.invalid]="show('email')">Email <span class="req">*</span>
              <input type="email" formControlName="email" autocomplete="email" />
              @if (show('email')) { <span class="err">{{ error('email') }}</span> }
            </label>
            <label class="field" [class.invalid]="show('phone')">Phone <span class="req">*</span>
              <input type="tel" formControlName="phone" autocomplete="tel" />
              @if (show('phone')) { <span class="err">{{ error('phone') }}</span> }
            </label>
          </div>
          <fieldset class="field fs" [class.invalid]="show('equipment')">
            <legend>Equipment <span class="req">*</span></legend>
            <div class="checks-grid">
              @for (e of equipment; track e; let i = $index) {
                <label class="check-pill"><input type="checkbox" [formControl]="equipmentCtrls[i]" /> {{ e }}</label>
              }
            </div>
            @if (show('equipment')) { <span class="err">Pick at least one equipment type.</span> }
          </fieldset>
          <label class="field">Preferred lanes / regions
            <textarea rows="3" formControlName="lanes" placeholder="e.g. Northeast ↔ Midwest, NJ ports"></textarea>
          </label>
          <div class="row2">
            <label class="field" [class.invalid]="fileErr.coi">Certificate of insurance <span class="hint">(PDF/JPG, max 10 MB)</span>
              <input type="file" accept=".pdf,.jpg,.jpeg,.png" (change)="pick('coi', $event)" />
              @if (fileErr.coi) { <span class="err">File must be under 10 MB.</span> }
            </label>
            <label class="field" [class.invalid]="fileErr.w9">W-9 <span class="hint">(PDF/JPG, max 10 MB)</span>
              <input type="file" accept=".pdf,.jpg,.jpeg,.png" (change)="pick('w9', $event)" />
              @if (fileErr.w9) { <span class="err">File must be under 10 MB.</span> }
            </label>
          </div>
          <label class="consent">
            <input type="checkbox" formControlName="consent" />
            <span>I confirm the details are accurate and agree to the <a routerLink="/terms">terms</a> and <a routerLink="/privacy-policy">privacy policy</a>. <span class="req">*</span></span>
          </label>
          @if (show('consent')) { <p class="field"><span class="err">Please confirm to continue.</span></p> }
          <button class="btn btn--primary" type="submit" [disabled]="sending()" style="width: 100%">
            @if (sending()) { <span class="spinner"></span> Submitting… } @else { Submit Application }
          </button>
        </form>
      }
    </div>
  `,
  styles: [`
    :host { display: block; }
    .fs { border: 0; padding: 0; margin: 0 0 16px; min-width: 0; }
    .fs legend { padding: 0; margin-bottom: 8px; }
  `],
})
export class CarrierFormComponent extends FormBase {
  protected formName = 'carrier' as const;
  equipment = EQUIPMENT;
  equipmentCtrls = EQUIPMENT.map(() => new FormControl(false, { nonNullable: true }));
  files: Record<string, File | null> = {};
  fileErr = { coi: false, w9: false };

  form = this.fb.nonNullable.group({
    company: ['', Validators.required],
    mc: ['', [Validators.required, Validators.pattern(/^(MC-?)?\d{5,8}$/i)]],
    dot: ['', [Validators.required, Validators.pattern(/^\d{5,8}$/)]],
    trucks: [null as number | null],
    contact: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', Validators.required],
    equipment: new FormArray(this.equipmentCtrls, c => (c as FormArray).value.some(Boolean) ? null : { required: true }),
    lanes: [''],
    consent: [false, Validators.requiredTrue],
  });

  pick(key: 'coi' | 'w9', ev: Event) {
    const file = (ev.target as HTMLInputElement).files?.[0] ?? null;
    this.fileErr[key] = !!file && file.size > MAX_FILE;
    this.files[key] = this.fileErr[key] ? null : file;
  }

  submit() {
    const v = this.form.getRawValue();
    const equipment = EQUIPMENT.filter((_, i) => v.equipment[i]);
    this.send({ ...v, equipment }, this.files, 'Application received — welcome aboard!');
  }
}
