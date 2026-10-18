import { Component, HostListener, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { BRAND, NAV } from '../site-data';
import { IconComponent } from '../shared/icon.component';

/** Header for the "Classic" design. */
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, IconComponent],
  template: `
    <header class="header" [class.header--scrolled]="scrolled()">
      <div class="container header__inner">
        <a routerLink="/" class="logo" (click)="close()" [attr.aria-label]="brand.name + ' home'">
          <svg class="logo__mark" viewBox="0 0 40 40" aria-hidden="true">
            <rect width="40" height="40" rx="10" fill="currentColor" />
            <path d="M9 13h13v11H9z M22 17h5l4 4.5V24h-9z" fill="none" stroke="#fff" stroke-width="2.2" stroke-linejoin="round" />
            <circle cx="13.5" cy="26" r="2.2" fill="#fff" /><circle cx="26.5" cy="26" r="2.2" fill="#fff" />
            <rect x="7" y="31" width="26" height="2.4" rx="1.2" fill="var(--accent)" />
          </svg>
          <span class="logo__text">{{ brand.name }}</span>
        </a>

        <button class="burger" (click)="open.set(!open())" [attr.aria-expanded]="open()" aria-label="Toggle menu">
          <app-icon [name]="open() ? 'close' : 'menu'" />
        </button>

        <nav class="nav" [class.nav--open]="open()" aria-label="Main">
          @for (item of nav; track item.label) {
            <div class="nav__item" [class.nav__item--expanded]="expanded() === item.label">
              @if (item.children) {
                <button class="nav__link" (click)="toggle(item.label)" [attr.aria-expanded]="expanded() === item.label">
                  {{ item.label }} <app-icon name="chevron" [size]="14" />
                </button>
                <div class="dropdown">
                  @for (c of item.children; track c.label) {
                    <a [routerLink]="c.link" [fragment]="c.fragment" (click)="close()">{{ c.label }}</a>
                  }
                </div>
              } @else {
                <a class="nav__link" [routerLink]="item.link" routerLinkActive="is-active"
                   [routerLinkActiveOptions]="{ exact: true }" (click)="close()">{{ item.label }}</a>
              }
            </div>
          }
          <div class="nav__actions">
            <a class="util" routerLink="/track" (click)="close()"><app-icon name="pin" [size]="16" /> Track</a>
            <a class="util util--phone" [href]="tel"><app-icon name="phone" [size]="16" /> {{ brand.phones[0] }}</a>
            <a class="btn btn--primary nav__cta" routerLink="/request-a-quote" (click)="close()">Get a Quote</a>
          </div>
        </nav>
      </div>
    </header>
  `,
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  brand = BRAND;
  nav = NAV;
  tel = 'tel:' + BRAND.phones[0].replace(/\D/g, '');
  open = signal(false);
  expanded = signal<string | null>(null);
  scrolled = signal(false);

  @HostListener('window:scroll')
  onScroll() { this.scrolled.set(window.scrollY > 20); }

  toggle(label: string) { this.expanded.set(this.expanded() === label ? null : label); }
  close() { this.open.set(false); this.expanded.set(null); }
}
