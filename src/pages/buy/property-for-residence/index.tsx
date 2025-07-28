import styles from './index.module.scss';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useLanguageQuery } from 'next-export-i18n';
import PropertyForResidence from '@/lib/components/CEOPages/CEOTexts/PropertyForResidence';
import { Breadcrumbs, ContainerWrapper } from '@/lib/components';
import Head from 'next/head';
import { MetaTags } from '@/lib/types';
import { jsonLd } from '@/lib/seo';
import CEOImage from '@/lib/components/CEOPages/CEOTexts/CEOImage';
import { FullContacts } from '@/lib/components/ContactsBlock/FullContacts';
export default function PropertyForResidencePage({ metaTags }: { metaTags: MetaTags }) {
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
        <meta property="og:url" content="https://karayaka.ru/buy/property-for-residence" />
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
            <CEOImage
              imageSrc="assets/images/search/ceo-property-for-residence.jpg"
              title="propertyForResidence.CEOText.title"
            />
            <ContainerWrapper width="standard" withMarginBottom>
              <div className={styles.breadcrumbs}>
                <Breadcrumbs
                  items={[
                    { href: '/buy/', t: 'search.buyBreadcrumb' },
                    { href: '/property-for-residence/', t: 'propertyForResidence.CEOText.title' },
                  ]}
                  color="white"
                />
              </div>
              <PropertyForResidence />
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
      title: 'Недвижимость в Турции для ВНЖ — Karayaka.ru | Легко купить апартаменты и получить вид на жительство',
      description:
        'Недвижимость в Турции для ВНЖ: Karayaka.ru подберёт апартаменты, поможет купить объект и оформить вид на жительство без рисков и скрытых комиссий.',
    },
    en: {
      title:
        'Real Estate in Turkey for Residence Permit — Karayaka.ru | Easy to Buy Apartments and Get Residence Permit',
      description:
        'Real estate in Turkey for residence permit: Karayaka.ru will select apartments, help buy a property and arrange residence permit without risks and hidden fees.',
    },
  };

  return {
    props: {
      metaTags,
    },
  };
}
