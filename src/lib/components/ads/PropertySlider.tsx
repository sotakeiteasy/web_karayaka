import React, { useState, useRef } from 'react';
import Slider from 'react-slick';
import Image from 'antd/lib/image';
import Icon from '@mdi/react';
import { mdiChevronRight, mdiChevronLeft } from '@mdi/js';
import styles from '@/pages/ads/id.module.scss';
import { Ad } from '@/lib/types';
import { getImageUrl } from '@/lib/utils';

export function PropertySlider({ ad }: { ad: Ad }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const sliderRef = useRef<Slider | null>(null);

  const SampleNextArrow = ({ onClick }: { onClick?: () => void }) => (
    <div className={styles.nextArrow} onClick={onClick}>
      <Icon path={mdiChevronRight} size={1.7} />
    </div>
  );

  const SamplePrevArrow = ({ onClick }: { onClick?: () => void }) => (
    <div className={styles.prevArrow} onClick={onClick}>
      <Icon path={mdiChevronLeft} size={1.7} />
    </div>
  );

  const settings = {
    dots: false,
    infinite: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    beforeChange: (_: number, newIndex: number) => setCurrentIndex(newIndex),
  };

  return (
    <Image.PreviewGroup
      preview={{
        imageRender: (node: React.ReactNode) => (
          <div>
            <img
              src={(node as React.ReactElement<{ src?: string }>)?.props?.src || ''}
              style={{ maxWidth: '90vw', maxHeight: '90vh', objectFit: 'contain' }}
              alt={(node as React.ReactElement<{ alt?: string }>)?.props?.alt || 'Property image'}
            />
          </div>
        ),
        current: currentIndex,
        onChange: (current) => setCurrentIndex(current),
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
