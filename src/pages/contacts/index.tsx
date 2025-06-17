import styles from './index.module.scss';
import Head from 'next/head';
import { useTranslation, useLanguageQuery } from 'next-export-i18n';

import { Breadcrumbs, ContactsBlock, ContactUs, ContainerWrapper, CompanyRegistrationInfo } from '@/lib/components';
import { MetaTags } from '@/lib/types';
import { contactInfo } from '@/lib/constants';
import { Divider } from 'antd';
import { organizationScheme } from '@/lib/seo';

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

        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://karayaka.ru/contacts" />
        <meta property="og:title" content={meta.title} />
        <meta property="og:description" content={meta.description} />
        <meta property="og:image" content="https://karayaka.ru/og-image.png" />
        <meta property="og:image:alt" content="Karayaka Contacts" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:site_name" content="Karayaka" />
        <meta property="og:locale" content={locale === 'ru' ? 'ru_RU' : 'en_US'} />

        {locale === 'ru' && (
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationScheme) }} />
        )}
      </Head>
      <main className={styles.main}>
        <ContainerWrapper width="standardPlus" withMarginBottom={true}>
          <Breadcrumbs items={[{ href: '/contacts', t: 'header.contacts' }]} />
          <h1>{t('header.contacts')}</h1>
          <div className={styles.mainBlock}>
            <div className={styles.contactsAndAdress}>
              <div className={styles.address}>
                <h2>{t('contacts.ourAddress')}</h2>
                <p>{locale === 'ru' ? contactInfo.addressShort : contactInfo.addressShortEn}</p>
              </div>
              <div className={styles.contacts}>
                <p>{t('contacts.contactUs')}!</p>
                <ContactsBlock phone email showTraditional column />
              </div>
            </div>
            <div className={styles.yandexMap}>
              <iframe
                src="https://yandex.ru/map-widget/v1/?um=constructor%3Acce6310eda38e2ba4f4ddc6a0c70a3e4c7b31f682446b9217b19fe42b6c859d7&amp;source=constructor"
                width="600"
                height="400"
                frameBorder="0"
                title={t('contacts.mapTitle')}
              ></iframe>
            </div>
          </div>
          <p className={styles.workhours}>{t('header.workhours')}</p>
          <ContactUs />
          <Divider></Divider>
          <CompanyRegistrationInfo />
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
