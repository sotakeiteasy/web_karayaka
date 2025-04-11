import { Ad } from "@/lib/types/ad";
import { ads } from "@/data/ads/ads";
import { Filter } from "@/lib/types/filter";
import { propertyTypeTranslations } from "@/lib/translations/propertyTypes";
import {
  countryTranslations,
  cityTranslations,
  districtTranslations,
} from "@/lib/translations/locationTypes";

export function getAllAds() {
  return ads.map((ad) => ({ params: { id: ad.id } }));
}

export function getAdById(id: string): Ad | undefined {
  return ads.find((ad) => ad.id === id);
}

export function filterAds(
  filters: Filter,
  currencyType: "rub" | "try" = "try"
): Ad[] {
  return ads.filter((ad) => {
    // Country match
    const countryMatch =
      !filters.country ||
      hasTranslationMatch(
        countryTranslations[ad.location.country],
        filters.country
      );

    // City match
    const cityMatch =
      !filters.city ||
      hasTranslationMatch(cityTranslations[ad.location.city], filters.city);

    // Property type match
    const propertyTypeMatch =
      !filters.propertyType ||
      (() => {
        const propertyTypeKey = Object.entries(propertyTypeTranslations).find(
          ([_, translations]) =>
            hasTranslationMatch(translations, filters.propertyType!)
        )?.[0];

        return propertyTypeKey === ad.propertyType;
      })();

    // Address/text search match
    const textSearchMatch =
      !filters.address ||
      (() => {
        const searchText = filters.address!.toLowerCase();

        // Check in description
        const descriptionMatch = hasTranslationMatch(
          ad.description,
          searchText
        );

        // Check in location data
        const addressMatch =
          hasTranslationMatch(
            countryTranslations[ad.location.country],
            searchText
          ) ||
          hasTranslationMatch(cityTranslations[ad.location.city], searchText) ||
          (ad.location.district &&
            hasTranslationMatch(
              districtTranslations[ad.location.district],
              searchText
            ));

        return descriptionMatch || addressMatch;
      })();

    // Other filter criteria
    const typeMatch = !filters.type || ad.type === filters.type;
    const adPrice = ad.price[currencyType] || 0;
    const minPriceMatch = !filters.minPrice || adPrice >= filters.minPrice;
    const maxPriceMatch = !filters.maxPrice || adPrice <= filters.maxPrice;
    const bedroomsMatch =
      !filters.bedrooms || ad.rooms === filters.bedrooms.toString();
    const minAreaMatch = !filters.minArea || ad.area >= filters.minArea;
    const maxAreaMatch = !filters.maxArea || ad.area <= filters.maxArea;
    const featuresMatch = !filters.features || !filters.features.length;
    const floorMatch = !filters.floor || ad.floor === filters.floor;

    // Parking logic
    const openParking = filters.open === true;
    const closedParking = filters.closed === true;

    const parkingMatch =
      (!openParking && !closedParking) || // Nothing selected - show all
      (openParking && !closedParking && (ad.parking === "open" || ad.parking === "both")) || // Only open selected
      (!openParking && closedParking && (ad.parking === "closed" || ad.parking === "both")) || // Only closed selected
      (openParking && closedParking && ad.parking === "both"); // Both selected - show only properties with both

    return (
      countryMatch &&
      cityMatch &&
      typeMatch &&
      minPriceMatch &&
      maxPriceMatch &&
      bedroomsMatch &&
      minAreaMatch &&
      maxAreaMatch &&
      featuresMatch &&
      floorMatch &&
      parkingMatch &&
      textSearchMatch &&
      propertyTypeMatch
    );
  });
}

// Helper function to check if any value in a translation object includes search text
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
  const countriesMap = new Map<
    string,
    { en: string; ru: string; tr: string }
  >();
  const citiesMap = new Map<string, { en: string; ru: string; tr: string }>();
  const propertyTypesMap = new Map<
    string,
    { en: string; ru: string; tr: string }
  >();
  const features = new Set<string>();

  ads.forEach((ad) => {
    // Add countries using data from translations
    if (ad.location.country && countryTranslations[ad.location.country]) {
      countriesMap.set(
        ad.location.country,
        countryTranslations[ad.location.country]
      );
    }

    // Add cities using data from translations
    if (ad.location.city && cityTranslations[ad.location.city]) {
      citiesMap.set(ad.location.city, cityTranslations[ad.location.city]);
    }

    // Add property types using existing translations
    propertyTypesMap.set(
      ad.propertyType,
      propertyTypeTranslations[ad.propertyType]
    );
  });

  return {
    countries: Array.from(countriesMap.values()),
    cities: Array.from(citiesMap.values()),
    propertyType: Array.from(propertyTypesMap.values()),
    features: Array.from(features),
  };
}
