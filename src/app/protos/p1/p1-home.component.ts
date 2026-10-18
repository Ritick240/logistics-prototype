import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IconComponent } from '../../shared/icon.component';
import { ContactFormComponent } from '../../shared/contact-form.component';
import { CountUpDirective, RevealDirective } from '../../shared/reveal.directive';
import { ProtoHomeBase } from '../proto-base';

@Component({
  selector: 'app-p1-home',
  standalone: true,
  imports: [RouterLink, IconComponent, ContactFormComponent, RevealDirective, CountUpDirective],
  templateUrl: './p1-home.component.html',
  styleUrl: './p1-home.component.scss',
})
export class P1HomeComponent extends ProtoHomeBase {
  protected override autoplayMs = 0;
}
