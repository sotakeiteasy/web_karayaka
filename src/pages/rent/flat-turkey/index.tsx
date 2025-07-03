import styles from './index.module.scss';
import { useLanguageQuery } from 'next-export-i18n';
import RentTurkey from '../../../lib/components/CEOPages/CEOTexts/RentTurkey';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import CEOImage from '@/lib/components/CEOPages/CEOTexts/CEOImage';
import { Breadcrumbs, ContainerWrapper } from '@/lib/components';
import Head from 'next/head';
import { MetaTags } from '@/lib/types';
import { jsonLd } from '@/lib/seo';

export default function BuyTurkeyPage({ metaTags }: { metaTags: MetaTags }) {
  const [query] = useLanguageQuery();
  const locale = (query?.lang as 'ru' | 'en') || 'ru';
  const meta = metaTags[locale];
  const router = useRouter();
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
        <meta property="og:url" content="https://karayaka.ru/rent/flat-turkey" />
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
            <CEOImage imageSrc="assets/images/search/ceo-rent-apartment.jpg" title="rentApartment.CEOText.title" />
            <ContainerWrapper width="standard" withMarginBottom>
              <div className={styles.breadcrumbs}>
                <Breadcrumbs
                  items={[
                    { href: '/rent/', t: 'search.rentBreadcrumb' },
                    { href: '/flat-turkey/', t: 'rentApartment.CEOText.title' },
                  ]}
                  color="white"
                />
              </div>
              <RentTurkey />
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
      title: 'Аренда квартиры в Турции — Karayaka.ru: быстро, безопасно, без посредников',
      description:
        'Karayaka.ru — российское агентство: аренда квартиры в Турции по фиксированной цене, проверенное жилье, юридическое сопровождение и поддержка 24/7.',
      keywords:
        'индивидуальный подбор недвижимости, персональные предложения, недвижимость в Турции, недвижимость в России, помощь в поиске недвижимости',
    },
    en: {
      title: 'Apartment Rentals in Turkey — Karayaka.ru: Fast, Secure, No Middlemen',
      description:
        'Karayaka.ru is a Russian real estate agency offering apartment rentals in Turkey at fixed prices, with verified properties, legal support, and 24/7 assistance.',
      keywords:
        'personalized real estate selection, custom property offers, real estate in Turkey, real estate in Russia, property search assistance',
    },
  };

  return {
    props: {
      metaTags,
    },
  };
}
