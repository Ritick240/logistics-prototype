import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './layout/header.component';
import { FooterComponent } from './layout/footer.component';
import { DesignSwitcherComponent } from './layout/design-switcher.component';
import { CookieConsentComponent, FeedbackComponent, FloatingActionsComponent, ToastsComponent } from './shared/widgets.component';
import { P1ShellComponent } from './protos/p1/p1-shell.component';
import { P2ShellComponent } from './protos/p2/p2-shell.component';
import { P3ShellComponent } from './protos/p3/p3-shell.component';
import { P4ShellComponent } from './protos/p4/p4-shell.component';
import { P5ShellComponent } from './protos/p5/p5-shell.component';
import { SeoService } from './core/seo.service';
import { UiService } from './ui.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet, HeaderComponent, FooterComponent, DesignSwitcherComponent,
    FloatingActionsComponent, FeedbackComponent, CookieConsentComponent, ToastsComponent,
    P1ShellComponent, P2ShellComponent, P3ShellComponent, P4ShellComponent, P5ShellComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  ui = inject(UiService);

  constructor() {
    inject(SeoService).init();
  }
}
