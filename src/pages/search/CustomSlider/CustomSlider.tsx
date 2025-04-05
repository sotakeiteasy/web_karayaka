import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from "next/image";
import styles from "./CustomSlider.module.scss";

import Icon from "@mdi/react";
import { mdiChevronRight, mdiChevronLeft } from "@mdi/js";

import { Ad } from "@/lib/types";
import { getImageUrl } from "@/lib/utils";

export default function CustomSlider({
  ad
}: {
  ad: Ad
}) {
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
    prevArrow: <SamplePrevArrow />,
  };

  return (
    <div style={{ width: "360px" }}>
      <Slider {...settings}>
        {ad?.images.map((image, index) => (
          <Image
            key={index}
            src={getImageUrl(image)}
            alt={""}
            width={400}
            height={400}
            priority
          />
        ))}
      </Slider>
    </div>
  );
}
