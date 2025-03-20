import styles from './index.module.scss';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import Head from "next/head"


import { useState, useEffect, ChangeEvent } from 'react';
import { filterAds, getUniqueFilterValues } from '@/lib/ad';
import { Ad } from '@/lib/types/ad';
import { Filter } from '@/lib/types/filter';

import PaginatedAds from './PaginatedAds/PaginatedAds';

export default function Search() {
  const { t } = useTranslation("common")
  const [filteredAds, setFilteredAds] = useState<Ad[]>([])
  const [filter, setFilter] = useState<Filter>({})
  const [filterValues, setFilterValues] = useState<{
    countries: string[],
    cities: string[],
    districts: string[],
    features: string[]
  }>({
    countries: [],
    cities: [],
    districts: [],
    features: []
  })
  const [filterTags, setFilterTags] = useState<string[]>([])

  useEffect(() => {
    const ads = filterAds({})
    setFilteredAds(ads)

    const values = getUniqueFilterValues()
    setFilterValues(values)

    setFilterTags(Object.entries(filter)
    .filter(([key, value]) => value !== undefined)
    .map(([key, value]) => value))
  }, [])

  const handleFilterChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    const newFilter = { ...filter, [name]: value };

    setFilter(newFilter);
  };

  const applyFilter = () => {
    setFilteredAds(filterAds(filter))

    setFilterTags(Object.entries(filter)
    .filter(([key, value]) => value !== undefined)
    .map(([key, value]) => value))
  }

  const [sortOption, setSortOption] = useState('')
  const sortAds = (option: string) => {
    switch (option) {
      case 'date-new':
        return [...filteredAds].sort((a, b) => new Date(b.date) - new Date(a.date));
       case 'price-cheap':
        return [...filteredAds].sort((a, b) => a.price - b.price);
      default:
        return filteredAds
    } 
  }

  const handleSortChange = (e: ChangeEvent<HTMLSelectElement> ) => {
    const selectedSort = e.target.value;
    setSortOption(selectedSort)

    const sortedAds = sortAds(selectedSort)
    setFilteredAds(sortedAds)
  }




  return (
    <>
      <Head>
          <title>Ads</title>
      </Head>
      <div className={styles.main}>
        <div className={styles.filterBox}>
        <h1>{t("search.header")}</h1>
          <div className={styles.filter}>
            <label htmlFor="country">Страна</label>
            <select name="country" id="country" value={filter.country} onChange={handleFilterChange}>
              <option value="">Все страны</option>
              {filterValues.countries?.map((country: string) => (
                <option key={country} value={country}>{country}</option>
              ))}
            </select>
          </div>
        
          <div className={styles.filter}>
            <label htmlFor="city">Город</label>
            <select 
              id="city" 
              name="city" 
              value={filter.city} 
              onChange={handleFilterChange}
            >
              <option value="">Все города</option>
              {filterValues.cities?.map((city: string) => (
                <option key={city} value={city}>{city}</option>
              ))}
            </select>
          </div>
          <div className={styles.filter}>
            <label htmlFor="type">Тип</label>
            <select 
              id="type" 
              name="type" 
              value={filter.type} 
              onChange={handleFilterChange}
            >
              <option value="">Все типы</option>
              <option value="sale">Продажа</option>
              <option value="rent">Аренда</option>
            </select>
          </div>

          <button onClick={applyFilter}>Apply filters</button>

        </div>

        <div className={styles.searchBlock}>
          <div className={styles.controlPanel}>
            <div className={styles.searchPanel}>
              <input type="text" />
              <button> Search </button>
              <button> Sth button </button>
            </div>
            <div className={styles.addPanel}>
              {/* <div>Find {filteredAds.length} ads</div> */}
              <div className={styles.filterTags}>
                {filterTags.map(tag => <div>{tag.charAt(0).toUpperCase() + tag.slice(1)}</div>)}
              </div>

              <select name="sort" id="sort" value = {sortOption} onChange = {handleSortChange}>
                <option value="">Select Sorting</option>
                <option value="date-new">Date (New Ones First)</option>
                <option value="date-old">Date (Old Ones First)</option>
                <option value="price-cheap">Price (Cheap Ones First)</option>
                <option value="price-expensive">Price (Expensive Ones First)</option>
                <option value="area-small">Area (Small Ones First)</option>
                <option value="area-large">Area (Large Ones First)</option>
              </select>
            </div>
          </div>
          <PaginatedAds itemsPerPage={1} ads={filteredAds}/>
        </div>
      </div>
    </>
  )
}

import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
    },
  };
}













// Также создайте страницу для просмотра деталей объявления `pages/advertisement/[id].tsx`:

// tsx
// import { GetServerSideProps } from 'next';
// import { useRouter } from 'next/router';
// import { getAdvertisementById } from '../../lib/advertisements';
// import { Advertisement } from '../../types/advertisement';
// import styles from './advertisement.module.scss';

// interface AdvertisementPageProps {
//   advertisement: Advertisement | null;
// }

// export default function AdvertisementPage({ advertisement }: AdvertisementPageProps) {
//   const router = useRouter();
  
//   if (router.isFallback) {
//     return <div>Загрузка...</div>;
//   }
  
//   if (!advertisement) {
//     return <div>Объявление не найдено</div>;
//   }
  
//   return (
//     <div className={styles.adDetailPage}>
//       <div className={styles.adImagesSlider}>
//         {advertisement.images.map((image, index) => (
//           <div key={index} className={styles.adImageSlide}>
//             <img src={image} alt={${advertisement.title} - фото ${index + 1}} />
//           </div>
//         ))}
//       </div>
      
//       <div className={styles.adContent}>
//         <h1>{advertisement.title}</h1>
        
//         <div className={styles.adLocation}>
//           {advertisement.location.country}, {advertisement.location.city}, {advertisement.location.district}
//           {advertisement.location.address && , ${advertisement.location.address}}
//         </div>
        
//         <div className={styles.adPrice}>
//           <span className={styles.priceValue}>{advertisement.price.amount}</span>
//           <span className={styles.priceCurrency}>{advertisement.price.currency}</span>
//           <span className={styles.adType}>{advertisement.type === 'sale' ? 'Продажа' : 'Аренда'}</span>
//         </div>
        
//         <div className={styles.adSpecs}>
//           <div className={styles.specItem}>
//             <span className={styles.specValue}>{advertisement.area}</span>
//             <span className={styles.specLabel}>м²</span>
//           </div>
//           <div className={styles.specItem}>
//             <span className={styles.specValue}>{advertisement.bedrooms}</span>
//             <span className={styles.specLabel}>спальни</span>
//           </div>
//           <div className={styles.specItem}>
//             <span className={styles.specValue}>{advertisement.bathrooms}</span>
//             <span className={styles.specLabel}>ванные</span>
//           </div>
//         </div>
        
//         <div className={styles.adDescription}>
//           <h2>Описание</h2>
//           <p>{advertisement.description.ru}</p>
//         </div>
        
//         {advertisement.features.length > 0 && (