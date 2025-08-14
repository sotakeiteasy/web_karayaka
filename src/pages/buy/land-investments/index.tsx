import styles from './index.module.scss';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useLanguageQuery } from 'next-export-i18n';
import LandInvestments from '@/lib/components/CEOPages/CEOTexts/LandInvestments';
import { Breadcrumbs, ContainerWrapper } from '@/lib/components';
import Head from 'next/head';
import { MetaTags, SearchType } from '@/lib/types';
import { jsonLd } from '@/lib/seo';
import CEOImage from '@/lib/components/CEOPages/CEOTexts/CEOImage';
import { FullContacts } from '@/lib/components/ContactsBlock/FullContacts';
import { PaginatedAds } from '@/lib/components/Search/PaginatedAds/PaginatedAds';
import { useSearchFilters } from '@/lib/hooks';
import SimpleSlider from '@/lib/components/HomePage/SimpleSlider/SimpleSlider';

export default function LandInvestmentsPage({ metaTags }: { metaTags: MetaTags }) {
  const [query] = useLanguageQuery();
  const router = useRouter();
  const locale = (query?.lang as 'ru' | 'en') || 'ru';
  const meta = metaTags[locale];
  const { filteredAds } = useSearchFilters(SearchType.Buy);
  const ads = filteredAds.filter((ad) => ad.propertyType === 'land' && ad.location.country === 'Turkey');
  useEffect(() => {
    if (locale !== 'ru') {
      router.replace('/buy', undefined, { locale });
    }
  }, [locale, router]);
  return (
    <>
      <Head>
        <title>{meta.title}</title>
        <meta name="description" content={meta.description} />
        <meta name="keywords" content={meta.keywords} />
        <meta name="robots" content="index, follow" />

        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://karayaka.ru/buy/land-investments" />
        <meta property="og:title" content={meta.title} />
        <meta property="og:description" content={meta.description} />
        <meta property="og:image" content="https://karayaka.ru/og-image.png" />
        <meta property="og:image:alt" content="Karayaka Buy In Turkey" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:site_name" content="Karayaka" />
        <meta property="og:locale" content={locale === 'ru' ? 'ru_RU' : 'en_US'} />
        {locale === 'ru' && (
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        )}
      </Head>

      <main
        style={{
          position: 'relative',
        }}
      >
        {locale === 'ru' && (
          <>
            <CEOImage imageSrc="assets/images/search/ceo-land-investments.jpg" title="landInvestments.CEOText.title" />
            <ContainerWrapper width="standard" withMarginBottom>
              <div className={styles.breadcrumbs}>
                <Breadcrumbs
                  items={[
                    { href: '/buy/', t: 'search.buyBreadcrumb' },
                    { href: '/land-investments/', t: 'landInvestments.CEOText.title' },
                  ]}
                  color="white"
                />
              </div>
              {ads.length > 0 && <PaginatedAds itemsPerPage={8} ads={ads} />}
              {ads.length > 0 && ads.length < 8 && (
                <SimpleSlider type="buy" country={'Turkey'} locale={locale} idsToExclude={ads.map((ad) => ad.id)} />
              )}
              {ads.length <= 0 && <SimpleSlider type="buy" country={'Turkey'} locale={locale} />}
              <LandInvestments />
              <FullContacts />
            </ContainerWrapper>
          </>
        )}
      </main>
    </>
  );
}

export async function getStaticProps() {
  const metaTags = {
    ru: {
      title: 'Инвестиции в земельные участки в Турции — Karayaka.ru | Купить землю и построить мечту',
      description:
        'Инвестиции в земельные участки в Турции с Karayaka.ru: полная проверка, помощь купить недвижимость, оформление ВНЖ и сопровождение строительства.',
    },
    en: {
      title: 'Investments in Land Plots in Turkey — Karayaka.ru | Buy Land and Build Your Dream',
      description:
        'Investments in land plots in Turkey with Karayaka.ru: full verification, assistance in buying real estate, residence permit processing, and construction support.',
    },
  };

  return {
    props: {
      metaTags,
    },
  };
}
