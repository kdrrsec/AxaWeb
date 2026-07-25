const paths = {
  spark: `<path d="M12 3l1.2 4.2L17.5 8.5 13.2 9.8 12 14l-1.2-4.2L6.5 8.5l4.3-1.3L12 3Z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/><path d="M18 13l.7 2.3L21 16l-2.3.7L18 19l-.7-2.3L15 16l2.3-.7L18 13Z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/>`,
  bolt: `<path d="M13 3 6.5 13h5L11 21l6.5-10h-5L13 3Z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/>`,
  shield: `<path d="M12 3.5 5.5 6v5.2c0 4 2.7 6.8 6.5 8.3 3.8-1.5 6.5-4.3 6.5-8.3V6L12 3.5Z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/><path d="m9.2 12 1.8 1.8 3.8-3.8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>`,
  user: `<path d="M12 12.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Z" stroke="currentColor" stroke-width="1.5"/><path d="M5.5 19.5c1.4-2.5 3.7-3.8 6.5-3.8s5.1 1.3 6.5 3.8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>`,
  layout: `<rect x="4" y="4.5" width="16" height="15" rx="2" stroke="currentColor" stroke-width="1.5"/><path d="M4 9.5h16M10 9.5v10" stroke="currentColor" stroke-width="1.5"/>`,
  cart: `<path d="M4 5h1.8l1.4 10.2a1.5 1.5 0 0 0 1.5 1.3h8.1a1.5 1.5 0 0 0 1.5-1.2L19.5 8H7.1" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><circle cx="10" cy="19.5" r="1" fill="currentColor"/><circle cx="16.5" cy="19.5" r="1" fill="currentColor"/>`,
  server: `<rect x="4.5" y="4" width="15" height="6" rx="1.5" stroke="currentColor" stroke-width="1.5"/><rect x="4.5" y="14" width="15" height="6" rx="1.5" stroke="currentColor" stroke-width="1.5"/><path d="M8 7h.01M8 17h.01" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>`,
  wrench: `<path d="M14.7 6.3a3.5 3.5 0 0 0-4.9 4.9L4.5 16.5l3 3 5.3-5.3a3.5 3.5 0 0 0 4.9-4.9l-2.4 2.4-2.6-2.6 2-1.8Z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/>`,
  check: `<path d="m5 12.5 4.2 4.2L19 7" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/>`,
  plus: `<path d="M12 5v14M5 12h14" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/>`,
  arrow: `<path d="M5 12h12M13 6l6 6-6 6" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>`,
};

export function icon(name, className = "icon") {
  const content = paths[name] || paths.spark;
  return `<svg class="${className}" viewBox="0 0 24 24" fill="none" aria-hidden="true">${content}</svg>`;
}
