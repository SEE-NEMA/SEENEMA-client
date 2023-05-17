import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../screens/styles/SliderContainer.css";

import Img1 from "../assets/imgs/sample1.jpg";
import Img2 from "../assets/imgs/sample2.jpg";
import Img3 from "../assets/imgs/sample3.jpg";
import Img4 from "../assets/imgs/sample4.jpg";
import Img5 from "../assets/imgs/sample5.jpg";
import Img6 from "../assets/imgs/sample6.jpg";

export default function SliderContainer() {
  const items = [Img1, Img2, Img3, Img4, Img5, Img6];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <>
      <Swiper
        effect={"fade"}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        modules={[Navigation, EffectFade, Pagination,Autoplay]}
        className="mySwiper"
        loop={true}
      >
        {items.map((item, idx) => {
          return (
            <SwiperSlide key={idx}>
              <img src={item.src} alt="승훈이 사진"/>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </>
  );
}
