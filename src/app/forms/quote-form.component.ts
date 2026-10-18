import { Component, inject, signal } from '@angular/core';
import { FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { EQUIPMENT } from '../site-data';
import { IconComponent } from '../shared/icon.component';
import { FormBase } from './form-base';

const STEPS = ['Shipment', 'Freight', 'Contact'] as const;
const MODES = ['Full Truck Load', 'Less than Truckload', 'Intermodal', 'Drayage', 'Not sure'];

@Component({
  selector: 'app-quote-form',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, RouterLink, IconComponent],
  template: `
    <div class="form-card">
      @if (done()) {
        <div class="form-done" role="status">
          <div class="tick"><app-icon name="check" [size]="30" /></div>
          <h3>Quote request received</h3>
          <p>We'll email your rate for {{ form.value.shipment?.origin }} → {{ form.value.shipment?.destination }} shortly —
            usually within the hour during business hours.</p>
          <button class="btn btn--outline" type="button" (click)="restart()">Request another quote</button>
        </div>
      } @else {
        <h3>Request a quote</h3>
        <p class="form-lead">Three quick steps. Fields marked <span class="req">*</span> are required.</p>

        <ol class="steps" aria-label="Progress">
          @for (s of steps; track s; let i = $index) {
            <li [class.on]="step() === i" [class.past]="step() > i" [attr.aria-current]="step() === i ? 'step' : null">
              <span>{{ step() > i ? '✓' : i + 1 }}</span> {{ s }}
            </li>
          }
        </ol>

        <form [formGroup]="form" (ngSubmit)="submit()" novalidate>
          <input class="hp" tabindex="-1" autocomplete="off" aria-hidden="true" [(ngModel)]="honeypot" [ngModelOptions]="{ standalone: true }" />

          @switch (step()) {
            @case (0) {
              <div formGroupName="shipment">
                <div class="row2">
                  <label class="field">Mode
                    <select formControlName="mode">@for (m of modes; track m) { <option>{{ m }}</option> }</select>
                  </label>
                  <label class="field">Equipment
                    <select formControlName="equipment">@for (e of equipment; track e) { <option>{{ e }}</option> }</select>
                  </label>
                </div>
                <div class="row2">
                  <label class="field" [class.invalid]="show('origin', g('shipment'))">Pickup city, state / ZIP <span class="req">*</span>
                    <input formControlName="origin" placeholder="e.g. Newark, NJ 07105" />
                    @if (show('origin', g('shipment'))) { <span class="err">{{ error('origin', g('shipment')) }}</span> }
                  </label>
                  <label class="field" [class.invalid]="show('destination', g('shipment'))">Delivery city, state / ZIP <span class="req">*</span>
                    <input formControlName="destination" placeholder="e.g. Columbus, OH 43215" />
                    @if (show('destination', g('shipment'))) { <span class="err">{{ error('destination', g('shipment')) }}</span> }
                  </label>
                </div>
                <div class="row2">
                  <label class="field" [class.invalid]="show('pickup', g('shipment'))">Pickup date <span class="req">*</span>
                    <input type="date" formControlName="pickup" [min]="today" />
                    @if (show('pickup', g('shipment'))) { <span class="err">{{ error('pickup', g('shipment')) }}</span> }
                  </label>
                  <label class="field">Delivery date <span class="hint">(if fixed)</span>
                    <input type="date" formControlName="delivery" [min]="today" />
                  </label>
                </div>
              </div>
            }
            @case (1) {
              <div formGroupName="freight">
                <label class="field" [class.invalid]="show('commodity', g('freight'))">Commodity <span class="req">*</span>
                  <input formControlName="commodity" placeholder="e.g. Packaged food, machinery parts" />
                  @if (show('commodity', g('freight'))) { <span class="err">{{ error('commodity', g('freight')) }}</span> }
                </label>
                <div class="row3">
                  <label class="field" [class.invalid]="show('weight', g('freight'))">Total weight (lb) <span class="req">*</span>
                    <input type="number" min="1" formControlName="weight" />
                    @if (show('weight', g('freight'))) { <span class="err">{{ error('weight', g('freight')) }}</span> }
                  </label>
                  <label class="field">Pallets / pieces
                    <input type="number" min="0" formControlName="pieces" />
                  </label>
                  <label class="field">Dimensions <span class="hint">(L×W×H in)</span>
                    <input formControlName="dims" placeholder="48×40×60" />
                  </label>
                </div>
                <label class="consent">
                  <input type="checkbox" formControlName="hazmat" />
                  <span>This shipment contains hazardous materials</span>
                </label>
                @if (form.value.freight?.hazmat) {
                  <div class="row2">
                    <label class="field" [class.invalid]="show('unNumber', g('freight'))">UN number <span class="req">*</span>
                      <input formControlName="unNumber" placeholder="UN1993" />
                      @if (show('unNumber', g('freight'))) { <span class="err">Enter a UN number like UN1993.</span> }
                    </label>
                    <label class="field">Hazard class
                      <input formControlName="hazClass" placeholder="3" />
                    </label>
                  </div>
                }
                <label class="field">Anything else we should know?
                  <textarea rows="3" formControlName="notes" placeholder="Liftgate, appointment, temperature range…"></textarea>
                </label>
              </div>
            }
            @case (2) {
              <div formGroupName="contact">
                <div class="row2">
                  <label class="field" [class.invalid]="show('name', g('contact'))">Full name <span class="req">*</span>
                    <input formControlName="name" autocomplete="name" />
                    @if (show('name', g('contact'))) { <span class="err">{{ error('name', g('contact')) }}</span> }
                  </label>
                  <label class="field">Company
                    <input formControlName="company" autocomplete="organization" />
                  </label>
                </div>
                <div class="row2">
                  <label class="field" [class.invalid]="show('email', g('contact'))">Email <span class="req">*</span>
                    <input type="email" formControlName="email" autocomplete="email" />
                    @if (show('email', g('contact'))) { <span class="err">{{ error('email', g('contact')) }}</span> }
                  </label>
                  <label class="field">Phone
                    <input type="tel" formControlName="phone" autocomplete="tel" />
                  </label>
                </div>
                <label class="consent">
                  <input type="checkbox" formControlName="consent" />
                  <span>I agree to be contacted about this quote and accept the <a routerLink="/privacy-policy">privacy policy</a>. <span class="req">*</span></span>
                </label>
                @if (show('consent', g('contact'))) { <p class="field"><span class="err">Please accept to continue.</span></p> }
              </div>
            }
          }

          <div class="nav">
            @if (step() > 0) { <button type="button" class="btn btn--outline" (click)="back()">← Back</button> }
            @if (step() < steps.length - 1) {
              <button type="button" class="btn btn--primary" (click)="nextStep()">Continue →</button>
            } @else {
              <button type="submit" class="btn btn--primary" [disabled]="sending()">
                @if (sending()) { <span class="spinner"></span> Sending… } @else { Get My Quote }
              </button>
            }
          </div>
        </form>
      }
    </div>
  `,
  styles: [`
    :host { display: block; }
    .steps { list-style: none; display: flex; gap: 8px; padding: 0; margin: 0 0 26px; counter-reset: s; }
    .steps li { flex: 1; display: flex; align-items: center; gap: 8px; font-size: 13px; font-weight: 700; color: var(--muted);
      padding-bottom: 10px; border-bottom: 3px solid var(--line); }
    .steps li span { width: 26px; height: 26px; border-radius: 50%; display: grid; place-items: center; font-size: 12px;
      background: var(--mist); border: 1px solid var(--line); flex: none; }
    .steps li.on, .steps li.past { color: var(--heading); border-color: var(--accent); }
    .steps li.on span, .steps li.past span { background: var(--accent); color: var(--accent-ink); border-color: var(--accent); }
    .nav { display: flex; justify-content: space-between; gap: 12px; margin-top: 6px; }
    .nav .btn--primary { margin-left: auto; }
    @media (max-width: 420px) { .steps li { font-size: 0; gap: 0; justify-content: center; } }
  `],
})
export class QuoteFormComponent extends FormBase {
  protected formName = 'quote' as const;
  steps = STEPS;
  modes = MODES;
  equipment = EQUIPMENT;
  step = signal(0);
  today = new Date().toISOString().slice(0, 10);

  form = this.fb.nonNullable.group({
    shipment: this.fb.nonNullable.group({
      mode: [MODES[0]],
      equipment: [EQUIPMENT[0]],
      origin: ['', Validators.required],
      destination: ['', Validators.required],
      pickup: ['', Validators.required],
      delivery: [''],
    }),
    freight: this.fb.nonNullable.group({
      commodity: ['', Validators.required],
      weight: [null as number | null, [Validators.required, Validators.min(1)]],
      pieces: [null as number | null],
      dims: [''],
      hazmat: [false],
      unNumber: [''],
      hazClass: [''],
      notes: [''],
    }),
    contact: this.fb.nonNullable.group({
      name: ['', Validators.required],
      company: [''],
      email: ['', [Validators.required, Validators.email]],
      phone: [''],
      consent: [false, Validators.requiredTrue],
    }),
  });

  private readonly groupKeys = ['shipment', 'freight', 'contact'] as const;

  constructor() {
    super();
    // Prefill from the home-page quick-quote widget (?origin=…&destination=…&mode=…)
    const q = inject(ActivatedRoute).snapshot.queryParamMap;
    const mode = q.get('mode');
    this.form.controls.shipment.patchValue({
      origin: q.get('origin') ?? '',
      destination: q.get('destination') ?? '',
      ...(mode && MODES.includes(mode) ? { mode } : {}),
    });
    // UN number only required when the hazmat box is ticked
    const freight = this.form.controls.freight.controls;
    freight.hazmat.valueChanges.subscribe(on => {
      freight.unNumber.setValidators(on ? [Validators.required, Validators.pattern(/^(UN|NA)\s?\d{4}$/i)] : []);
      freight.unNumber.updateValueAndValidity();
    });
  }

  g(name: (typeof this.groupKeys)[number]) { return this.form.controls[name]; }

  nextStep() {
    const group = this.g(this.groupKeys[this.step()]);
    if (group.invalid) {
      group.markAllAsTouched();
      this.toast.show('Please fill in the highlighted fields.', 'error');
      return;
    }
    this.step.update(s => s + 1);
  }

  back() { this.step.update(s => Math.max(0, s - 1)); }

  submit() {
    const v = this.form.getRawValue();
    this.send({ ...v.shipment, ...v.freight, ...v.contact }, {}, 'Quote request sent — we’ll be in touch soon.');
  }

  restart() { this.reset(); this.form.patchValue({ shipment: { mode: MODES[0], equipment: EQUIPMENT[0] } }); this.step.set(0); }
}
