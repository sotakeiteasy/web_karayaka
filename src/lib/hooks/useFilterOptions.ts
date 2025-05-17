import { useMemo } from 'react';
import { getUniqueFilterValues } from '@/lib/utils';
import { useTranslation } from 'next-export-i18n';
import { FILTER_MAPPINGS } from '@/lib/constants/filterOptions';

export function useFilterOptions(country: string | undefined, city: string | undefined, lang: 'ru' | 'en') {
  const { t } = useTranslation();

  // useMemo have a sense, because we call getUniqieFilterValues only once
  const filterValues = useMemo(() => getUniqueFilterValues(), []);

  const filteredCities = useMemo(() => {
    if (!country) return filterValues.cities;

    switch (country) {
      case 'Russia':
        return filterValues.cities.filter((city) => FILTER_MAPPINGS.countries.russia.includes(city.en));

      case 'Turkey':
        return filterValues.cities.filter((city) => FILTER_MAPPINGS.countries.turkey.includes(city.en));

      default:
        return filterValues.cities;
    }
  }, [country, filterValues.cities]);

  const filteredDistricts = useMemo(() => {
    if (city) {
      const normalizedCity = city.toLowerCase();

      const cityKey = normalizedCity as keyof typeof FILTER_MAPPINGS.cities;
      const cityDistricts = FILTER_MAPPINGS.cities[cityKey] as string[];
      if (cityDistricts && Array.isArray(cityDistricts)) {
        return filterValues.district.filter((district) => cityDistricts.includes(district.en));
      }

      return filterValues.district;
    }

    if (country === 'Turkey') {
      const turkishCities = FILTER_MAPPINGS.countries.turkey || [];
      const turkishDistricts = turkishCities.flatMap((cityName) => {
        const key = cityName.toLowerCase() as keyof typeof FILTER_MAPPINGS.cities;
        return FILTER_MAPPINGS.cities[key];
      });

      return filterValues.district.filter((district) => turkishDistricts.includes(district.en));
    } else if (country === 'Russia') {
      const russianCities = FILTER_MAPPINGS.countries.russia || [];
      const russianDistricts = russianCities.flatMap((cityName) => {
        const key = cityName.toLowerCase() as keyof typeof FILTER_MAPPINGS.cities;
        return FILTER_MAPPINGS.cities[key];
      });

      return filterValues.district.filter((district) => russianDistricts.includes(district.en));
    }

    return filterValues.district;
  }, [city, country, filterValues.district]);

  // below useMemo doesn't so efficient, because parent component re-renders too often and UseMemo is slower than simple object
  const floorOptions = [
    // { value: '', label: t('search.filters.any') },
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
    ...filteredDistricts.map((district) => ({
      value: district.en,
      label: district[lang],
    })),
  ];

  const cityOptions = [
    ...filteredCities.map((city) => ({
      value: city.en,
      label: city[lang],
    })),
  ];

  const countryOptions = [
    ...filterValues.countries.map((country) => ({
      value: country.en,
      label: country[lang],
    })),
  ];

  const propertyTypeOptions = [
    ...filterValues.propertyType.map((propertyType) => ({
      value: propertyType.en,
      label: propertyType[lang],
    })),
  ];

  const bedroomOptions = [
    ...filterValues.bedroom.map((bedroom) => ({
      value: bedroom.en,
      label: bedroom[lang],
    })),
  ];

  return {
    districtOptions,
    cityOptions,
    countryOptions,
    propertyTypeOptions,
    floorOptions,
    bedroomOptions,
    sortOptions,
  };
}
