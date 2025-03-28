import styles from './index.module.scss';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import Head from "next/head"
import { useRouter } from 'next/router';

import { useState, useEffect, ChangeEvent } from 'react';
import { filterAds, getUniqueFilterValues } from '@/lib/ad';
import { Ad } from '@/lib/types/ad';
import { Filter } from '@/lib/types/filter';

import PaginatedAds from './PaginatedAds/PaginatedAds';

import Select from 'react-select'


export default function Search({locale}: {locale: string}) {
  const router = useRouter();
  
  const { type, country, city, propertyType, minPrice, maxPrice, minArea, maxArea, bedrooms, floor, parking, balcony, furnished } = router.query;
  
  const [searchText, setSearchText] = useState('');
  const { t } = useTranslation("common")
  const [filteredAds, setFilteredAds] = useState<Ad[]>([])
  const [filter, setFilter] = useState<Filter>({})
  const [appliedFilter, setAppliedFilter] = useState<Filter>({})
  const [filterValues, setFilterValues] = useState<{
    countries: { en: string, ru: string }[],
    cities: { en: string, ru: string }[],
    propertyType: { en: string, ru: string }[],
    features: string[]
  }>({
    countries: [],
    cities: [],
    propertyType: [],
    features: []
  })
  // const [filterTags, setFilterTags] = useState<string[]>([])

  const [sortOption, setSortOption] = useState('price-cheap')
  const sortAds = (option: string, adsToSort: Ad[]) => {
    switch (option) {
      case 'price-cheap':
        return [...adsToSort].sort((a, b) => a.price.usd - b.price.usd);
      case 'price-expensive':
        return [...adsToSort].sort((a, b) => b.price.usd - a.price.usd);
      case 'area-small':
        return [...adsToSort].sort((a, b) => a.area - b.area);
      case 'area-large':
        return [...adsToSort].sort((a, b) => b.area - a.area);
      default:
        return adsToSort;
    } 
  }

  // Объединенный useEffect для загрузки начальных фильтров из URL
  useEffect(() => {
    if (router.isReady) {
      // Создаем фильтр из URL параметров
      const initialFilter: Filter = {};
      
      // Строковые параметры
      if (type) initialFilter.type = type as 'sale' | 'rent';
      if (country) initialFilter.country = country as string;
      if (city) initialFilter.city = city as string;
      if (propertyType) initialFilter.propertyType = propertyType as string;
      
      // Числовые параметры
      if (minPrice) initialFilter.minPrice = Number(minPrice);
      if (maxPrice) initialFilter.maxPrice = Number(maxPrice);
      if (minArea) initialFilter.minArea = Number(minArea);
      if (maxArea) initialFilter.maxArea = Number(maxArea);
      if (bedrooms) initialFilter.bedrooms = Number(bedrooms);
      if (floor) initialFilter.floor = Number(floor);
      
      // Булевы параметры
      if (parking === 'true') initialFilter.parking = true;
      if (balcony === 'true') initialFilter.balcony = true;
      if (furnished === 'true') initialFilter.furnished = true;
      
      // Устанавливаем оба состояния фильтров
      setFilter(initialFilter);
      setAppliedFilter(initialFilter);
      
      // Загружаем отфильтрованные объявления
      const ads = filterAds(initialFilter);
      const sortedAds = sortAds('price-cheap', ads);
      setFilteredAds(sortedAds);

      // Инициализация списков фильтров
      const values = getUniqueFilterValues();
      setFilterValues(values);
    }
  }, [router.isReady, type, country, city, propertyType, minPrice, maxPrice, minArea, maxArea, bedrooms, floor, parking, balcony, furnished]);

  // Объединенный useEffect для фильтрации и обновления URL
  useEffect(() => {
    if (router.isReady) {
      // 1. Фильтруем и сортируем объявления
      const ads = filterAds(appliedFilter);
      const sortedAds = sortAds(sortOption, ads);
      setFilteredAds(sortedAds);

      // 2. Формируем URL параметры
      const query: Record<string, string> = {};
      
      // При изменении фильтров всегда сбрасываем на первую страницу
      // Не добавляем параметр page - это автоматически означает первую страницу
      
      // Добавляем только значимые параметры в URL
      if (appliedFilter.type) query.type = appliedFilter.type;
      if (appliedFilter.country) query.country = appliedFilter.country;
      if (appliedFilter.city) query.city = appliedFilter.city;
      if (appliedFilter.propertyType) query.propertyType = appliedFilter.propertyType;
      
      if (appliedFilter.minPrice) query.minPrice = appliedFilter.minPrice.toString();
      if (appliedFilter.maxPrice) query.maxPrice = appliedFilter.maxPrice.toString();
      if (appliedFilter.minArea) query.minArea = appliedFilter.minArea.toString();
      if (appliedFilter.maxArea) query.maxArea = appliedFilter.maxArea.toString();
      if (appliedFilter.bedrooms) query.bedrooms = appliedFilter.bedrooms.toString();
      if (appliedFilter.floor) query.floor = appliedFilter.floor.toString();
      
      if (appliedFilter.parking) query.parking = 'true';
      if (appliedFilter.balcony) query.balcony = 'true';
      if (appliedFilter.furnished) query.furnished = 'true';
      
      if (appliedFilter.address) query.address = appliedFilter.address;
      
      // Обновляем URL без перезагрузки страницы
      router.replace({ pathname: router.pathname, query }, undefined, { shallow: true });
    }
  }, [appliedFilter, sortOption, router.isReady]);

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  const handleFilterChange = (e: ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const { name, value } = e.target;
    const newFilter = { ...filter, [name]: value };
    setFilter(newFilter);
  };

  const applyFilters = () => {
    // Если есть текст поиска, добавляем его к фильтру
    const updatedFilter = {...filter};
    if (searchText.trim()) {
      updatedFilter.address = searchText.trim();
    } else if (updatedFilter.address) {
      // Удаляем address если поле поиска пустое
      delete updatedFilter.address;
    }
    setAppliedFilter(updatedFilter);
  };

  const handleSortChange = (e: ChangeEvent<HTMLSelectElement> ) => {
    const selectedSort = e.target.value;
    setSortOption(selectedSort)

    const sortedAds = sortAds(selectedSort, filteredAds)
    setFilteredAds(sortedAds)
  }

  const resetFilters = () => {
    // Сохраняем только параметр type (аренда/продажа), если он есть
    const typeParam = router.query.type ? `?type=${router.query.type}` : '';
    window.location.href = `/${locale}/search${typeParam}`;
  }

  const cityOptions = [
    { value: "", label: t("search.filters.allCities") },
    ...filterValues.cities.map((city) => ({
      value: city.en,
      label: city[locale],
    })),
  ];

  const countryOptions = [
    { value: "", label: t("search.filters.allCountries") },
    ...filterValues.countries.map((country) => ({
      value: country.en,
      label: country[locale],
    })),
  ];

  const propertyTypeOptions = [
    { value: "", label: t("search.filters.propertyType") },
    ...filterValues.propertyType.map((propertyType) => ({
      value: propertyType.en,
      label: propertyType[locale],
    })),
  ];

  const bedroomOptions = [
    { value: "", label: t("search.filters.any") },
    { value: "1", label: "1" }, 
    { value: "2", label: "2" },
    { value: "3", label: "3" },
    { value: "4", label: "4+" }
  ];

  const FloorOptions = [
    { value: "", label: t("search.filters.any") },
    { value: "1", label: "1" }, 
    { value: "2", label: "2" },
    { value: "3", label: "3" },
    { value: "4", label: "4+" }
  ];

  const SortOptions = [
    { value: "price-cheap", label: t("search.sorting.cheapFirst") },
    { value: "price-expensive", label: t("search.sorting.expensiveFirst") }, 
    { value: "area-small", label: t("search.sorting.smallFirst") },
    { value: "area-large", label: t("search.sorting.largeFirst") }
  ];

  const filters = [
    { key: "parking", label: t("search.filters.parking") },
    { key: "balcony", label: t("search.filters.balcony") },
    { key: "furnished", label: t("search.filters.furnished") },
  ];

  return (
    <>
      <Head>
          <title>Ads</title>
      </Head>
      <div className={styles.main}>

        <div className={styles.filterBox}>
            {/* <h1>{t("search.header")}</h1> */}
          
          {/* Существующие фильтры */}
          <div className={styles.filter}>
            <label htmlFor="country">{t("search.filters.country")}</label>
            <Select
              id="country"
              name="country"
              value={countryOptions.find(option => option.value === (filter.country ?? ""))}
              onChange={(selectedOption) =>
                handleFilterChange({
                  target: { name: "country", value: selectedOption?.value || "" }
                })
              }
              options={countryOptions}
              isSearchable
              classNamePrefix="react-select"

            />
          </div>

          
          <div className={styles.filter}>
            <label htmlFor="city">{t("search.filters.city")}</label>
            <Select
              id="city"
              name="city"
              value={cityOptions.find(option => option.value === (filter.city ?? ""))}
              onChange={(selectedOption) =>
                handleFilterChange({
                  target: { name: "city", value: selectedOption?.value || "" }
                })
              }
              options={cityOptions}
              // placeholder={t("search.filters.allCities")}
              isSearchable
              classNamePrefix="react-select"

            />
          </div>

          <div className={styles.filter}>
            <label htmlFor="district">{t("search.filters.propertyType")}</label>
            <Select
              id="propertyType"
              name="propertyType"
              value={propertyTypeOptions.find(option => option.value === (filter.propertyType ?? ""))}
              onChange={(selectedOption) =>
                handleFilterChange({
                  target: { name: "propertyType", value: selectedOption?.value || "" }
                })
              }
              options={propertyTypeOptions}
              isSearchable
              classNamePrefix="react-select"

            />
          </div>

          {/* <Select options={options} /> */}
          

          {/* <div className={styles.filter}>
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
          </div> */}
          
          {/* Новые фильтры для числовых значений */}
          <div className={styles.filterRow}>
            <div className={styles.filter}>
              <label htmlFor="minPrice">{t("search.filters.priceFrom")}</label>
              <input 
                type="text" 
                id="minPrice" 
                name="minPrice" 
                value={filter.minPrice || ''} 
                onChange={(e) => handleFilterChange({
                  target: {
                    name: e.target.name,
                    value: e.target.value ? Number(e.target.value) : undefined
                  }
                } as any)}
              />
            </div>
            <div className={styles.filter}>
              <label htmlFor="maxPrice">{t("search.filters.priceTo")}</label>
              <input 
                type="text" 
                id="maxPrice" 
                name="maxPrice" 
                value={filter.maxPrice || ''} 
                onChange={(e) => handleFilterChange({
                  target: {
                    name: e.target.name,
                    value: e.target.value ? Number(e.target.value) : undefined
                  }
                } as any)}
              />
            </div>
          </div>

          <div className={styles.filterRow}>
            <div className={styles.filter}>
              <label htmlFor="minArea">{t("search.filters.areaFrom")}</label>
              <input 
                type="text" 
                id="minArea" 
                name="minArea" 
                value={filter.minArea || ''} 
                onChange={(e) => handleFilterChange({
                  target: {
                    name: e.target.name,
                    value: e.target.value ? Number(e.target.value) : undefined
                  }
                } as any)}
              />
            </div>
            <div className={styles.filter}>
              <label htmlFor="maxArea">{t("search.filters.areaTo")}</label>
              <input 
                type="text" 
                id="maxArea" 
                name="maxArea" 
                value={filter.maxArea || ''} 
                onChange={(e) => handleFilterChange({
                  target: {
                    name: e.target.name,
                    value: e.target.value ? Number(e.target.value) : undefined
                  }
                } as any)}
              />
            </div>
          </div>

          <div className={styles.filter}>
            <label htmlFor="bedrooms">{t("search.filters.bedrooms")}</label>

            <Select
              id="bedrooms"
              name="bedrooms"
              value={bedroomOptions.find(option => 
                option.value === (filter.bedrooms ? String(filter.bedrooms) : '')
              )}
              onChange={(selectedOption) => 
                handleFilterChange({
                  target: {
                    name: "bedrooms",
                    value: selectedOption?.value ? Number(selectedOption.value) : undefined
                  }
                } as any)
              }
              options={bedroomOptions}
              isSearchable={false}
              classNamePrefix="react-select"

            />
          </div>

          <div className={styles.filter}>
            <label htmlFor="floor">{t("search.filters.floor")}</label>
            <Select
              id="floor"
              name="floor"
              value={FloorOptions.find(option => 
                option.value === (filter.floor ? String(filter.floor) : '')
              )}
              onChange={(selectedOption) => 
                handleFilterChange({
                  target: {
                    name: "floor",
                    value: selectedOption?.value ? Number(selectedOption.value) : undefined
                  }
                } as any)
              }
              options={FloorOptions}
              isSearchable={false}
              classNamePrefix="react-select"
            />
          </div>

          {/* Фильтры для булевых значений */}
          <div className={styles.checkboxGroup}>
          {filters.map(({ key, label }) => (
            <button
              key={key}
              className={`${styles.filterButton} ${filter[key] ? styles.active : ""}`}
              onClick={() => setFilter((prev) => ({ ...prev, [key]: !prev[key] }))}
            >
              {label}
            </button>
          ))}
            {/* <div className={styles.checkbox}>
              <input 
                type="checkbox" 
                id="parking" 
                name="parking" 
                checked={filter.parking || false}
                onChange={(e) => {
                  const newFilter = { ...filter };
                  newFilter.parking = e.target.checked;
                  setFilter(newFilter);
                }}
              />
              <label htmlFor="parking">{t("search.filters.parking")}</label>
            </div>
            
            <div className={styles.checkbox}>
              <input 
                type="checkbox" 
                id="balcony" 
                name="balcony" 
                checked={filter.balcony || false}
                onChange={(e) => {
                  const newFilter = { ...filter };
                  newFilter.balcony = e.target.checked;
                  setFilter(newFilter);
                }}
              />
              <label htmlFor="balcony">{t("search.filters.balcony")}</label>
            </div>
            
            <div className={styles.checkbox}>
              <input 
                type="checkbox" 
                id="furnished" 
                name="furnished" 
                checked={filter.furnished || false}
                onChange={(e) => {
                  const newFilter = { ...filter };
                  newFilter.furnished = e.target.checked;
                  setFilter(newFilter);
                }}
              />
              <label htmlFor="furnished">{t("search.filters.furnished")}</label>
            </div> */}
          </div>

          <div className={styles.filterActions}>
            <button className={styles.applyButton} onClick={applyFilters}>
              {t("search.filters.apply")}
            </button>
          </div>
        </div>

        <div className={styles.searchBlock}>
          <div className={styles.controlPanel}>

            <div className={styles.searchPanel}>
              <input 
                type="text" 
                value={searchText}
                onChange={handleSearchChange}
                placeholder={t("search.filters.searchPlaceholder")}
              />
              <button className={styles.searchButton} onClick={applyFilters}>{t("search.filters.searchButton")}</button>
            </div>

            <div className={styles.addPanel}>
              {/* <div className={styles.filterTags}>
                {filterTags.map(tag => <div>{tag.charAt(0).toUpperCase() + tag.slice(1)}</div>)}
              </div> */}
              {Object.keys(appliedFilter).length > 1 && <button onClick={resetFilters} className={styles.resetButton}>
                {t("search.filters.reset")}
              </button>}



              <Select
                className={styles.sortButton}
                id="sort"
                name="sort"
                value={SortOptions.find(option => option.value === sortOption)}
                onChange={(selectedOption) => 
                  handleSortChange({
                    target: {
                      name: "sort",
                      value: selectedOption?.value || "price-cheap"
                    }
                  })
                }
                options={SortOptions}
                isSearchable={false}
                classNamePrefix="react-select" 
              />
            </div>
            
          </div>
          <PaginatedAds itemsPerPage={3} ads={filteredAds}/>
        </div>

      </div>
    </>
  )
}

import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
export async function getStaticProps({ locale, params }: { locale: string, params?: any }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
      locale
    },
  };
}








