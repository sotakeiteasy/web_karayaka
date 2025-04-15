import { FC } from 'react';

interface OrganizationSchemaProps {
  name: string;
  description: string;
  logo: string;
  url: string;
}

export const OrganizationSchema: FC<OrganizationSchemaProps> = ({
  name,
  description,
  logo,
  url,
}) => {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name,
    description,
    url,
    'logo': {
      '@type': 'ImageObject',
      'url': logo,
    },
    'sameAs': ['https://t.me/karayaka_real', 'https://vk.com/karayaka_real'],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
};

interface BlogPostSchemaProps {
  title: string;
  datePublished: string;
  dateModified?: string;
  description: string;
  imageUrl: string;
  articleUrl: string;
  authorName: string;
}

export const BlogPostSchema: FC<BlogPostSchemaProps> = ({
  title,
  datePublished,
  dateModified,
  description,
  imageUrl,
  articleUrl,
  authorName,
}) => {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    'mainEntityOfPage': {
      '@type': 'WebPage',
      '@id': articleUrl,
    },
    'headline': title,
    description,
    'image': imageUrl,
    datePublished,
    'dateModified': dateModified || datePublished,
    'author': {
      '@type': 'Person',
      'name': authorName,
    },
    'publisher': {
      '@type': 'Organization',
      'name': 'Karayaka',
      'logo': {
        '@type': 'ImageObject',
        'url': 'https://karayaka.ru/logo.png',
        'width': 600,
        'height': 60,
      },
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
};

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQPageSchemaProps {
  questions: FAQItem[];
  pageUrl: string;
}

export const FAQPageSchema: FC<FAQPageSchemaProps> = ({
  questions,
  pageUrl,
}) => {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'mainEntity': questions.map((item) => ({
      '@type': 'Question',
      'name': item.question,
      'acceptedAnswer': {
        '@type': 'Answer',
        'text': item.answer,
      },
    })),
    'url': pageUrl,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
};

interface RealEstateSearchSchemaProps {
  url: string;
  description: string;
  countryOptions: string[];
  cityOptions: string[];
  propertyTypeOptions: string[];
}

export const RealEstateSearchSchema: FC<RealEstateSearchSchemaProps> = ({
  url,
  description,
  countryOptions,
  cityOptions,
  propertyTypeOptions,
}) => {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    url,
    description,
    'potentialAction': {
      '@type': 'SearchAction',
      'target': {
        '@type': 'EntryPoint',
        'urlTemplate': `${url}?address={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
    'about': {
      '@type': 'RealEstateAgent',
      'name': 'Karayaka',
      'makesOffer': [
        ...countryOptions.map((country) => ({
          '@type': 'Offer',
          'itemOffered': {
            '@type': 'Service',
            'serviceType': 'Real Estate',
            'areaServed': country,
          },
        })),
        ...propertyTypeOptions.map((type) => ({
          '@type': 'Offer',
          'itemOffered': {
            '@type': 'Product',
            'category': type,
          },
        })),
      ],
      'areaServed': cityOptions,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
};

interface CustomOffersSchemaProps {
  url: string;
  description: string;
  contacts: {
    phone: string;
    email: string;
    telegram?: string;
    whatsapp?: string;
  };
}

export const CustomOffersSchema: FC<CustomOffersSchemaProps> = ({
  url,
  description,
  contacts,
}) => {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    'name': 'Karayaka Custom Real Estate Selection',
    url,
    description,
    'provider': {
      '@type': 'RealEstateAgent',
      'name': 'Karayaka',
      'logo': 'https://karayaka.ru/logo.png',
      'contactPoint': [
        {
          '@type': 'ContactPoint',
          'telephone': contacts.phone,
          'contactType': 'customer service',
          'email': contacts.email,
        },
      ],
    },
    'serviceType': 'Real Estate Consultation',
    'areaServed': ['Turkey', 'Russia'],
    'availableChannel': {
      '@type': 'ServiceChannel',
      'serviceUrl': url,
      'servicePhone': contacts.phone,
      'serviceSmsNumber': contacts.whatsapp,
    },
    'audience': {
      '@type': 'Audience',
      'audienceType': 'Property buyers and renters',
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
};
