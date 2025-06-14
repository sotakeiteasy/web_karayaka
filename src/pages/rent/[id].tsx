import AdPage from '@/lib/components/AdPage/AdPage';
import { Ad, MetaTags, SearchType } from '@/lib/types';
import { getAllAds, getAdById, getPropertyTitle } from '@/lib/utils';

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
  // const ru = require('../../../i18n/translation.ru.json');
  // const en = require('../../../i18n/translation.en.json');
  // const translations = { ru, en };

  // function getNestedTranslation(obj: any, key: string): string {
  //   return key.split('.').reduce((acc: any, part: string) => acc[part], obj);
  // }

  // const tRu = (key: string) => getNestedTranslation(translations.ru, key);
  // const tEn = (key: string) => getNestedTranslation(translations.en, key);

  const ad = getAdById(params.id)!;

  const propertyTitle = {
    ru: getPropertyTitle(ad, 'ru'),
    en: getPropertyTitle(ad, 'en'),
  };
  const metaTags = {
    ru: {
      title: propertyTitle.ru,
      description: 'Подробная информация о недвижимости. Актуальные цены, фотографии, детальное описание.',
      keywords: 'недвижимость, аренда, квартира, вилла, дом, Турция, Россия',
    },
    en: {
      title: propertyTitle.en,
      description: 'Detailed information about real estate. Current prices, photos, and comprehensive description.',
      keywords: 'real estate, rent, apartment, villa, house, Turkey, Russia',
    },
  };

  return {
    props: {
      ad,
      metaTags,
    },
  };
}
