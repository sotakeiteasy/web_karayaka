import { PostData } from '@/lib/types';

export const articleScheme = (localizedPostData: PostData, pageUrl: string, imageUrl: string) => ({
  '@context': 'https://schema.org',
  '@type': 'Article',
  'headline': localizedPostData.title,
  'description': localizedPostData.excerpt || '',
  'image': 'https://karayaka.ru' + imageUrl,
  'url': pageUrl,
  'datePublished': localizedPostData.date + 'T08:00:00+08:00',
  'author': {
    '@type': 'Organization',
    'name': 'Karayaka',
    'url': 'https://karayaka.ru',
  },
});
