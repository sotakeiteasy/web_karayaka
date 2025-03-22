import {useState} from 'react';
import Slider from 'react-slick';
import Image from 'next/image';
import styles from './CustomSlider.module.scss';

import Icon from '@mdi/react';
import { mdiChevronRight } from '@mdi/js';
import { mdiChevronLeft } from '@mdi/js';
import 'slick-carousel/slick/slick.css';

export default function CustomSlider({ ad }) {
    const [currentSlide, setCurrentSlide] = useState(0);
  
    function SampleNextArrow(props) {
      const { onClick } = props;
      return (
        <div className={styles.nextArrow} onClick={onClick}>
          <Icon path={mdiChevronRight} size={1} />   
        </div>
       );
    }
  
    function SamplePrevArrow(props) {
      const { onClick } = props;
      return (
        <div className={styles.prevArrow} onClick={onClick}>
          <Icon path={mdiChevronLeft} size={1} />   
        </div>
       );
    }
  
    const settings = {
      dots: false,
      infinite: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      nextArrow: <SampleNextArrow />,
      prevArrow: <SamplePrevArrow />,
      beforeChange: (oldIndex, newIndex) => setCurrentSlide(newIndex),
    };
  
    return (
      <Slider {...settings}>
          <Image
            src={ad?.images[0]}
            alt={ad?.title.en}
            width={300}
            height={200}
          />
          <Image
            src={ad?.images[1]}
            alt={ad?.title.en}
            width={300}
            height={200}
          />
      </Slider>
    )
  }