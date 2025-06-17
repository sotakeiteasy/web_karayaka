import { AdPage } from '@/lib/components';
import { Ad, MetaTags, SearchType } from '@/lib/types';
import { getAllAds, getAdById, getPropertyTitle } from '@/lib/utils';

export default function RentAd({ ad, metaTags }: { ad: Ad; metaTags: MetaTags }) {
  return <AdPage ad={ad} metaTags={metaTags} />;
}

export function getStaticPaths() {
  const ads = getAllAds();
  const rentAds = ads.filter((ad) => ad.type === SearchType.Buy);

  const paths = rentAds.map((ad) => ({
    params: { id: ad.id },
  }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }: { params: { id: string } }) {
  const ad = getAdById(params.id)!;

  const propertyTitle = {
    ru: getPropertyTitle(ad, 'ru'),
    en: getPropertyTitle(ad, 'en'),
  };
  const metaTags = {
    ru: {
      title: propertyTitle.ru,
      description: 'Подробная информация о недвижимости. Актуальные цены, фотографии, детальное описание.',
      keywords: 'недвижимость, купить, квартира, вилла, дом, Турция, Россия',
    },
    en: {
      title: propertyTitle.en,
      description: 'Detailed information about real estate. Current prices, photos, and comprehensive description.',
      keywords: 'real estate, buy, apartment, villa, house, Turkey, Russia',
    },
  };

  return {
    props: {
      ad,
      metaTags,
    },
  };
}
