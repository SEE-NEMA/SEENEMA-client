import React, { useEffect, useState } from "react";
import Header from "../../../Header";
import axios from "axios";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import { IoIosArrowDropleft } from "react-icons/io";
import "../../styles/RecommendMain.css";
import { BallTriangle } from "react-loader-spinner";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const RecommendMain = () => {
  const token = localStorage.getItem("token");
  const [userInfo, setUserInfo] = useState("");
  const [selectedStep, setSelectedStep] = useState(1);
  const [recommendations, setRecommendations] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [imgUrl, setImgUrl] = useState({});
  const [date, setDate] = useState("");

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1, // 한 번에 보여질 슬라이드 수
    slidesToScroll: 1,
  };

  useEffect(() => {
    axios
      .get(`http://43.200.58.174:8080/api/v1/user/profile`, {
        headers: {
          "X-AUTH-TOKEN": token,
        },
      })
      .then((response) => {
        setUserInfo(response.data);
        setImgUrl(response.data.imgUrl);
        setDate(response.data.date);
        console.log(imgUrl);
      });
  }, [token]);

  const handleStepChange = (step) => {
    setSelectedStep(step);
  };

  const handleRecommend = () => {
    setIsLoading(true);

    // Simulate a delay for loading (4 times longer, adjust as needed)
    setTimeout(() => {
      axios
        .get(`http://43.200.58.174:8080/api/v1/user/history`, {
          headers: {
            "X-AUTH-TOKEN": token,
          },
        })
        .then((response) => {
          setRecommendations(response.data);
          setIsLoading(false); // Set isLoading to false after data is loaded
          setSelectedStep(2); // Set selectedStep to 2 to display renderStep2
          console.log(response.data);
        });
    }, 4000); // Adjust the delay duration as needed (4 seconds in this example)
  };

  const renderStep1 = () => (
    <div className="RM-Select">
      {isLoading ? (
        <BallTriangle type="Puff" color="#00BFFF" height={100} width={100} />
      ) : (
        <button className="Genre-Musical" onClick={handleRecommend}>
          추천 받기
        </button>
      )}
    </div>
  );
 
  const renderStep2 = () => (
    <div className="wrap-recommendation-container">
      <div className="recommendation-container">
        {isLoading ? (
          <BallTriangle type="Puff" color="#00BFFF" height={100} width={100} />
        ) : (
          recommendations.map((recommendation) => (
              <div className="recommendation-card">
                <img src={recommendation.imgUrl} alt={recommendation.title} className="recommendation-image" />
                <Link to={`/concerts/${recommendation.no}`} >
                <div className="recommendation-details">
                  <p className="recommendation-title">{recommendation.title}</p>
                  <p className="recommendation-date">{recommendation.date}</p>
                </div>
                </Link>
              </div>
          ))
        )}
      </div>
    </div>
  );
  

  return (
    <div>
      <Header userInfo={userInfo} />
      <div className="RecommendMain">
        <div className="User-NickName">
          <h1 className="Recommend-Title">{userInfo.nickname}님, 안녕하세요!</h1>
          <hr className="hr-recommend" />
          <p className="Recommend-NickName">
            {userInfo.nickname}님에게 맞춤 공연을 추천해드리겠습니다.
          </p>
        </div>
        <div className="selectSteps">
          {selectedStep === 1 && renderStep1()}
          {selectedStep === 2 && renderStep2()}
        </div>
      </div>
    </div>
  );
};

export default RecommendMain;