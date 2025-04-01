import ReactPaginate from 'react-paginate';
import { useState, useEffect } from 'react';

import CustomSlider from '../CustomSlider/CustomSlider';
import styles from './PaginatedAds.module.scss';

import { useRouter } from 'next/router';
import Link from 'next/link';

import Icon from '@mdi/react';
import { mdiMapMarkerOutline } from '@mdi/js';
import { mdiBedQueenOutline } from '@mdi/js';
import { mdiStairs } from '@mdi/js';
import { Ad } from '@/lib/types/ad';

import { 
  countryTranslations, 
  cityTranslations, 
  districtTranslations, 
  City
} from '@/lib/translations/locationTypes';

import { propertyTypeTranslations } from '@/lib/translations/propertyTypes';

function Items({ currentItems, locale }: { currentItems: any, locale: "en" | "ru" }) {
  const formatNumber = (num: number): string => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  };
  return (
    <div className={styles.adsList}>
        {currentItems?.map((ad: Ad )=> (
          <div className={styles.adCard} key={ad.id}>
                <div className={styles.adCardImage}>
                  <CustomSlider ad={ad} locale={locale} height={300} width={300}/>
                </div>
                <Link 
                  href={`/ads/${ad.id}`}
                  locale={locale}
                >
                  <div className={styles.adCardDescription}>
                    <div className={styles.upDescription}>
                      <h2 className={styles.cardTitle}>
                        {(() => {
                          const forSale = locale === 'ru' ? 'на продажу' 
                            // : locale === 'tr' ? 'satılık' 
                            : 'for sale';
                          const forRent = locale === 'ru' ? 'в аренду' 
                            // : locale === 'tr' ? 'kiralık' 
                            : 'for rent';
                          const typeStatus = ad.type === 'sale' ? forSale : forRent;
                          const meters = locale === 'ru' ? 'м' : 'm';
                          switch(ad.propertyType) {
                            case 'apartment':
                              return `${ad.rooms} ${locale === 'ru' ? 'комн.' :'room'} ${propertyTypeTranslations[ad.propertyType][locale]}`;
                            case 'villa':
                              return `${propertyTypeTranslations[ad.propertyType][locale]}`;
                            case 'commercial':
                              return `${propertyTypeTranslations[ad.propertyType][locale]}`;
                            case 'land':
                              return `${propertyTypeTranslations[ad.propertyType][locale]}`;
                            default:
                              return propertyTypeTranslations[ad.propertyType][locale];
                          }
                        })()}
                      </h2>
                      <p>
                        <Icon path={mdiMapMarkerOutline} size={.8} /> 
                        {[countryTranslations[ad.location.country][locale], 
                            cityTranslations[ad.location.city][locale],
                            districtTranslations[ad.location.district]?.[locale] || '']
                            .filter(Boolean)
                            .join(', ')}  
                      </p>
                    </div>
                    <div className={styles.middleDescription}> {ad.description[locale]} </div>
                    <div className={styles.bottomDescription}>
                      <p className={styles.cardPrice}><strong> 
                        {ad.price.try !== undefined && ad.price.try !== null ? 
                      `${new Intl.NumberFormat('ru-RU').format(ad.price.try)} ₺` : 
                      (ad.price.rub !== undefined && ad.price.rub !== null ? 
                        `${new Intl.NumberFormat('ru-RU').format(ad.price.rub)} ₽` : 
                        '')} 
                        </strong></p>
                      <p>
                        {ad.floor && <span>{ad.floor || ''}/{ad.floorInHouse|| ''}<Icon path={mdiStairs} size={1} /></span>}
                        {ad.rooms && <span>{ad.rooms}<Icon path={mdiBedQueenOutline} size={1} /></span>}
                        {ad.area && <span>{ad.area} {locale === 'ru' ? 'м' : 'm'}<sup>2</sup></span>} 
                      </p>
                    </div>
                  </div>
                </Link>
          </div>
        ))} 
    </div>
  );
}
  


export default function PaginatedAds ({itemsPerPage, ads = []}: {itemsPerPage: number, ads?: any[]}) {
  const router = useRouter();
  // const { page = 1 } = router.query;
  const pageNumber = Number(router.query.page) || 1;

  const [itemOffset, setItemOffset] = useState(0);

  useEffect(() => {
    const offset = (pageNumber - 1) * itemsPerPage;
    setItemOffset(offset);
  }, [pageNumber, itemsPerPage]);

  const endOffset = itemOffset + itemsPerPage;
  const currentAds = Array.isArray(ads) ? ads.slice(itemOffset, endOffset) : [];
  const pageCount = Array.isArray(ads) ? Math.ceil(ads.length / itemsPerPage) : 0;

  const handlePageClick = (event: any) => {
    // Получаем текущие параметры запроса
    const currentQuery = { ...router.query };
    
    // Обновляем только номер страницы
    currentQuery.page = (event.selected + 1).toString();
    
    // Сохраняем все фильтры и переходим на новую страницу
    router.push({
      pathname: router.pathname,
      query: currentQuery
    });
  };

  // const handlePageClick = (event) => {
  //   const newOffset = (event.selected * itemsPerPage) % ads.length;
  //   setItemOffset(newOffset);
  // };

  return (
    <>
      <Items currentItems={currentAds} locale={(router.locale) as "en" | "ru"} />
      <ReactPaginate
        breakLabel="..."
        nextLabel="Next"
        onPageChange={handlePageClick}
        pageRangeDisplayed={3}
        marginPagesDisplayed={1}
        pageCount={pageCount}
        previousLabel="Previous"
        // previousLabel={null}
        // nextLabel={null}
        renderOnZeroPageCount={null}
        className={styles.paginate}
        activeClassName={styles.activePage}
        disabledClassName={styles.hidden}
      />
    </>
  );
}