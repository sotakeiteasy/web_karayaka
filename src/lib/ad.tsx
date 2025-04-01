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

export function filterAds(filters: Filter, currencyType: 'rub' | 'try' = 'try'): Ad[] {
    // Импортируем переводы из файлов переводов
    const { countryTranslations, cityTranslations, districtTranslations } = require('./translations/locationTypes');

    return ads.filter(ad => {
        // Проверка страны
        const countryMatch = !filters.country || (() => {
            // Используем переводы для проверки соответствия
            const countryTranslation = countryTranslations[ad.location.country];
            return countryTranslation && 
                  Object.values(countryTranslation as Record<string, string>).some(value => 
                      value && value.toLowerCase().includes(filters.country!.toLowerCase())
                  );
        })();
        
        // Проверка города
        const cityMatch = !filters.city || (() => {
            // Используем переводы для проверки соответствия
            const cityTranslation = cityTranslations[ad.location.city];
            return cityTranslation && 
                  Object.values(cityTranslation as Record<string, string>).some(value => 
                      value && value.toLowerCase().includes(filters.city!.toLowerCase())
                  );
        })();
        
        // Проверка типа жилья с учетом локализации
        const propertyTypeMatch = !filters.propertyType || (() => {
            const propertyTypeKey = Object.entries(propertyTypeTranslations).find(([_, translations]) => 
                Object.values(translations).some(value => 
                    value.toLowerCase() === filters.propertyType!.toLowerCase()
                )
            )?.[0];
            
            return propertyTypeKey === ad.propertyType;
        })();
        
        // Расширенный поиск по тексту (заголовок, описание, адрес)
        const textSearchMatch = !filters.address || (() => {
            const searchText = filters.address!.toLowerCase();
            
            // Поиск в описании
            const descriptionMatch = Object.values(ad.description).some(
                value => value && value.toLowerCase().includes(searchText)
            );
            
            // Поиск в адресе
            const addressMatch = (
                // Поиск в названии страны через переводы
                (countryTranslations[ad.location.country] && 
                 Object.values(countryTranslations[ad.location.country] as Record<string, string>).some(
                    value => value && value.toLowerCase().includes(searchText)
                )) ||
                // Поиск в названии города через переводы
                (cityTranslations[ad.location.city] && 
                 Object.values(cityTranslations[ad.location.city] as Record<string, string>).some(
                    value => value && value.toLowerCase().includes(searchText)
                )) ||
                // Поиск в названии района через переводы
                (ad.location.district && districtTranslations[ad.location.district] && 
                 Object.values(districtTranslations[ad.location.district] as Record<string, string>).some(
                    value => value && value.toLowerCase().includes(searchText)
                ))
            );
            
            return descriptionMatch || addressMatch;
        })();
        
        // Остальные проверки
        const typeMatch = !filters.type || ad.type === filters.type;
        
        // Проверяем, что значение цены существует, иначе используем 0
        const adPrice = ad.price[currencyType] || 0;
        const minPriceMatch = !filters.minPrice || adPrice >= filters.minPrice;
        const maxPriceMatch = !filters.maxPrice || adPrice <= filters.maxPrice;
        
        const bedroomsMatch = !filters.bedrooms || ad.rooms === filters.bedrooms.toString();
        const minAreaMatch = !filters.minArea || ad.area >= filters.minArea;
        const maxAreaMatch = !filters.maxArea || ad.area <= filters.maxArea;
        const featuresMatch = !filters.features || !filters.features.length;
        const floorMatch = !filters.floor || ad.floor === filters.floor;
        
        // Обновленная логика для проверки парковки
        // Если ни один тип парковки не выбран, показываем все
        const openParking = filters.open === true;
        const closedParking = filters.closed === true;
        
        // Если выбран только закрытый тип, показываем только закрытые
        // Если выбран только открытый тип, показываем только открытые
        // Если выбраны оба или не выбрано ничего, показываем все
        const parkingMatch = 
            (!openParking && !closedParking) || // Ничего не выбрано - показываем всё
            (openParking && ad.parking === 'open') || // Выбрана открытая - показываем открытую
            (closedParking && ad.parking === 'closed'); // Выбрана закрытая - показываем закрытую
        
        return countryMatch && cityMatch && typeMatch && 
               minPriceMatch && maxPriceMatch && bedroomsMatch && 
               minAreaMatch && maxAreaMatch && featuresMatch && 
               floorMatch && parkingMatch && textSearchMatch && propertyTypeMatch;
    });
}

export function getUniqueFilterValues() {
    const countriesMap = new Map<string, { en: string, ru: string, tr: string }>();
    const citiesMap = new Map<string, { en: string, ru: string, tr: string }>();
    const propertyTypesMap = new Map<string, { en: string, ru: string, tr: string }>();
    const features = new Set<string>();

    // Импортируем переводы из файлов переводов
    const { countryTranslations, cityTranslations } = require('./translations/locationTypes');

    ads.forEach(ad => {
        // Добавляем страны, используя данные из переводов
        if (ad.location.country && countryTranslations[ad.location.country]) {
            const country = ad.location.country;
            countriesMap.set(country, countryTranslations[country]);
        }
        
        // Добавляем города, используя данные из переводов
        if (ad.location.city && cityTranslations[ad.location.city]) {
            const city = ad.location.city;
            citiesMap.set(city, cityTranslations[city]);
        }
        
        // Добавляем типы жилья с использованием существующих переводов
        propertyTypesMap.set(ad.propertyType, propertyTypeTranslations[ad.propertyType]);
        
        // Добавляем особенности
        // ad.features?.forEach(feature => features.add(feature));
    });

    return {
        countries: Array.from(countriesMap.values()),
        cities: Array.from(citiesMap.values()),
        propertyType: Array.from(propertyTypesMap.values()),
        features: Array.from(features)
    };
}





