import { Ad, Filter } from '@/lib/types';
import rawAds from '@/data/ads/ads.json';

import {
  propertyTypeTranslations,
  countryTranslations,
  cityTranslations,
  districtTranslations,
} from '@/lib/translations';

const ads = rawAds as unknown as Ad[];

export function getAllAds() {
  return ads.map((ad) => ({ params: { id: ad.id } }));
}

export function getAdById(id: string): Ad | undefined {
  return ads.find((ad) => ad.id === id);
}

export function filterAds(filters: Filter): Ad[] {
  if (Object.keys(filters).length === 0) {
    return ads;
  }

  return ads.filter((ad) => {
    if (filters.type && ad.type !== filters.type) return false;

    if (filters.minPrice || filters.maxPrice) {
      const adPriceRub = ad.price.rub || 0;
      const adPriceTry = ad.price.try || 0;

      const passesMinPrice = !filters.minPrice || (adPriceRub >= filters.minPrice && adPriceTry >= filters.minPrice);
      const passesMaxPrice = !filters.maxPrice || (adPriceRub <= filters.maxPrice && adPriceTry <= filters.maxPrice);

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
        !filters.bedroom.some((d) => ad.rooms !== null && hasTranslationMatch({ ru: ad.rooms, en: ad.rooms }, d))
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

export function getUniqueFilterValues() {
  const countriesMap = new Map<string, { en: string; ru: string }>();
  const citiesMap = new Map<string, { en: string; ru: string }>();
  const districtMap = new Map<string, { en: string; ru: string }>();
  const propertyTypesMap = new Map<string, { en: string; ru: string }>();
  const bedroomMap = new Map<string, { en: string; ru: string }>();

  ads.forEach((ad, index) => {
    if (!countryTranslations[ad.location.country]) {
      throw new Error(
        `Translation not found for country "${ad.location.country}" in ad #${index}, ID: ${ad.id || 'unknown'}`
      );
    }
    countriesMap.set(ad.location.country, countryTranslations[ad.location.country]);

    if (!cityTranslations[ad.location.city]) {
      throw new Error(
        `Translation not found for city "${ad.location.city}" in ad #${index}, ID: ${ad.id || 'unknown'}`
      );
    }
    citiesMap.set(ad.location.city, cityTranslations[ad.location.city]);

    if (ad.location.district) {
      if (!districtTranslations[ad.location.district]) {
        throw new Error(
          `Translation not found for district "${ad.location.district}" in ad #${index}, ID: ${ad.id || 'unknown'}`
        );
      }
      districtMap.set(ad.location.district, districtTranslations[ad.location.district]);
    }

    if (!propertyTypeTranslations[ad.propertyType]) {
      throw new Error(
        `Translation not found for property type "${ad.propertyType}" in ad #${index}, ID: ${ad.id || 'unknown'}`
      );
    }
    propertyTypesMap.set(ad.propertyType, propertyTypeTranslations[ad.propertyType]);

    if (ad.rooms) {
      bedroomMap.set(ad.rooms, { en: ad.rooms, ru: ad.rooms });
    }
  });

  return {
    countries: Array.from(countriesMap.values()),
    cities: Array.from(citiesMap.values()),
    district: Array.from(districtMap.values()),
    propertyType: Array.from(propertyTypesMap.values()),
    bedroom: Array.from(bedroomMap.values()),
  };
}
