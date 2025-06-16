import { useTranslation, useLanguageQuery } from 'next-export-i18n';
import { Divider, Steps, Timeline } from 'antd';
import Icon from '@mdi/react';
import { mdiFileDocument, mdiInformation } from '@mdi/js';
import styles from './index.module.scss';
import { Breadcrumbs, ContactsBlock, ContactUs, ContainerWrapper } from '@/lib/components';
import { ClockCircleOutlined } from '@ant-design/icons';
import Head from 'next/head';
import { MetaTags } from '@/lib/types';
import { jsonLd } from '@/lib/seo/offerScheme';

export default function OfferPage({ metaTags }: { metaTags: MetaTags }) {
  const { t } = useTranslation();
  const [query] = useLanguageQuery();
  const locale = (query?.lang as 'ru' | 'en') || 'ru';
  const meta = metaTags[locale];

  const dot = <ClockCircleOutlined className={styles.clock} style={{ fontSize: '24px', marginTop: '10px' }} />;

  const timelineItems = [
    {
      dot: dot,
      children: (
        <div className={styles.stageBlock}>
          <h2>{t('offer.stages.1.title')}</h2>
          <p className={styles.description}>{t('offer.stages.1.description')}</p>
          <Steps
            direction="vertical"
            current={4}
            className={styles.customSteps}
            items={[
              {
                title: t('offer.stages.1.steps.0'),
              },
              {
                title: t('offer.stages.1.steps.1'),
              },
              {
                title: t('offer.stages.1.steps.2'),
              },
              {
                title: t('offer.stages.1.steps.3'),
              },
            ]}
          />
          {/* <div className={styles.documents}>
            <span className={styles.documentTitle}>
              {' '}
              <Icon path={mdiFileDocument} size={1} />
              <h3>{t('offer.stages.1.documents.title')}</h3>
            </span>

            <p>{t('offer.stages.1.documents.content')}</p>
          </div> */}
        </div>
      ),
    },
    {
      dot: dot,
      children: (
        <div className={styles.stageBlock}>
          <h2>{t('offer.stages.2.title')}</h2>
          <p className={styles.description}> {t('offer.stages.2.description')}</p>
          <div className={styles.documents}>
            <span className={styles.documentTitle}>
              <Icon path={mdiFileDocument} size={1} />
              <h3>{t('offer.stages.2.documents.title')}</h3>
            </span>
            <ul>
              <li>{t('offer.stages.2.documents.list.0')}</li>
              <li>{t('offer.stages.2.documents.list.1')}</li>
              <li>{t('offer.stages.2.documents.list.2')}</li>
              <li>{t('offer.stages.2.documents.list.3')}</li>
              <li>{t('offer.stages.2.documents.list.4')}</li>
              <li>{t('offer.stages.2.documents.list.5')}</li>
            </ul>
          </div>
          <div className={styles.note}>
            <Icon path={mdiInformation} size={1} />
            {t('offer.stages.2.note')}
          </div>
        </div>
      ),
    },
    {
      dot: dot,

      children: (
        <div className={styles.stageBlock}>
          <h2>{t('offer.stages.3.title')}</h2>
          <p className={styles.description}> {t('offer.stages.3.description')}</p>
          <div className={styles.documents}>
            <span className={styles.documentTitle}>
              <Icon path={mdiFileDocument} size={1} />
              <h3>{t('offer.stages.3.documents.title')}</h3>
            </span>
            <ul>
              <li>{t('offer.stages.3.documents.list.0')}</li>
              <li>{t('offer.stages.3.documents.list.1')}</li>
              <li>{t('offer.stages.3.documents.list.2')}</li>
              <li>{t('offer.stages.3.documents.list.3')}</li>
            </ul>
          </div>
          <div className={styles.note}>
            <Icon path={mdiInformation} size={1} />
            {t('offer.stages.3.note')}
          </div>
        </div>
      ),
    },
    {
      dot: dot,
      children: (
        <div className={styles.stageBlock}>
          <h2>{t('offer.stages.4.title')}</h2>
          <p className={styles.description}>{t('offer.stages.4.description')}</p>
          <div className={styles.documents}>
            <span className={styles.documentTitle}>
              <Icon path={mdiFileDocument} size={1} />
              <h3>{t('offer.stages.4.documents.title')}</h3>
            </span>
            <p>{t('offer.stages.4.documents.content')}</p>
          </div>
        </div>
      ),
    },
  ];

  return (
    <>
      <Head>
        <title>{meta.title}</title>
        <meta name="description" content={meta.description} />
        <meta name="keywords" content={meta.keywords} />
        <meta name="robots" content="index, follow" />

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
        {locale === 'ru' && (
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        )}
      </Head>
      <main className={styles.offerContainer}>
        <ContainerWrapper width="standard">
          <Breadcrumbs items={[{ href: '/offer', t: 'header.customOffers' }]} />
          <h1>{t('offer.title')}</h1>
          <div className={styles.date}>
            <time dateTime="2025-06-13">{t('offer.updated')}: 13.06.2025</time>
          </div>

          <div className={styles.intro}>
            <p>
              {t('offer.intro.part1')} {t('offer.intro.part2')}
            </p>
            <p>{t('offer.intro.part3')}</p>
          </div>
          <Timeline className={styles.timeline} items={timelineItems} />
          <div className={styles.commonDocs}>
            <h2>{t('offer.commonDocs.title')}</h2>
            <table>
              <thead>
                <tr>
                  <th>{t('offer.commonDocs.tableTitleDoc')}</th>
                  <th>{t('offer.commonDocs.tableTitleStage')}</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{t('offer.commonDocs.items.0.document')}</td>
                  <td>{t('offer.commonDocs.items.0.stage')}</td>
                </tr>
                <tr>
                  <td>{t('offer.commonDocs.items.1.document')}</td>
                  <td>{t('offer.commonDocs.items.1.stage')}</td>
                </tr>
                <tr>
                  <td>{t('offer.commonDocs.items.2.document')}</td>
                  <td>{t('offer.commonDocs.items.2.stage')}</td>
                </tr>
                <tr>
                  <td>{t('offer.commonDocs.items.3.document')}</td>
                  <td>{t('offer.commonDocs.items.3.stage')}</td>
                </tr>
                <tr>
                  <td>{t('offer.commonDocs.items.4.document')}</td>
                  <td>{t('offer.commonDocs.items.4.stage')}</td>
                </tr>
                <tr>
                  <td>{t('offer.commonDocs.items.5.document')}</td>
                  <td>{t('offer.commonDocs.items.5.stage')}</td>
                </tr>
                <tr>
                  <td>{t('offer.commonDocs.items.6.document')}</td>
                  <td>{t('offer.commonDocs.items.6.stage')}</td>
                </tr>
                <tr>
                  <td>{t('offer.commonDocs.items.7.document')}</td>
                  <td>{t('offer.commonDocs.items.7.stage')}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className={styles.citizenshipNote}>
            <h2>{t('offer.citizenshipNote.title')}</h2>
            <p>{t('offer.citizenshipNote.intro')}</p>
            <ul>
              <li>{t('offer.citizenshipNote.requirements.0')}</li>
              <li>{t('offer.citizenshipNote.requirements.1')}</li>
              <li>{t('offer.citizenshipNote.requirements.2')}</li>
            </ul>
            <p>{t('offer.citizenshipNote.management')}</p>
          </div>
        </ContainerWrapper>

        <ContainerWrapper width="standard" withMarginBottom>
          <p className={styles.workhours}>{t('header.workhours')}</p>

          <ContactsBlock phone email showTraditional />
          <Divider></Divider>
          <ContactUs />
        </ContainerWrapper>
      </main>
    </>
  );
}

export async function getStaticProps() {
  const metaTags = {
    ru: {
      title: 'Индивидуальные предложения - Караяка | Подбор недвижимости под ваши требования',
      description:
        'Индивидуальный подбор недвижимости в Турции и России под конкретные требования. Заполните форму и получите персональные предложения.',
      keywords:
        'индивидуальный подбор недвижимости, персональные предложения, недвижимость в Турции, недвижимость в России, помощь в поиске недвижимости',
    },
    en: {
      title: 'Custom Offers - Karayaka | Personalized Real Estate Solutions',
      description:
        'Personalized real estate selection in Turkey and Russia tailored to your specific requirements. Fill out the form and receive custom property offers.',
      keywords:
        'personalized real estate selection, custom property offers, real estate in Turkey, real estate in Russia, property search assistance',
    },
  };

  return {
    props: {
      metaTags,
    },
  };
}
