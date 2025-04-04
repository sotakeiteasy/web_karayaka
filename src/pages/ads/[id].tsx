import Head from "next/head";
import styles from "./id.module.scss";
import { useState, useRef } from "react";
import Image from "antd/lib/image";

import Icon from "@mdi/react";
import { mdiMapMarkerOutline } from "@mdi/js";
import { mdiCircleSmall } from "@mdi/js";
import { mdiBedQueenOutline } from "@mdi/js";
import { mdiArrowExpand } from "@mdi/js";
import { mdiStairs } from "@mdi/js";
import { mdiHomeCityOutline } from "@mdi/js";
import { mdiKeyChain } from "@mdi/js";
import { mdiCheckbook } from "@mdi/js";
import { mdiCalendarMonth } from "@mdi/js";
import { mdiChevronRight } from "@mdi/js";
import { mdiChevronLeft } from "@mdi/js";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import { getAllAds, getAdById } from "@/lib/utils/ad";
import ContactUs from "@/lib/components/form/form";
import { Ad } from "@/lib/types/ad";
import {
  countryTranslations,
  cityTranslations,
  districtTranslations,
} from "@/lib/translations/locationTypes";
import { propertyTypeTranslations } from "@/lib/translations/propertyTypes";
import { useTranslation } from "next-i18next";
import { getImageUrl } from "@/lib/utils/imageHelper";

export default function AdPage({
  ad,
  locale,
}: {
  ad: Ad;
  locale: "ru" | "en";
}) {
  const { t } = useTranslation("common");

  return (
    <>
      <Head>
        <title>
          {(() => {
            switch (ad.propertyType) {
              case "apartment":
                return `${ad.rooms} ${t("ad.property.room")} ${
                  propertyTypeTranslations[ad.propertyType][locale]
                }`;
              case "villa":
              case "commercial":
              case "land":
                return `${propertyTypeTranslations[ad.propertyType][locale]}, ${
                  ad.area
                }${t("ad.property.squareMeters")}²`;
              default:
                return propertyTypeTranslations[ad.propertyType][locale];
            }
          })()}
        </title>
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
                    propertyInfo = `${ad.rooms} ${t("ad.property.room")} ${propertyTypeTranslations[ad.propertyType][locale]}`;
                    break;
                  case "villa":
                  case "commercial":
                  case "land":
                    propertyInfo = `${propertyTypeTranslations[ad.propertyType][locale]} ${ad.area}${t("ad.property.squareMeters")}²`;
                    break;
                  default:
                    propertyInfo = propertyTypeTranslations[ad.propertyType][locale];
                }

                if (locale === "ru") {
                  return `${typeStatus} ${propertyInfo}`;
                } else {
                  return `${propertyInfo} ${typeStatus}`;
                }
              })()}
            </p>
            <p>
              <Icon path={mdiMapMarkerOutline} size={1} />
              {[
                countryTranslations[ad.location.country][locale],
                cityTranslations[ad.location.city][locale],
                districtTranslations[ad.location.district]?.[locale] || "",
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
                {propertyTypeTranslations[ad.propertyType][locale]}
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
        {ad.description[locale] && (
          <div className={styles.description}>{ad.description[locale]}</div>
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

export function getStaticPaths({ locales }: { locales: any }) {
  const ads = getAllAds();

  // Создаем пути для каждой локали
  const paths: any[] = [];

  // Для каждого объявления создаем путь для каждой локали
  ads.forEach((ad) => {
    locales.forEach((locale: string) => {
      paths.push({
        params: { id: ad.params.id },
        locale,
      });
    });
  });

  return {
    paths,
    fallback: false,
  };
}

import { serverSideTranslations } from "next-i18next/serverSideTranslations";
export async function getStaticProps({
  params,
  locale,
}: {
  params: any;
  locale: string;
}) {
  const ad = getAdById(params.id);
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
      ad,
      locale,
    },
  };
}
