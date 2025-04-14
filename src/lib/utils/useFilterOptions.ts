import { useMemo } from 'react';
import { getUniqueFilterValues } from '@/lib/utils';
import { useTranslation } from 'next-export-i18n';

export function useFilterOptions(country: string | undefined, lang: 'ru' | 'en') {
  const { t } = useTranslation();
  
  const filterValues = useMemo(() => getUniqueFilterValues(), []);

  const filteredCities = useMemo(() => {
    if (!country) return filterValues.cities;

    if (country === "Russia") {
      return filterValues.cities.filter((city) => city.en === "Moscow");
    } else if (country === "Turkey") {
      return filterValues.cities.filter((city) => city.en !== "Moscow");
    }
    
    return filterValues.cities;
  }, [country, filterValues.cities]);

  const cityOptions = useMemo(() => [
    { value: "", label: t("search.filters.allCities") },
    ...filteredCities.map((city) => ({
      value: city.en,
      label: city[lang as keyof typeof city],
    })),
  ], [filteredCities, t, lang]);

  const countryOptions = useMemo(() => [
    { value: "", label: t("search.filters.allCountries") },
    ...filterValues.countries.map((country) => ({
      value: country.en,
      label: country[lang as keyof typeof country],
    })),
  ], [filterValues.countries, t, lang]);

  const propertyTypeOptions = useMemo(() => [
    { value: "", label: t("search.filters.any") },
    ...filterValues.propertyType.map((propertyType) => ({
      value: propertyType.en,
      label: propertyType[lang as keyof typeof propertyType],
    })),
  ], [filterValues.propertyType, t, lang]);

  const floorOptions = useMemo(() => [
    { value: "", label: t("search.filters.any") },
    { value: "1", label: "1" },
    { value: "2", label: "2" },
    { value: "3", label: "3" },
    { value: "4", label: "4+" },
  ], [t]);

  const sortOptions = useMemo(() => [
    { value: "price-cheap", label: t("search.sorting.cheapFirst") },
    { value: "price-expensive", label: t("search.sorting.expensiveFirst") },
    { value: "area-small", label: t("search.sorting.smallFirst") },
    { value: "area-large", label: t("search.sorting.largeFirst") },
  ], [t]);

  return {
    cityOptions,
    countryOptions,
    propertyTypeOptions,
    floorOptions,
    sortOptions
  };
} 