import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import React from 'react';
import { useState, useEffect, useMemo } from 'react';
import Slider from 'react-slick';
import styles from './SimpleSlider.module.scss';
import { useTranslation, LinkWithLocale } from 'next-export-i18n';

import Icon from '@mdi/react';
import { mdiChevronRight, mdiChevronLeft, mdiMapMarkerOutline, mdiBedQueenOutline } from '@mdi/js';

import { getOptimizedImageUrl } from '@/lib/utils';
import { cityTranslations, districtTranslations, propertyTypeTranslations } from '@/lib/translations';
import { Ad } from '@/lib/types';
import { Price } from '@/lib/components/Price/Price';

interface SimpleSliderProps {
  type: 'buy' | 'rent' | 'discounts';
  country: string;
  locale: 'ru' | 'en';
  idsToExclude?: string[];
}

export default function SimpleSlider({ type, country, locale, idsToExclude }: SimpleSliderProps) {
  const { t } = useTranslation();
  const [ads, setAds] = useState<Ad[]>([]);

  useEffect(() => {
    import('@/data/ads/ads.json').then((module) => {
      setAds(module.default as unknown as Ad[]);
    });
  }, []);

  let filteredAds: Ad[];

  if (type !== 'discounts') {
    filteredAds = ads.filter((ad) => ad.type === type && ad.location.country === country && ad.price.try_old === null);
    if (idsToExclude) {
      filteredAds = filteredAds.filter((ad) => !idsToExclude.includes(ad.id));
      console.log(filteredAds);
    }
  } else {
    filteredAds = ads.filter((ad) => ad.price.try_old);
  }

  const shuffledAds = useMemo(() => {
    if (filteredAds.length >= 3) {
      return shuffleAds(filteredAds);
    }
    return [];
  }, [filteredAds]);

  if (filteredAds.length < 3) {
    // reference button for ceo pages if not enough ads for slider
    if (idsToExclude) {
      return (
        <button className={styles.blockButton}>
          <LinkWithLocale href={`/${type}/`}>{t('home.seeAll')}</LinkWithLocale>
        </button>
      );
    } else return null;
  }

  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: idsToExclude ? 2 : 3,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    autoplay: idsToExclude ? false : true,
    speed: 2000,
    autoplaySpeed: 2000,
    cssEase: 'ease-in-out',
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1050,
        settings: {
          slidesToShow: 2,
          speed: 200,
          autoplay: false,
          cssEase: 'linear',
        },
      },
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 2,
          speed: 200,
          autoplay: false,
          cssEase: 'linear',
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          speed: 200,
          autoplay: false,
          cssEase: 'linear',
        },
      },
    ],
  };

  return (
    <div className={`${styles.carouselBlock} ${idsToExclude ? styles.ceoPage : ''}`}>
      <h2 className={styles.header}>
        {idsToExclude
          ? 'Другие предложения'
          : type === 'discounts'
          ? t('home.discount')
          : type === 'rent'
          ? t('home.rent')
          : t('home.buy')}
      </h2>
      <div className={styles.carousel}>
        <div className={`${styles.sliderWrapper} ${idsToExclude ? styles.ceoPage : ''}`}>
          <Slider {...settings}>
            {shuffledAds.map((card) => (
              <div key={card.id} className={styles.slide}>
                <div className={styles.adCard}>
                  <LinkWithLocale href={`/${card.type}/${card.id}/`}>
                    <picture className={`${styles.cardImage} ${type === 'discounts' && styles.discount}`}>
                      <source srcSet={getOptimizedImageUrl(card.images[0]).webp} type="image/webp" />
                      <img
                        src={getOptimizedImageUrl(card.images[0]).original}
                        loading="lazy"
                        width="450"
                        height="300"
                        alt={`${propertyTypeTranslations[card.propertyType][locale]}. ${
                          cityTranslations[card.location.city][locale]
                        }`}
                        title={`${propertyTypeTranslations[card.propertyType][locale]}. ${
                          cityTranslations[card.location.city][locale]
                        }`}
                      />
                    </picture>
                    {card.price.try_old && (
                      <div className={styles.priceTag}>
                        <span className={styles.message}>
                          <img src="assets/icons/discount.svg" alt="" width={60} height={60} />
                        </span>
                        <div className={styles.discount}>
                          <span className={styles.oldPrice}>
                            <Price locale={locale} price={{ try_old: card.price.try_old }} />
                          </span>
                          <span className={styles.newPrice}>
                            <Price locale={locale} price={{ try: card.price.try }} stylesName="white" />
                          </span>
                        </div>
                      </div>
                    )}
                    <div className={styles.cardDescription}>
                      <div className={styles.topRow}>
                        <p className={styles.title}>{propertyTypeTranslations[card.propertyType][locale]}</p>
                        {!card.price.try_old && (
                          <span className={styles.price}>
                            <Price locale={locale} price={{ try: card.price.try, rub: card.price.rub }} />
                          </span>
                        )}

                        {card.price.try_old && (
                          <p className={styles.propertyType}>
                            {card.type === 'rent' ? t('ad.property.forRentStatus') : t('ad.property.forSaleStatus')}
                          </p>
                        )}
                      </div>
                      <div className={styles.bottomRow}>
                        <p className={styles.iconRow}>
                          <Icon path={mdiMapMarkerOutline} size={0.8} />
                          {[
                            cityTranslations[card.location.city][locale],
                            card.location.district ? districtTranslations[card.location.district]?.[locale] : null,
                          ]
                            .filter(Boolean)
                            .join(', ')}
                        </p>
                        <p className={styles.iconRow}>
                          <span className={styles.iconSpan}>
                            {' '}
                            <Icon path={mdiBedQueenOutline} size={0.9} /> {card.rooms}{' '}
                          </span>
                        </p>
                      </div>
                    </div>
                  </LinkWithLocale>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
      {type === 'discounts' ? (
        <button className={styles.blockButton}>
          <LinkWithLocale href={`/${type}/`}>{t('home.seeAll')}</LinkWithLocale>
        </button>
      ) : (
        <button className={styles.blockButton}>
          <LinkWithLocale href={`/${type}/?country=${country}`}>{t('home.seeAll')}</LinkWithLocale>
        </button>
      )}
    </div>
  );
}

const NextArrow = ({ onClick }: { onClick?: () => void }) => {
  return (
    <div className={styles.nextArrow} onClick={onClick}>
      <Icon path={mdiChevronRight} size={1.4} />
    </div>
  );
};

const PrevArrow = ({ onClick }: { onClick?: () => void }) => {
  return (
    <div className={styles.prevArrow} onClick={onClick}>
      <Icon path={mdiChevronLeft} size={1.4} />
    </div>
  );
};

const shuffleAds = (ads: Ad[]): Ad[] => {
  const copy = [...ads];

  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }

  return copy;
};
