import { Home } from '@/lib/components/HomePage/HomePage';
import { getLatestTwoPosts } from '@/lib/server/blogServer';
import { PostData } from '@/lib/types';

export default Home;

export async function getStaticProps() {
  const languages = ['en', 'ru'];
  const blogData: Record<string, PostData[]> = {};

  for (const lang of languages) {
    blogData[lang] = await getLatestTwoPosts(lang);
  }

  const metaTags = {
    ru: {
      title: 'Агентство недвижимости в Турции — аренда и продажа с Karayaka.ru',
      description:
        'Karayaka.ru — надёжное агентство, предлагающее недвижимость в Турции: квартиры, виллы и коммерческое жильё. Выбирайте объект по лучшей цене, получайте поддержку на каждом этапе сделки.',
      keywords: 'недвижимость, Турция, Россия, покупка недвижимости, продажа недвижимости, агентство недвижимости',
    },
    en: {
      title: 'Real Estate Agency in Turkey — Rent and Buy with Karayaka.ru',
      description:
        'Karayaka.ru is a trusted real estate agency offering properties in Turkey: apartments, villas, and commercial spaces. Choose the best deals and get support at every stage of the transaction.',
      keywords: 'real estate, Turkey, Russia, property purchase, property sale, real estate agency',
    },
  };

  return {
    props: {
      blogData,
      metaTags,
    },
  };
}
