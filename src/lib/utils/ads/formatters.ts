import { Ad } from '@/lib/types';
import {
  countryTranslations,
  cityTranslations,
  districtTranslations,
  propertyTypeTranslations,
} from '@/lib/translations';

export function getPropertyTitle(ad: Ad, lang: 'ru' | 'en', t: (key: string) => string): string {
  switch (ad.propertyType) {
    case 'apartment':
      return `${ad.rooms} ${t('ad.property.room')} ${propertyTypeTranslations[ad.propertyType][lang]}`;
    case 'villa':
    case 'commercial':
    case 'land':
      return `${propertyTypeTranslations[ad.propertyType][lang]}, ${ad.area}${t('ad.property.squareMeters')}²`;
    default:
      return propertyTypeTranslations[ad.propertyType][lang];
  }
}

export function getLocationString(ad: Ad, lang: 'ru' | 'en'): string {
  return [
    countryTranslations[ad.location.country][lang],
    cityTranslations[ad.location.city][lang],
    ad.location.district ? districtTranslations[ad.location.district]?.[lang] : null,
  ]
    .filter(Boolean)
    .join(', ');
}
