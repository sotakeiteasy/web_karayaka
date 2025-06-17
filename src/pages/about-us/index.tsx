import styles from './index.module.scss';
import Image from 'next/image';
import { useTranslation, useLanguageQuery } from 'next-export-i18n';
import Head from 'next/head';

import {
  mdiMapMarker,
  mdiEarth,
  mdiHomeCity,
  mdiGavel,
  mdiMapSearchOutline,
  mdiPassport,
  mdiCashMultiple,
  mdiClipboardCheckMultipleOutline,
  mdiTranslate,
  mdiKeyVariant,
  mdiAccountHardHat,
  mdiStar,
  mdiHours24,
  mdiTruckFast,
} from '@mdi/js';
import Icon from '@mdi/react';

import { getImageUrl } from '@/lib/utils';
import { MetaTags } from '@/lib/types';
import { Breadcrumbs, ContactsBlock, ContainerWrapper, CompanyRegistrationInfo } from '@/lib/components';
import { Divider, CollapseProps, Collapse } from 'antd';
import { organizationScheme } from '@/lib/seo';

export default function AboutUs({ metaTags }: { metaTags: MetaTags }) {
  const { t } = useTranslation();
  const [query] = useLanguageQuery();
  const lang = (query?.lang as 'ru' | 'en') || 'ru';
  const meta = metaTags[lang];

  const questionsFAQ = {
    location: t('aboutUs.faq.questions.location'),
    period: t('aboutUs.faq.questions.period'),
    tour: t('aboutUs.faq.questions.tour'),
    contact: t('aboutUs.faq.questions.contact'),
    area: t('aboutUs.faq.questions.area'),
    personnel: t('aboutUs.faq.questions.personnel'),
  };

  const answersFAQ = {
    location: t('aboutUs.faq.answers.location'),
    period: t('aboutUs.faq.answers.period'),
    tour: t('aboutUs.faq.answers.tour'),
    contact: t('aboutUs.faq.answers.contact'),
    area: t('aboutUs.faq.answers.area'),
    personnel: t('aboutUs.faq.answers.personnel'),
  };

  const items: CollapseProps['items'] = Object.keys(questionsFAQ).map((key) => ({
    key,
    label: questionsFAQ[key as keyof typeof questionsFAQ],
    children: <p>{answersFAQ[key as keyof typeof answersFAQ]}</p>,
  }));

  const serviceIcons = [
    <Icon key="marker" path={mdiMapMarker} size={2} />,
    <Icon key="earth" path={mdiEarth} size={2} />,
    <Icon key="home" path={mdiHomeCity} size={2} />,
    <Icon key="gavel" path={mdiGavel} size={2} />,
    <Icon key="search" path={mdiMapSearchOutline} size={2} />,
    <Icon key="passport" path={mdiPassport} size={2} />,
    <Icon key="cash" path={mdiCashMultiple} size={2} />,
  ];

  const supportIcons = [
    <Icon key="clipboard" path={mdiClipboardCheckMultipleOutline} size={2} />,
    <Icon key="translate" path={mdiTranslate} size={2} />,
    <Icon key="key" path={mdiKeyVariant} size={2} />,
    <Icon key="hardhat" path={mdiAccountHardHat} size={2} />,
    <Icon key="star" path={mdiStar} size={2} />,
    <Icon key="24hours" path={mdiHours24} size={2} />,
    <Icon key="truck" path={mdiTruckFast} size={2} />,
  ];

  return (
    <>
      <Head>
        <title>{meta.title}</title>
        <meta name="description" content={meta.description} />
        <meta name="keywords" content={meta.keywords} />
        <meta name="robots" content="index, follow" />

        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://karayaka.ru/about-us" />
        <meta property="og:title" content={meta.title} />
        <meta property="og:description" content={meta.description} />
        <meta property="og:image" content="https://karayaka.ru/og-image.png" />
        <meta property="og:image:alt" content="Karayaka About Us" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:site_name" content="Karayaka" />
        <meta property="og:locale" content={lang === 'ru' ? 'ru_RU' : 'en_US'} />
        {lang === 'ru' && (
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationScheme) }} />
        )}
      </Head>

      <main className={styles.main}>
        <div className={styles.sloganBlock}>
          <Image
            src={getImageUrl('assets/images/aboutUsPage/line1.jpg')}
            alt={t('imagesAlt.view')}
            title={t('imagesAlt.view')}
            fill={true}
            style={{
              objectFit: 'cover',
            }}
            loading="eager"
            draggable="false"
            priority
          />
          <div className={styles.breadcrumbs}>
            <Breadcrumbs items={[{ href: '/about-us', t: 'header.aboutUs' }]} color={'white'} />
          </div>
          <div className={styles.slogan}>
            <p>dream</p>
            <p>find</p>
            <p>buy</p>
            <p>live</p>
          </div>
        </div>

        <ContainerWrapper width="standardPlus">
          <section className={`${styles.mainInfo} ${styles.about}`}>
            <Divider>
              <h1> {t('aboutUs.header')}</h1>
            </Divider>

            <p className={styles.description}>{t('aboutUs.description')}</p>
          </section>
          <section className={`${styles.mainInfo} ${styles.advantages}`}>
            <Divider>
              <h2>{t('aboutUs.servicesHeader')}</h2>
            </Divider>
            <div className={styles.mainList}>
              <div className={styles.grid}>
                {[1, 2, 3, 4, 5, 6, 7].map((num, index) => (
                  <div key={num} className={styles.item}>
                    <div className={styles.icon}>{serviceIcons[index]}</div>
                    <span className={styles.text}>{t(`aboutUs.servicesList.${num}`)}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>
          <div className={`${styles.mainInfo} ${styles.founder}`}>
            <div className={styles.founderPhoto}>
              <Image
                src={getImageUrl('assets/images/aboutUsPage/founder.jpg')}
                alt={t('imagesAlt.founder')}
                width={240}
                height={340}
                style={{
                  objectFit: 'cover',
                  marginTop: '-25px',
                }}
                loading="eager"
                draggable="false"
              />
            </div>
            <section className={styles.founderInfo}>
              <h2>{t('aboutUs.founderName')}</h2>
              <p className={styles.description}>{t('aboutUs.founderInfo')}</p>
            </section>
          </div>
        </ContainerWrapper>

        <div className={styles.banner}>
          <Image
            src={getImageUrl('assets/images/aboutUsPage/line2.jpg')}
            alt={t('imagesAlt.view')}
            title={t('imagesAlt.view')}
            fill={true}
            style={{
              objectFit: 'cover',
            }}
            loading="eager"
            draggable="false"
          />
        </div>

        <ContainerWrapper width="standardPlus">
          <div className={styles.statsVisuals}>
            <div className={styles.stats}>
              <section>
                <h2>{t('aboutUs.stats.forSale')}</h2>
                <p>{t('aboutUs.stats.forSaleLabel')}</p>
              </section>

              <section>
                <h2>{t('aboutUs.stats.regions')}</h2>
                <p>{t('aboutUs.stats.regionsLabel')}</p>
              </section>

              <section>
                <h2>{t('aboutUs.stats.forRent')}</h2>
                <p>{t('aboutUs.stats.forRentLabel')}</p>
              </section>
            </div>

            <div className={styles.videoContainer}>
              <video
                className={styles.video}
                loop
                autoPlay
                muted
                preload="auto"
                height={875}
                width={475}
                playsInline
                controls={false}
              >
                <source src={getImageUrl('assets/videos/About_Us.mp4')} type="video/mp4" />
                <source src={getImageUrl('assets/videos/About_Us.mov')} type="video/mov" />
                <source src={getImageUrl('assets/videos/About_Us_fallback.mp4')} type="video/mp4" />
              </video>
            </div>
          </div>

          <section className={`${styles.mainInfo} ${styles.advantages}`}>
            <Divider>
              <h2>{t('aboutUs.supportHeader')}</h2>
            </Divider>
            <div className={styles.mainList}>
              <div className={styles.grid}>
                {[1, 2, 3, 4, 5, 6, 7].map((num, index) => (
                  <div key={num} className={styles.item}>
                    <div className={styles.icon}>{supportIcons[index]}</div>
                    <span className={styles.text}>{t(`aboutUs.supportList.${num}`)}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </ContainerWrapper>

        <p className={styles.closingNote}>
          <span>{t('aboutUs.closingNote')}</span>
        </p>

        <ContainerWrapper width="standardPlus" withMarginBottom={true}>
          <div className={styles.infoBlock}>
            <section className={styles.faq}>
              <h2>{t('aboutUs.faq.title')}</h2>
              <Collapse size="large" items={items} accordion className={styles.customCollapse} />
            </section>
          </div>
          <CompanyRegistrationInfo />
          <p className={styles.workhours}>{t('header.workhours')}</p>

          <ContactsBlock phone email showTraditional />
        </ContainerWrapper>
      </main>
    </>
  );
}

export async function getStaticProps() {
  const metaTags = {
    ru: {
      title: 'О нас - Караяка | Агентство недвижимости в Турции и России',
      description:
        'Караяка - агентство недвижимости, специализирующееся на объектах в Турции и России. Индивидуальный подход к каждому клиенту и комплексное сопровождение сделок.',
      keywords: 'агентство недвижимости, о нас, недвижимость в Турции, недвижимость в России, купить недвижимость',
    },
    en: {
      title: 'About Us - Karayaka | Real Estate Agency in Turkey and Russia',
      description:
        'Karayaka is a boutique real estate agency specializing in properties in Turkey and Russia. Personalized approach and comprehensive support for every client.',
      keywords: 'real estate agency, about us, Turkey real estate, Russia real estate, buy property',
    },
  };

  return {
    props: {
      metaTags,
    },
  };
}
