import { PostData } from '../types';

export const blogScheme = (lang: string, title: string, posts: PostData[]) => ({
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  'name': title,
  'numberOfItems': posts.length,
  'itemListElement': posts.map((post, idx) => ({
    '@type': 'Article',
    'position': idx + 1,
    'url': `https://karayaka.ru/blog/${post.id}`,
    'name': post.title,
    'headline': post.title,
    'description': post.excerpt || '',
    'image': `https://karayaka.ru/images/articles/${post.id}.jpg`,
    'datePublished': post.date + 'T08:00:00+08:00',
    'author': {
      '@type': 'Organization',
      'name': 'Karayaka',
      'url': 'https://karayaka.ru',
    },
  })),
});
