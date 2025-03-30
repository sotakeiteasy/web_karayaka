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

import Slider from 'react-slick';

import { mdiChevronRight } from '@mdi/js';
import { mdiChevronLeft } from '@mdi/js';
import 'slick-carousel/slick/slick.css';

import { useState, useRef } from "react";
import ContactUs from "@/lib/components/form/form";

export default function AdPage({adData, locale}: {adData: Ad, locale: string}) {

    return (
        <>
            <Head>
                <title>{adData.title[locale as 'ru' | 'en' | 'tr']}</title>
            </Head>
            <div className={styles.main}>
                <div className={styles.titleInfo}>
                    <div className={styles.rightTitleInfo}>
                        <p>
                            {adData.title[locale as 'ru' | 'en' | 'tr']}
                        </p>
                        <p>
                            <Icon path={mdiMapMarkerOutline} size={1} /> 
                            {adData.location.country[locale as 'ru' | 'en' | 'tr']}, {adData.location.city[locale as 'ru' | 'en' | 'tr']}, {adData.location.district[locale as 'ru' | 'en' | 'tr']} 
                        </p>
                    </div>
                    <div className={styles.leftTitleInfo}>
                        {adData.price.rub}
                    </div>
                    
                </div>
                <div className={styles.infoAndImage}>
                    <div className={styles.info}>
                        <div className={styles.infoTop}>
                            <p> 
                                <span>
                                    <Icon path={mdiArrowExpand} size={1} />
                                    Range
                                </span>
                                <span>
                                    {adData.area} m<sup>2</sup>
                                </span>
                            </p>
                            <p> 
                                <span> <Icon path={mdiBedQueenOutline} size={1} />Bedrooms</span> 
                                {adData.rooms} 
                            </p>
                            <p> 
                                <span><Icon path={mdiStairs} size={1} />Stair</span>
                                {adData.floor} 
                            </p>
                            <p> 
                                <span><Icon path={mdiHomeCityOutline} size={1} />Type</span>
                                {adData.propertyType}
                            </p>
                            <p>
                                <span><Icon path={mdiKeyChain} size={1} />Listing</span> 
                                {adData.type} 
                            </p>
                            <p>  </p>
                            <p>  </p>
                        </div>
                        <div className={styles.infoBottom}>
                            <div className={styles.infoBottomLeft}>
                                <ul>
                                    <li>
                                        <Icon className={styles.dot} path={mdiCircleSmall} size={1.3} />
                                        {adData.parking && 'parking'} 
                                    </li>
                                    <li>
                                        <Icon className={styles.dot} path={mdiCircleSmall} size={1.3} />
                                        {adData.balcony && 'balcony'} 
                                    </li>
                                    <li>
                                        <Icon className={styles.dot} path={mdiCircleSmall} size={1.3} />
                                        {adData.furnished && 'furnished'} 
                                    </li>
                                    <li>
                                        <Icon className={styles.dot} path={mdiCircleSmall} size={1.3} />
                                         
                                    </li>
                                </ul>
                            </div>
                            <div className={styles.infoBottomRight}>
                                <ul>
                                    <li>
                                        <Icon className={styles.dot} path={mdiCircleSmall} size={1.3} />
                                    </li>
                                    <li>
                                        <Icon className={styles.dot} path={mdiCircleSmall} size={1.3} />
                                    </li>
                                    <li>
                                        <Icon className={styles.dot} path={mdiCircleSmall} size={1.3} />
                                    </li>
                                    <li>
                                        <Icon className={styles.dot} path={mdiCircleSmall} size={1.3} />
                                    </li>
                                </ul>
                            </div>
                        </div>

                        
                        {/* <div className={styles.tags}>
                            {adData.features.map(f => (
                                <div className={styles.tag} key={f}>{f}</div>
                            ))}
                        </div> */}
                    </div>
                    <div className={styles.mainImage}>
                    {/* <Image.PreviewGroup
                        preview={{
                        onChange: (current, prev) => console.log(`current index: ${current}, prev index: ${prev}`),
                        }}
                    >
                        <Image
                        src="/images/exampleImage.jpg"
                        alt="sometext"
                        width={500}
                        height={400}
                        // preview={true} 
                        />
                        <Image
                        src="/images/exampleImage.jpg"
                        alt="sometext"
                        width={500}
                        height={400}
                        // preview={true} 
                        />
                    </Image.PreviewGroup> */}


                        {/* <CustomSlider ad={adData} locale={locale} height={400} width={500}/> */}
                        <CustomSlider ad={adData} locale={locale}/>

                        {/* <Image
                            src="/images/exampleImage.jpg"
                            alt="sometext"
                            width={500}
                            height={400}
                        /> */}
                    </div>
                </div>
                <div className={styles.description}>
                    { adData.description[locale as 'ru' | 'en' | 'tr'] }
                </div>
                <ContactUs />
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
                  alt={ad?.title[locale as 'ru' | 'en' | 'tr']}
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
import { Ad } from "@/lib/types/ad";
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