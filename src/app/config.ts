// Deployment settings. Change these when the site goes live.

/** Public URL of the site, used for canonical links and social tags. */
export const SITE_URL = 'https://ritick240.github.io/logistics-prototype';

/**
 * Where form submissions are POSTed (as multipart/form-data, with a `form` field naming the form).
 * Works with Formspree, Netlify/Vercel functions, or your own API.
 * Leave empty to run in demo mode: submissions are logged to the console and succeed after a short delay.
 */
export const FORM_ENDPOINT = '';

/**
 * Shipment tracking lookup. Called as GET `${TRACKING_ENDPOINT}?ref=<reference>` and expected to return
 * { status: string, origin: string, destination: string, eta?: string, events: { time: string, text: string }[] }.
 * Leave empty to show a clearly-labelled sample result instead.
 */
export const TRACKING_ENDPOINT = '';
