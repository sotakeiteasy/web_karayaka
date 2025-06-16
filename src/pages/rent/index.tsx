import { Breadcrumbs } from '@/lib/components/Breadcrumbs/Breadcrumbs';
import { ContainerWrapper } from '@/lib/components/ContainerWrapper/ContainerWrapper';
import { Search } from '@/lib/components/Search/index';
import { MetaTags, SearchType } from '@/lib/types';
import { useLanguageQuery } from 'next-export-i18n';
import Head from 'next/head';

export default function RentPage({ metaTags }: { metaTags: MetaTags }) {
  const [query] = useLanguageQuery();
  const lang = (query?.lang as 'ru' | 'en') || 'ru';

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
      </ContainerWrapper>
    </>
  );
}
export async function getStaticProps() {
  const metaTags = {
    ru: {
      title: 'Аренда недвижимости - Караяка | Недвижимость в Турции и России',
      description:
        'Поиск и подбор недвижимости в Турции и России. Удобные фильтры, большая база предложений, актуальные цены.',
      keywords: 'поиск недвижимости, аренда, недвижимость в Турции, недвижимость в России, квартиры, дома',
    },
    en: {
      title: 'Rental property - Karayaka | Real Estate in Turkey and Russia',
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
