import { Routes } from '@angular/router';
import { HomeSwitchComponent } from './pages/home-switch.component';
import { BRAND } from './site-data';

const t = (title: string) => `${title} | ${BRAND.name}`;

// Inner pages are lazy-loaded so the first visit only downloads the home page.
export const routes: Routes = [
  { path: '', component: HomeSwitchComponent, title: `${BRAND.name} | ${BRAND.tagline}` },
  {
    path: 'about', title: t('About Us'), data: { description: `Licensed, bonded freight broker moving freight since ${BRAND.founded}. Meet our team and story.` },
    loadComponent: () => import('./pages/about.page').then(m => m.AboutPage),
  },
  {
    path: 'why-choose-us', title: t('Why Choose Us'), data: { description: 'Vetted carriers, honest all-in pricing and people who pick up the phone.' },
    loadComponent: () => import('./pages/why.page').then(m => m.WhyPage),
  },
  {
    path: 'services/:slug', title: t('Services'),
    loadComponent: () => import('./pages/service.component').then(m => m.ServiceComponent),
  },
  {
    path: 'request-a-quote', title: t('Request A Quote'), data: { description: 'Get an all-in freight rate for FTL, LTL, intermodal, drayage or hazmat — usually within the hour.' },
    loadComponent: () => import('./pages/forms.page').then(m => m.QuotePage),
  },
  {
    path: 'contact', title: t('Contact Us'), data: { description: `Call, email or message ${BRAND.name}. Office in Melville, NY.` },
    loadComponent: () => import('./pages/forms.page').then(m => m.ContactPage),
  },
  {
    path: 'become-a-carrier', title: t('Become a Carrier'), data: { description: 'Join our carrier network: steady freight, fair rates and quick-pay options.' },
    loadComponent: () => import('./pages/forms.page').then(m => m.CarrierPage),
  },
  {
    path: 'career', title: t('Careers'), data: { description: 'Build a career in freight logistics. Send a general application.' },
    loadComponent: () => import('./pages/forms.page').then(m => m.CareersPage),
  },
  {
    path: 'track', title: t('Track a Shipment'), data: { description: 'Track your shipment with a load, PRO or BOL number.' },
    loadComponent: () => import('./pages/misc.page').then(m => m.TrackPage),
  },
  {
    path: 'faqs', title: t('FAQs'), data: { description: 'Answers to common questions from shippers and carriers.' },
    loadComponent: () => import('./pages/faq.page').then(m => m.FaqPage),
  },
  {
    path: 'blog', title: t('Blog'), data: { description: 'Shipping tips, intermodal guides and compliance checklists.' },
    loadComponent: () => import('./pages/blog.page').then(m => m.BlogPage),
  },
  {
    path: 'blog/:slug', title: t('Blog'),
    loadComponent: () => import('./pages/blog.page').then(m => m.PostPage),
  },
  {
    path: 'documents', title: t('Documents'), data: { description: 'Carrier packets, W-9, certificate of insurance and shipper forms.' },
    loadComponent: () => import('./pages/misc.page').then(m => m.DocumentsPage),
  },
  {
    path: 'terms', title: t('Terms & Conditions'), data: { kind: 'terms' },
    loadComponent: () => import('./pages/misc.page').then(m => m.LegalPage),
  },
  {
    path: 'privacy-policy', title: t('Privacy Policy'), data: { kind: 'privacy' },
    loadComponent: () => import('./pages/misc.page').then(m => m.LegalPage),
  },
  { path: 'why-choose-alg', redirectTo: 'why-choose-us' },
  { path: 'ship-with-us', redirectTo: 'contact' },
  {
    path: '**', title: t('Page not found'),
    loadComponent: () => import('./pages/misc.page').then(m => m.NotFoundPage),
  },
];
