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
  const [imgUrls, setImgUrls] = useState([]);
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
        const extractedImgUrls = musicalRank.map((item) => item.imgUrl || null);
        setImgUrls(extractedImgUrls);
        setMusicalRanking(musicalRank);
        setMusicalNo(extractedMusicalNo);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://43.200.58.174:8080/api/v1/");
        const concertRank = response.data.concertRank || [];
        const extractedConcertNo = concertRank.map((item) => item.concert?.no || null);
        const musicalRank = response.data.musicalRank || [];
        const extractedMusicalNo = musicalRank.map((item) => item.musical?.no || null);
        
        const extractedImgUrls = concertRank.map((item) => item.imgUrl || null);
        setImgUrls(extractedImgUrls);

        const extractedImgUrl = musicalRank.map((item) => item.imgUrl || null);
        setImgUrls(extractedImgUrl);

        setConcertRanking(response.data.concertRank || []);
        setConcertNo(extractedConcertNo);

        setMusicalRanking(response.data.musicalRank || []);
        setMusicalNo(extractedMusicalNo);
        console.log(response.data);
        
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    console.log(musicalNo);
    console.log(concertNo)
  }, [musicalNo, concertNo]);


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
        breakpoint: 700,
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

  function clickConcertImage(concertNo) {
    navigate(`/concerts/${concertNo}`);
  }

  return (
    <div className="mySliderM">
      <div className="tab-barM">
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
          <div className="ranking-containerM">
            <Slider {...settings}>
              {musicalRanking.map((item, index) => (
                <div className="rank-div" key={index} onClick={() => clickMusicalImage(item.musical?.no)}>
                  <img src={item.imgUrl} alt={`musical-slide-${index}`} />
                </div>
              ))}
            </Slider>
          </div>
        )}

        {activeTab === "concert" && (
          <div className="ranking-containerM">
            <Slider {...settings}>
              {concertRanking.map((item, index) => (
                <div className="rank-div" key={index} onClick={() => clickConcertImage(item.concert?.no)}>
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
