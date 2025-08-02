export const contactInfo = {
  phone: '+7 (919) 107-99-17',
  email: 'info@karayaka.ru',
  telegram: 'https://t.me/yselimmm',
  whatsapp: 'https://wa.me/905324694993',
  address: 'Г.МОСКВА, ВН.ТЕР.Г. МУНИЦИПАЛЬНЫЙ ОКРУГ НАГОРНЫЙ, УЛ БОЛОТНИКОВСКАЯ, Д. 7 К. 1, ПОМЕЩ. 3Ц',
  addressShort: 'Москва, ул. Болотниковская 7к1, помещение 3Ц',
  addressShortEn: 'Moscow, Bolotnikovskaya st., 7 bld. 1, room 3ts',
  postcode: 117556,
  founder: 'Караяка Явуз Селим',
  city: 'Москва',
  company: 'Караяка',
} as const;

export type ContactInfo = typeof contactInfo;
