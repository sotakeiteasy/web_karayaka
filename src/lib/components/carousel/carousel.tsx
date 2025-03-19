import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import React from "react";
import Slider from "react-slick";
import styles from './carousel.module.scss';

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
        <Icon path={mdiChevronRight} size={1} />
    </div>
  );
};

const PrevArrow = (props: any) => {
  const { onClick } = props;
  return (
    <div className={styles.prevArrow} onClick={onClick}>
      <Icon path={mdiChevronLeft} size={1} />
    </div>
  );
};

export default function SimpleSlider() {
    const settings = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 3,
      slidesToScroll: 1,
      nextArrow: <NextArrow />,
      prevArrow: <PrevArrow />
    };
    return (
      <div className={styles.sliderWrapper}>
        <Slider {...settings}>
        {ads.map(card => (
            <div className={styles.slide}>
                <div className={styles.adCard}>
                    <Image
                        className={styles.cardImage}
                        src={imageExamlpe}
                        alt="imageExample"
                    />
                    <div className={styles.cardDescription}>
                        <p>{card.title.ru}</p>
                        <p>{card.location.city}</p>
                        <p>{card.price}</p>
                    </div>
                </div>
            </div>
        ))}
        </Slider>
      </div>
    );
  }