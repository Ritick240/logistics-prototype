import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { IconComponent } from '../../shared/icon.component';
import { ContactFormComponent } from '../../shared/contact-form.component';
import { CountUpDirective, RevealDirective } from '../../shared/reveal.directive';
import { ProtoHomeBase } from '../../protos/proto-base';

/** "Classic" design home page. */
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, FormsModule, IconComponent, ContactFormComponent, CountUpDirective, RevealDirective],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent extends ProtoHomeBase {
  activeService = signal(0);
  quick = { origin: '', destination: '', mode: 'Full Truck Load' };

  constructor(private router: Router) { super(); }

  /** Hero quick-quote: hand the lane over to the full quote form. */
  startQuote() {
    this.router.navigate(['/request-a-quote'], { queryParams: { ...this.quick } });
  }

  get visibleQuotes() {
    const n = this.testimonials.length;
    return [this.testimonials[this.slide() % n], this.testimonials[(this.slide() + 1) % n]];
  }
}
