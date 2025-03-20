import ReactPaginate from 'react-paginate';
import { useState, useEffect } from 'react';

import CustomSlider from '../CustomSlider/CustomSlider';
import styles from './PaginatedAds.module.scss';

import { useRouter } from 'next/router';


function Items({ currentItems }) {
  return (
    <div className={styles.adsList}>
        {currentItems?.map(ad => (
          <div className={styles.adCard} key={ad.id}>
            <div className={styles.adCardImage}>
              <CustomSlider ad={ad}/>
            </div>
            <div className={styles.adCardDescription}>
              <h2>{ad.title.en}</h2>
              <p> {ad.location.country}, {ad.location.city}, {ad.location.district} </p>
              <p> {ad.price}$ </p>
              <a href={`/ads/${ad.id}`}>подробнее</a>
            </div>
          </div>
        ))}
        {currentItems?.map(ad => (
          <div className={styles.adCard} key={ad.id}>
            <div className={styles.adCardImage}>
              <CustomSlider ad={ad}/>
            </div>
            <div className={styles.adCardDescription}>
              <h2>{ad.title.en}</h2>
              <p> {ad.location.country}, {ad.location.city}, {ad.location.district} </p>
              <p> {ad.price}$ </p>
              <a href={`/ads/${ad.id}`}>подробнее</a>
            </div>
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
    router.push(`/search?page=${event.selected + 1}`);
  };

  // const handlePageClick = (event) => {
  //   const newOffset = (event.selected * itemsPerPage) % ads.length;
  //   setItemOffset(newOffset);
  // };

  return (
    <>
      <Items currentItems={currentAds} />
      <ReactPaginate
        breakLabel="..."
        nextLabel="Next"
        onPageChange={handlePageClick}
        pageRangeDisplayed={3}
        marginPagesDisplayed={1}
        pageCount={pageCount}
        previousLabel="Previous"
        renderOnZeroPageCount={null}
        className={styles.paginate}
      />
    </>
  );
}