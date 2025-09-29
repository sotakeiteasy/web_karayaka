import ads from '@/data/ads/ads.json';

export async function getPageMeta() {
  const meta: { path: string; titleRu: string; titleEn: string }[] = [];
  const staticPages = [
    { path: '/', file: 'index' },
    { path: '/about-us', file: 'about-us/index' },
    { path: '/privacy-policy', file: 'privacy-policy/index' },
    { path: '/privacy-policy/agreement', file: 'privacy-policy/agreement/index' },
    { path: '/blog', file: 'blog/index' },
    { path: '/offer', file: 'offer/index' },
    { path: '/discounts', file: 'discounts/index' },
    { path: '/contacts', file: 'contacts/index' },
    { path: '/rent', file: 'rent/index' },
    { path: '/rent/flat-antalya', file: 'rent/flat-antalya/index' },
    { path: '/rent/flat-turkey', file: 'rent/flat-turkey/index' },
    { path: '/rent/villa-turkey', file: 'rent/villa-turkey/index' },
    { path: '/rent/rent-istanbul', file: 'rent/rent-istanbul/index' },
    { path: '/rent/villa-antalya', file: 'rent/villa-antalya/index' },
    { path: '/buy', file: 'buy/index' },
    { path: '/buy/flat-turkey', file: 'buy/flat-turkey/index' },
    { path: '/buy/property-antalya', file: 'buy/property-antalya/index' },
    { path: '/buy/property-istanbul', file: 'buy/property-istanbul/index' },
    { path: '/buy/flat-for-residence', file: 'buy/flat-for-residence/index' },
    { path: '/buy/flats-alanya', file: 'buy/flats-alanya/index' },
    { path: '/buy/land-investments', file: 'buy/land-investments/index' },
    { path: '/buy/property-for-residence', file: 'buy/property-for-residence/index' },
    { path: '/buy/property-for-residence', file: 'buy/property-for-residence/index' },
  ];

  for (const { path, file } of staticPages) {
    const { getStaticProps } = await import(`@/pages/${file}`);
    const { props } = await getStaticProps({});
    meta.push({ path, titleRu: (props as any).metaTags?.ru?.title, titleEn: (props as any).metaTags?.en?.title });
  }

  const blogIds = [
    'article1',
    'article2',
    'article3',
    'article4',
    'article5',
    'article6',
    'article7',
    'article8',
    'article9',
    'article10',
    'article11',
    'article12',
    'article13',
    'article14',
    'article15',
    'article16',
    'article17',
    'article18',
    'article19',
    'article20',
    'article21',
    'article22',
    'article23',
    'article24',
    'article25',
    'article26',
    'article27',
  ];
  for (const id of blogIds) {
    const { getStaticProps } = await import('@/pages/blog/[id]');
    const { props } = await getStaticProps({ params: { id } });
    meta.push({
      path: `/blog/${id}`,
      titleRu: (props as any).metaTags?.ru?.title || `Статья ${id}`,
      titleEn: (props as any).metaTags?.en?.title || `Article ${id}`,
    });
  }

  for (const ad of ads) {
    const isBuy = ad.type === 'buy';
    const path = isBuy ? `/buy/${ad.id}` : `/rent/${ad.id}`;

    const { getStaticProps } = await import(`@/pages/${ad.type}/[id]`);
    const { props } = await getStaticProps({ params: { id: ad.id, lang: 'ru' } });

    meta.push({
      path,
      titleRu: (props as any).metaTags?.ru?.title,
      titleEn: (props as any).metaTags?.en?.title,
    });
  }

  return meta;
}
