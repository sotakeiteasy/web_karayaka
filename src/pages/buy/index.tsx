import { Breadcrumbs, ContainerWrapper, Search } from '@/lib/components';
import { MetaTags, SearchType } from '@/lib/types';
import { useLanguageQuery, useTranslation } from 'next-export-i18n';
import Head from 'next/head';
import BuyCEOText from '../../lib/components/Search/CEOTexts/BuyCEOText';
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
        <meta property="og:url" content="https://karayaka.ru/buy" />
        <meta property="og:title" content={meta.title} />
        <meta property="og:description" content={meta.description} />
        <meta property="og:image" content="https://karayaka.ru/og-image.png" />
        <meta property="og:image:alt" content="Karayaka Property Search - Buy" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:site_name" content="Karayaka" />
        <meta property="og:locale" content={lang === 'ru' ? 'ru_RU' : 'en_US'} />
      </Head>
      <ContainerWrapper width="large" withMarginBottom={true}>
        <Breadcrumbs items={[{ href: '/buy/', t: 'search.buyBreadcrumb' }]} />
        <Search type={SearchType.Buy} />
        {lang === 'ru' && <BuyCEOText />}
        {lang === 'ru' && (
          <SeeAlsoCEO
            pages={[
              {
                title: t('antalya.CEOText.title'),
                link: 'property-antalya',
                image: `assets/images/search/ceo-property-antalya.jpg`,
              },
              {
                title: t('buyFlat.CEOText.title'),
                link: 'flat-turkey',
                image: `assets/images/search/ceo-buy-flat-turkey.jpg`,
              },

              {
                title: t('istanbul.CEOText.title'),
                link: 'property-istanbul',
                image: `assets/images/search/ceo-property-istanbul.jpg`,
              },
            ]}
            rootLink="/buy/"
          />
        )}
      </ContainerWrapper>
    </>
  );
}

export async function getStaticProps() {
  const metaTags = {
    ru: {
      title: 'Покупка недвижимости в Турции — Karayaka.ru: квартиры, виллы, инвестиции',
      description:
        'Karayaka.ru — российское агентство: покупка недвижимости в Турции по цене застройщика, полный юрсопровождение, онлайн-подбор и сервис «под ключ».',
      keywords: 'поиск недвижимости, покупка, недвижимость в Турции, недвижимость в России, квартиры, дома',
    },
    en: {
      title: 'Buying Property in Turkey — Karayaka.ru: Apartments, Villas, Investments',
      description:
        'Karayaka.ru is a Russian real estate agency offering property purchases in Turkey at developer prices, full legal support, online selection, and turnkey service.',
      keywords: 'property search, buy, real estate in Turkey, real estate in Russia, apartments, houses',
    },
  };

  return {
    props: {
      metaTags,
    },
  };
}
