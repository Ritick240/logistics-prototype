import { Component, inject } from '@angular/core';
import { UiService } from '../ui.service';
import { HomeComponent } from './home/home.component';
import { P1HomeComponent } from '../protos/p1/p1-home.component';
import { P2HomeComponent } from '../protos/p2/p2-home.component';
import { P3HomeComponent } from '../protos/p3/p3-home.component';
import { P4HomeComponent } from '../protos/p4/p4-home.component';
import { P5HomeComponent } from '../protos/p5/p5-home.component';

/** The "/" route: renders the home page for whichever design is active. */
@Component({
  selector: 'app-home-switch',
  standalone: true,
  imports: [HomeComponent, P1HomeComponent, P2HomeComponent, P3HomeComponent, P4HomeComponent, P5HomeComponent],
  template: `
    @switch (ui.variant()) {
      @case ('p1') { <app-p1-home /> }
      @case ('p2') { <app-p2-home /> }
      @case ('p3') { <app-p3-home /> }
      @case ('p4') { <app-p4-home /> }
      @case ('p5') { <app-p5-home /> }
      @default { <app-home /> }
    }
  `,
})
export class HomeSwitchComponent {
  ui = inject(UiService);
}
