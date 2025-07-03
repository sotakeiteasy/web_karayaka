import styles from './index.module.scss';
import { useLanguageQuery } from 'next-export-i18n';
import RentVilla from '../../../lib/components/CEOPages/CEOTexts/RentVilla';
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
        <meta property="og:url" content="https://karayaka.ru/rent/villa-turkey" />
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
            <CEOImage imageSrc="assets/images/search/ceo-rent-villa.jpg" title="rentVilla.CEOText.title" />
            <ContainerWrapper width="standard" withMarginBottom>
              <div className={styles.breadcrumbs}>
                <Breadcrumbs
                  items={[
                    { href: '/rent/', t: 'search.rentBreadcrumb' },
                    { href: '/villa-turkey/', t: 'rentVilla.CEOText.title' },
                  ]}
                  color="white"
                />
              </div>
              <RentVilla />
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
      title: 'Аренда виллы в Турции — Karayaka.ru: премиальное жилье у моря',
      description:
        'Аренда виллы в Турции на сайте Karayaka.ru: проверенное жилье по честной цене, полное юрсопровождение российского агентства и бронирование онлайн.',
      keywords:
        'индивидуальный подбор недвижимости, персональные предложения, недвижимость в Турции, недвижимость в России, помощь в поиске недвижимости',
    },
    en: {
      title: 'Villa Rentals in Turkey — Karayaka.ru: Premium Seaside Properties',
      description:
        'Rent a villa in Turkey on Karayaka.ru: verified properties at fair prices, full legal support from a Russian agency, and online booking.',
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
