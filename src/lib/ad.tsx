import { Ad } from "@/lib/types/ad";
import { ads } from "@/data/ads";
import { Filter } from "@/lib/types/filter";

export function getAllAds() {
    return ads.map(ad => ({ params: {id: ad.id}}))
}

export function getAdById(id: string): Ad | undefined {
    return ads.find(ad => ad.id === id);
}

export function filterAds(filters: Filter): Ad[]{
    return ads.filter(ad =>
        (!filters.country || ad.location.country === filters.country) &&
        (!filters.city || ad.location.city === filters.city) &&
        (!filters.district || ad.location.district === filters.district) &&
        (!filters.type || ad.type === ad.type) &&
        (!filters.minPrice || ad.price <= filters.minPrice) &&
        (!filters.maxPrice || ad.price >= filters.maxPrice) &&
        (!filters.bedrooms || ad.bedrooms === filters.bedrooms) &&
        (!filters.minArea || ad.area >= filters.minArea) &&
        (!filters.maxArea || ad.area <= filters.maxArea) &&
        (!filters.features || filters.features.every(feature => ad.features.includes(feature)))
    )
}

// Unique values for filters
export function getUniqueFilterValues() {
  const countries = [...new Set(ads.map(ad => ad.location.country))];
  const cities = [...new Set(ads.map(ad => ad.location.city))];
  const districts = [...new Set(ads.map(ad => ad.location.district))];
  const features = [...new Set(ads.flatMap(ad => ad.features))];

  return { countries, cities, districts, features };
}

// reproduce with custom function
// const countries: string[] = [];
// ads.forEach(ad => {
//     if (!countries.includes(ad.location.country)) {
//         countries.push(ad.location.country)
//     }
// });





