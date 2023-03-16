import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import "../screens/styles/SliderContainer.css";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";
// import required modules
import { Autoplay, EffectFade, Navigation, Pagination } from "swiper";

import Img1 from "../assets/imgs/sample1.jpg"
import Img2 from "../assets/imgs/sample2.jpg"
import Img3 from "../assets/imgs/sample3.jpg"
import Img4 from "../assets/imgs/sample4.jpg"
import Img5 from "../assets/imgs/sample5.jpg"
import Img6 from "../assets/imgs/sample6.jpg"

export default function SliderContainer() {
  const items = [
    { src : Img1 },
    { src: Img2},
    { src: Img3},
    { src: Img4},
    { src: Img5},
    { src: Img6}
  ];
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