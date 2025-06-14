import { contactInfo } from '../constants';
const locale = 'ru';

export const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Offer',
  'name': locale === 'ru' ? 'Индивидуальный подбор недвижимости' : 'Custom Real Estate Offer',
  'description':
    locale === 'ru'
      ? 'Заполните форму и получите персональное предложение недвижимости, подобранное под ваши требования.'
      : 'Fill out the form to receive a personalized property offer tailored to your requirements.',
  'url': 'https://karayaka.ru/offer',
  'availability': 'https://schema.org/InStock',
  'validFrom': '2025-06-13T00:00:00+03:00',
  'itemOffered': {
    '@type': 'Service',
    'serviceType': locale === 'ru' ? 'Подбор недвижимости' : 'Real Estate Selection',
    'provider': {
      '@type': 'RealEstateAgent',
      'name': 'Karayaka',
      'url': 'https://karayaka.ru',
      'telephone': contactInfo.phone,
      'logo': {
        '@type': 'ImageObject',
        'url': 'https://karayaka.ru/logo.png',
      },
      'image': {
        '@type': 'ImageObject',
        'url': 'https://karayaka.ru/logo.png',
      },
      'address': {
        '@type': 'PostalAddress',
        'addressCountry': 'RU',
      },
    },
  },
};
