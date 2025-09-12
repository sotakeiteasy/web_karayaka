import styles from './index.module.scss';
import { useTranslation, LinkWithLocale, useLanguageQuery } from 'next-export-i18n';
import Head from 'next/head';
import Icon from '@mdi/react';
import { mdiMapMarkerOutline, mdiBedQueenOutline, mdiStairs } from '@mdi/js';

import CustomSlider from '@/lib/components/DiscountsPage/CustomSlider/CustomSlider';
import { Ad, MetaTags } from '@/lib/types';
import {
  countryTranslations,
  cityTranslations,
  districtTranslations,
  propertyTypeTranslations,
} from '@/lib/translations';
import { getImageUrl, getPropertyTitle } from '@/lib/utils';
import { useEffect, useState } from 'react';
import { Breadcrumbs, ContactsBlock, ContainerWrapper } from '@/lib/components';
import { Divider } from 'antd';
import { Price } from '@/lib/components/Price/Price';
function Items({ currentItems, locale }: { currentItems: Ad[]; locale: 'ru' | 'en' }) {
  const { t } = useTranslation();
  const [isTablet, setIsTablet] = useState(false);

  useEffect(() => {
    function handleResize() {
      setIsTablet(window.innerWidth <= 900);
    }
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  if (!currentItems || currentItems.length === 0) {
    return <div className={styles.noResults}>{t('search.noResults')}</div>;
  }

  return (
    <div className={styles.adsList}>
      {currentItems.map((ad: Ad) => (
        <div
          className={`${styles.adCard} ${(ad.description?.[locale]?.length || 0) < 2 ? styles.smallHeight : ''}`}
          key={ad.id}
        >
          <div className={styles.adCardImage}>
            <CustomSlider ad={ad} locale={locale} />
          </div>
          <LinkWithLocale href={`${ad.type}/${ad.id}/`}>
            <div className={styles.adCardDescription}>
              <div className={styles.cardPrice}>
                <span className={styles.message}>
                  <img src="/assets/icons/discount.svg" alt="" />
                </span>
                {ad.price.try_old && (
                  <div className={styles.priceTag}>
                    <div className={styles.discount}>
                      <span className={styles.oldPrice}>
                        <Price locale={locale} price={{ try_old: ad.price.try_old }} />
                      </span>
                      <span className={styles.newPrice}>
                        <Price locale={locale} price={{ try: ad.price.try }} stylesName={isTablet ? 'white' : ''} />
                      </span>
                    </div>
                  </div>
                )}
              </div>
              <div className={styles.upDescription}>
                <div className={styles.titleAndAddress}>
                  <h2 className={styles.cardTitle}>
                    {(() => {
                      switch (ad.propertyType) {
                        case 'apartment':
                          return `${ad.rooms} ${locale === 'ru' ? 'комн.' : 'room'} ${
                            propertyTypeTranslations[ad.propertyType][locale]
                          }`;
                        case 'villa':
                        case 'commercial':
                        case 'land':
                        default:
                          return propertyTypeTranslations[ad.propertyType][locale];
                      }
                    })()}
                  </h2>
                  <p className={styles.address}>
                    <Icon path={mdiMapMarkerOutline} size={0.9} />
                    {[
                      countryTranslations[ad.location.country][locale],
                      cityTranslations[ad.location.city][locale],
                      ad.location.district ? districtTranslations[ad.location.district]?.[locale] : null,
                    ]
                      .filter(Boolean)
                      .join(', ')}
                  </p>
                </div>
                <p className={styles.houseProperties}>
                  {ad.floorInHouse && (
                    <span>
                      {ad.floor && ad.floorInHouse ? `${ad.floor || ''}/${ad.floorInHouse || ''}` : ad.floorInHouse}
                      <Icon path={mdiStairs} size={1} />
                    </span>
                  )}
                  {ad.rooms && (
                    <span>
                      {ad.rooms}
                      <Icon path={mdiBedQueenOutline} size={1} />
                    </span>
                  )}
                  {ad.area && (
                    <span>
                      {ad.area} {t('ad.property.squareMeters')}
                      <sup>2</sup>
                    </span>
                  )}
                </p>
              </div>
              {ad.description[locale] && <p className={styles.bottomDescription}>{ad.description[locale]}</p>}
            </div>
          </LinkWithLocale>
        </div>
      ))}
    </div>
  );
}

export default function DiscountsPage({ metaTags }: { metaTags: MetaTags }) {
  const { t } = useTranslation();
  const [query] = useLanguageQuery();
  const lang = (query?.lang as 'ru' | 'en') || 'ru';
  const meta = metaTags[lang];

  const [ads, setAds] = useState<Ad[]>([]);

  useEffect(() => {
    import('@/data/ads/ads.json').then((module) => {
      setAds(module.default as unknown as Ad[]);
    });
  }, []);

  const filteredAds = ads.filter((ad) => ad.price.try_old);
  const filteredAdsRent = filteredAds.filter((ad) => ad.type === 'rent');
  const filteredAdsBuy = filteredAds.filter((ad) => ad.type === 'buy');

  return (
    <>
      <Head>
        <title>{meta.title}</title>
        <meta name="description" content={meta.description} />
        <meta name="keywords" content={meta.keywords} />
        <meta name="robots" content="index, follow" />

        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://karayaka.ru/contacts" />
        <meta property="og:title" content={meta.title} />
        <meta property="og:description" content={meta.description} />
        <meta property="og:image" content="https://karayaka.ru/og-image.png" />
        <meta property="og:image:alt" content="Karayaka Contacts" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:site_name" content="Karayaka" />
        <meta property="og:locale" content={lang === 'ru' ? 'ru_RU' : 'en_US'} />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'ItemList',
              'name': t('search.name'),
              'numberOfItems': filteredAds.length,
              'itemListElement': filteredAds.map((ad) => {
                return {
                  '@type': 'Product',
                  'url': `https://karayaka.ru/${ad.type}/${ad.id}`,
                  'name': getPropertyTitle(ad, lang),
                  'description': ad.description?.[lang] || '',
                  'image': `https://karayaka.ru${ad.images?.[0]}`,
                  'offers': {
                    '@type': 'Offer',
                    'price': ad.price.try || ad.price.rub,
                    'priceCurrency': ad.price.try ? 'TRY' : 'RUB',
                    'availability': 'https://schema.org/InStock',
                    'url': `https://karayaka.ru/${ad.type}/${ad.id}`,
                  },
                  'additionalProperty': [
                    ad.area && {
                      '@type': 'PropertyValue',
                      'name': t('ad.property.area'),
                      'value': ad.area,
                      'unitCode': 'MTK',
                    },
                    ad.rooms && {
                      '@type': 'PropertyValue',
                      'name': t('ad.property.room'),
                      'value': ad.rooms,
                    },
                    ad.floor && {
                      '@type': 'PropertyValue',
                      'name': t('ad.property.floor'),
                      'value': ad.floor,
                    },
                    ad.floorInHouse && {
                      '@type': 'PropertyValue',
                      'name': t('ad.property.floors'),
                      'value': ad.floorInHouse,
                    },
                    ad.propertyType && {
                      '@type': 'PropertyValue',
                      'name': t('ad.property.type'),
                      'value': propertyTypeTranslations[ad.propertyType][lang],
                    },
                    ad.location && {
                      '@type': 'PropertyValue',
                      'name': t('ad.property.location'),
                      'value': [
                        countryTranslations[ad.location.country][lang],
                        cityTranslations[ad.location.city][lang],
                        ad.location.district ? districtTranslations[ad.location.district]?.[lang] : null,
                      ]
                        .filter(Boolean)
                        .join(', '),
                    },
                  ].filter(Boolean),
                };
              }),
            }),
          }}
        />
      </Head>
      <div className={styles.mainImage}>
        <img
          src={getImageUrl('/assets/images/discountsPage/discounts.jpg')}
          alt="{t('discounts.toBuy')}"
          title=""
          draggable="false"
        ></img>
        <div className={styles.imageText}>
          <div className={styles.breadcrumbs}>
            <Breadcrumbs items={[{ href: '/discounts/', t: 'discounts.breadcrumb' }]} color={'white'} />
          </div>
          <h1 className={styles.header}>
            {t('discounts.header')} <br /> <span>{t('discounts.slogan')}</span>
          </h1>
        </div>
      </div>

      <ContainerWrapper width="standardPlus" withMarginBottom>
        <h2 className={styles.headerBlock}>{t('discounts.toBuy')}</h2>
        <Items currentItems={filteredAdsBuy} locale={lang} />
        <h2 className={styles.headerBlock}>{t('discounts.toRent')}</h2>
        <Items currentItems={filteredAdsRent} locale={lang} />

        <Divider></Divider>
        <p className={styles.workhours}>{t('header.workhours')}</p>

        <ContactsBlock showTraditional email phone></ContactsBlock>
      </ContainerWrapper>
    </>
  );
}

export async function getStaticProps() {
  const metaTags = {
    ru: {
      title: 'Скидки - Караяка | Подбор недвижимости под ваши требования',
      description:
        'Специальные предложения и скидки на аренду и покупку недвижимости в Турции. Эксклюзивные акции от агентства Караяка для выгодных инвестиций в турецкую недвижимость.',
      keywords:
        'Караяка, связь с агентством, недвижимость Турция, недвижимость Россия, скидки, специальное предложение',
    },
    en: {
      title: 'Discounts - Karayaka | Personalized Real Estate Solutions',
      description:
        'Special offers and discounts on real estate rental and purchase in Turkey. Exclusive deals from Karayaka agency for profitable investments in Turkish property.',
      keywords: 'Karayaka, real estate Turkey, real estate Russia, discounts, special offer',
    },
  };

  return {
    props: {
      metaTags,
    },
  };
}
