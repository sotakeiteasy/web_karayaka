import styles from './PaginatedAds.module.scss';
import ReactPaginate from 'react-paginate';
import { useState, useEffect } from 'react';
import { useTranslation, LinkWithLocale, useLanguageQuery } from 'next-export-i18n';
import { useRouter } from 'next/router';
import Head from 'next/head';

import Icon from '@mdi/react';
import { mdiMapMarkerOutline, mdiBedQueenOutline, mdiStairs } from '@mdi/js';

import CustomSlider from './CustomSlider/CustomSlider';
import { Ad, SearchType } from '@/lib/types';
import {
  countryTranslations,
  cityTranslations,
  districtTranslations,
  propertyTypeTranslations,
} from '@/lib/translations';
import { getPropertyTitle } from '@/lib/utils';

function Items({ currentItems, locale }: { currentItems: Ad[]; locale: 'ru' | 'en' }) {
  const { t } = useTranslation();

  if (!currentItems || currentItems.length === 0) {
    return <div className={styles.noResults}>{t('search.noResults')}</div>;
  }

  return (
    <div className={styles.adsList}>
      {currentItems.map((ad: Ad) => (
        <div className={styles.adCard} key={ad.id}>
          <div className={styles.adCardImage}>
            <CustomSlider ad={ad} locale={locale} />
          </div>
          <LinkWithLocale href={`${ad.type}/${ad.id}`}>
            <div className={styles.adCardDescription}>
              <div className={styles.upDescription}>
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
                <p>
                  <Icon path={mdiMapMarkerOutline} size={0.8} />
                  {[
                    countryTranslations[ad.location.country][locale],
                    cityTranslations[ad.location.city][locale],
                    ad.location.district ? districtTranslations[ad.location.district]?.[locale] : null,
                  ]
                    .filter(Boolean)
                    .join(', ')}
                </p>
              </div>
              <div className={styles.middleDescription}>{ad.description[locale]}</div>
              <div className={styles.bottomDescription}>
                <p className={styles.cardPrice}>
                  <strong>
                    {ad.price.try !== undefined && ad.price.try !== null
                      ? `${new Intl.NumberFormat('ru-RU').format(ad.price.try)} ₺`
                      : ad.price.rub !== undefined && ad.price.rub !== null
                      ? `${new Intl.NumberFormat('ru-RU').format(ad.price.rub)} ₽`
                      : ''}
                  </strong>
                </p>
                <p>
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
            </div>
          </LinkWithLocale>
        </div>
      ))}
    </div>
  );
}

export function PaginatedAds({ itemsPerPage, ads = [] }: { itemsPerPage: number; ads: Ad[] }) {
  const router = useRouter();
  const { t } = useTranslation();
  const [query] = useLanguageQuery();

  const lang = (query?.lang as 'ru' | 'en') || 'ru';
  const pageNumber = Number(router.query.page) || 1;
  const [itemOffset, setItemOffset] = useState(0);

  useEffect(() => {
    const offset = (pageNumber - 1) * itemsPerPage;
    setItemOffset(offset);
  }, [pageNumber, itemsPerPage]);

  const endOffset = itemOffset + itemsPerPage;
  const currentAds = Array.isArray(ads) ? ads.slice(itemOffset, endOffset) : [];
  const pageCount = Array.isArray(ads) ? Math.ceil(ads.length / itemsPerPage) : 0;

  const handlePageClick = (event: { selected: number }) => {
    const newPage = event.selected + 1;
    router.push({
      pathname: router.pathname,
      query: { ...router.query, page: newPage.toString() },
    });
  };

  const listingType = router.pathname.split('/')[1] as 'rent' | 'buy';

  return (
    <>
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'ItemList',
              'name':
                t('search.name') +
                ' ' +
                (listingType === SearchType.Rent ? t('ad.property.forRentStatus') : t('ad.property.forSaleStatus')),
              'numberOfItems': currentAds.length,
              'itemListElement': currentAds.map((ad) => {
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
      <Items currentItems={currentAds} locale={lang} />
      {pageCount > 1 && (
        <ReactPaginate
          breakLabel="..."
          nextLabel={t('pagination.next')}
          previousLabel={t('pagination.previous')}
          onPageChange={handlePageClick}
          pageRangeDisplayed={3}
          marginPagesDisplayed={1}
          pageCount={pageCount}
          renderOnZeroPageCount={null}
          className={styles.paginate}
          activeClassName={styles.activePage}
          disabledClassName={styles.hidden}
          pageClassName={'page-item'}
          forcePage={pageNumber - 1}
        />
      )}
    </>
  );
}
