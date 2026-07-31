/* Homepage-content: previews die doorverwijzen naar de eigen pagina's. */

import { formatEuro, getOneTimePlans } from "../../data/pricing.js";

export const services = [
  {
    id: "websites",
    title: "Websites",
    text: "Professionele maatwerkwebsites die vertrouwen uitstralen, snel laden en bezoekers overtuigen.",
    benefits: ["Uniek ontwerp", "Responsive", "Technisch geoptimaliseerd"],
    cta: "Meer over websites",
    href: "/websites",
    icon: "layout",
  },
  {
    id: "webshops",
    title: "Webshops",
    text: "Gebruiksvriendelijke webshops waarmee ondernemers hun producten en diensten professioneel online verkopen.",
    benefits: ["Conversiegericht", "Overzichtelijk beheer", "Schaalbaar opgebouwd"],
    cta: "Meer over webshops",
    href: "/webshops",
    icon: "cart",
  },
  {
    id: "hosting",
    title: "Hosting",
    text: "Snelle en veilige hosting met SSL, back-ups, zakelijke e-mail en persoonlijke ondersteuning.",
    benefits: ["Betrouwbare infrastructuur", "Beveiliging", "Ondersteuning"],
    cta: "Meer over hosting",
    href: "/hosting",
    icon: "server",
  },
  {
    id: "onderhoud",
    title: "Onderhoud",
    text: "Updates, monitoring, beveiliging en technische ondersteuning om jouw website gezond en betrouwbaar te houden.",
    benefits: ["Periodieke updates", "Controle en monitoring", "Snel aanspreekpunt"],
    cta: "Meer over onderhoud",
    href: "/onderhoud",
    icon: "wrench",
  },
];

const previewCopy = {
  start: "Professionele onepage om als starter of klein bedrijf direct zichtbaar te zijn.",
  business: "Maatwerkwebsite tot vijf pagina's voor bedrijven die professioneel willen groeien.",
  premium: "Uitgebreide website met maatwerkfunctionaliteiten voor groeiende organisaties.",
};

export const packagesPreview = getOneTimePlans().map((plan) => ({
  name: plan.id === "start" ? "Start" : plan.id === "business" ? "Business" : "Premium",
  price: `Vanaf ${formatEuro(plan.price)}`,
  text: previewCopy[plan.id] || "",
  featured: Boolean(plan.featured),
  badge: plan.badgeKey === "mostChosen" ? "Meest gekozen" : undefined,
}));

export { projects } from "./projects.js";
