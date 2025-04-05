import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import React from "react";
import Slider from "react-slick";
import styles from "./simpleSlider.module.scss";
import Image from "next/image";
import { useTranslation, LinkWithLocale } from "next-export-i18n";

import Icon from "@mdi/react";
import { mdiChevronRight, mdiChevronLeft, mdiMapMarkerOutline, mdiBedQueenOutline } from "@mdi/js";

import { ads } from "@/data/ads/ads";
import { getImageUrl } from "@/lib/utils";
import { 
  cityTranslations,
  districtTranslations,
  propertyTypeTranslations 
} from "@/lib/translations";

const NextArrow = ({ onClick }: { onClick?: () => void }) => {
  return (
    <div className={styles.nextArrow} onClick={onClick}>
      <Icon path={mdiChevronRight} size={1.4} />
    </div>
  );
};

const PrevArrow = ({ onClick }: { onClick?: () => void }) => {
  return (
    <div className={styles.prevArrow} onClick={onClick}>
      <Icon path={mdiChevronLeft} size={1.4} />
    </div>
  );
};

interface SimpleSliderProps {
  type: "sale" | "rent";
  country: string;
  locale: "ru" | "en";
}
export default function SimpleSlider({
  type,
  country,
  locale,
}: SimpleSliderProps) {

  const { t } = useTranslation();

  const filteredAds = ads.filter(
    (ad) => ad.type === type && ad.location.country === country
  );
  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    autoplay: true,
    speed: 3000,
    autoplaySpeed: 2000,
    cssEase: "ease-in-out",
    // pauseOnHover: true
  };

  if (filteredAds.length < 3) {
    return null;
  }
  const formatNumber = (num: number): string => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  };
  return (
    <div className={styles.carouselBlock}>
      <h1 className={styles.header}>
        {type === "rent" ? t("home.rent") : t("home.buy")}
      </h1>
      <div className={styles.carousel}>
        <div className={styles.sliderWrapper}>
          <Slider {...settings}>
            {filteredAds.map((card) => (
              <div key={card.id} className={styles.slide}>
                <div className={styles.adCard}>
                  <LinkWithLocale href={`/ads/${card.id}`}>
                    <Image
                      width={400}
                      height={200}
                      className={styles.cardImage}
                      src={getImageUrl(card.images[0])}
                      alt={`${
                        propertyTypeTranslations[card.propertyType][locale]
                      } in ${cityTranslations[card.location.city][locale]}`}
                    />
                    <div className={styles.cardDescription}>
                      <div className={styles.leftDesc}>
                        <p className={styles.title}>
                          {propertyTypeTranslations[card.propertyType][locale]}
                        </p>
                        <p className={styles.iconRow}>
                          <Icon path={mdiMapMarkerOutline} size={0.8} />
                          {[
                            cityTranslations[card.location.city][locale],
                            districtTranslations[card.location.district]?.[
                              locale
                            ] || "",
                          ]
                            .filter(Boolean)
                            .join(", ")}
                        </p>
                      </div>
                      <div className={styles.rightDesc}>
                        <p className={styles.price}>
                          {card.price.try !== undefined &&
                          card.price.try !== null
                            ? `${new Intl.NumberFormat("ru-RU").format(
                                card.price.try
                              )} ₺`
                            : card.price.rub !== undefined &&
                              card.price.rub !== null
                            ? `${new Intl.NumberFormat("ru-RU").format(
                                card.price.rub
                              )} ₽`
                            : ""}
                        </p>

                        <p className={styles.iconRow}>
                          <span className={styles.iconSpan}>
                            {" "}
                            <Icon path={mdiBedQueenOutline} size={0.9} />{" "}
                            {card.rooms}{" "}
                          </span>
                        </p>
                      </div>
                    </div>
                  </LinkWithLocale>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
      <button className={styles.blockButton}>
        <LinkWithLocale href={`/search?type=${type}&country=${country}`}>
          {t("home.seeAll")}
        </LinkWithLocale>
      </button>
    </div>
  );
}
