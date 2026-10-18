import { Directive, HostListener, OnDestroy, OnInit, signal } from '@angular/core';
import { BRAND, HOW_IT_WORKS, IMAGES, INDUSTRIES, MEMBERSHIPS, MODES, NAV, POSTS, SERVICES, SOFTWARE, STATS, TEAM, TESTIMONIALS, VALUES } from '../site-data';

/** Shared content + behaviour for every prototype home page. Only the templates/styles differ. */
@Directive()
export abstract class ProtoHomeBase implements OnInit, OnDestroy {
  brand = BRAND;
  images = IMAGES;
  stats = STATS;
  values = VALUES;
  modes = MODES;
  services = SERVICES;
  software = SOFTWARE;
  testimonials = TESTIMONIALS;
  team = TEAM;
  memberships = MEMBERSHIPS;
  posts = POSTS;
  howItWorks = HOW_IT_WORKS;
  industries = INDUSTRIES;

  activeTab = signal(0);
  slide = signal(0);
  /** Set to 0 in a subclass to disable testimonial auto-advance. */
  protected autoplayMs = 6000;
  private timer?: ReturnType<typeof setInterval>;

  ngOnInit() {
    if (this.autoplayMs) this.timer = setInterval(() => this.next(), this.autoplayMs);
  }
  ngOnDestroy() { clearInterval(this.timer); }

  next() { this.slide.update(i => (i + 1) % this.testimonials.length); }
  prev() { this.slide.update(i => (i - 1 + this.testimonials.length) % this.testimonials.length); }
  pad(n: number) { return String(n).padStart(2, '0'); }
  serviceName(s: { slug: string; title: string }) { return s.slug === 'over-the-road' ? 'Over The Road' : s.title; }
  serviceIcon(slug: string) { return ({ drayage: 'container', hazmat: 'shield', intermodal: 'train', 'over-the-road': 'truck' } as Record<string, string>)[slug] ?? 'truck'; }
  tel(p: string) { return 'tel:' + p.replace(/\D/g, ''); }
}

/** Shared header/footer behaviour for prototype shells (mobile menu, dropdowns, scroll state). */
@Directive()
export abstract class ProtoShellBase {
  brand = BRAND;
  nav = NAV;
  services = SERVICES;
  year = new Date().getFullYear();
  open = signal(false);
  expanded = signal<string | null>(null);
  scrolled = signal(false);

  @HostListener('window:scroll')
  onScroll() { this.scrolled.set(window.scrollY > 40); }

  toggle(label: string) { this.expanded.set(this.expanded() === label ? null : label); }
  close() { this.open.set(false); this.expanded.set(null); }
  tel(p: string) { return 'tel:' + p.replace(/\D/g, ''); }
}
