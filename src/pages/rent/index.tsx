import { Search } from '@/lib/components/Search/index';
import { MetaTags, SearchType } from '@/lib/types';

export default function RentPage({ metaTags }: { metaTags: MetaTags }) {
  return <Search metaTags={metaTags} type={SearchType.Rent} />;
}

export async function getStaticProps() {
  const metaTags = {
    ru: {
      title: 'Поиск недвижимости - Караяка | Недвижимость в Турции и России',
      description:
        'Поиск и подбор недвижимости в Турции и России. Удобные фильтры, большая база предложений, актуальные цены.',
      keywords: 'поиск недвижимости, аренда, недвижимость в Турции, недвижимость в России, квартиры, дома',
    },
    en: {
      title: 'Property Search - Karayaka | Real Estate in Turkey and Russia',
      description:
        'Search and find real estate in Turkey and Russia. Convenient filters, large database of offers, current prices.',
      keywords: 'property search, rent, real estate in Turkey, real estate in Russia, apartments, houses',
    },
  };

  return {
    props: {
      metaTags,
    },
  };
}
