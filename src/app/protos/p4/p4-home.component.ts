import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IconComponent } from '../../shared/icon.component';
import { ContactFormComponent } from '../../shared/contact-form.component';
import { CountUpDirective, RevealDirective } from '../../shared/reveal.directive';
import { ProtoHomeBase } from '../proto-base';

/** Prototype 4 — "Modern Corporate" home page. */
@Component({
  selector: 'app-p4-home',
  standalone: true,
  imports: [RouterLink, IconComponent, ContactFormComponent, RevealDirective, CountUpDirective],
  templateUrl: './p4-home.component.html',
  styleUrl: './p4-home.component.scss',
})
export class P4HomeComponent extends ProtoHomeBase {
  statIcons = ['star', 'boxes', 'truck', 'check'];
  hovered = -1;

  /** Three testimonials visible at a time on wide screens, starting at the current slide. */
  get visibleQuotes() {
    const n = this.testimonials.length;
    return [0, 1, 2].map(k => this.testimonials[(this.slide() + k) % n]);
  }
}
