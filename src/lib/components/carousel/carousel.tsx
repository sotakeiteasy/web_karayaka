import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import React from "react";
import Slider from "react-slick";
import styles from './carousel.module.scss';
import Link from "next/link";

import Image from "next/image";
import imageExamlpe from "@assets/images/turkey-view.jpg";
import Icon from '@mdi/react';
import { mdiChevronRight } from '@mdi/js';
import { mdiChevronLeft } from '@mdi/js';

import { ads } from "@/data/ads";

const NextArrow = (props: any) => {
  const { onClick } = props;
  return (
    <div className={styles.nextArrow} onClick={onClick}>
        <Icon path={mdiChevronRight} size={1.4} />
    </div>
  );
};

const PrevArrow = (props: any) => {
  const { onClick } = props;
  return (
    <div className={styles.prevArrow} onClick={onClick}>
      <Icon path={mdiChevronLeft} size={1.4} />
    </div>
  );
};

export default function SimpleSlider({ type, country, locale }: { type: string, country: string, locale: 'ru' | 'en' | 'tr'  }) {
    const filteredAds = ads.filter(ad => (ad.type === type && ad.location.country.en === country))
    const settings = {
      dots: false,
      infinite: true,
      slidesToShow: 3,
      slidesToScroll: 1,
      nextArrow: <NextArrow />,
      prevArrow: <PrevArrow />,
      autoplay: true,
      speed: 3000,
      autoplaySpeed: 2000,
      cssEase: "ease-in-out",
      // pauseOnHover: true
    };
    return (
      <div className={styles.sliderWrapper}>
        <Slider {...settings}>
        {filteredAds.map(card => (
            <div key={card.id} className={styles.slide}>
              <div className={styles.adCard}>
                <Link href={`/ads/${card.id}`} locale={locale}>
                    <Image
                        className={styles.cardImage}
                        src={imageExamlpe}
                        alt="imageExample"
                    />
                    <div className={styles.cardDescription}>
                        <p>{card.title[locale]}</p>
                        <p>{card.location.city[locale]}</p>
                        {/* <p>{card.price.rub}</p> */}
                    </div>
                </Link>
              </div>
            </div>
        ))}
        </Slider>
      </div>
    );
  }