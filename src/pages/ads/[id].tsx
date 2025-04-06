import Head from "next/head";
import styles from "./id.module.scss";
import Image from "antd/lib/image";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useState, useRef } from "react";
import { useTranslation, useLanguageQuery } from "next-export-i18n";

import Icon from "@mdi/react";
import { 
  mdiMapMarkerOutline, 
  mdiCircleSmall, 
  mdiBedQueenOutline, 
  mdiArrowExpand, mdiStairs, 
  mdiHomeCityOutline, 
  mdiKeyChain, 
  mdiCheckbook, 
  mdiCalendarMonth,
  mdiChevronRight,
  mdiChevronLeft
} from "@mdi/js";

import { getAllAds, getAdById, getImageUrl } from "@/lib/utils";
import { ContactUs } from "@/lib/components";
import { Ad } from "@/lib/types";
import {
  countryTranslations,
  cityTranslations,
  districtTranslations,
  propertyTypeTranslations
} from "@/lib/translations";

export default function AdPage({ ad, metaTags }: { ad: Ad, metaTags: any }) {
  const { t } = useTranslation();
  const [query] = useLanguageQuery();
  const lang = (query?.lang as 'ru' | 'en') || "ru";
  
  const meta = metaTags[lang];
  
  const propertyTitle = (() => {
    switch (ad.propertyType) {
      case "apartment":
        return `${ad.rooms} ${t("ad.property.room")} ${
          propertyTypeTranslations[ad.propertyType][lang]
        }`;
      case "villa":
      case "commercial":
      case "land":
        return `${propertyTypeTranslations[ad.propertyType][lang]}, ${
          ad.area
        }${t("ad.property.squareMeters")}²`;
      default:
        return propertyTypeTranslations[ad.propertyType][lang];
    }
  })();
  
  const location = [
    countryTranslations[ad.location.country][lang],
    cityTranslations[ad.location.city][lang],
  ].filter(Boolean).join(", ");

  return (
    <>
      <Head>
        <title>{propertyTitle}</title>
        <meta name="description" content={meta.description.replace("{location}", location)} />
        <meta name="keywords" content={meta.keywords} />
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta charSet="utf-8" />
        
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`https://karayaka.ru/ads/${ad.id}`} />
        <meta property="og:title" content={propertyTitle} />
        <meta property="og:description" content={meta.description.replace("{location}", location)} />
        <meta property="og:image" content={ad.images.length > 0 ? getImageUrl(ad.images[0]) : "https://karayaka.ru/og-image.png"} />
        <meta property="og:image:alt" content={propertyTitle} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:site_name" content="Karayaka" />
        <meta property="og:locale" content={lang === 'ru' ? 'ru_RU' : 'en_US'} />
      </Head>
      <div className={styles.main}>
        <div className={styles.titleInfo}>
          <div className={styles.rightTitleInfo}>
            <p>
              {(() => {
                const typeStatus = ad.type === "sale" 
                  ? t("ad.property.titleForSale") 
                  : t("ad.property.titleForRent");

                let propertyInfo = "";

                switch (ad.propertyType) {
                  case "apartment":
                    propertyInfo = `${ad.rooms} ${t("ad.property.room")} ${propertyTypeTranslations[ad.propertyType][lang]}`;
                    break;
                  case "villa":
                  case "commercial":
                  case "land":
                    propertyInfo = `${propertyTypeTranslations[ad.propertyType][lang]} ${ad.area}${t("ad.property.squareMeters")}²`;
                    break;
                  default:
                    propertyInfo = propertyTypeTranslations[ad.propertyType][lang];
                }

                if (lang === "ru") {
                  return `${typeStatus} ${propertyInfo}`;
                } else {
                  return `${propertyInfo} ${typeStatus}`;
                }
              })()}
            </p>
            <p>
              <Icon path={mdiMapMarkerOutline} size={1} />
              {[
                countryTranslations[ad.location.country][lang],
                cityTranslations[ad.location.city][lang],
                districtTranslations[ad.location.district]?.[lang] || "",
              ]
                .filter(Boolean)
                .join(", ")}
            </p>
          </div>
          <div className={styles.leftTitleInfo}>
            {ad.price.try !== undefined && ad.price.try !== null
              ? `${new Intl.NumberFormat("ru-RU").format(ad.price.try)} ₺`
              : ad.price.rub !== undefined && ad.price.rub !== null
              ? `${new Intl.NumberFormat("ru-RU").format(ad.price.rub)} ₽`
              : ""}
          </div>
        </div>
        <div className={styles.infoAndImage}>
          <div className={styles.info}>
            <div className={styles.infoTop}>
              <p>
                <span>
                  <Icon path={mdiArrowExpand} size={1} />
                  {t("ad.property.area")}
                </span>
                <span>
                  {ad.area} {t("ad.property.squareMeters")}
                  <sup>2</sup>
                </span>
              </p>
              {ad.rooms && (
                <p>
                  <span>
                    {" "}
                    <Icon path={mdiBedQueenOutline} size={1} />
                    {t("ad.property.bedrooms")}
                  </span>
                  {ad.rooms}
                </p>
              )}
              {ad.floor && (
                <p>
                  <span>
                    <Icon path={mdiStairs} size={1} />
                    {t("ad.property.floor")}
                  </span>
                  {ad.floor || ""}/{ad.floorInHouse || ""}
                </p>
              )}
              <p>
                <span>
                  <Icon path={mdiHomeCityOutline} size={1} />
                  {t("ad.property.type")}
                </span>
                {propertyTypeTranslations[ad.propertyType][lang]}
              </p>
              <p>
                <span>
                  <Icon path={mdiCheckbook} size={1} />
                  {t("ad.property.listing")}
                </span>
                {ad.type === "sale"
                  ? t("ad.property.forSale")
                  : t("ad.property.forRent")}
              </p>
              {ad.age && (
                <p>
                  <span>
                    <Icon path={mdiCalendarMonth} size={1} />
                    {t("ad.property.buildingAge")}
                  </span>
                  {ad.age}
                </p>
              )}
              <p>
                <span>
                  <Icon path={mdiKeyChain} size={1} />
                  {t("ad.property.condition")}
                </span>
                {t(`ad.property.situation.${ad.situation}`)}
              </p>
            </div>
            <div className={styles.infoBottom}>
              <div className={styles.infoBottomLeft}>
                <ul>
                  {ad.parking === "closed" && (
                    <li>
                      <Icon
                        className={styles.dot}
                        path={mdiCircleSmall}
                        size={1.5}
                      />
                      {t("ad.property.closedParking")}
                    </li>
                  )}
                  {ad.parking === "open" && (
                    <li>
                      <Icon
                        className={styles.dot}
                        path={mdiCircleSmall}
                        size={1.5}
                      />
                      {t("ad.property.openParking")}
                    </li>
                  )}
                  {ad.bathroom
                    ? ad.bathroom > 1 && (
                        <li>
                          <Icon
                            className={styles.dot}
                            path={mdiCircleSmall}
                            size={1.5}
                          />
                          {ad.bathroom} {t("ad.property.bathrooms")}
                        </li>
                      )
                    : ""}
                </ul>
              </div>
              <div className={styles.infoBottomRight}>
                {/* <ul>
                    {<li>
                        <Icon className={styles.dot} path={mdiCircleSmall} size={1.5} />
                    </li>}
                    {<li>
                        <Icon className={styles.dot} path={mdiCircleSmall} size={1.5} />
                    </li>}
                </ul> */}
              </div>
            </div>
          </div>
          <div className={styles.mainImage}>
            <CustomSlider ad={ad} />
          </div>
        </div>
        {ad.description[lang] && (
          <div className={styles.description}>{ad.description[lang]}</div>
        )}
        <div className={styles.form}>
          <ContactUs />
        </div>
      </div>
    </>
  );
}

function CustomSlider({ ad }: { ad: Ad }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const sliderRef = useRef<Slider | null>(null);

  interface ArrowProps {
    onClick?: () => void;
    className?: string;
  }

  function SampleNextArrow({ onClick }: ArrowProps) {
    return (
      <div className={styles.nextArrow} onClick={onClick}>
        <Icon path={mdiChevronRight} size={1.7} />
      </div>
    );
  }

  function SamplePrevArrow({ onClick }: ArrowProps) {
    return (
      <div className={styles.prevArrow} onClick={onClick}>
        <Icon path={mdiChevronLeft} size={1.7} />
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
    beforeChange: (oldIndex: number, newIndex: number) =>
      setCurrentIndex(newIndex),
  };

  return (
    <Image.PreviewGroup
      preview={{
        imageRender: (originalNode: React.ReactNode) => (
          <div>
            <img
              src={(originalNode as any)?.props.src}
              style={{
                maxWidth: "90vw",
                maxHeight: "90vh",
                objectFit: "contain",
              }}
              alt={(originalNode as any)?.props.alt || "Property image"}
            />
          </div>
        ),
        current: currentIndex,
        onChange: (current) => {
          setCurrentIndex(current);
          // sliderRef.current?.slickGoTo(current); // Синхронизация слайдера
        },
        toolbarRender: () => null,
      }}
    >
      <Slider ref={sliderRef} {...settings}>
        {ad.images.map((image, index) => (
          <div key={index}>
            <Image
              src={getImageUrl(image)}
              alt={`Property image ${index + 1}`}
              width={650}
              height={400}
            />
          </div>
        ))}
      </Slider>
    </Image.PreviewGroup>
  );
}

export function getStaticPaths() {
  const ads = getAllAds();

  // Create paths for each ad
  const paths = ads.map((ad) => ({
    params: { id: ad.params.id },
  }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }: { params: { id: string } }) {
  const ad = getAdById(params.id);
  
  // Meta tags for property pages
  const metaTags = {
    ru: {
      description: "Подробная информация о недвижимости в {location}. Актуальные цены, фотографии, детальное описание.",
      keywords: "недвижимость, купить, аренда, квартира, вилла, дом, Турция, Россия"
    },
    en: {
      description: "Detailed information about real estate in {location}. Current prices, photos, and comprehensive description.",
      keywords: "real estate, buy, rent, apartment, villa, house, Turkey, Russia"
    }
  };
  
  return {
    props: {
      ad,
      metaTags
    },
  };
}
