// Central content for the prototype. Brand, contacts and people are placeholders —
// swap them for real values before going live.

export const BRAND = {
  name: 'Northline Logistics Group',
  short: 'NLG',
  tagline: 'Freight that moves on your schedule.',
  founded: 2006,
  address: '100 Example Parkway, Suite 200, Melville, NY 11747',
  phones: ['(555) 010-2000', '(555) 010-2001', '(555) 010-2002'],
  emails: ['info@example.com', 'carriers@example.com', 'sales@example.com'],
  hours: 'Mon–Fri 7:00am–7:00pm ET',
  social: {
    facebook: 'https://www.facebook.com/',
    linkedin: 'https://www.linkedin.com/',
    twitter: 'https://x.com/',
  },
};

const img = (id: string, w = 900) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=70`;

export const IMAGES = {
  hero: img('photo-1601584115197-04ecc0da31d7', 1920),
  about: img('photo-1586528116311-ad8dd3c8310d'),
  carrier: img('photo-1519003722824-194d4455a60c', 1600),
};

export const STATS: { value: number; prefix?: string; suffix: string; label: string }[] = [
  { value: 20, suffix: '', label: 'Years in brokerage' },
  { value: 60000, suffix: '+', label: 'Shipments arranged' },
  { value: 1200, suffix: '+', label: 'Vetted carrier partners' },
  { value: 98, suffix: '%', label: 'On-time delivery rate' },
];

export const VALUES = [
  { icon: 'shield', title: 'Protected freight', text: 'Every carrier is screened for authority, insurance and safety before your load is tendered.' },
  { icon: 'team', title: 'Seasoned brokers', text: 'A named account rep who knows your lanes, backed by an after-hours desk.' },
  { icon: 'star', title: 'Straight answers', text: 'All-in quotes, honest transit times and updates before you have to ask.' },
];

export const MODES = [
  { icon: 'truck', label: 'Full Truck Load' },
  { icon: 'boxes', label: 'Less than Truckload' },
  { icon: 'train', label: 'Intermodal' },
  { icon: 'container', label: 'Drayage' },
];

export interface Service {
  slug: string;
  title: string;
  short: string;
  image: string;
  body: string[];
  points: string[];
}

export const SERVICES: Service[] = [
  {
    slug: 'drayage', title: 'Drayage', image: img('photo-1494412574643-ff11b0a5c1c3'),
    short: 'Port and rail moves handled fast, with container visibility from terminal to warehouse.',
    body: ['Our drayage desk coordinates container pickups at major ports and rail ramps, books appointments and keeps you updated on demurrage and per-diem windows.'],
    points: ['Port & rail ramp pickups', 'Appointment scheduling', 'Chassis coordination', 'Transload support'],
  },
  {
    slug: 'hazmat', title: 'Hazmat', image: img('photo-1590496793929-36417d3117de'),
    short: 'Certified carriers and compliant paperwork for regulated and hazardous materials.',
    body: ['We match hazardous loads with carriers that hold the right endorsements and insurance, and double-check placarding and documentation before wheels turn.'],
    points: ['Endorsed, insured carriers', 'Documentation review', 'Placard & packaging checks', 'Emergency contact planning'],
  },
  {
    slug: 'intermodal', title: 'Intermodal', image: img('photo-1474487548417-781cb71495f3'),
    short: 'Combine rail and truck for cost-effective long-haul freight with a lower carbon footprint.',
    body: ['Intermodal pairs the economy of rail with the flexibility of truck. We plan the full door-to-door move and manage every hand-off.'],
    points: ['Door-to-door planning', 'Rail + dray coordination', 'Lower cost per mile', 'Reduced emissions'],
  },
  {
    slug: 'over-the-road', title: 'OTR', image: img('photo-1592838064575-70ed626d3a0e'),
    short: 'Dry van, reefer and flatbed capacity across the lower 48 and Canada.',
    body: ['Over-the-road service gives you dependable capacity for full and partial loads, backed by a carrier network we vet continuously.'],
    points: ['Dry van, reefer, flatbed', 'FTL & LTL', 'Expedited options', '24/7 tracking updates'],
  },
];

/** Capabilities of our tech stack, described generically (no vendor names). */
export const SOFTWARE = [
  {
    name: 'Load management', image: img('photo-1551288049-bebda4e38f71'),
    text: 'One system ties together quoting, dispatch, tracking and billing, so nothing falls between inboxes.',
    points: ['Single record per shipment', 'Automated invoicing', 'Status updates at every milestone'],
  },
  {
    name: 'Capacity sourcing', image: img('photo-1460925895917-afdab827c52f'),
    text: 'Digital load matching and a curated carrier list help us cover lanes quickly — including tough ones.',
    points: ['Pre-qualified carrier pool', 'Lane history matching', 'Backup capacity on standby'],
  },
  {
    name: 'Rate intelligence', image: img('photo-1543286386-713bdd548da4'),
    text: 'Live market data keeps quotes competitive and helps you budget for seasonal swings.',
    points: ['Lane-level benchmarks', 'Seasonality insights', 'Quarterly rate reviews'],
  },
  {
    name: 'Carrier monitoring', image: img('photo-1563986768609-322da13575f3'),
    text: 'Continuous checks flag changes to a carrier’s authority, insurance or safety record before dispatch.',
    points: ['Fraud and identity checks', 'Insurance expiry alerts', 'Safety score tracking'],
  },
  {
    name: 'Always reachable', image: img('photo-1556761175-b413da4baf72'),
    text: 'Cloud phones and shared inboxes mean you always reach someone who knows your shipment.',
    points: ['Direct line to your rep', 'After-hours routing', 'Text & email updates'],
  },
  {
    name: 'Credit & compliance', image: img('photo-1554224155-6726b3ff858f'),
    text: 'Credit and compliance screening keeps every party in the transaction accountable.',
    points: ['Shipper credit review', 'Carrier payment history', 'Document retention'],
  },
];

export const TESTIMONIALS = [
  { name: 'Jordan M.', role: 'Business Owner', text: 'Communication is excellent and loads arrive on time. They have become part of our team.' },
  { name: 'Priya S.', role: 'Transportation Manager', text: 'Quick quotes, fair rates and no surprises on the invoice. Exactly what we needed.' },
  { name: 'Carlos R.', role: 'Freight Manager', text: 'They found capacity for a tough reefer lane when nobody else could. Highly recommended.' },
  { name: 'Alex T.', role: 'Operations Lead', text: 'Tracking updates come in before I even ask. Makes my job far easier.' },
  { name: 'Morgan K.', role: 'Supply Chain Director', text: 'Their intermodal planning cut our long-haul costs noticeably this year.' },
  { name: 'Sam L.', role: 'Logistics Coordinator', text: 'Friendly, responsive and always willing to go the extra mile on urgent loads.' },
  { name: 'Riley D.', role: 'Procurement Manager', text: 'Professional from first call to final delivery. We keep coming back.' },
];

export const TEAM = [
  { name: 'Team Member One', role: 'Founder & CEO', image: img('photo-1560250097-0b93528c311a', 500) },
  { name: 'Team Member Two', role: 'VP, Operations', image: img('photo-1573496359142-b8d87734a5a2', 500) },
  { name: 'Team Member Three', role: 'Head of Carrier Relations', image: img('photo-1519085360753-af0119f7cbe7', 500) },
];

/** Credentials shown as trust badges. Replace with real memberships/certifications once verified. */
export const MEMBERSHIPS = ['Licensed Property Broker', 'Surety Bonded', 'Contingent Cargo Insured', 'Carrier Vetting Program'];

export const HOW_IT_WORKS = [
  { icon: 'mail', title: 'Tell us the lane', text: 'Share pickup, delivery, dates and freight details online or by phone.' },
  { icon: 'star', title: 'Get an all-in rate', text: 'We quote fast — usually within the hour — with accessorials spelled out.' },
  { icon: 'shield', title: 'We secure a carrier', text: 'A vetted, insured carrier is booked and confirmed in writing.' },
  { icon: 'truck', title: 'Track to delivery', text: 'Milestone updates until the POD is in your inbox.' },
];

export const INDUSTRIES = [
  { icon: 'boxes', name: 'Retail & e-commerce' },
  { icon: 'container', name: 'Food & beverage' },
  { icon: 'train', name: 'Building materials' },
  { icon: 'shield', name: 'Chemicals' },
  { icon: 'truck', name: 'Automotive parts' },
  { icon: 'star', name: 'Consumer goods' },
];

export interface Post {
  slug: string;
  title: string;
  category: string;
  date: string;
  readMins: number;
  image: string;
  excerpt: string;
  /** Paragraphs; a line starting with "## " renders as a sub-heading. */
  body: string[];
}

export const POSTS: Post[] = [
  {
    slug: 'ftl-vs-ltl', title: 'How to choose between FTL and LTL for your next shipment',
    category: 'Shipping Tips', date: 'Sep 12, 2026', readMins: 4, image: img('photo-1586191582151-f73872dfd183', 1200),
    excerpt: 'Weight, volume, timeline and budget all play a part. Here is a quick framework for deciding.',
    body: [
      'Full truckload (FTL) and less-than-truckload (LTL) solve different problems. Picking the right one up front saves money and avoids surprises at the dock.',
      '## Start with size and weight',
      'As a rule of thumb, shipments under about 12 linear feet of trailer space or roughly 15,000 lb usually price better as LTL. Above that, a dedicated truck often costs the same or less.',
      '## Think about handling',
      'LTL freight moves through terminals and may be loaded and unloaded several times. If your product is fragile, high-value or awkward to handle, a direct FTL move reduces touch points.',
      '## Check the calendar',
      'FTL goes straight from pickup to delivery. LTL adds a day or two for consolidation. If the delivery date is fixed, factor that in before choosing on price alone.',
      'Not sure? Send us the dimensions, weight and dates and we will quote both options side by side.',
    ],
  },
  {
    slug: 'intermodal-101', title: 'Intermodal 101: when rail makes sense',
    category: 'Intermodal', date: 'Aug 28, 2026', readMins: 3, image: img('photo-1541427468627-a89a96e5ca1d', 1200),
    excerpt: 'Long lanes, flexible delivery windows and heavy freight are the sweet spot for intermodal.',
    body: [
      'Intermodal combines truck pickup and delivery with a long rail line-haul in the middle. Done right, it lowers cost per mile without giving up door-to-door service.',
      '## Where it works best',
      'Lanes longer than about 700 miles, freight that is not extremely time-sensitive, and shippers with steady volume tend to see the biggest savings.',
      '## What to plan for',
      'Transit is typically one to two days longer than a solo truck. Build that buffer into order cycles and intermodal becomes a reliable, lower-emission option.',
      'We will tell you honestly when a lane is a good intermodal fit and when it is not.',
    ],
  },
  {
    slug: 'hazmat-checklist', title: 'Preparing hazmat freight: a shipper checklist',
    category: 'Compliance', date: 'Aug 03, 2026', readMins: 5, image: img('photo-1578575437130-527eed3abbec', 1200),
    excerpt: 'Avoid delays at pickup by getting classification, packaging and paperwork right up front.',
    body: [
      'Hazardous materials shipments are refused at pickup more often than any other freight, and almost always for preventable reasons.',
      '## Before you book',
      'Confirm the UN number, proper shipping name, hazard class and packing group. Share the Safety Data Sheet with your broker so the right carrier is assigned.',
      '## Packaging and placards',
      'Use packaging rated for the material, mark and label every package, and make sure placards are available for the driver when required.',
      '## Paperwork',
      'The shipping papers must include an emergency response phone number that is monitored while the freight is in transit. Double-check it before the truck arrives.',
      'Our team reviews hazmat documentation with you before dispatch, so the load leaves on time.',
    ],
  },
];

export interface NavItem { label: string; link?: string; fragment?: string; children?: NavItem[]; }

export const NAV: NavItem[] = [
  { label: 'Home', link: '/' },
  { label: 'About Us', children: [
    { label: 'About Us', link: '/about' },
    { label: 'Why Choose Us?', link: '/why-choose-us' },
    { label: 'Terms & Conditions', link: '/terms' },
  ] },
  { label: 'Services', children: SERVICES.map(s => ({ label: s.slug === 'over-the-road' ? 'Over The Road' : s.title, link: `/services/${s.slug}` })) },
  { label: 'Insight', children: [
    { label: 'Blog', link: '/blog' },
    { label: 'Documents', link: '/documents' },
    { label: 'FAQs', link: '/faqs' },
    { label: 'Track a Shipment', link: '/track' },
  ] },
  { label: 'Contact Us', children: [
    { label: 'Ship with us', link: '/contact' },
    { label: 'Become a Carrier', link: '/become-a-carrier' },
  ] },
  { label: 'Career', link: '/career' },
];

export const FAQS: { group: 'Shippers' | 'Carriers'; q: string; a: string }[] = [
  { group: 'Shippers', q: 'How quickly can I get a quote?', a: 'Most quotes go out within an hour during business hours. Complex or multi-stop moves may take a little longer.' },
  { group: 'Shippers', q: 'Which areas do you cover?', a: 'We arrange freight throughout the contiguous United States and to and from Canada.' },
  { group: 'Shippers', q: 'How do I track my shipment?', a: 'Use the Track a Shipment page with your load or PRO number, or contact your account rep for a live update.' },
  { group: 'Shippers', q: 'Is my freight insured?', a: 'Every carrier we use must carry active cargo and liability insurance, which we verify before dispatch. Additional coverage can be arranged on request.' },
  { group: 'Shippers', q: 'Do you handle hazardous materials?', a: 'Yes. We match hazmat loads with properly endorsed and insured carriers and review documentation before pickup.' },
  { group: 'Carriers', q: 'What do I need to haul for you?', a: 'Active operating authority, a W-9, a certificate of insurance naming us as certificate holder, and a signed carrier agreement.' },
  { group: 'Carriers', q: 'How fast do you pay?', a: 'Standard terms are 30 days from receipt of clean paperwork, with quick-pay options available.' },
  { group: 'Carriers', q: 'What equipment types do you need?', a: 'Dry van, reefer, flatbed, step deck, power-only and drayage chassis are all in regular demand.' },
];

export const TIMELINE = [
  { year: '2006', text: 'Company founded on Long Island as a small truckload brokerage.' },
  { year: '2011', text: 'Expanded into intermodal and port drayage services.' },
  { year: '2016', text: 'Launched a dedicated hazmat desk with specialist carriers.' },
  { year: '2021', text: 'Moved operations onto a modern TMS with real-time tracking.' },
  { year: 'Today', text: 'Serving thousands of shippers across North America.' },
];

export const WHY_US = [
  { icon: 'phone', title: 'People who pick up', text: 'A named account rep and a 24/7 after-hours line, not a ticket queue.' },
  { icon: 'shield', title: 'Vetted capacity', text: 'Every carrier is checked for authority, insurance and safety rating before every load.' },
  { icon: 'star', title: 'Honest pricing', text: 'All-in quotes with accessorials explained up front. No surprise line items.' },
  { icon: 'truck', title: 'Every mode', text: 'FTL, LTL, intermodal, drayage and hazmat under one roof.' },
  { icon: 'check', title: 'Proactive updates', text: 'Pickup, in-transit and delivery updates without you having to chase.' },
  { icon: 'team', title: 'Long-term partners', text: 'Most of our customers have shipped with us for years.' },
];

export const DOCUMENTS = [
  { name: 'Carrier Setup Packet', type: 'PDF', size: '1.2 MB', audience: 'Carriers' },
  { name: 'Broker–Carrier Agreement', type: 'PDF', size: '340 KB', audience: 'Carriers' },
  { name: 'W-9 Form', type: 'PDF', size: '120 KB', audience: 'All' },
  { name: 'Certificate of Insurance', type: 'PDF', size: '210 KB', audience: 'All' },
  { name: 'Credit Application', type: 'PDF', size: '180 KB', audience: 'Shippers' },
  { name: 'Shipper Terms of Service', type: 'PDF', size: '260 KB', audience: 'Shippers' },
];

export const EQUIPMENT = ['Dry Van', 'Reefer', 'Flatbed', 'Step Deck', 'Power Only', 'Drayage / Chassis', 'Hazmat Endorsed'];

export const LEGAL: Record<'terms' | 'privacy', { updated: string; sections: { h: string; p: string }[] }> = {
  terms: {
    updated: 'October 1, 2026',
    sections: [
      { h: 'Scope', p: 'These terms apply to freight brokerage services arranged by us. We act as a licensed property broker and do not take possession of freight.' },
      { h: 'Quotes and rates', p: 'Quotes are valid for the dates and details provided. Changes to weight, dimensions, timing or accessorials may change the rate.' },
      { h: 'Carrier liability', p: 'Motor carriers are responsible for the care, custody and control of goods in transit, and for loss or damage claims, subject to applicable law.' },
      { h: 'Payment', p: 'Invoices are due according to the credit terms agreed in writing. Late balances may incur fees as permitted by law.' },
      { h: 'Claims', p: 'Loss or damage must be noted on the delivery receipt and reported in writing within the time limits required by law.' },
      { h: 'Contact', p: 'Questions about these terms can be sent to the email address listed on our Contact page.' },
    ],
  },
  privacy: {
    updated: 'October 1, 2026',
    sections: [
      { h: 'What we collect', p: 'Contact details and shipment information you provide through forms, email or phone, plus basic analytics if you consent to cookies.' },
      { h: 'How we use it', p: 'To provide quotes, arrange and track shipments, onboard carriers, and respond to your requests. We do not sell personal information.' },
      { h: 'Sharing', p: 'We share shipment details with carriers and service providers only as needed to move your freight.' },
      { h: 'Cookies', p: 'Essential cookies keep the site working. Analytics and marketing cookies are only set with your consent, which you can change at any time.' },
      { h: 'Your choices', p: 'You may request access to, correction of, or deletion of your personal information by contacting us.' },
      { h: 'Contact', p: 'Privacy questions can be sent to the email address listed on our Contact page.' },
    ],
  },
};
