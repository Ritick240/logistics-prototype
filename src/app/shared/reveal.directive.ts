import { Directive, ElementRef, Input, OnDestroy, OnInit, inject } from '@angular/core';
import { DecimalPipe } from '@angular/common';

/** Fades an element in the first time it scrolls into view (uses global .reveal/.in classes). */
@Directive({ selector: '[reveal]', standalone: true, host: { class: 'reveal' } })
export class RevealDirective implements OnInit, OnDestroy {
  private el = inject(ElementRef<HTMLElement>);
  private io?: IntersectionObserver;

  ngOnInit() {
    this.io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      this.el.nativeElement.classList.add('in');
      this.io?.disconnect();
    }, { threshold: 0.12 });
    this.io.observe(this.el.nativeElement);
  }

  ngOnDestroy() { this.io?.disconnect(); }
}

/** Counts a number up from 0 once visible, e.g. <strong [countUp]="5000" suffix="+"></strong>. */
@Directive({ selector: '[countUp]', standalone: true })
export class CountUpDirective implements OnInit, OnDestroy {
  @Input({ required: true }) countUp!: number;
  @Input() prefix = '';
  @Input() suffix = '';

  private el = inject(ElementRef<HTMLElement>);
  private io?: IntersectionObserver;
  private fmt = new DecimalPipe('en-US');

  ngOnInit() {
    this.render(0);
    this.io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      this.io?.disconnect();
      const start = performance.now();
      const tick = (t: number) => {
        const p = Math.min(1, (t - start) / 1600);
        this.render(Math.round(this.countUp * (1 - Math.pow(1 - p, 3))));
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    });
    this.io.observe(this.el.nativeElement);
  }

  ngOnDestroy() { this.io?.disconnect(); }

  private render(n: number) {
    this.el.nativeElement.textContent = `${this.prefix}${this.fmt.transform(n)}${this.suffix}`;
  }
}
