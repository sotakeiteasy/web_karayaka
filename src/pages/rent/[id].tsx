import AdPage from '@/lib/components/AdPage/AdPage';
import { Ad, MetaTags, SearchType } from '@/lib/types';
import { getAllAds, getAdById } from '@/lib/utils';

export default function RentAd({ ad, metaTags }: { ad: Ad; metaTags: MetaTags }) {
  return <AdPage ad={ad} metaTags={metaTags} />;
}

export function getStaticPaths() {
  const ads = getAllAds();
  const rentAds = ads.filter((ad) => ad.type === SearchType.Rent);

  const paths = rentAds.map((ad) => ({
    params: { id: ad.id },
  }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }: { params: { id: string } }) {
  const ad = getAdById(params.id);

  const metaTags = {
    ru: {
      description: 'Подробная информация о недвижимости в {location}. Актуальные цены, фотографии, детальное описание.',
      keywords: 'недвижимость, купить, аренда, квартира, вилла, дом, Турция, Россия',
    },
    en: {
      description:
        'Detailed information about real estate in {location}. Current prices, photos, and comprehensive description.',
      keywords: 'real estate, buy, rent, apartment, villa, house, Turkey, Russia',
    },
  };

  return {
    props: {
      ad,
      metaTags,
    },
  };
}
