import { Breadcrumbs, ContainerWrapper } from '@/lib/components';
import { Search } from '@/lib/components/Search/index';
import { MetaTags, SearchType } from '@/lib/types';
import { useLanguageQuery, useTranslation } from 'next-export-i18n';
import Head from 'next/head';
import RentCEOText from '@/lib/components/Search/CEOTexts/RentCEOText';
import { SeeAlsoCEO } from '@/lib/components/CEOPages/SeeAlso/SeeAlsoCEO';
export default function RentPage({ metaTags }: { metaTags: MetaTags }) {
  const [query] = useLanguageQuery();
  const lang = (query?.lang as 'ru' | 'en') || 'ru';
  const { t } = useTranslation();
  const meta = metaTags[lang];

  return (
    <>
      <Head>
        <title>{meta.title}</title>
        <meta name="description" content={meta.description} />
        <meta name="keywords" content={meta.keywords} />
        <meta name="robots" content="index, follow" />

        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://karayaka.ru/rent" />
        <meta property="og:title" content={meta.title} />
        <meta property="og:description" content={meta.description} />
        <meta property="og:image" content="https://karayaka.ru/og-image.png" />
        <meta property="og:image:alt" content="Karayaka Property Search - Rent" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:site_name" content="Karayaka" />
        <meta property="og:locale" content={lang === 'ru' ? 'ru_RU' : 'en_US'} />
      </Head>
      <ContainerWrapper width="large" withMarginBottom={true}>
        <Breadcrumbs items={[{ href: '/rent', t: 'search.rentBreadcrumb' }]} />
        <Search type={SearchType.Rent} />
        {lang === 'ru' && <RentCEOText />}

        {lang === 'ru' && (
          <SeeAlsoCEO
            pages={[
              {
                title: t('antalyaRent.CEOText.title'),
                link: 'flat-antalya',
                image: `assets/images/search/ceo-rent-antalya.jpg`,
              },
              {
                title: t('rentApartment.CEOText.title'),
                link: 'flat-turkey',
                image: `assets/images/search/ceo-rent-apartment.jpg`,
              },
              {
                title: t('rentVilla.CEOText.title'),
                link: 'villa-turkey',
                image: `assets/images/search/ceo-rent-villa.jpg`,
              },
            ]}
            rootLink="/rent/"
          />
        )}
      </ContainerWrapper>
    </>
  );
}
export async function getStaticProps() {
  const metaTags = {
    ru: {
      title: 'Аренда недвижимости в Турции — актуальные предложения от агентства Karayaka.ru',
      description:
        'Karayaka.ru предлагает аренду недвижимости в Турции для жителей России: проверенное жилье, прозрачная цена, сопровождение сделки на русском языке.',
      keywords: 'поиск недвижимости, аренда, недвижимость в Турции, недвижимость в России, квартиры, дома',
    },
    en: {
      title: 'Rental Property in Turkey — Current Offers from Karayaka.ru',
      description:
        'Karayaka.ru offers property rentals in Turkey for residents of Russia: verified listings, transparent pricing, and full support throughout the rental process.',
      keywords: 'property search, rent, real estate in Turkey, real estate in Russia, apartments, houses',
    },
  };

  return {
    props: {
      metaTags,
    },
  };
}
