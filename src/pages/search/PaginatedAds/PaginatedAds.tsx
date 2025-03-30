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

function Items({ currentItems, locale }: { currentItems: any, locale: "tr" | "en" | "ru" }) {

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
                        {/* <span>{ad.floor}<Icon path={mdiStairs} size={1} /></span> */}
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
      <Items currentItems={currentAds} locale={(router.locale) as "tr" | "en" | "ru"} />
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