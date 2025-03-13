import { Ad } from '../types/ad';

export const ads: Ad[] = [
  {
    id: '1',
    title: {
      ru: 'Современные апартаменты с видом на море',
      en: 'Modern apartments with sea view',
    },
    description: {
      ru: 'Прекрасные апартаменты с панорамным видом на Средиземное море. Современная отделка, полностью меблированы.',
      en: 'Beautiful apartments with panoramic views of the Mediterranean Sea. Modern finishes, fully furnished.',
    },
    price: 150000,
    location: {
      country: 'Turkey',
      city: 'Antalya',
      district: 'Konyaalti',
      coordinates: {
        lat: 36.8841,
        lng: 30.7056,
      },
    },
    type: 'sale',
    features: ['sea view', 'swimming pool', 'security', 'parking'],
    area: 120,
    bedrooms: 2,
    bathrooms: 2,
    images: ['/images/apartments1.jpg', '/images/apartments1-2.jpg'],
    createdAt: '2023-01-15T12:00:00Z',
    updatedAt: '2023-01-15T12:00:00Z',
    highlighted: true,
  },
  {
    id: '2',
    title: {
      ru: 'Уютная вилла в закрытом комплексе',
      en: 'Cozy villa in a gated community',
    },
    description: {
      ru: 'Просторная вилла с садом и бассейном в охраняемом комплексе. Идеально для семейного проживания.',
      en: 'Spacious villa with garden and pool in a gated community. Perfect for family living.',
    },
    price: 350000,
    location: {
      country: 'Turkey',
      city: 'Alanya',
      district: 'Mahmutlar',
      coordinates: {
        lat: 36.5361,
        lng: 32.0164,
      },
    },
    type: 'sale',
    features: ['private pool', 'garden', 'security', 'parking', 'air conditioning'],
    area: 250,
    bedrooms: 4,
    bathrooms: 3,
    images: ['/images/villa1.jpg', '/images/villa1-2.jpg'],
    createdAt: '2023-02-10T15:30:00Z',
    updatedAt: '2023-02-10T15:30:00Z',
  },
  {
    id: '3',
    title: {
      ru: 'Квартира для аренды в центре Москвы',
      en: 'Apartment for rent in Moscow city center',
    },
    description: {
      ru: 'Стильная квартира в центре города с отличной транспортной доступностью. Рядом метро и парки.',
      en: 'Stylish apartment in the city center with excellent transport accessibility. Near metro and parks.',
    },
    price: 1500,
    location: {
      country: 'Russia',
      city: 'Moscow',
      district: 'Tverskoy',
      address: 'Тверская ул., 15',
      coordinates: {
        lat: 55.7602,
        lng: 37.6186,
      },
    },
    type: 'rent',
    features: ['city center', 'metro nearby', 'fully furnished', 'air conditioning'],
    area: 80,
    bedrooms: 2,
    bathrooms: 1,
    images: ['/images/moscow-apt1.jpg', '/images/moscow-apt1-2.jpg'],
    createdAt: '2023-03-05T10:15:00Z',
    updatedAt: '2023-03-05T10:15:00Z',
  },
];
