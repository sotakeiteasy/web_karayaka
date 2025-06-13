import Head from 'next/head';
import styles from './AdPage.module.scss';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import React, { useState } from 'react';
import { useTranslation, useLanguageQuery } from 'next-export-i18n';

import { getImageUrl } from '@/lib/utils';
import { Breadcrumbs, ContactUs, ContainerWrapper } from '@/lib/components';
import { Ad, MetaTags } from '@/lib/types';

import { getLocationString } from '@/lib/utils';
import { TitleInfo, PropertyDetails, PropertySlider } from './components';

export default function AdPage({ ad, metaTags }: { ad: Ad; metaTags: MetaTags }) {
  const { t } = useTranslation();
  const [query] = useLanguageQuery();
  const lang = (query?.lang as 'ru' | 'en') || 'ru';
  const [tooltip, setTooltip] = useState(false);

  const meta = metaTags[lang];

  // const propertyTitle = getPropertyTitle(ad, lang, t);
  const location = getLocationString(ad, lang);

  const handleCopy = () => {
    navigator.clipboard.writeText(ad.id).then(() => setTooltip(true));
    setTimeout(() => setTooltip(false), 2000);
  };

  return (
    <>
      <Head>
        <title>{meta.title}</title>
        <meta name="description" content={meta.description?.replace('{location}', location)} />
        <meta name="keywords" content={meta.keywords} />
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta charSet="utf-8" />

        <meta property="og:type" content="website" />
        <meta property="og:url" content={`https://karayaka.ru/ads/${ad.id}`} />
        <meta property="og:title" content={meta.title} />
        <meta property="og:description" content={meta.description?.replace('{location}', location)} />
        <meta
          property="og:image"
          content={ad.images.length > 0 ? getImageUrl(ad.images[0]) : 'https://karayaka.ru/og-image.png'}
        />
        <meta property="og:image:alt" content={meta.title} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:site_name" content="Karayaka" />
        <meta property="og:locale" content={lang === 'ru' ? 'ru_RU' : 'en_US'} />
      </Head>
      <main className={styles.main}>
        <ContainerWrapper width="standardPlus" withMarginBottom={true}>
          <Breadcrumbs
            items={[
              {
                href: `/${ad.type}`,
                t: `${ad.type === 'rent' ? 'search.rentBreadcrumb' : 'search.buyBreadcrumb'}`,
              },
              { href: `/${ad.type}/${ad.id}`, title: meta.title },
            ]}
          />
          <TitleInfo ad={ad} lang={lang} t={t} tooltip={tooltip} onCopy={handleCopy} />
          <div className={styles.infoAndImage}>
            <PropertyDetails ad={ad} lang={lang} t={t} />
            <div className={styles.mainImage}>
              <PropertySlider ad={ad} />
            </div>
          </div>
          {ad.description[lang] && <div className={styles.description}> {ad.description[lang]}</div>}

          <ContactUs />
        </ContainerWrapper>
      </main>
    </>
  );
}
