import { useMemo } from 'react';
import { getUniqueFilterValues } from '@/lib/utils';
import { useTranslation } from 'next-export-i18n';
import { FILTER_MAPPINGS } from '@/lib/constants/filterOptions';
import { CountryType, SearchType } from '../types/FilterTypes';

export function useFilterOptions(
  country: string | undefined,
  city: string | undefined,
  lang: 'ru' | 'en',
  type: SearchType,
  rate: number | null | undefined
) {
  const { t } = useTranslation();

  // useMemo have a sense, because we call getUniqieFilterValues only once
  const filterValues = useMemo(() => getUniqueFilterValues(type), []);

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

    if (country === CountryType.Turkey) {
      const turkishCities = FILTER_MAPPINGS.countries.turkey || [];
      const turkishDistricts = turkishCities.flatMap((cityName) => {
        const key = cityName.toLowerCase() as keyof typeof FILTER_MAPPINGS.cities;
        return FILTER_MAPPINGS.cities[key];
      });

      return filterValues.district.filter((district) => turkishDistricts.includes(district.en));
    } else if (country === CountryType.Russia) {
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

  const propertyTypeSource =
    country && filterValues.byCountry?.[country]?.propertyType?.length
      ? filterValues.byCountry[country].propertyType
      : filterValues.propertyType;

  const propertyTypeOptions = propertyTypeSource.map((propertyType) => ({
    value: propertyType.en,
    label: propertyType[lang],
  }));

  function parseBedroom(value: string) {
    const [bedroom, guestRoom] = value.split('+');
    return {
      bedroom: Number(bedroom),
      guestRoom: guestRoom !== undefined ? Number(guestRoom) : null,
    };
  }

  const bedroomSource =
    country && filterValues.byCountry?.[country]?.bedroom?.length
      ? filterValues.byCountry[country].bedroom
      : filterValues.bedroom;

  const bedroomOptions = bedroomSource
    .map((bedroom) => ({
      value: bedroom.en,
      label: bedroom[lang],
    }))
    .sort((a, b) => {
      const aParsed = parseBedroom(a.value);
      const bParsed = parseBedroom(b.value);
      if (aParsed.bedroom !== bParsed.bedroom) {
        return aParsed.bedroom - bParsed.bedroom;
      }
      if (aParsed.guestRoom === null && bParsed.guestRoom !== null) return -1;
      if (aParsed.guestRoom !== null && bParsed.guestRoom === null) return 1;
      if (aParsed.guestRoom !== null && bParsed.guestRoom !== null) {
        return aParsed.guestRoom - bParsed.guestRoom;
      }
      return 0;
    });

  const countryBucket = country ? filterValues.byCountry?.[country] : undefined;

  const allBuckets = Object.values(filterValues.byCountry ?? {});
  const globalAreaMin = allBuckets
    .map((b: any) => b.area?.min)
    .filter((v) => typeof v === 'number')
    .reduce((acc, v) => Math.min(acc, v), Number.POSITIVE_INFINITY);
  const globalAreaMax = allBuckets
    .map((b: any) => b.area?.max)
    .filter((v) => typeof v === 'number')
    .reduce((acc, v) => Math.max(acc, v), Number.NEGATIVE_INFINITY);

  const areaRange = {
    min: countryBucket?.area?.min ?? (isFinite(globalAreaMin) ? globalAreaMin : 0),
    max: countryBucket?.area?.max ?? (isFinite(globalAreaMax) ? globalAreaMax : 0),
  };

  const isNum = (v: unknown): v is number => typeof v === 'number' && Number.isFinite(v);
  const toRub = (tryVal: number) => Math.round(((tryVal || 0) * (rate ?? 0)) / 1000) * 1000;

  const globalRubMin = allBuckets
    .map((b) => (b.price?.currency === 'rub' ? b.price?.min : null))
    .filter(isNum)
    .reduce((acc, v) => Math.min(acc, v), Number.POSITIVE_INFINITY);

  const globalRubMax = allBuckets
    .map((b) => (b.price?.currency === 'rub' ? b.price?.max : null))
    .filter(isNum)
    .reduce((acc, v) => Math.max(acc, v), Number.NEGATIVE_INFINITY);

  const globalTryMin = allBuckets
    .map((b) => (b.price?.currency === 'try' ? b.price?.min : null))
    .filter(isNum)
    .reduce((acc, v) => Math.min(acc, v), Number.POSITIVE_INFINITY);

  const globalTryMax = allBuckets
    .map((b) => (b.price?.currency === 'try' ? b.price?.max : null))
    .filter(isNum)
    .reduce((acc, v) => Math.max(acc, v), Number.NEGATIVE_INFINITY);

  let priceRange: { currency: 'rub' | 'try'; min: number; max: number };

  if (country === 'Russia') {
    priceRange = {
      currency: 'rub',
      min: isNum(countryBucket?.price?.min) ? countryBucket!.price.min! : isFinite(globalRubMin) ? globalRubMin : 0,
      max: isNum(countryBucket?.price?.max) ? countryBucket!.price.max! : isFinite(globalRubMax) ? globalRubMax : 0,
    };
  } else {
    // Turkey
    if (lang === 'en') {
      priceRange = {
        currency: 'try',
        min: isNum(countryBucket?.price?.min) ? countryBucket!.price.min! : isFinite(globalTryMin) ? globalTryMin : 0,
        max: isNum(countryBucket?.price?.max) ? countryBucket!.price.max! : isFinite(globalTryMax) ? globalTryMax : 0,
      };
    } else {
      // lang === 'ru' → рубли (конвертируем из TRY)
      priceRange = {
        currency: 'rub',
        min: isNum(countryBucket?.price?.min)
          ? toRub(countryBucket!.price.min!)
          : isFinite(globalTryMin)
          ? toRub(globalTryMin)
          : 0,
        max: isNum(countryBucket?.price?.max)
          ? toRub(countryBucket!.price.max!)
          : isFinite(globalTryMax)
          ? toRub(globalTryMax)
          : 0,
      };
    }
  }

  return {
    districtOptions,
    cityOptions,
    countryOptions,
    propertyTypeOptions,
    floorOptions,
    bedroomOptions,
    sortOptions,
    areaRange,
    priceRange,
  };
}
