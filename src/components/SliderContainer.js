import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from "axios";
import "../screens/styles/SliderContainer.css";

export default function SliderContainer() {
  const [concertRanking, setConcertRanking] = useState([]);
  const [musicalRanking, setMusicalRanking] = useState([]);
  const [activeTab, setActiveTab] = useState("musical");

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  useEffect(() => {
    axios
      .get("http://43.200.58.174:8080/api/v1/")
      .then((response) => {
        setConcertRanking(response.data.concertRank);
        setMusicalRanking(response.data.musicalRank);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 0,
        },
      },
    ],
  };

  return (
    <div className="mySlider">
      <Slider {...settings}>
        {items.map((item, index) => (
          <div key={index}>
            <img src={item} alt={`slide-${index}`} />
          </div>
        ))}
      </Slider>
    </div>
  );
}