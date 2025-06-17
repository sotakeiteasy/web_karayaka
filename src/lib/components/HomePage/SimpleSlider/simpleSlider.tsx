import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import React from 'react';
import { useState, useEffect, useMemo } from 'react';
import Slider from 'react-slick';
import styles from './SimpleSlider.module.scss';
import Image from 'next/image';
import { useTranslation, LinkWithLocale } from 'next-export-i18n';

import Icon from '@mdi/react';
import { mdiChevronRight, mdiChevronLeft, mdiMapMarkerOutline, mdiBedQueenOutline } from '@mdi/js';

import { getOptimizedImageUrl } from '@/lib/utils';
import { cityTranslations, districtTranslations, propertyTypeTranslations } from '@/lib/translations';
import { Ad } from '@/lib/types';

interface SimpleSliderProps {
  type: 'buy' | 'rent';
  country: string;
  locale: 'ru' | 'en';
}

export default function SimpleSlider({ type, country, locale }: SimpleSliderProps) {
  const { t } = useTranslation();
  const [ads, setAds] = useState<Ad[]>([]);

  useEffect(() => {
    import('@/data/ads/ads.json').then((module) => {
      setAds(module.default as unknown as Ad[]);
    });
  }, []);

  const filteredAds = useMemo(
    () => ads.filter((ad) => ad.type === type && ad.location.country === country),
    [ads, type, country]
  );

  const shuffledAds = useMemo(() => {
    if (filteredAds.length >= 3) {
      return shuffleAds(filteredAds);
    }
    return [];
  }, [filteredAds]);

  if (filteredAds.length < 3) {
    return null;
  }

  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 2000,
    cssEase: 'ease-in-out',
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1050,
        settings: {
          slidesToShow: 3,
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
    <div className={styles.carouselBlock}>
      <h2 className={styles.header}>{type === 'rent' ? t('home.rent') : t('home.buy')}</h2>
      <div className={styles.carousel}>
        <div className={styles.sliderWrapper}>
          <Slider {...settings}>
            {shuffledAds.map((card) => (
              <div key={card.id} className={styles.slide}>
                <div className={styles.adCard}>
                  <LinkWithLocale href={`/${type}/${card.id}/`}>
                    <picture className={styles.cardImage}>
                      <source srcSet={getOptimizedImageUrl(card.images[0]).webp} type="image/webp" />
                      <Image
                        width={500}
                        height={300}
                        src={getOptimizedImageUrl(card.images[0]).original}
                        alt={`${propertyTypeTranslations[card.propertyType][locale]}. ${
                          cityTranslations[card.location.city][locale]
                        }`}
                        title={`${propertyTypeTranslations[card.propertyType][locale]}. ${
                          cityTranslations[card.location.city][locale]
                        }`}
                        loading="lazy"
                      />
                    </picture>
                    <div className={styles.cardDescription}>
                      <div className={styles.topRow}>
                        <p className={styles.title}>{propertyTypeTranslations[card.propertyType][locale]}</p>
                        <p className={styles.price}>
                          {card.price.try !== undefined && card.price.try !== null
                            ? `${new Intl.NumberFormat('ru-RU').format(card.price.try)} ₺`
                            : card.price.rub !== undefined && card.price.rub !== null
                            ? `${new Intl.NumberFormat('ru-RU').format(card.price.rub)} ₽`
                            : ''}
                        </p>
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
      <button className={styles.blockButton}>
        <LinkWithLocale href={`/${type}?country=${country}`}>{t('home.seeAll')}</LinkWithLocale>
      </button>
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
