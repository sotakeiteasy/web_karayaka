export const footerScheme = (navLinks: { href: string; label: string }[]) => ({
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  'itemListElement': navLinks.map((link) => ({
    '@type': 'SiteNavigationElement',
    'name': link.label,
    'url': `https://karayaka.ru${link.href}`,
  })),
});
