export const propertyTypeTranslations = {
  apartment: {
    ru: 'Квартира',
    en: 'Apartment',
    tr: 'Daire'
  },
  house: {
    ru: 'Дом',
    en: 'House',
    tr: 'Ev'
  },
  villa: {
    ru: 'Вилла',
    en: 'Villa',
    tr: 'Villa'
  },
  land: {
    ru: 'Участок',
    en: 'Land',
    tr: 'Arsa'
  },
  commercial: {
    ru: 'Коммерческая недвижимость',
    en: 'Commercial Property',
    tr: 'Ticari Gayrimenkul'
  }
} as const;

export type PropertyType = keyof typeof propertyTypeTranslations; 