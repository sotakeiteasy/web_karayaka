import styles from './index.module.scss';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useLanguageQuery } from 'next-export-i18n';
import RealEstateLawyer from '@/lib/components/CEOPages/CEOTexts/RealEstateLawyer';
import { Breadcrumbs, ContainerWrapper } from '@/lib/components';
import Head from 'next/head';
import { MetaTags } from '@/lib/types';
import { jsonLd } from '@/lib/seo';
import CEOImage from '@/lib/components/CEOPages/CEOTexts/CEOImage';
import { FullContacts } from '@/lib/components/ContactsBlock/FullContacts';
import SimpleSlider from '@/lib/components/HomePage/SimpleSlider/SimpleSlider';
export default function RealEstateLawyerPage({ metaTags }: { metaTags: MetaTags }) {
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
        <meta property="og:url" content="https://karayaka.ru/buy/real-estate-lawyer" />
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
              imageSrc="assets/images/search/ceo-real-estate-lawyer.jpg"
              title="realEstateLawyer.CEOText.title"
            />
            <ContainerWrapper width="standard" withMarginBottom>
              <div className={styles.breadcrumbs}>
                <Breadcrumbs
                  items={[
                    { href: '/buy/', t: 'search.buyBreadcrumb' },
                    { href: '/real-estate-lawyer/', t: 'realEstateLawyer.CEOText.title' },
                  ]}
                  color="white"
                />
              </div>
              <SimpleSlider type="buy" country={'Turkey'} locale={locale} />
              <RealEstateLawyer />
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
      title: 'Адвокат по недвижимости в Турции — Karayaka.ru | Безопасно купить апартаменты',
      description:
        'Адвокат по недвижимости в Турции: Karayaka.ru сопровождает сделку, проверяет недвижимость, помогает купить апартаменты и оформить ВНЖ без рисков.',
    },
    en: {
      title: 'Real Estate Lawyer in Turkey — Karayaka.ru | Safely Buy Apartments',
      description:
        'Real estate lawyer in Turkey: Karayaka.ru supports the transaction, verifies the property, helps buy apartments and arrange residence permit without risks.',
    },
  };

  return {
    props: {
      metaTags,
    },
  };
}
