
// Типы для стран
export const countryTranslations: Record<string, {ru: string, en: string, tr: string}> ={
    'Turkey': {
      ru: 'Турция',
      en: 'Turkey',
      tr: 'Türkiye'
    },
    'Russia': {
      ru: 'Россия',
      en: 'Russia',
      tr: 'Rusya'
    }
  } as const;

  export type Country = 'Turkey' | 'Russia';
  
  // Типы для городов
  export const cityTranslations: Record<string, {ru: string, en: string, tr: string}> = {
    'Antalya': {
      ru: 'Анталья',
      en: 'Antalya',
      tr: 'Antalya'
    },
    'İstanbul': {
      ru: 'Стамбул',
      en: 'Istanbul',
      tr: 'İstanbul'
    },
    'Moscow': {
      ru: 'Москва',
      en: 'Moscow',
      tr: 'Moskova'
    }
  };
  
  export type City = keyof typeof cityTranslations;
  
  // Типы для районов
  export const districtTranslations: Record<string, {ru: string, en: string, tr: string}> = {
    'Alanya': {
      ru: 'Алания',
      en: 'Alanya',
      tr: 'Alanya'
    },
    'Ataşehir': {
      ru: 'Аташехир',
      en: 'Atasehir',
      tr: 'Ataşehir'
    },
    'Bahçelievler': {
      ru: 'Бахчелиэвлер',
      en: 'Bahcelievler',
      tr: 'Bahçelievler'
    },
    'Bakırköy': {
      ru: 'Бакыркёй',
      en: 'Bakirkoy',
      tr: 'Bakırköy'
    },
    'Beşiktaş': {
      ru: 'Бешикташ',
      en: 'Besiktas',
      tr: 'Beşiktaş'
    },
    'Beykoz': {
      ru: 'Бейкоз',
      en: 'Beykoz',
      tr: 'Beykoz'
    },
    'Brusnika': {
      ru: 'Брусника',
      en: 'Brusnika',
      tr: 'Brusnika'
    },
    'Kadıköy': {
      ru: 'Кадыкёй',
      en: 'Kadikoy',
      tr: 'Kadıköy'
    },
    'Kaş': {
      ru: 'Каш',
      en: 'Kas',
      tr: 'Kaş'
    },
    'Level': {
      ru: 'Левел',
      en: 'Level',
      tr: 'Level'
    },
    'Maltepe': {
      ru: 'Малтепе',
      en: 'Maltepe',
      tr: 'Maltepe'
    },
    'Muratpaşa': {
      ru: 'Муратпаша',
      en: 'Muratpasa',
      tr: 'Muratpaşa'
    },
    'Sarıyer': {
      ru: 'Сарыер',
      en: 'Sariyer',
      tr: 'Sarıyer'
    }
  };
  
  export type District = keyof typeof districtTranslations;
  