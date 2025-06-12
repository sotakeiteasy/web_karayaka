import { useTranslation, useLanguageQuery } from 'next-export-i18n';
// import Icon from '@mdi/react';
import styles from './index.module.scss';
import { Breadcrumbs, ContactsBlock, ContactUs, ContainerWrapper } from '@/lib/components';
import Head from 'next/head';
import { MetaTags } from '@/lib/types';

import { getImageUrl } from '@/lib/utils';
import Image from 'next/image';

export default function ContactsPage({ metaTags }: { metaTags: MetaTags }) {
  const { t } = useTranslation();
  const [query] = useLanguageQuery();
  const locale = (query?.lang as 'ru' | 'en') || 'ru';
  const meta = metaTags[locale];

  return (
    <>
      <Head>
        <title>{meta.title}</title>
        <meta name="description" content={meta.description} />
        <meta name="keywords" content={meta.keywords} />
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta charSet="utf-8" />

        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://karayaka.ru/offer" />
        <meta property="og:title" content={meta.title} />
        <meta property="og:description" content={meta.description} />
        <meta property="og:image" content="https://karayaka.ru/og-image.png" />
        <meta property="og:image:alt" content="Karayaka Offer" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:site_name" content="Karayaka" />
        <meta property="og:locale" content={locale === 'ru' ? 'ru_RU' : 'en_US'} />
      </Head>
      <main className={styles.offerContainer}>
        <ContainerWrapper width="large" withMarginBottom={true}>
          <Breadcrumbs items={[{ href: '/contacts', t: 'header.contacts' }]} />

          <p className={styles.workhours}>{t('header.workhours')}</p>
          <ContactsBlock phone email showTraditional />

          <div className={styles.formContainer}>
            <ContactUs />
            <div className={styles.formImg}>
              <Image
                src={getImageUrl('/images/form.jpg')}
                fill={true}
                alt="form image"
                draggable="false"
                sizes="100%"
                style={{
                  objectFit: 'cover',
                  borderRadius: '0px 15px 15px 0px',
                }}
                loading="eager"
                priority
              />
            </div>
          </div>
        </ContainerWrapper>
      </main>
    </>
  );
}

export async function getStaticProps() {
  const metaTags = {
    ru: {
      title: 'Контакты - Караяка | Подбор недвижимости под ваши требования',
      description:
        'Свяжитесь с агентством Караяка. Наши представители в Турции и России готовы ответить на ваши вопросы и помочь с недвижимостью.',
      keywords: 'контакты Караяка, связь с агентством, недвижимость Турция, недвижимость Россия, как связаться Караяка',
    },
    en: {
      title: 'Contacts - Karayaka | Personalized Real Estate Solutions',
      description:
        'Get in touch with Karayaka. Our representatives in Turkey and Russia are ready to assist you with your real estate questions.',
      keywords: 'Karayaka contacts, real estate Turkey, real estate Russia, contact agency, how to contact Karayaka',
    },
  };

  return {
    props: {
      metaTags,
    },
  };
}
