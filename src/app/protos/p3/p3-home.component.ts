import { Component, ElementRef, ViewChild } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IconComponent } from '../../shared/icon.component';
import { ContactFormComponent } from '../../shared/contact-form.component';
import { CountUpDirective, RevealDirective } from '../../shared/reveal.directive';
import { ProtoHomeBase } from '../proto-base';

@Component({
  selector: 'app-p3-home',
  standalone: true,
  imports: [RouterLink, IconComponent, ContactFormComponent, RevealDirective, CountUpDirective],
  templateUrl: './p3-home.component.html',
  styleUrl: './p3-home.component.scss',
})
export class P3HomeComponent extends ProtoHomeBase {
  @ViewChild('rail') rail?: ElementRef<HTMLElement>;

  scrollRail(dir: 1 | -1) {
    const el = this.rail?.nativeElement;
    el?.scrollBy({ left: dir * el.clientWidth * 0.8, behavior: 'smooth' });
  }
}
