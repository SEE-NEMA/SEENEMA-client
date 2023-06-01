import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../screens/styles/SliderContainer.css";

export default function SliderContainer() {
  const [concertRanking, setConcertRanking] = useState([]);
  const [musicalRanking, setMusicalRanking] = useState([]);
  const [concertNo, setConcertNo] = useState();
  const [musicalNo, setMusicalNo] = useState([]);
  const [activeTab, setActiveTab] = useState("musical");
  const navigate = useNavigate();

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://43.200.58.174:8080/api/v1/");
        const musicalRank = response.data.musicalRank || [];
        const extractedMusicalNo = musicalRank.map((item) => item.musical?.no || null);
        setConcertRanking(response.data.concertRank || []);
        setMusicalRanking(musicalRank);
        setMusicalNo(extractedMusicalNo);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    console.log(musicalNo);
  }, [musicalNo]);

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

  function clickMusicalImage(musicalNo) {
    navigate(`/musicals/${musicalNo}`);
  }

  return (
    <div className="mySlider">
      <div className="tab-bar">
        <button
          className={activeTab === "musical" ? "active" : ""}
          onClick={() => handleTabClick("musical")}
        >
          뮤지컬 랭킹
        </button>
        <button
          className={activeTab === "concert" ? "active" : ""}
          onClick={() => handleTabClick("concert")}
        >
          콘서트 랭킹
        </button>
      </div>

      <div className="parallel-slider">
        {activeTab === "musical" && (
          <div className="ranking-container">
            <Slider {...settings}>
              {musicalRanking.map((item, index) => (
                <div key={index} onClick={() => clickMusicalImage(item.musical?.no)}>
                  <img src={item.imgUrl} alt={`musical-slide-${index}`} />
                </div>
              ))}
            </Slider>
          </div>
        )}

        {activeTab === "concert" && (
          <div className="ranking-container">
            <Slider {...settings}>
              {concertRanking.map((item, index) => (
                <div key={index}>
                  <img src={item.imgUrl} alt={`concert-slide-${index}`} />
                </div>
              ))}
            </Slider>
          </div>
        )}
      </div>
    </div>
  );
}
