/* Homepage content: previews that link through to dedicated pages. */

import { formatEuro, getOneTimePlans } from "../../data/pricing.js";

export const services = [
  {
    id: "websites",
    title: "Websites",
    text: "Custom professional websites that build trust, load fast, and turn visitors into clients.",
    benefits: ["Unique design", "Responsive", "Technically optimised"],
    cta: "More about websites",
    href: "/websites",
    icon: "layout",
  },
  {
    id: "webshops",
    title: "Web shops",
    text: "User-friendly online stores that help businesses sell products and services with confidence.",
    benefits: ["Conversion-focused", "Simple to manage", "Built to scale"],
    cta: "More about web shops",
    href: "/webshops",
    icon: "cart",
  },
  {
    id: "hosting",
    title: "Hosting",
    text: "Fast, secure hosting with SSL, backups, business email, and personal support.",
    benefits: ["Reliable infrastructure", "Security", "Support"],
    cta: "More about hosting",
    href: "/hosting",
    icon: "server",
  },
  {
    id: "onderhoud",
    title: "Maintenance",
    text: "Updates, security, and technical support to keep your website healthy and dependable.",
    benefits: ["Scheduled updates", "Plan-based checks", "A clear point of contact"],
    cta: "More about maintenance",
    href: "/maintenance",
    icon: "wrench",
  },
];

const previewCopy = {
  start: "A professional one-page site for new and small businesses that need to launch quickly.",
  business: "A custom website of up to five pages for companies that need a stronger, more credible presence online.",
  premium: "A larger website with custom features for growing organisations.",
};

export const packagesPreview = getOneTimePlans().map((plan) => ({
  name: plan.id === "start" ? "Start" : plan.id === "business" ? "Business" : "Premium",
  price: `From ${formatEuro(plan.price)}`,
  text: previewCopy[plan.id] || "",
  featured: Boolean(plan.featured),
  badge: plan.badgeKey === "mostChosen" ? "Most popular" : undefined,
}));

export { projects } from "./projects.js";
