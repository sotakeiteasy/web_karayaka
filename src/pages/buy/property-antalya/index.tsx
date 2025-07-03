import styles from './index.module.scss';
import { useLanguageQuery } from 'next-export-i18n';
import PropertyAntalya from '../../../lib/components/CEOPages/CEOTexts/PropertyAntalya';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { Breadcrumbs, ContainerWrapper } from '@/lib/components';
import Head from 'next/head';
import { MetaTags } from '@/lib/types';
import { jsonLd } from '@/lib/seo';
import CEOImage from '@/lib/components/CEOPages/CEOTexts/CEOImage';
import { FullContacts } from '@/lib/components/ContactsBlock/FullContacts';

export default function BuyTurkeyPage({ metaTags }: { metaTags: MetaTags }) {
  //   const { t } = useTranslation();
  const [query] = useLanguageQuery();
  const locale = (query?.lang as 'ru' | 'en') || 'ru';
  const meta = metaTags[locale];
  const router = useRouter();
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
        <meta property="og:url" content="https://karayaka.ru/buy/property-antalya" />
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
            <CEOImage imageSrc="assets/images/search/ceo-property-antalya.jpg" title="antalya.CEOText.title" />
            <ContainerWrapper width="standard" withMarginBottom>
              <div className={styles.breadcrumbs}>
                <Breadcrumbs
                  items={[
                    { href: '/buy/', t: 'search.buyBreadcrumb' },
                    { href: '/property-antalya/', t: 'antalya.CEOText.title' },
                  ]}
                  color="white"
                />
              </div>
              <PropertyAntalya />
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
      title: 'Недвижимость в Анталии — Karayaka.ru: квартиры и виллы у моря по выгодной цене',
      description:
        'Недвижимость в Анталии на сайте Karayaka.ru: продажа и аренда, проверенное жилье, прозрачная цена, полное сопровождение российского агентства.',
    },
    en: {
      title: 'Real Estate in Antalya — Karayaka.ru: Apartments and Villas by the Sea at Great Prices',
      description:
        'Real estate in Antalya on Karayaka.ru: sales and rentals, verified properties, transparent pricing, and full support from a Russian agency.',
    },
  };

  return {
    props: {
      metaTags,
    },
  };
}
