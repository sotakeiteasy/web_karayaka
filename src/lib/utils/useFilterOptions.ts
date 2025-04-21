import { useMemo } from 'react';
import { getUniqueFilterValues } from '@/lib/utils';
import { useTranslation } from 'next-export-i18n';

export function useFilterOptions(
  country: string | undefined,
  lang: 'ru' | 'en'
) {
  const { t } = useTranslation();

  // useMemo have a sense, because we call getUniqieFilterValues only once
  const filterValues = useMemo(() => getUniqueFilterValues(), []);
  const filteredCities = useMemo(() => {
    if (!country) return filterValues.cities;

    if (country === 'Russia') {
      return filterValues.cities.filter((city) => city.en === 'Moscow');
    } else if (country === 'Turkey') {
      return filterValues.cities.filter((city) => city.en !== 'Moscow');
    }

    return filterValues.cities;
  }, [country, filterValues.cities]);
  
  // below useMemo doesn't so efficient, because parent component re-renders too often 
  // and UseMemo is slower than simple object
  const floorOptions = [
    { value: '', label: t('search.filters.any') },
    { value: '1', label: '0-5' },
    { value: '2', label: '6-10' },
    { value: '3', label: '10-15' },
    { value: '4', label: '15+' },
  ];

  const sortOptions = [
    { value: 'price-cheap', label: t('search.sorting.cheapFirst') },
    { value: 'price-expensive', label: t('search.sorting.expensiveFirst') },
    { value: 'area-small', label: t('search.sorting.smallFirst') },
    { value: 'area-large', label: t('search.sorting.largeFirst') },
  ];

  const districtOptions = [
    ...filterValues.district.map((district) => ({
      value: district.en,
      label: district[lang],
    })),
  ];

  const cityOptions = [
    { value: '', label: t('search.filters.allCities') },
    ...filteredCities.map((city) => ({
      value: city.en,
      label: city[lang],
    })),
  ];

  const countryOptions = [
    { value: '', label: t('search.filters.allCountries') },
    ...filterValues.countries.map((country) => ({
      value: country.en,
      label: country[lang],
    })),
  ];

  const propertyTypeOptions = [
    { value: '', label: t('search.filters.any') },
    ...filterValues.propertyType.map((propertyType) => ({
      value: propertyType.en,
      label: propertyType[lang],
    })),
  ];

  return {
    districtOptions,
    cityOptions,
    countryOptions,
    propertyTypeOptions,
    floorOptions,
    sortOptions,
  };
}
