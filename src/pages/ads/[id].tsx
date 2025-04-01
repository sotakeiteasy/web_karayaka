import { getAllAds } from "@/lib/ad";
import { getAdById } from "@/lib/ad";
import Head from "next/head"
import styles from "./id.module.scss"
// import Image from "next/image";

// import { Image } from 'antd';
import Image from 'antd/lib/image';

import Icon from '@mdi/react';
import { mdiMapMarkerOutline } from '@mdi/js';
import { mdiCircleSmall } from '@mdi/js';
import { mdiBedQueenOutline } from '@mdi/js';
import { mdiArrowExpand } from '@mdi/js';
import { mdiStairs } from '@mdi/js';
import { mdiHomeCityOutline } from '@mdi/js';
import { mdiKeyChain } from '@mdi/js';
import { mdiCheckbook } from '@mdi/js';

import Slider from 'react-slick';

import { mdiChevronRight } from '@mdi/js';
import { mdiChevronLeft } from '@mdi/js';
import 'slick-carousel/slick/slick.css';

import { useState, useRef } from "react";
import ContactUs from "@/lib/components/form/form";
import { Ad } from "@/lib/types/ad";
import { countryTranslations, cityTranslations, districtTranslations } from "@/lib/translations/locationTypes";
import { propertyTypeTranslations } from "@/lib/translations/propertyTypes";
import { useTranslation } from 'next-i18next';

export default function AdPage({adData, locale}: {adData: Ad, locale: 'ru' | 'en' | 'tr';}) {
  const { t } = useTranslation('common');
  console.log('Disctrict:', countryTranslations[adData.location.district]);

    return (
        <>
            <Head>
                <title>{`${adData.rooms} ${propertyTypeTranslations[adData.propertyType][locale]} - ${adData.area}m²`}</title>
            </Head>
            <div className={styles.main}>
                <div className={styles.titleInfo}>
                    <div className={styles.rightTitleInfo}>
                        <p>
                            {`${adData.rooms} ${propertyTypeTranslations[adData.propertyType][locale]} - ${adData.area}m²`}
                        </p>
                        <p>
                            <Icon path={mdiMapMarkerOutline} size={1} /> 
                            {[countryTranslations[adData.location.country][locale], 
                            cityTranslations[adData.location.city][locale],
                            districtTranslations[adData.location.district]?.[locale] || '']
                            .filter(Boolean)
                            .join(', ')} 
                        </p>
                    </div>
                    <div className={styles.leftTitleInfo}>
                        {adData.price.try}$
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
                                    {adData.area} m<sup>2</sup>
                                </span>
                            </p>
                            <p> 
                                <span> <Icon path={mdiBedQueenOutline} size={1} />{t('ad.property.bedrooms')}</span> 
                                {adData.rooms} 
                            </p>
                            <p> 
                                <span><Icon path={mdiStairs} size={1} />{t('ad.property.floor')}</span>
                                {adData.floor || ''}/{adData.floorInHouse|| ''} 
                            </p>
                            <p> 
                                <span><Icon path={mdiHomeCityOutline} size={1} />{t('ad.property.type')}</span>
                                {propertyTypeTranslations[adData.propertyType][locale]}
                            </p>
                            <p>
                                <span><Icon path={mdiKeyChain} size={1} />{t('ad.property.listing')}</span> 
                                {adData.type === 'sale' ? 
                                  t('ad.property.forSale') : t('ad.property.forRent')} 
                            </p>
                            <p> 
                              <span><Icon path={mdiCheckbook} size={1} />{t('ad.property.buildingAge')}</span>
                              {adData.age}
                            </p>
                            <p>  
                              <span><Icon path={mdiCheckbook} size={1} />{t('ad.property.condition')}</span>
                              {adData.situation}
                            </p>
                                          
                                          
                        </div>
                        <div className={styles.infoBottom}>
                            <div className={styles.infoBottomLeft}>
                                <ul>
                                    <li>
                                        <Icon className={styles.dot} path={mdiCircleSmall} size={1.5} />
                                        {adData.parking === 'closed' && t('ad.property.closedParking')} 
                                    </li>
                                    <li>
                                        <Icon className={styles.dot} path={mdiCircleSmall} size={1.5} />
                                        {adData.parking === 'open' && t('ad.property.openParking')} 
                                    </li>
                                    <li>
                                        <Icon className={styles.dot} path={mdiCircleSmall} size={1.5} />
                                        {t('ad.property.bathrooms')}: {adData.bathroom}
                                    </li>
                                </ul>
                            </div>
                            <div className={styles.infoBottomRight}>
                                <ul>
                                    <li>
                                        <Icon className={styles.dot} path={mdiCircleSmall} size={1.5} />
                                    </li>
                                    <li>
                                        <Icon className={styles.dot} path={mdiCircleSmall} size={1.5} />
                                    </li>
                                    <li>
                                        <Icon className={styles.dot} path={mdiCircleSmall} size={1.5} />
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className={styles.mainImage}>
                        <CustomSlider ad={adData} locale={locale}/>
                    </div>
                </div>
                <div className={styles.description}>
                    {adData.description[locale === 'tr' ? 'en' : locale] || adData.description.ru || ''}
                </div>
                <div className={styles.form}>
                  <ContactUs />
                </div>
            </div>
        </>
    )
}

function CustomSlider({ ad, locale}: {ad: Ad, locale: string}) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const sliderRef = useRef<Slider | null>(null);

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
      infinite: false,
      slidesToShow: 1,
      slidesToScroll: 1,
      nextArrow: <SampleNextArrow />,
      prevArrow: <SamplePrevArrow />,
      beforeChange: (oldIndex: any, newIndex: any) => setCurrentIndex(newIndex) // Синхронизация индексов

    };
  
        return (
            <Image.PreviewGroup
            preview={{
                imageRender: (originalNode: any) => (
                <div>
                  <img
                    src={originalNode?.props.src}
                    style={{ maxWidth: "92vw", maxHeight: "92vh", objectFit: "contain" }}
                    alt={originalNode?.props.alt}
                  />
                </div>
              ),
            current: currentIndex,
            onChange: (current) => {
              setCurrentIndex(current);
              sliderRef.current?.slickGoTo(current); // Синхронизация слайдера
            },
            toolbarRender: () => null 
          }}
        >
          <Slider ref={sliderRef} {...settings}>
            {ad.images.map((image, index) => (
              <div key={index}>
                <Image
                  src={image}
                  alt={''}
                  width={650}
                  height={400}
                />
              </div>
            ))}
          </Slider>
        </Image.PreviewGroup>
      );
  }

export function getStaticPaths({ locales }: {locales: any} ) {
    const ads = getAllAds();
    
    // Создаем пути для каждой локали
    const paths: any[] = [];
    
    // Для каждого объявления создаем путь для каждой локали
    ads.forEach(ad => {
        locales.forEach((locale: string) => {
            paths.push({
                params: { id: ad.params.id },
                locale
            });
        });
    });
    
    return {
        paths,
        fallback: false
    }
}


import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
export async function getStaticProps({ params, locale }: {params: any, locale: string}) {
    const adData = getAdById(params.id)
  return {
    props: {
          ...(await serverSideTranslations(locale, ['common'])),
          adData,
          locale
    },
  };
}