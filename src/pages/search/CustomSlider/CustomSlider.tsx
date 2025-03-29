import Slider from 'react-slick';
import Image from 'next/image';
import styles from './CustomSlider.module.scss';

import Icon from '@mdi/react';
import { mdiChevronRight } from '@mdi/js';
import { mdiChevronLeft } from '@mdi/js';
import 'slick-carousel/slick/slick.css';

export default function CustomSlider({ ad, locale }) {
    function SampleNextArrow(props) {
      const { onClick } = props;
      return (
        <div className={styles.nextArrow} onClick={onClick}>
          <Icon path={mdiChevronRight} size={1.4} />   
        </div>
       );
    }
  
    function SamplePrevArrow(props) {
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
            alt={ad?.title[locale]}
            width={300}
            height={300}
          />
        ))}
      </Slider>
    )
  }