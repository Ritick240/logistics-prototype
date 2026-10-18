import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IconComponent } from '../../shared/icon.component';
import { ContactFormComponent } from '../../shared/contact-form.component';
import { CountUpDirective, RevealDirective } from '../../shared/reveal.directive';
import { ProtoHomeBase } from '../proto-base';

@Component({
  selector: 'app-p5-home',
  standalone: true,
  imports: [RouterLink, IconComponent, ContactFormComponent, RevealDirective, CountUpDirective],
  templateUrl: './p5-home.component.html',
  styleUrl: './p5-home.component.scss',
})
export class P5HomeComponent extends ProtoHomeBase {
  roman = ['I', 'II', 'III', 'IV', 'V', 'VI'];
}
