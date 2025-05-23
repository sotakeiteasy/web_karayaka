import styles from './index.module.scss';
import Head from 'next/head';
import dynamic from 'next/dynamic';
import { useTranslation, useLanguageQuery } from 'next-export-i18n';
import { ChangeEvent } from 'react';
import { PaginatedAds, FilterSelect } from '@/lib/components';
import { SelectOption, MetaTags } from '@/lib/types';
import { useSearchFilters, useFilterOptions } from '@/lib/hooks';

// problem with static export - https://github.com/JedWatson/react-select/issues/5459
const Select = dynamic(() => import('react-select'), {
  ssr: false,
});

function LabelInput({
  name,
  value,
  onChange,
}: {
  name: string;
  value: number | string | undefined;
  onChange: Function;
}) {
  const { t } = useTranslation();

  return (
    <div className={styles.filter}>
      <label htmlFor={name}>{t(`search.filters.${name}`)}</label>
      <input
        type="text"
        id={name}
        name={name}
        value={value || ''}
        onChange={(e) => onChange(name, e.target.value)}
        placeholder={t(`search.filters.point`)}
      />
    </div>
  );
}

export default function Search({ metaTags }: { metaTags: MetaTags }) {
  const { t } = useTranslation();
  const [query] = useLanguageQuery();
  const lang = (query?.lang as 'ru' | 'en') || 'ru';
  const meta = metaTags[lang];

  const {
    filter,
    appliedFilters,
    searchText,
    setSearchText,
    filteredAds,
    handleFilterChange,
    applyFilters,
    resetFilters,
  } = useSearchFilters();

  const {
    districtOptions,
    cityOptions,
    countryOptions,
    propertyTypeOptions,
    bedroomOptions,
    floorOptions,
    sortOptions,
  } = useFilterOptions(filter.country, filter.city, lang);

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

  return (
    <>
      <Head>
        <title>{meta.title}</title>
        <meta name="description" content={meta.description} />
        <meta name="keywords" content={meta.keywords} />
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta charSet="utf-8" />

        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://karayaka.ru/search" />
        <meta property="og:title" content={meta.title} />
        <meta property="og:description" content={meta.description} />
        <meta property="og:image" content="https://karayaka.ru/og-image.png" />
        <meta property="og:image:alt" content="Karayaka Property Search" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:site_name" content="Karayaka" />
        <meta property="og:locale" content={lang === 'ru' ? 'ru_RU' : 'en_US'} />
      </Head>
      <main className={styles.main}>
        <div className={styles.filterBox}>
          <div className={styles.filter}>
            <FilterSelect
              name="country"
              label="search.filters.allCountries"
              value={filter.country ?? ''}
              options={countryOptions}
              onChange={handleSelectChange}
            />
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
            <LabelInput name="minPrice" value={filter.minPrice} onChange={handleNumberInputChange} />
            <LabelInput name="maxPrice" value={filter.maxPrice} onChange={handleNumberInputChange} />
          </div>
          <div className={styles.filterRow}>
            <LabelInput name="minArea" value={filter.minArea} onChange={handleNumberInputChange} />
            <LabelInput name="maxArea" value={filter.maxArea} onChange={handleNumberInputChange} />
          </div>
          <div className={styles.filterActions}>
            <button className={styles.applyButton} onClick={applyFilters}>
              {t('search.filters.apply')}
            </button>
          </div>
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

            <div className={styles.addPanel}>
              {Object.keys(appliedFilters).length > 1 && (
                <button onClick={resetFilters} className={styles.resetButton}>
                  {t('search.filters.reset')}
                </button>
              )}

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
          </div>
          <PaginatedAds itemsPerPage={8} ads={filteredAds} />
        </div>
      </main>
    </>
  );
}

export async function getStaticProps() {
  const metaTags = {
    ru: {
      title: 'Поиск недвижимости - Караяка | Недвижимость в Турции и России',
      description:
        'Поиск и подбор недвижимости в Турции и России. Удобные фильтры, большая база предложений, актуальные цены.',
      keywords: 'поиск недвижимости, аренда, покупка, недвижимость в Турции, недвижимость в России, квартиры, дома',
    },
    en: {
      title: 'Property Search - Karayaka | Real Estate in Turkey and Russia',
      description:
        'Search and find real estate in Turkey and Russia. Convenient filters, large database of offers, current prices.',
      keywords: 'property search, rent, buy, real estate in Turkey, real estate in Russia, apartments, houses',
    },
  };

  return {
    props: {
      metaTags,
    },
  };
}
