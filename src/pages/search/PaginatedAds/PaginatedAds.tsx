import ReactPaginate from 'react-paginate';
import { useState, useEffect } from 'react';

import CustomSlider from '../CustomSlider/CustomSlider';
import styles from './PaginatedAds.module.scss';

import { useRouter } from 'next/router';
import Link from 'next/link';

import Icon from '@mdi/react';
import { mdiMapMarkerOutline } from '@mdi/js';
import { mdiBedQueenOutline } from '@mdi/js';

function Items({ currentItems, locale }) {
  return (
    <div className={styles.adsList}>
        {currentItems?.map(ad => (
          <div className={styles.adCard} key={ad.id}>

              <div className={styles.adCardImage}>
                <CustomSlider ad={ad} locale={locale}/>
              </div>
              <Link 
                href={`/ads/${ad.id}`}
                locale={locale}
              >
              <div className={styles.adCardDescription}>
                <div className={styles.upDescription}>
                  <h2 className={styles.cardTitle}>{ad.title[locale]}</h2>
                  <p>
                    <Icon path={mdiMapMarkerOutline} size={.8} /> 
                    {ad.location.country[locale]}, {ad.location.city[locale]}, {ad.location.district[locale]} 
                  </p>
                </div>
                <div> {ad.description[locale]} </div>
                <div className={styles.bottomDescription}>
                  <p className={styles.cardPrice}><strong> {ad.price.usd}$ </strong></p>
                  <p>
                                      {/* <p><strong> {ad.price.usd}$ </strong></p> */}
                    <span>{ad.rooms}<Icon path={mdiBedQueenOutline} size={1} /></span>
                    <span>{ad.area}m<sup>2</sup></span> 
                  </p>
                </div>
              </div>
            </Link>

          </div>
        ))} 
    </div>
  );
}
  


export default function PaginatedAds ({itemsPerPage, ads}) {
  const router = useRouter();
  const { page = 1 } = router.query;

  const [itemOffset, setItemOffset] = useState(0);

  useEffect(() => {
    const offset = (page - 1) * itemsPerPage;
    setItemOffset(offset);
  }, [page, itemsPerPage]);

  const endOffset = itemOffset + itemsPerPage;
  const currentAds = ads.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(ads.length / itemsPerPage);

  const handlePageClick = (event) => {
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
      <Items currentItems={currentAds} locale={router.locale} />
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