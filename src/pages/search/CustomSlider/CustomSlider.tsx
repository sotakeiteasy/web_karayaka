import Slider from 'react-slick';
import Image from 'next/image';
import styles from './CustomSlider.module.scss';

import Icon from '@mdi/react';
import { mdiChevronRight } from '@mdi/js';
import { mdiChevronLeft } from '@mdi/js';
import 'slick-carousel/slick/slick.css';
import { Ad } from '@/lib/types/ad';

export default function CustomSlider({ ad, locale, height = 300, width = 300}: { ad: Ad, locale: "tr" | "en" | "ru", height: number, width: number}) {
    function SampleNextArrow(props: any) {
      const { onClick } = props;
      return (
        <div className={styles.nextArrow} onClick={onClick}>
          <Icon path={mdiChevronRight} size={1.4} />   
        </div>
       );
    }
  
    function SamplePrevArrow(props: any) {
      const { onClick } = props;
      return (
        <div className={styles.prevArrow} onClick={onClick}>
          <Icon path={mdiChevronLeft} size={1.4} />   
        </div>
       );
    }
  
    const settings = {
      dots: false,
      infinite: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      nextArrow: <SampleNextArrow />,
      prevArrow: <SamplePrevArrow />
    };
  
    return (
      <Slider {...settings}>
        {ad?.images.map((image, index) => (
          <Image
            key={index}
            src={image}
            alt={''}
            width={width}
            height={height}
            priority
          />
        ))}
      </Slider>
    )
  }