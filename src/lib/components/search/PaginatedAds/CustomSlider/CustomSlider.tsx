import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Image from 'next/image';
import styles from './CustomSlider.module.scss';
import { CustomArrowProps } from './types';
import Icon from '@mdi/react';
import { mdiChevronRight, mdiChevronLeft } from '@mdi/js';
import { Ad } from '@/lib/types';
import { getOptimizedImageUrl, getPropertyTitle } from '@/lib/utils';
import { cityTranslations, districtTranslations } from '@/lib/translations';

export default function CustomSlider({ ad, locale }: { ad: Ad; locale: 'ru' | 'en' }) {
  const altText = getPropertyTitle(ad, locale);

  function SampleNextArrow(props: CustomArrowProps) {
    const { onClick } = props;
    return (
      <div className={styles.nextArrow} onClick={onClick}>
        <Icon path={mdiChevronRight} size={1.4} />
      </div>
    );
  }

  function SamplePrevArrow(props: CustomArrowProps) {
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
    prevArrow: <SamplePrevArrow />,
  };

  return (
    <div>
      {ad?.images.length > 1 ? (
        <Slider {...settings}>
          {ad?.images.map((image, index) => {
            const imgSrc = getOptimizedImageUrl(image);

            return (
              <picture key={index}>
                <source srcSet={imgSrc.webp} type="image/webp" />
                <Image
                  src={imgSrc.original}
                  title={`${altText}. ${[
                    cityTranslations[ad.location.city][locale],
                    ad.location.district ? districtTranslations[ad.location.district]?.[locale] : null,
                  ]
                    .filter(Boolean)
                    .join(', ')}`}
                  alt={`${altText}. ${[
                    cityTranslations[ad.location.city][locale],
                    ad.location.district ? districtTranslations[ad.location.district]?.[locale] : null,
                  ]
                    .filter(Boolean)
                    .join(', ')}`}
                  width={400}
                  height={400}
                  priority
                />
              </picture>
            );
          })}
        </Slider>
      ) : (
        <picture>
          <source srcSet={getOptimizedImageUrl(ad.images[0]).webp} type="image/webp" />
          <Image
            src={getOptimizedImageUrl(ad.images[0]).original}
            title={`${altText}. ${[
              cityTranslations[ad.location.city][locale],
              ad.location.district ? districtTranslations[ad.location.district]?.[locale] : null,
            ]
              .filter(Boolean)
              .join(', ')}`}
            alt={`${altText}. ${[
              cityTranslations[ad.location.city][locale],
              ad.location.district ? districtTranslations[ad.location.district]?.[locale] : null,
            ]
              .filter(Boolean)
              .join(', ')}`}
            width={450}
            height={300}
            priority
          />
        </picture>
      )}
    </div>
  );
}
