import { Ad } from '@/lib/types/ad';
import { ads } from '@/data/ads/ads';
import { Filter } from '@/lib/types/filter';
import { propertyTypeTranslations } from '@/lib/translations/propertyTypes';
import {
  countryTranslations,
  cityTranslations,
  districtTranslations,
} from '@/lib/translations/locationTypes';

export function getAllAds() {
  return ads.map((ad) => ({ params: { id: ad.id } }));
}

export function getAdById(id: string): Ad | undefined {
  return ads.find((ad) => ad.id === id);
}

export function filterAds(
  filters: Filter,
  currencyType: 'rub' | 'try' = 'try'
): Ad[] {
  if (Object.keys(filters).length === 0) {
    return ads;
  }

  return ads.filter((ad) => {
    if (filters.type && ad.type !== filters.type) return false;

    const adPrice = ad.price[currencyType] || 0;
    if (filters.minPrice && adPrice < filters.minPrice) return false;
    if (filters.maxPrice && adPrice > filters.maxPrice) return false;

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

    if (
      filters.country &&
      !hasTranslationMatch(
        countryTranslations[ad.location.country],
        filters.country
      )
    ) {
      return false;
    }

    if (
      filters.city &&
      !hasTranslationMatch(cityTranslations[ad.location.city], filters.city)
    ) {
      return false;
    }

    if (filters.propertyType) {
      const matchesPropertyType = Object.entries(propertyTypeTranslations).some(
        ([key, translations]) =>
          key === ad.propertyType &&
          hasTranslationMatch(translations, filters.propertyType!)
      );
      if (!matchesPropertyType) return false;
    }

    // Поиск по тексту/адресу
    if (filters.address) {
      const searchText = filters.address.toLowerCase();

      const descriptionMatch = hasTranslationMatch(ad.description, searchText);
      const countryMatch = hasTranslationMatch(
        countryTranslations[ad.location.country],
        searchText
      );
      const cityMatch = hasTranslationMatch(
        cityTranslations[ad.location.city],
        searchText
      );
      const districtMatch =
        ad.location.district &&
        hasTranslationMatch(
          districtTranslations[ad.location.district],
          searchText
        );

      if (!descriptionMatch && !countryMatch && !cityMatch && !districtMatch) {
        return false;
      }
    }

    return true;
  });
}

function hasTranslationMatch(
  translationObj: Record<string, string | null> | undefined,
  searchText: string
): boolean {
  if (!translationObj) return false;

  const normalizedSearch = searchText.toLowerCase();
  return Object.values(translationObj).some(
    (value) => value && value.toLowerCase().includes(normalizedSearch)
  );
}

export function getUniqueFilterValues() {
  const countriesMap = new Map<string, { en: string; ru: string }>();
  const citiesMap = new Map<string, { en: string; ru: string }>();
  const propertyTypesMap = new Map<string, { en: string; ru: string }>();

  ads.forEach((ad) => {
    // Add countries using data from translations
    if (ad.location.country && countryTranslations[ad.location.country]) {
      countriesMap.set(
        ad.location.country,
        countryTranslations[ad.location.country]
      );
    }

    if (ad.location.city && cityTranslations[ad.location.city]) {
      citiesMap.set(ad.location.city, cityTranslations[ad.location.city]);
    }

    propertyTypesMap.set(
      ad.propertyType,
      propertyTypeTranslations[ad.propertyType]
    );
  });

  return {
    countries: Array.from(countriesMap.values()),
    cities: Array.from(citiesMap.values()),
    propertyType: Array.from(propertyTypesMap.values()),
  };
}
