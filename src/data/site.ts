// Single source of truth for all site content. Replace placeholder copy /
// the "Hunnvoice" product details with real content when available.

export const company = {
  name: "Hunn Digital Solutions",
  wordmark: "Hunn", // the "." after it is styled gold in the UI
  tagline: "Software that grows your business.",
  email: "hello@hunndigital.com", // placeholder — replace with real inbox
  blurb:
    "We design, build, and ship digital products for startups and growing teams — from first MVP to scaling SaaS.",
};

export interface NavLink {
  label: string;
  href: string;
}

export const navLinks: NavLink[] = [
  { label: "Services", href: "/services" },
  { label: "Products", href: "/products" },
  { label: "About", href: "/about" },
];

export interface Service {
  title: string;
  outcome: string;
  description: string;
}

export const services: Service[] = [
  {
    title: "Custom Software Development",
    outcome: "Turn an idea into a working product.",
    description:
      "Web and mobile applications built to fit your business — from first MVP to a production system your team can rely on. Pragmatic tech choices, clean handover, no lock-in.",
  },
  {
    title: "Consulting & Advisory",
    outcome: "Make confident technical decisions.",
    description:
      "Architecture reviews, technology strategy, and fractional CTO support. We help you choose the right approach, de-risk the build, and keep delivery on track.",
  },
  {
    title: "Products & SaaS",
    outcome: "Launch and grow your own software.",
    description:
      "End-to-end product development for SaaS founders — design, build, and iterate on a subscription product, with the scalability and reliability to grow into it.",
  },
];

export interface Product {
  name: string;
  pitch: string;
  description: string;
  features: string[];
  signupHref: string; // "Try / Sign up" destination — placeholder for now
}

export const product: Product = {
  name: "Hunnvoice", // placeholder product name — replace with real product
  pitch: "Effortless client invoicing for small service businesses.",
  description:
    "Hunnvoice is our own SaaS product: send polished invoices, track payments, and get paid faster — without the spreadsheet juggling. Built for freelancers and small teams.",
  features: [
    "Branded invoices in seconds",
    "Automatic payment reminders",
    "Real-time payment tracking",
    "Simple, transparent pricing",
  ],
  signupHref: "#", // placeholder — point at the real signup/app URL later
};

export interface ValueProp {
  title: string;
  description: string;
}

export const valueProps: ValueProp[] = [
  {
    title: "Outcome-focused",
    description:
      "We measure success by your business results, not lines of code.",
  },
  {
    title: "Senior, hands-on team",
    description:
      "You work directly with experienced engineers — no layers, no hand-offs.",
  },
  {
    title: "Built to last",
    description:
      "Clean, maintainable software with clear documentation and no lock-in.",
  },
];
