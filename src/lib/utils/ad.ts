import { Ad, Filter, SearchType } from '@/lib/types';
import rawAds from '@/data/ads/ads.json';

import {
  propertyTypeTranslations,
  countryTranslations,
  cityTranslations,
  districtTranslations,
} from '@/lib/translations';

const ads = rawAds as unknown as Ad[];

export function getAllAds() {
  return ads.map((ad) => ({
    id: ad.id,
    type: ad.type,
  }));
}

export function getAdById(id: string): Ad | undefined {
  return ads.find((ad) => ad.id === id);
}

export function filterAds(filters: Filter, rate: number | null | undefined, locale: 'ru' | 'en'): Ad[] {
  if (Object.keys(filters).length === 0) {
    return ads;
  }

  return ads.filter((ad) => {
    if (filters.type && ad.type !== filters.type) return false;

    // see PriceRub for conversion calculation
    const priceRub =
      !ad.price.rub && ad.price.try && rate ? Math.round((ad.price.try * rate) / 1000) * 1000 : ad.price.rub || 0;
    if (filters.minPrice || filters.maxPrice) {
      // const adPriceRub = ad.price.rub || 0;
      const adPriceTry = ad.price.try || 0;

      const passesMinPrice =
        locale === 'ru'
          ? !filters.minPrice || priceRub >= filters.minPrice
          : !filters.minPrice || (ad.price.rub && ad.price.rub >= filters.minPrice) || adPriceTry >= filters.minPrice;

      const passesMaxPrice =
        locale === 'ru'
          ? !filters.maxPrice || priceRub <= filters.maxPrice
          : !filters.maxPrice ||
            (ad.price.rub && ad.price.rub <= filters.maxPrice) ||
            (ad.price.try && ad.price.try <= filters.maxPrice);

      if (!passesMinPrice || !passesMaxPrice) return false;
    }

    if (filters.minArea && ad.area < filters.minArea) return false;
    if (filters.maxArea && ad.area > filters.maxArea) return false;

    if (filters.floor) {
      const floor = ad.floor || 0;
      switch (filters.floor) {
        case 1:
          if (floor < 0 || floor > 5) return false;
          break;
        case 2:
          if (floor < 6 || floor > 10) return false;
          break;
        case 3:
          if (floor < 10 || floor > 15) return false;
          break;
        case 4:
          if (floor < 15) return false;
          break;
      }
    }

    if (filters.country && !hasTranslationMatch(countryTranslations[ad.location.country], filters.country)) {
      return false;
    }

    if (filters.city && !hasTranslationMatch(cityTranslations[ad.location.city], filters.city)) {
      return false;
    }

    if (filters.district && !ad.location.district) {
      return false;
    }

    if (ad.location.district && filters.district && filters.district?.length > 0) {
      if (
        !filters.district.some(
          (d) => ad.location.district !== null && hasTranslationMatch(districtTranslations[ad.location.district], d)
        )
      ) {
        return false;
      }
    }

    if (filters.propertyType) {
      const matchesPropertyType = Object.entries(propertyTypeTranslations).some(
        ([key, translations]) => key === ad.propertyType && hasTranslationMatch(translations, filters.propertyType!)
      );
      if (!matchesPropertyType) return false;
    }

    if (filters.bedroom && filters.bedroom?.length > 0) {
      if (
        !ad.rooms ||
        !filters.bedroom.some((d) => ad.rooms !== null && hasExactBedroomMatch({ ru: ad.rooms, en: ad.rooms }, d))
      ) {
        return false;
      }
    }

    if (filters.address) {
      const searchText = filters.address.toLowerCase();

      const descriptionMatch = hasTranslationMatch(ad.description, searchText);
      const countryMatch = hasTranslationMatch(countryTranslations[ad.location.country], searchText);
      const cityMatch = hasTranslationMatch(cityTranslations[ad.location.city], searchText);
      const districtMatch =
        ad.location.district && hasTranslationMatch(districtTranslations[ad.location.district], searchText);

      if (!descriptionMatch && !countryMatch && !cityMatch && !districtMatch) {
        return false;
      }
    }

    return true;
  });
}

function hasTranslationMatch(translationObj: Record<string, string | null>, searchText: string): boolean {
  if (!translationObj) return false;

  const normalizedSearch = searchText.toLowerCase();
  return Object.values(translationObj).some((value) => value && value.toLowerCase().includes(normalizedSearch));
}

function hasExactBedroomMatch(translationObj: Record<string, string | null>, searchText: string): boolean {
  if (!translationObj) return false;
  return Object.values(translationObj).some((value) => value === searchText);
}

export function getUniqueFilterValues(type: SearchType) {
  type Localized = { en: string; ru: string };

  const countriesMap = new Map<string, Localized>();
  const citiesMap = new Map<string, Localized>();
  const districtMap = new Map<string, Localized>();
  const propertyTypesMap = new Map<string, Localized>();
  const bedroomMap = new Map<string, Localized>();

  type CountryBucket = {
    propertyType: Map<string, Localized>;
    bedroom: Map<string, Localized>;
    price: { minRub?: number; maxRub?: number; minTry?: number; maxTry?: number };
    area: { minArea?: number; maxArea?: number };
  };

  const byCountry = new Map<string, CountryBucket>();
  const ensureBucket = (countryKey: string): CountryBucket => {
    if (!byCountry.has(countryKey)) {
      byCountry.set(countryKey, {
        propertyType: new Map(),
        bedroom: new Map(),
        price: {},
        area: {},
      });
    }
    return byCountry.get(countryKey)!;
  };

  const updMin = (cur: number | undefined, v: number) => (cur == null ? v : Math.min(cur, v));
  const updMax = (cur: number | undefined, v: number) => (cur == null ? v : Math.max(cur, v));

  const source = ads.filter((ad) => ad.type === type);

  source.forEach((ad, index) => {
    const countryTr = countryTranslations[ad.location.country];
    if (!countryTr) {
      throw new Error(
        `Translation not found for country "${ad.location.country}" in ad #${index}, ID: ${ad.id || 'unknown'}`
      );
    }
    countriesMap.set(ad.location.country, countryTr);

    const cityTr = cityTranslations[ad.location.city];
    if (!cityTr) {
      throw new Error(
        `Translation not found for city "${ad.location.city}" in ad #${index}, ID: ${ad.id || 'unknown'}`
      );
    }
    citiesMap.set(ad.location.city, cityTr);

    if (ad.location.district) {
      const districtTr = districtTranslations[ad.location.district];
      if (!districtTr) {
        throw new Error(
          `Translation not found for district "${ad.location.district}" in ad #${index}, ID: ${ad.id || 'unknown'}`
        );
      }
      districtMap.set(ad.location.district, districtTr);
    }

    const propTr = propertyTypeTranslations[ad.propertyType];
    if (!propTr) {
      throw new Error(
        `Translation not found for property type "${ad.propertyType}" in ad #${index}, ID: ${ad.id || 'unknown'}`
      );
    }
    propertyTypesMap.set(ad.propertyType, propTr);

    if (ad.rooms) {
      const roomsLabel = String(ad.rooms);
      bedroomMap.set(roomsLabel, { en: roomsLabel, ru: roomsLabel });
    }

    const bucket = ensureBucket(ad.location.country);
    bucket.propertyType.set(ad.propertyType, propTr);
    if (ad.rooms) {
      const roomsLabel = String(ad.rooms);
      bucket.bedroom.set(roomsLabel, { en: roomsLabel, ru: roomsLabel });
    }

    if (typeof ad.area === 'number') {
      bucket.area.minArea = updMin(bucket.area.minArea, ad.area);
      bucket.area.maxArea = updMax(bucket.area.maxArea, ad.area);
    }
    const rub = typeof ad.price.rub === 'number' ? ad.price.rub : undefined;
    const tryPrice = typeof ad.price.try === 'number' ? ad.price.try : undefined;

    if (ad.location.country === 'Russia' && rub != null) {
      bucket.price.minRub = updMin(bucket.price.minRub, rub);
      bucket.price.maxRub = updMax(bucket.price.maxRub, rub);
    }
    if (ad.location.country === 'Turkey' && tryPrice != null) {
      bucket.price.minTry = updMin(bucket.price.minTry, tryPrice);
      bucket.price.maxTry = updMax(bucket.price.maxTry, tryPrice);
    }
  });

  const byCountryObj = Object.fromEntries(
    Array.from(byCountry.entries()).map(([countryKey, b]) => {
      let currency: 'rub' | 'try' | null = null;
      let min: number | null = null;
      let max: number | null = null;

      if (countryKey === 'Russia') {
        currency = 'rub';
        min = b.price.minRub ?? null;
        max = b.price.maxRub ?? null;
      } else if (countryKey === 'Turkey') {
        currency = 'try';
        min = b.price.minTry ?? null;
        max = b.price.maxTry ?? null;
      }
      return [
        countryKey,
        {
          propertyType: Array.from(b.propertyType.values()),
          bedroom: Array.from(b.bedroom.values()),
          price: { currency, min, max },
          area: { min: b.area.minArea ?? null, max: b.area.maxArea ?? null },
        },
      ];
    })
  );

  return {
    countries: Array.from(countriesMap.values()),
    cities: Array.from(citiesMap.values()),
    district: Array.from(districtMap.values()),
    propertyType: Array.from(propertyTypesMap.values()),
    bedroom: Array.from(bedroomMap.values()),
    byCountry: byCountryObj,
  };
}
