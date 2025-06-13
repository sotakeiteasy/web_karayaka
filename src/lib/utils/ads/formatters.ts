import { Ad } from '@/lib/types';
import {
  propertyTypeTranslations,
  cityTranslations,
  districtTranslations,
  countryTranslations,
} from '@/lib/translations';
import { PropertyType } from '@/lib/types/FilterTypes';

type Gender = 'f' | 'm';
type AdjectiveKey = keyof typeof adjectives;

const adjectiveVariants: Record<PropertyType, Gender> = {
  apartment: 'f',
  villa: 'f',
  commercial: 'f',
  land: 'm',
};

const adjectives = {
  modern: { ru: { f: 'Современная', m: 'Современный' }, en: 'Modern' },
  cozy: { ru: { f: 'Уютная', m: 'Уютный' }, en: 'Cozy' },
  spacious: { ru: { f: 'Просторная', m: 'Просторный' }, en: 'Spacious' },
  investment: { ru: { f: 'Инвестиционная', m: 'Инвестиционный' }, en: 'Investment' },
  prestige: { ru: { f: 'Престижная', m: 'Престижный' }, en: 'Prestigious' }, // ✅ новое
};

const units = {
  room: { ru: '-комн.', en: '-room' },
  squareMeters: { ru: 'м²', en: 'm²' },
};

function pickAdjective(key: AdjectiveKey, lang: 'ru' | 'en', gender?: Gender): string {
  const adjective = adjectives[key];

  return lang === 'ru' ? adjective.ru[gender ?? 'f'] : adjective.en;
}

function getAdjective(ad: Ad, lang: 'ru' | 'en'): { main?: string; postfix?: string } {
  const gender = lang === 'ru' ? adjectiveVariants[ad.propertyType] : undefined;
  const area = ad.area || 0;
  const age = ad.age ? parseInt(ad.age) : null;
  const city = ad.location.city?.toLowerCase() ?? '';
  if (ad.propertyType === 'commercial' || ad.propertyType === 'land') {
    return { main: pickAdjective('investment', lang, gender) };
  }

  if ((city === 'moscow' || city === 'istanbul') && area > 95) {
    return { main: pickAdjective('prestige', lang, gender) };
  }

  if (age !== null && age <= 4) {
    return { main: pickAdjective('modern', lang, gender) };
  }

  if (area && area <= 80) {
    return { main: pickAdjective('cozy', lang, gender) };
  }

  return { main: pickAdjective('spacious', lang, gender) };
}

export function getPropertyTitle(ad: Ad, lang: 'ru' | 'en'): string {
  const propType = propertyTypeTranslations[ad.propertyType][lang].toLowerCase();
  const { main, postfix } = getAdjective(ad, lang);
  const roomUnit = units.room[lang];
  const sqmUnit = units.squareMeters[lang];

  const parts: string[] = [];

  if (main) parts.push(main);

  if (ad.propertyType === 'apartment' && ad.rooms) {
    parts.push(`${ad.rooms}${roomUnit}`);
  }

  parts.push(propType);

  if (ad.area && ad.propertyType !== 'apartment') {
    parts.push(`${ad.area}${sqmUnit}`);
  }

  const title = parts.join(' ').trim();

  return postfix ? `${title} ${postfix}` : title;
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
