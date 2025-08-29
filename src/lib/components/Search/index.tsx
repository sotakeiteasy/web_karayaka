import styles from './index.module.scss';
import dynamic from 'next/dynamic';
import { useTranslation, useLanguageQuery } from 'next-export-i18n';
import { ChangeEvent, useContext, useEffect, useRef, useState } from 'react';
import Ads from './PaginatedAds/Ads';
import { LabelInput } from './LabelInput/LabelInput';
import { FilterSelect } from './FilterSelect/FilterSelect';

import { SelectOption, SearchType, CountryType } from '@/lib/types';
import { useSearchFilters, useFilterOptions } from '@/lib/hooks';
import { RateContext } from '../../contexts/RateContext';
import { mdiTuneVariant } from '@mdi/js';
import Icon from '@mdi/react';
import { DeviceContext } from '@/lib/contexts/DeviceContext';

// problem with static export - https://github.com/JedWatson/react-select/issues/5459
const Select = dynamic(() => import('react-select'), {
  ssr: false,
});

export function Search({ type }: { type: SearchType }) {
  const { t } = useTranslation();
  const [query] = useLanguageQuery();
  const lang = (query?.lang as 'ru' | 'en') || 'ru';
  const [isFilerAppliedOnce, setIsFilterApplied] = useState(false);
  const rateContext = useContext(RateContext);
  const rate = rateContext?.rate;
  const {
    filter,
    appliedFilters,
    searchText,
    setSearchText,
    filteredAds,
    handleFilterChange,
    applyFilters,
    resetFilters,
  } = useSearchFilters(type, rate);

  const {
    districtOptions,
    cityOptions,
    countryOptions,
    propertyTypeOptions,
    bedroomOptions,
    floorOptions,
    sortOptions,
    areaRange,
    priceRange,
  } = useFilterOptions(filter.country, filter.city, lang, type, rate);

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  const handleNumberInputChange = (name: string, value: string) => {
    handleFilterChange(name, value ? Number(value) : undefined);
  };

  const handleSelectChange = (name: string, newValue: SelectOption | null, isNumeric: boolean = false) => {
    if (Array.isArray(newValue)) {
      const values = newValue.map((item) => item.value);
      handleFilterChange(name, values);
    } else {
      const value = isNumeric ? Number(newValue?.value || '') : newValue?.value || '';
      handleFilterChange(name, value);
    }
  };

  useEffect(() => {
    const isFilterApplied = localStorage.getItem('isFilterApplied');

    if (isFilterApplied) {
      setIsFilterApplied(true);
    }
  }, []);

  function handleApplyFilter() {
    applyFilters();
    setIsFilterApplied(true);
    localStorage.setItem('isFilterApplied', 'true');
  }

  const handleCountryClick = (value: string) => {
    if (filter.country === value) return;
    handleFilterChange('country', value);
  };

  const currentMinArea = typeof filter.minArea === 'number' ? filter.minArea : areaRange.min;
  const currentMaxArea = typeof filter.maxArea === 'number' ? filter.maxArea : areaRange.max;

  const currentMinPrice = typeof filter.minPrice === 'number' ? filter.minPrice : priceRange.min;
  const currentMaxPrice = typeof filter.maxPrice === 'number' ? filter.maxPrice : priceRange.max;

  const { isMobile } = useContext(DeviceContext);
  const [isOpen, setIsOpen] = useState(isMobile ? false : true);

  if (rate == null) return null;

  return (
    <main className={styles.main}>
      <div className={styles.filterBlock}>
        <div className={styles.filterControls}>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={styles.filterBtn}
            type="button"
            aria-label={lang === 'ru' ? 'Показать фильтры' : 'Toggle filters'}
          >
            <Icon path={mdiTuneVariant} size={1} />
          </button>
          <Select
            className={styles.sortButton}
            id="sort"
            name="sort"
            value={sortOptions.find((option) => option.value === filter.sortOption)}
            onChange={(newValue) => {
              const selectedOption = newValue as SelectOption;
              const value = selectedOption?.value || 'price-cheap';
              handleFilterChange('sortOption', value);
            }}
            options={sortOptions}
            isSearchable={false}
            classNamePrefix="react-select"
          />
        </div>
        {isOpen && (
          <div className={styles.filterBox}>
            <div className={styles.filter}>
              <legend>{t('search.filters.country')}</legend>
              <div id="countryFilter" className={styles.countryFilters}>
                {countryOptions.map(({ value, label }) => (
                  <input
                    key={value}
                    id={value}
                    type="button"
                    value={label}
                    name="country-option"
                    onClick={() => handleCountryClick(value)}
                    aria-pressed={filter.country === value}
                    className={`${styles.filterButton} ${filter.country === value ? styles.active : ''}`}
                  />
                ))}
              </div>
            </div>
            <div className={styles.filter}>
              <FilterSelect
                name="city"
                label="search.filters.allCities"
                value={filter.city ?? ''}
                options={cityOptions}
                onChange={handleSelectChange}
              />
            </div>

            <div className={styles.filter}>
              <FilterSelect
                name="district"
                label="search.filters.allDistricts"
                value={filter.district ?? ''}
                options={districtOptions}
                onChange={handleSelectChange}
                isMulti={true}
              />
            </div>

            {isFilerAppliedOnce && (
              <>
                <div className={styles.filter}>
                  <FilterSelect
                    name="propertyType"
                    label="search.filters.any"
                    value={filter.propertyType ?? ''}
                    options={propertyTypeOptions}
                    onChange={handleSelectChange}
                  />
                </div>
                <div className={styles.filter}>
                  <FilterSelect
                    name="floor"
                    label="search.filters.any"
                    value={filter.floor ?? ''}
                    options={floorOptions}
                    onChange={handleSelectChange}
                    isNumeric={true}
                  />
                </div>

                <div className={styles.filter}>
                  <FilterSelect
                    name="bedroom"
                    label="search.filters.any2"
                    value={filter.bedroom ?? ''}
                    options={bedroomOptions}
                    onChange={handleSelectChange}
                    isMulti={true}
                  />
                </div>

                <div className={styles.filterRow}>
                  <LabelInput
                    name="minPrice"
                    value={filter.minPrice}
                    onChange={handleNumberInputChange}
                    t={t}
                    placeholder={new Intl.NumberFormat('ru-RU').format(currentMinPrice)}
                    unit={lang === 'en' && filter.country === CountryType.Turkey ? '₺' : '₽'}
                    maxLength={12}
                  />
                  <LabelInput
                    name="maxPrice"
                    value={filter.maxPrice}
                    onChange={handleNumberInputChange}
                    t={t}
                    placeholder={new Intl.NumberFormat('ru-RU').format(currentMaxPrice)}
                    unit={lang === 'en' && filter.country === CountryType.Turkey ? '₺' : '₽'}
                    maxLength={12}
                  />
                </div>
                <div className={styles.filterRow}>
                  <LabelInput
                    name="minArea"
                    value={filter.minArea}
                    onChange={handleNumberInputChange}
                    t={t}
                    placeholder={new Intl.NumberFormat('ru-RU').format(currentMinArea)}
                    unit={lang === 'ru' ? 'м²' : 'm²'}
                    maxLength={7}
                  />
                  <LabelInput
                    name="maxArea"
                    value={filter.maxArea}
                    onChange={handleNumberInputChange}
                    t={t}
                    placeholder={new Intl.NumberFormat('ru-RU').format(currentMaxArea)}
                    unit={lang === 'ru' ? 'м²' : 'm²'}
                    maxLength={7}
                  />
                </div>
              </>
            )}

            <div className={styles.filterActions}>
              <button className={styles.applyButton} onClick={handleApplyFilter}>
                {t('search.filters.apply')}
              </button>
              {Object.keys(appliedFilters).length > 1 && (
                <button onClick={resetFilters} className={styles.resetButton}>
                  {t('search.filters.reset')}
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      <div className={styles.searchBlock}>
        <div className={styles.controlPanel}>
          <div className={styles.searchPanel}>
            <input
              id="search"
              type="text"
              value={searchText}
              onChange={handleSearchChange}
              placeholder={t('search.filters.searchPlaceholder')}
              onKeyDown={(e) => e.key === 'Enter' && applyFilters()}
            />
            <button className={styles.searchButton} onClick={applyFilters}>
              {t('search.filters.searchButton')}
            </button>
          </div>
        </div>
        <Ads filteredAds={filteredAds} />
      </div>
    </main>
  );
}
