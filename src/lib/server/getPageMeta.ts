import ads from '@/data/ads/ads.json';

export async function getPageMeta() {
  const meta: { path: string; titleRu: string; titleEn: string }[] = [];
  const staticPages = [
    { path: '/', file: 'index' },
    { path: '/about-us', file: 'about-us/index' },
    { path: '/agreement', file: 'agreement/index' },
    { path: '/blog', file: 'blog/index' },
    { path: '/custom-offers', file: 'custom-offers/index' },
    { path: '/privacyPolicy', file: 'privacyPolicy/index' },
    { path: '/rent', file: 'rent/index' },
    { path: '/buy', file: 'buy/index' },
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
