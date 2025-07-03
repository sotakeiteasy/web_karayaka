import styles from './index.module.scss';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useLanguageQuery } from 'next-export-i18n';
import BuyTurkey from '../../../lib/components/CEOPages/CEOTexts/BuyTurkey';
import { Breadcrumbs, ContainerWrapper } from '@/lib/components';
import Head from 'next/head';
import { MetaTags } from '@/lib/types';
import { jsonLd } from '@/lib/seo';
import CEOImage from '@/lib/components/CEOPages/CEOTexts/CEOImage';
import { FullContacts } from '@/lib/components/ContactsBlock/FullContacts';
export default function BuyTurkeyPage({ metaTags }: { metaTags: MetaTags }) {
  const [query] = useLanguageQuery();
  const router = useRouter();
  const locale = (query?.lang as 'ru' | 'en') || 'ru';
  const meta = metaTags[locale];
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
        <meta property="og:url" content="https://karayaka.ru/buy/flat-turkey" />
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
            <CEOImage imageSrc="assets/images/search/ceo-buy-flat-turkey.jpg" title="buyFlat.CEOText.title" />
            <ContainerWrapper width="standard" withMarginBottom>
              <div className={styles.breadcrumbs}>
                <Breadcrumbs
                  items={[
                    { href: '/buy/', t: 'search.buyBreadcrumb' },
                    { href: '/flat-turkey/', t: 'buyFlat.CEOText.title' },
                  ]}
                  color="white"
                />
              </div>
              <BuyTurkey />
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
      title: 'Покупка квартиры в Турции — Karayaka.ru: цены от застройщика и полное сопровождение',
      description:
        'Покупка квартиры в Турции на сайте Karayaka.ru: проверенное жилье по честной цене, российское агентство, дистанционная сделка и юридическая защита.',
    },
    en: {
      title: 'Buying an Apartment in Turkey — Karayaka.ru: Developer Prices and Full Support',
      description:
        'Buying an Apartment in Turkey on Karayaka.ru: Verified Properties at Fair Prices, Russian Agency, Remote Transactions, and Legal Protection',
    },
  };

  return {
    props: {
      metaTags,
    },
  };
}
