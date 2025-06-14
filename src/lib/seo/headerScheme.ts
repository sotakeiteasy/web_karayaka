export const headerScheme = (homeLabel: string, navLinks: { href: string; text: string; active: boolean }[]) => ({
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  'itemListElement': [
    {
      '@type': 'SiteNavigationElement',
      'name': homeLabel,
      'url': 'https://karayaka.ru',
    },
    ...navLinks.map((link) => ({
      '@type': 'SiteNavigationElement',
      'name': link.text,
      'url': `https://karayaka.ru${link.href}`,
    })),
  ],
});
