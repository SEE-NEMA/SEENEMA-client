import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from "axios";
import "../screens/styles/SliderContainer.css";

export default function SliderContainer() {
  const [concertRanking, setConcertRanking] = useState([]);
  const [musicalRanking, setMusicalRanking] = useState([]);

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
    slidesToShow: 1,
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
      <div className="parallel-slider">
        <div className="ranking-container">
          <h2>Concert Ranking</h2>
          <Slider {...settings}>
            {concertRanking.map((item, index) => (
              <div key={index}>
                <img src={item.imgUrl} alt={`concert-slide-${index}`} />
              </div>
            ))}
          </Slider>
        </div>
        <div className="ranking-container">
          <h2>Musical Ranking</h2>
          <Slider {...settings}>
            {musicalRanking.map((item, index) => (
              <div key={index}>
                <img src={item.imgUrl} alt={`musical-slide-${index}`} />
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
}
