import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IconComponent } from '../../shared/icon.component';
import { ContactFormComponent } from '../../shared/contact-form.component';
import { CountUpDirective, RevealDirective } from '../../shared/reveal.directive';
import { ProtoHomeBase } from '../proto-base';

@Component({
  selector: 'app-p2-home',
  standalone: true,
  imports: [RouterLink, IconComponent, ContactFormComponent, RevealDirective, CountUpDirective],
  templateUrl: './p2-home.component.html',
  styleUrl: './p2-home.component.scss',
})
export class P2HomeComponent extends ProtoHomeBase {
  protected override autoplayMs = 0;
  /** Testimonials split into three columns for the scrolling wall (duplicated for a seamless loop). */
  columns = [0, 1, 2].map(c => {
    const col = this.testimonials.filter((_, i) => i % 3 === c);
    return [...col, ...col];
  });
}
