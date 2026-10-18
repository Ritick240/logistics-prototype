import { Component, computed, effect, inject, input, signal } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';
import { SeoService } from '../core/seo.service';
import { SITE_URL } from '../config';
import { BRAND, POSTS } from '../site-data';
import { IconComponent } from '../shared/icon.component';
import { RevealDirective } from '../shared/reveal.directive';
import { CtaBandComponent } from '../shared/blocks.component';
import { PageBannerComponent } from './page-banner.component';

@Component({
  selector: 'app-blog-page',
  standalone: true,
  imports: [RouterLink, IconComponent, RevealDirective, PageBannerComponent],
  template: `
    <app-page-banner title="Blog" />
    <section class="section">
      <div class="container">
        <div class="filters" role="group" aria-label="Filter by category">
          @for (c of categories; track c) {
            <button [class.on]="cat() === c" [attr.aria-pressed]="cat() === c" (click)="cat.set(c)">{{ c }}</button>
          }
        </div>
        <div class="grid-3">
          @for (p of filtered(); track p.slug) {
            <a class="post" [routerLink]="['/blog', p.slug]" reveal>
              <img [src]="p.image" [alt]="p.title" loading="lazy" />
              <div class="post__b">
                <small><span>{{ p.category }}</span> {{ p.date }} · {{ p.readMins }} min read</small>
                <h2>{{ p.title }}</h2>
                <p>{{ p.excerpt }}</p>
                <span class="more">Read article <app-icon name="arrow" [size]="16" /></span>
              </div>
            </a>
          }
        </div>
      </div>
    </section>
  `,
  styles: [`
    .filters { display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 32px; }
    .filters button { font: inherit; font-weight: 600; padding: 9px 16px; border-radius: 999px; border: 1px solid var(--line);
      background: var(--surface); color: var(--ink); cursor: pointer; }
    .filters button.on { background: var(--primary); color: var(--primary-ink); border-color: var(--primary); }
    .post { display: flex; flex-direction: column; background: var(--surface); border: 1px solid var(--line); border-radius: var(--radius);
      overflow: hidden; transition: transform .2s; }
    .post:hover { transform: translateY(-4px); }
    .post img { width: 100%; height: 210px; object-fit: cover; }
    .post__b { padding: 22px; display: flex; flex-direction: column; flex: 1; }
    small { color: var(--muted); font-size: 13px; } small span { color: var(--accent); font-weight: 700; margin-right: 6px; }
    h2 { font-size: 20px; line-height: 1.35; margin: 10px 0; color: var(--heading); }
    p { color: var(--muted); line-height: 1.6; margin: 0 0 16px; flex: 1; }
    .more { display: inline-flex; gap: 6px; align-items: center; color: var(--accent); font-weight: 700; font-size: 14px; }
  `],
})
export class BlogPage {
  categories = ['All', ...new Set(POSTS.map(p => p.category))];
  cat = signal('All');
  filtered = computed(() => POSTS.filter(p => this.cat() === 'All' || p.category === this.cat()));
}

@Component({
  selector: 'app-post-page',
  standalone: true,
  imports: [RouterLink, IconComponent, CtaBandComponent, PageBannerComponent],
  template: `
    @if (post(); as p) {
      <app-page-banner [title]="p.title" [image]="p.image" />
      <article class="section">
        <div class="container art">
          <div>
            <p class="meta"><span>{{ p.category }}</span> {{ p.date }} · {{ p.readMins }} min read · By the {{ brand.name }} team</p>
            <img class="hero" [src]="p.image" [alt]="p.title" />
            <div class="prose">
              @for (para of p.body; track $index) {
                @if (para.startsWith('## ')) { <h2>{{ para.slice(3) }}</h2> } @else { <p>{{ para }}</p> }
              }
            </div>
            <div class="share">
              <b>Share:</b>
              <a [href]="'https://www.linkedin.com/sharing/share-offsite/?url=' + url()" target="_blank" rel="noopener">LinkedIn</a>
              <a [href]="'https://twitter.com/intent/tweet?url=' + url() + '&text=' + enc(p.title)" target="_blank" rel="noopener">X / Twitter</a>
              <a [href]="'mailto:?subject=' + enc(p.title) + '&body=' + url()">Email</a>
            </div>
            <a class="back" routerLink="/blog">← All articles</a>
          </div>
          <aside>
            <h3>More articles</h3>
            @for (r of related(); track r.slug) {
              <a class="rel" [routerLink]="['/blog', r.slug]">
                <img [src]="r.image" [alt]="" loading="lazy" />
                <span><small>{{ r.category }}</small>{{ r.title }}</span>
              </a>
            }
          </aside>
        </div>
      </article>
      <app-cta-band title="Have a shipment in mind?" />
    } @else {
      <app-page-banner title="Article not found" />
      <section class="section container"><p>That article may have moved.</p><a class="btn btn--primary" routerLink="/blog">Browse the blog</a></section>
    }
  `,
  styles: [`
    .art { display: grid; grid-template-columns: minmax(0, 1fr) 300px; gap: 56px; align-items: start; }
    .meta { color: var(--muted); font-size: 14px; margin: 0 0 20px; } .meta span { color: var(--accent); font-weight: 700; margin-right: 6px; }
    .hero { width: 100%; max-height: 420px; object-fit: cover; border-radius: var(--radius); margin-bottom: 32px; }
    .share { display: flex; gap: 14px; flex-wrap: wrap; align-items: center; padding: 20px 0; border-block: 1px solid var(--line); margin: 32px 0 20px; font-size: 14px; }
    .share a { color: var(--accent); font-weight: 600; }
    .back { font-weight: 700; color: var(--heading); }
    aside { position: sticky; top: calc(var(--sw-h) + 110px); }
    aside h3 { margin: 0 0 16px; color: var(--heading); }
    .rel { display: grid; grid-template-columns: 84px 1fr; gap: 12px; align-items: center; padding: 12px 0; border-bottom: 1px solid var(--line);
      font-weight: 600; font-size: 15px; line-height: 1.35; color: var(--heading); }
    .rel img { width: 84px; height: 64px; object-fit: cover; border-radius: min(var(--radius), 8px); }
    .rel small { display: block; color: var(--accent); font-size: 12px; } .rel:hover { color: var(--accent); }
    @media (max-width: 900px) { .art { grid-template-columns: 1fr; } aside { position: static; } }
  `],
})
export class PostPage {
  private seo = inject(SeoService);
  private titleSvc = inject(Title);
  slug = input<string>();
  brand = BRAND;
  post = computed(() => POSTS.find(p => p.slug === this.slug()));
  related = computed(() => POSTS.filter(p => p.slug !== this.slug()));
  url = computed(() => encodeURIComponent(`${SITE_URL}/blog/${this.slug()}`));
  enc = encodeURIComponent;

  constructor() {
    effect(() => {
      const p = this.post();
      if (!p) return;
      this.titleSvc.setTitle(`${p.title} | ${BRAND.name}`);
      this.seo.update(p.excerpt, p.image);
    });
  }
}
