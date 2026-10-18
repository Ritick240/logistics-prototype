import { Injectable, inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { SITE_URL } from '../config';
import { BRAND } from '../site-data';

const DEFAULT_DESCRIPTION =
  'Licensed and bonded freight broker offering full truckload, LTL, intermodal, drayage and hazmat shipping across North America.';

/** Keeps the meta description, Open Graph tags and canonical link in step with the current route. */
@Injectable({ providedIn: 'root' })
export class SeoService {
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private meta = inject(Meta);
  private title = inject(Title);
  private doc = inject(DOCUMENT);

  init() {
    this.router.events.pipe(filter(e => e instanceof NavigationEnd)).subscribe(() => {
      let r = this.route.snapshot;
      while (r.firstChild) r = r.firstChild;
      this.update(r.data['description'] ?? DEFAULT_DESCRIPTION);
    });
  }

  /** Pages with dynamic content (e.g. a blog post) call this after loading. */
  update(description: string, image?: string) {
    const url = SITE_URL + this.router.url.split(/[?#]/)[0];
    const title = this.title.getTitle();
    this.meta.updateTag({ name: 'description', content: description });
    this.meta.updateTag({ property: 'og:title', content: title });
    this.meta.updateTag({ property: 'og:description', content: description });
    this.meta.updateTag({ property: 'og:url', content: url });
    this.meta.updateTag({ property: 'og:site_name', content: BRAND.name });
    if (image) this.meta.updateTag({ property: 'og:image', content: image });

    let link = this.doc.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!link) {
      link = this.doc.createElement('link');
      link.rel = 'canonical';
      this.doc.head.appendChild(link);
    }
    link.href = url;
  }
}
