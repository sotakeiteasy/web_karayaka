import { Ad } from "@/lib/types/ad";
import { ads } from "@/data/ads";
import { Filter } from "@/lib/types/filter";
import { propertyTypeTranslations } from "./translations/propertyTypes";

export function getAllAds() {
    return ads.map(ad => ({ params: {id: ad.id}}))
}

export function getAdById(id: string): Ad | undefined {
    return ads.find(ad => ad.id === id);
}

// export function filterAds(filters: Filter): Ad[]{
//     return ads.filter(ad =>
//         (!filters.country || ad.location.country === filters.country) &&
//         (!filters.city || ad.location.city === filters.city) &&
//         (!filters.district || ad.location.district === filters.district) &&
//         (!filters.type || ad.type === ad.type) &&
//         (!filters.minPrice || ad.price <= filters.minPrice) &&
//         (!filters.maxPrice || ad.price >= filters.maxPrice) &&
//         (!filters.bedrooms || ad.bedrooms === filters.bedrooms) &&
//         (!filters.minArea || ad.area >= filters.minArea) &&
//         (!filters.maxArea || ad.area <= filters.maxArea) &&
//         (!filters.features || filters.features.every(feature => ad.features.includes(feature)))
//     )
// }


export function filterAds(filters: Filter, currencyType: 'rub' | 'usd' | 'try' = 'usd'): Ad[] {
    return ads.filter(ad => {
        // Проверка страны по всем доступным языкам
        const countryMatch = !filters.country || Object.values(ad.location.country).some(
            value => value && value.toLowerCase().includes(filters.country!.toLowerCase())
        );
        
        // Проверка города по всем доступным языкам
        const cityMatch = !filters.city || Object.values(ad.location.city).some(
            value => value && value.toLowerCase().includes(filters.city!.toLowerCase())
        );
        
        // Проверка типа жилья с учетом локализации
        const propertyTypeMatch = !filters.propertyType || (() => {
            const propertyTypeKey = Object.entries(propertyTypeTranslations).find(([_, translations]) => 
                Object.values(translations).some(value => 
                    value.toLowerCase() === filters.propertyType!.toLowerCase()
                )
            )?.[0];
            
            return propertyTypeKey === ad.propertyType;
        })();
        
        // Проверка района по всем доступным языкам
        const districtMatch = !filters.district || Object.values(ad.location.district).some(
            value => value && value.toLowerCase().includes(filters.district!.toLowerCase())
        );
        
        // Расширенный поиск по тексту (заголовок, описание, адрес)
        const textSearchMatch = !filters.address || (() => {
            const searchText = filters.address!.toLowerCase();
            
            // Поиск в заголовке на всех языках
            const titleMatch = Object.values(ad.title).some(
                value => value && value.toLowerCase().includes(searchText)
            );
            
            // Поиск в описании на всех языках
            const descriptionMatch = Object.values(ad.description).some(
                value => value && value.toLowerCase().includes(searchText)
            );
            
            // Поиск в адресе на всех языках
            const addressMatch = (
                // Поиск в названии улицы
                (ad.location.address?.street && Object.values(ad.location.address.street).some(
                    value => value && value.toLowerCase().includes(searchText)
                )) ||
                // Поиск в названии страны
                Object.values(ad.location.country).some(
                    value => value && value.toLowerCase().includes(searchText)
                ) ||
                // Поиск в названии города
                Object.values(ad.location.city).some(
                    value => value && value.toLowerCase().includes(searchText)
                ) ||
                // Поиск в названии района
                Object.values(ad.location.district).some(
                    value => value && value.toLowerCase().includes(searchText)
                ) ||
                // Поиск в номере дома
                (ad.location.address?.houseNumber && 
                    ad.location.address.houseNumber.toLowerCase().includes(searchText))
            );
            
            return titleMatch || descriptionMatch || addressMatch;
        })();
        
        // Остальные проверки
        const typeMatch = !filters.type || ad.type === filters.type;
        const minPriceMatch = !filters.minPrice || ad.price[currencyType] >= filters.minPrice;
        const maxPriceMatch = !filters.maxPrice || ad.price[currencyType] <= filters.maxPrice;
        const bedroomsMatch = !filters.bedrooms || ad.rooms === filters.bedrooms;
        const minAreaMatch = !filters.minArea || ad.area >= filters.minArea;
        const maxAreaMatch = !filters.maxArea || ad.area <= filters.maxArea;
        const featuresMatch = !filters.features || !filters.features.length || 
            filters.features.every(feature => ad.features.includes(feature));
        const floorMatch = !filters.floor || ad.floor === filters.floor;
        const parkingMatch = filters.parking === undefined || ad.parking === filters.parking;
        const balconyMatch = filters.balcony === undefined || ad.balcony === filters.balcony;
        const furnishedMatch = filters.furnished === undefined || ad.furnished === filters.furnished;
        
        return countryMatch && cityMatch && districtMatch && typeMatch && 
               minPriceMatch && maxPriceMatch && bedroomsMatch && 
               minAreaMatch && maxAreaMatch && featuresMatch && 
               floorMatch && parkingMatch && balconyMatch && 
               furnishedMatch && textSearchMatch && propertyTypeMatch;
    });
}


// const citiesByCountry: Record<string, string[]> = {
//     'Россия': ['Москва', 'Санкт-Петербург', 'Новосибирск'],
//     'США': ['Нью-Йорк', 'Лос-Анджелес', 'Чикаго'],
// };

// Unique values for filters
// export function getUniqueFilterValues() {
//   const countries = [...new Set(ads.map(ad => ad.location.country))];
//   const cities = [...new Set(ads.map(ad => ad.location.city))];
//   const districts = [...new Set(ads.map(ad => ad.location.district))];
//   const features = [...new Set(ads.flatMap(ad => ad.features))];

//   return { countries, cities, districts, features };
// }


export function getUniqueFilterValues() {
    // Используем Map чтобы гарантировать уникальность по полю en
    const countriesMap = new Map<string, { en: string, ru: string }>();
    const citiesMap = new Map<string, { en: string, ru: string }>();
    const propertyTypesMap = new Map<string, { en: string, ru: string }>();
    const features = new Set<string>();

    ads.forEach(ad => {
        // Добавляем страны с проверкой уникальности по en
        if (ad.location.country.en) {
            countriesMap.set(ad.location.country.en, {
                en: ad.location.country.en,
                ru: ad.location.country.ru
            });
        }
        
        // Добавляем города с проверкой уникальности по en
        if (ad.location.city.en) {
            citiesMap.set(ad.location.city.en, {
                en: ad.location.city.en,
                ru: ad.location.city.ru
            });
        }
        
        // Добавляем типы жилья с проверкой уникальности по en
        propertyTypesMap.set(ad.propertyType, {
            en: ad.propertyType,
            ru: propertyTypeTranslations[ad.propertyType]?.ru || ad.propertyType
        });
        
        // Добавляем особенности
        ad.features.forEach(feature => features.add(feature));
    });

    return {
        countries: Array.from(countriesMap.values()),
        cities: Array.from(citiesMap.values()),
        propertyType: Array.from(propertyTypesMap.values()),
        features: Array.from(features)
    };
}

  

// reproduce with custom function
// const countries: string[] = [];
// ads.forEach(ad => {
//     if (!countries.includes(ad.location.country)) {
//         countries.push(ad.location.country)
//     }
// });





