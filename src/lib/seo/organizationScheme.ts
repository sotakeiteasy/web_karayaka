import { contactInfo } from '../constants';

export const organizationScheme = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  'name': contactInfo.company,
  'url': 'https://karayaka.ru',
  'logo': 'https://karayaka.ru/logo.png',
  'email': contactInfo.email,
  'telephone': contactInfo.phone,
  'founder': {
    '@type': 'Person',
    'name': contactInfo.founder,
  },
  'image': {
    '@type': 'ImageObject',
    'url': 'https://karayaka.ru/logo.png',
  },
  'address': {
    '@type': 'PostalAddress',
    'streetAddress': contactInfo.address,
    'addressLocality': contactInfo.city,
    'postalCode': contactInfo.postcode,
    'addressCountry': 'RU',
  },
  'sameAs': [contactInfo.telegram, contactInfo.whatsapp],
};
