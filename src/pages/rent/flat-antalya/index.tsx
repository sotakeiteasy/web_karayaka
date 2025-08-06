import styles from './index.module.scss';
import { useLanguageQuery } from 'next-export-i18n';
import RentAntalya from '../../../lib/components/CEOPages/CEOTexts/RentAntalya';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import CEOImage from '@/lib/components/CEOPages/CEOTexts/CEOImage';
import { Breadcrumbs, ContainerWrapper } from '@/lib/components';
import Head from 'next/head';
import { MetaTags, SearchType } from '@/lib/types';
import { jsonLd } from '@/lib/seo';
import { FullContacts } from '@/lib/components/ContactsBlock/FullContacts';
import { PaginatedAds } from '@/lib/components/Search/PaginatedAds/PaginatedAds';
import { useSearchFilters } from '@/lib/hooks';

export default function BuyTurkeyPage({ metaTags }: { metaTags: MetaTags }) {
  const [query] = useLanguageQuery();
  const locale = (query?.lang as 'ru' | 'en') || 'ru';
  const meta = metaTags[locale];
  const router = useRouter();
  const { filteredAds } = useSearchFilters(SearchType.Rent);
  const ads = filteredAds.filter((ad) => ad.location.city === 'Antalya' && ad.propertyType === 'apartment');
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
        <meta property="og:url" content="https://karayaka.ru/rent/flat-antalya" />
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
            <CEOImage imageSrc="assets/images/search/ceo-rent-antalya.jpg" title="antalyaRent.CEOText.title" />
            <ContainerWrapper width="standard" withMarginBottom>
              <div className={styles.breadcrumbs}>
                <Breadcrumbs
                  items={[
                    { href: '/rent/', t: 'search.rentBreadcrumb' },
                    { href: '/flat-antalya/', t: 'antalyaRent.CEOText.title' },
                  ]}
                  color="white"
                />
              </div>
              {ads.length > 0 && <PaginatedAds itemsPerPage={8} ads={ads} />}
              <RentAntalya />
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
      title: 'Аренда квартиры в Анталии — Karayaka.ru: долгосрочно и посуточно без посредников',
      description:
        'Аренда квартиры в Анталии на сайте Karayaka.ru: проверенное жилье, честная цена в рублях, полное сопровождение российского агентства.',
    },
    en: {
      title: 'Apartment Rentals in Antalya — Karayaka.ru: Long-Term and Daily, No Middlemen',
      description:
        'Find apartment rentals in Antalya on Karayaka.ru: verified properties, fair prices, and full support from a Russian real estate agency.',
    },
  };

  return {
    props: {
      metaTags,
    },
  };
}
