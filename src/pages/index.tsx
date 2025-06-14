import { Home } from '@/lib/components/HomePage';
import { getSortedPostsData } from '@/lib/utils/blogServer';
import { PostData } from '@/lib/types';

export default Home;

export async function getStaticProps() {
  const languages = ['en', 'ru'];
  const allBlogData: Record<string, PostData[]> = {};

  for (const lang of languages) {
    allBlogData[lang] = await getSortedPostsData(lang);
  }

  const metaTags = {
    ru: {
      title: 'Караяка - Недвижимость в Турции и России',
      description:
        'Профессиональная помощь в покупке и продаже недвижимости в Турции и России. Эксклюзивные предложения, индивидуальный подход.',
      keywords: 'недвижимость, Турция, Россия, покупка недвижимости, продажа недвижимости, агентство недвижимости',
    },
    en: {
      title: 'Karayaka - Real Estate in Turkey and Russia',
      description:
        'Professional assistance in buying and selling real estate in Turkey and Russia. Exclusive offers, individual approach.',
      keywords: 'real estate, Turkey, Russia, property purchase, property sale, real estate agency',
    },
  };

  return {
    props: {
      allBlogData,
      metaTags,
    },
  };
}
