import Head from 'next/head';
import styles from './id.module.scss';
import Image from 'antd/lib/image';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import React, { useState, useRef } from 'react';
import { useTranslation, useLanguageQuery } from 'next-export-i18n';
import Icon from '@mdi/react';

import {
  mdiMapMarkerOutline,
  mdiCircleSmall,
  mdiBedQueenOutline,
  mdiArrowExpand,
  mdiStairs,
  mdiHomeCityOutline,
  mdiKeyChain,
  mdiCheckbook,
  mdiCalendarMonth,
  mdiChevronRight,
  mdiChevronLeft,
  mdiIdentifier,
} from '@mdi/js';

import { getAllAds, getAdById, getImageUrl } from '@/lib/utils';
import { ContactUs } from '@/lib/components';
import { Ad, MetaTags } from '@/lib/types';
import {
  countryTranslations,
  cityTranslations,
  districtTranslations,
  propertyTypeTranslations,
} from '@/lib/translations';

export default function AdPage({ ad, metaTags }: { ad: Ad; metaTags: MetaTags }) {
  const { t } = useTranslation();
  const [query] = useLanguageQuery();
  const lang = (query?.lang as 'ru' | 'en') || 'ru';
  const [tooltip, setTooltip] = useState(false);

  const meta = metaTags[lang];

  const propertyTitle = (() => {
    switch (ad.propertyType) {
      case 'apartment':
        return `${ad.rooms} ${t('ad.property.room')} ${propertyTypeTranslations[ad.propertyType][lang]}`;
      case 'villa':
      case 'commercial':
      case 'land':
        return `${propertyTypeTranslations[ad.propertyType][lang]}, ${ad.area}${t('ad.property.squareMeters')}²`;
      default:
        return propertyTypeTranslations[ad.propertyType][lang];
    }
  })();

  const location = [countryTranslations[ad.location.country][lang], cityTranslations[ad.location.city][lang]]
    .filter(Boolean)
    .join(', ');

  const handleCopy = () => {
    navigator.clipboard.writeText(ad.id).then(() => setTooltip(true));
    setTimeout(() => setTooltip(false), 2000);
  };

  return (
    <>
      <Head>
        <title>{propertyTitle}</title>
        <meta name="description" content={meta.description.replace('{location}', location)} />
        <meta name="keywords" content={meta.keywords} />
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta charSet="utf-8" />

        <meta property="og:type" content="website" />
        <meta property="og:url" content={`https://karayaka.ru/ads/${ad.id}`} />
        <meta property="og:title" content={propertyTitle} />
        <meta property="og:description" content={meta.description.replace('{location}', location)} />
        <meta
          property="og:image"
          content={ad.images.length > 0 ? getImageUrl(ad.images[0]) : 'https://karayaka.ru/og-image.png'}
        />
        <meta property="og:image:alt" content={propertyTitle} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:site_name" content="Karayaka" />
        <meta property="og:locale" content={lang === 'ru' ? 'ru_RU' : 'en_US'} />
      </Head>
      <div className={styles.main}>
        <div className={styles.titleInfo}>
          <div className={styles.rightTitleInfo}>
            <p>
              {(() => {
                const typeStatus = ad.type === 'sale' ? t('ad.property.titleForSale') : t('ad.property.titleForRent');

                let propertyInfo = '';

                switch (ad.propertyType) {
                  case 'apartment':
                    propertyInfo = `${ad.rooms} ${t('ad.property.room')} ${
                      propertyTypeTranslations[ad.propertyType][lang]
                    }`;
                    break;
                  case 'villa':
                  case 'commercial':
                  case 'land':
                    propertyInfo = `${propertyTypeTranslations[ad.propertyType][lang]} ${ad.area}${t(
                      'ad.property.squareMeters'
                    )}²`;
                    break;
                  default:
                    propertyInfo = propertyTypeTranslations[ad.propertyType][lang];
                }

                if (lang === 'ru') {
                  return `${typeStatus} ${propertyInfo}`;
                } else {
                  return `${propertyInfo} ${typeStatus}`;
                }
              })()}
            </p>
            <p>
              <Icon path={mdiMapMarkerOutline} size={1} />
              {[
                countryTranslations[ad.location.country][lang],
                cityTranslations[ad.location.city][lang],
                ad.location.district ? districtTranslations[ad.location.district]?.[lang] : null,
              ]
                .filter(Boolean)
                .join(', ')}
            </p>
            <p className={styles.id}>
              <button className={styles.copyButton} onClick={handleCopy}>
                <Icon path={mdiIdentifier} size={1.3} />
              </button>
              {ad.id}
              <span className={`${styles.tooltip} ${tooltip ? styles.active : ''}`}>{t('ad.copy')}</span>
            </p>
          </div>
          <div className={styles.leftTitleInfo}>
            <p className={styles.price}>
              {ad.price.try !== undefined && ad.price.try !== null
                ? `${new Intl.NumberFormat('ru-RU').format(ad.price.try)} ₺`
                : ad.price.rub !== undefined && ad.price.rub !== null
                ? `${new Intl.NumberFormat('ru-RU').format(ad.price.rub)} ₽`
                : ''}
            </p>
          </div>
        </div>
        <div className={styles.infoAndImage}>
          <div className={styles.info}>
            <div className={styles.infoTop}>
              <p>
                <span>
                  <Icon path={mdiArrowExpand} size={1} />
                  {t('ad.property.area')}
                </span>
                <span>
                  {ad.area} {t('ad.property.squareMeters')}
                  <sup>2</sup>
                </span>
              </p>
              {ad.rooms && (
                <p>
                  <span>
                    {' '}
                    <Icon path={mdiBedQueenOutline} size={1} />
                    {t('ad.property.bedrooms')}
                  </span>
                  {ad.rooms}
                </p>
              )}
              {ad.floorInHouse && (
                <p>
                  <span>
                    <Icon path={mdiStairs} size={1} />
                    {ad.floor ? t('ad.property.floor') : t('ad.property.floors')}
                  </span>
                  {ad.floor && ad.floorInHouse ? `${ad.floor || ''}/${ad.floorInHouse || ''}` : ad.floorInHouse}
                </p>
              )}
              <p>
                <span>
                  <Icon path={mdiHomeCityOutline} size={1} />
                  {t('ad.property.type')}
                </span>
                {propertyTypeTranslations[ad.propertyType][lang]}
              </p>
              <p>
                <span>
                  <Icon path={mdiCheckbook} size={1} />
                  {t('ad.property.listing')}
                </span>
                {ad.type === 'sale' ? t('ad.property.forSale') : t('ad.property.forRent')}
              </p>
              {ad.age && (
                <p>
                  <span>
                    <Icon path={mdiCalendarMonth} size={1} />
                    {t('ad.property.buildingAge')}
                  </span>
                  {ad.age}
                </p>
              )}
              { ad.situation && (<p>
                <span>
                  <Icon path={mdiKeyChain} size={1} />
                  {t('ad.property.condition')}
                </span>
                {t(`ad.property.situation.${ad.situation}`)}
              </p>
              )}
            </div>
            {(ad.parking || ad.bathroom) && (<div className={styles.infoBottom}>
              <div className={styles.infoBottomLeft}>
                <ul>
                  {ad.parking === 'closed' && (
                    <li>
                      <Icon className={styles.dot} path={mdiCircleSmall} size={1.5} />
                      {t('ad.property.closedParking')}
                    </li>
                  )}
                  {ad.parking === 'open' && (
                    <li>
                      <Icon className={styles.dot} path={mdiCircleSmall} size={1.5} />
                      {t('ad.property.openParking')}
                    </li>
                  )}
                  {ad.bathroom
                    ? ad.bathroom > 1 && (
                        <li>
                          <Icon className={styles.dot} path={mdiCircleSmall} size={1.5} />
                          {ad.bathroom} {t('ad.property.bathrooms')}
                        </li>
                      )
                    : ''}
                </ul>
              </div>
              <div className={styles.infoBottomRight}></div>
            </div>)}
          </div>
          <div className={styles.mainImage}>
            <CustomSlider ad={ad} />
          </div>
        </div>
        {ad.description[lang] && <div className={styles.description}>{ad.description[lang]}</div>}
        <div className={styles.form}>
          <ContactUs />
        </div>
      </div>
    </>
  );
}

function CustomSlider({ ad }: { ad: Ad }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const sliderRef = useRef<Slider | null>(null);

  interface CustomArrowProps {
    className?: string | undefined;
    style?: React.CSSProperties | undefined;
    onClick?: React.MouseEventHandler<any> | undefined;
    currentSlide?: number | undefined;
    slideCount?: number | undefined;
  }

  function SampleNextArrow(props: CustomArrowProps) {
    const { onClick } = props;
    return (
      <div className={styles.nextArrow} onClick={onClick}>
        <Icon path={mdiChevronRight} size={1.7} />
      </div>
    );
  }

  function SamplePrevArrow(props: CustomArrowProps) {
    const { onClick } = props;
    return (
      <div className={styles.prevArrow} onClick={onClick}>
        <Icon path={mdiChevronLeft} size={1.7} />
      </div>
    );
  }

  const settings = {
    dots: false,
    infinite: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    beforeChange: (oldIndex: number, newIndex: number) => setCurrentIndex(newIndex),
  };

  return (
    <Image.PreviewGroup
      preview={{
        imageRender: (originalNode: React.ReactNode) => (
          <div>
            <img
              src={(originalNode as React.ReactElement<{ src?: string }>)?.props?.src || ''}
              style={{
                maxWidth: '90vw',
                maxHeight: '90vh',
                objectFit: 'contain',
              }}
              alt={(originalNode as React.ReactElement<{ alt?: string }>)?.props?.alt || 'Property image'}
            />
          </div>
        ),
        current: currentIndex,
        onChange: (current) => {
          setCurrentIndex(current);
          // sliderRef.current?.slickGoTo(current); // Синхронизация слайдера
        },
        toolbarRender: () => null,
      }}
    >
      <Slider ref={sliderRef} {...settings}>
        {ad.images.map((image, index) => (
          <div key={index}>
            <Image src={getImageUrl(image)} alt={`Property image ${index + 1}`} width={650} height={400} />
          </div>
        ))}
      </Slider>
    </Image.PreviewGroup>
  );
}

export function getStaticPaths() {
  const ads = getAllAds();

  // Create paths for each ad
  const paths = ads.map((ad) => ({
    params: { id: ad.params.id },
  }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }: { params: { id: string } }) {
  const ad = getAdById(params.id);

  // Meta tags for property pages
  const metaTags = {
    ru: {
      description: 'Подробная информация о недвижимости в {location}. Актуальные цены, фотографии, детальное описание.',
      keywords: 'недвижимость, купить, аренда, квартира, вилла, дом, Турция, Россия',
    },
    en: {
      description:
        'Detailed information about real estate in {location}. Current prices, photos, and comprehensive description.',
      keywords: 'real estate, buy, rent, apartment, villa, house, Turkey, Russia',
    },
  };

  return {
    props: {
      ad,
      metaTags,
    },
  };
}
