import styles from './PaginatedAds.module.scss';
import ReactPaginate from 'react-paginate';
import { useState, useEffect } from 'react';
import { useTranslation, LinkWithLocale, useLanguageQuery } from 'next-export-i18n';
import { useRouter } from 'next/router';

import Icon from '@mdi/react';
import { mdiMapMarkerOutline, mdiBedQueenOutline, mdiStairs } from '@mdi/js';

import CustomSlider from '../CustomSlider/CustomSlider';
import { Ad } from '@/lib/types';
import {
  countryTranslations,
  cityTranslations,
  districtTranslations,
  propertyTypeTranslations,
} from '@/lib/translations';

interface ItemsProps {
  currentItems: Ad[];
  locale: 'ru' | 'en';
}

function Items({ currentItems, locale }: ItemsProps) {
  const { t } = useTranslation();

  if (!currentItems || currentItems.length === 0) {
    return <div className={styles.noResults}>{t('search.noResults')}</div>;
  }

  return (
    <div className={styles.adsList}>
      {currentItems.map((ad: Ad) => (
        <div className={styles.adCard} key={ad.id}>
          <div className={styles.adCardImage}>
            <CustomSlider ad={ad} />
          </div>
          <LinkWithLocale href={`/ads/${ad.id}`}>
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
                  {ad.floor && (
                    <span>
                      {ad.floor || ''}/{ad.floorInHouse || ''}
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

interface PaginatedAdsProps {
  itemsPerPage: number;
  ads: Ad[];
}

export default function PaginatedAds({ itemsPerPage, ads = [] }: PaginatedAdsProps) {
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

  return (
    <>
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
