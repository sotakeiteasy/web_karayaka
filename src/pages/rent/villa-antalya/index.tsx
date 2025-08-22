import styles from './index.module.scss';
import { useLanguageQuery } from 'next-export-i18n';
import VillaAntalya from '../../../lib/components/CEOPages/CEOTexts/VillaAntalya';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import CEOImage from '@/lib/components/CEOPages/CEOTexts/CEOImage';
import { Breadcrumbs, ContainerWrapper } from '@/lib/components';
import Head from 'next/head';
import { MetaTags, SearchType } from '@/lib/types';
import { jsonLd } from '@/lib/seo';
import { FullContacts } from '@/lib/components/ContactsBlock/FullContacts';
import { useSearchFilters } from '@/lib/hooks';
import SimpleSlider from '@/lib/components/HomePage/SimpleSlider/SimpleSlider';
import Ads from '@/lib/components/Search/PaginatedAds/Ads';

export default function VillaAntalyaPage({ metaTags }: { metaTags: MetaTags }) {
  const [query] = useLanguageQuery();
  const locale = (query?.lang as 'ru' | 'en') || 'ru';
  const meta = metaTags[locale];
  const router = useRouter();
  const { filteredAds } = useSearchFilters(SearchType.Rent);
  const ads = filteredAds.filter((ad) => ad.location.city === 'Antalya' && ad.propertyType === 'villa');
  useEffect(() => {
    if (locale !== 'ru') {
      router.replace('/rent', undefined, { locale });
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
        <meta property="og:url" content="https://karayaka.ru/rent/villa-antalya" />
        <meta property="og:title" content={meta.title} />
        <meta property="og:description" content={meta.description} />
        <meta property="og:image" content="https://karayaka.ru/og-image.png" />
        <meta property="og:image:alt" content="Karayaka Rent In Turkey" />
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
            <CEOImage imageSrc="assets/images/search/ceo-villa-antalya.jpg" title="villaAntalya.CEOText.title" />
            <ContainerWrapper width="standard" withMarginBottom>
              <div className={styles.breadcrumbs}>
                <Breadcrumbs
                  items={[
                    { href: '/rent/', t: 'search.rentBreadcrumb' },
                    { href: '/villa-antalya/', t: 'villaAntalya.CEOText.title' },
                  ]}
                  color="white"
                />
              </div>
              {ads.length > 0 && <Ads filteredAds={ads} />}{' '}
              {ads.length > 0 && ads.length < 8 && (
                <SimpleSlider type="rent" country={'Turkey'} locale={locale} idsToExclude={ads.map((ad) => ad.id)} />
              )}
              {ads.length <= 0 && <SimpleSlider type="rent" country={'Turkey'} locale={locale} />}
              <VillaAntalya />
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
      title: 'Аренда виллы в Анталии — Karayaka.ru | Премиальные дома у моря',
      description:
        'Аренда виллы в Анталии на Karayaka.ru: только проверенная недвижимость, видеотуры, поддержка 24/7. Поможем купить апартаменты или снять дом у моря.',
    },
    en: {
      title: 'Villa Rental in Antalya — Karayaka.ru | Premium Homes by the Sea',
      description:
        'Villa rental in Antalya on Karayaka.ru: only verified properties, video tours, 24/7 support. We help you buy apartments or rent a house by the sea.',
    },
  };

  return {
    props: {
      metaTags,
    },
  };
}
