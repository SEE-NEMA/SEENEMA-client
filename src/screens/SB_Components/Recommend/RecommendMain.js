import React, { useEffect, useState } from "react";
import Header from "../../../Header";
import axios from "axios";
import { Link } from "react-router-dom";
import { IoIosArrowDropleft } from "react-icons/io";
import "../../styles/RecommendMain.css"
import {BallTriangle} from 'react-loader-spinner'
// 단계별 프로그레스 바

const RecommendMain = () => {
  const token = localStorage.getItem('token');
  const [userInfo, setUserInfo] = useState("");
  const [selectedStep, setSelectedStep] = useState(1);
  const [selectedGenre, setSelectedGenre] = useState("");
  const [selectedMusicalGenre, setSelectedMusicalGenre] = useState('');
  const [selectedConcertGenre, setSelectedConcertGenre] = useState('');
  const [favoriteActor, setFavoriteActor] = useState("");
  const [favoriteSinger, setFavoriteSinger] = useState("");
  const [recommendations, setRecommendations] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    axios
      .get(`http://43.200.58.174:8080/api/v1/user/profile`, {
        headers: {
          "X-AUTH-TOKEN": token
        }
      })
      .then((response) => {
        setUserInfo(response.data);
      })
  }, [token]);

  const handleStepChange = (step) => {
    setSelectedStep(step);
  }

  const handleGenreSelect = (genre) => {
    setSelectedGenre(genre);
    setSelectedStep(2);
  }

  const handleActorInput = (event) => {
    setFavoriteActor(event.target.value);
  }

  const handleSingerInput = (event) => {
    setFavoriteSinger(event.target.value);
  }

  const genres = {
    뮤지컬: ['뮤지컬','라이선스', '창작', '오리지널', '어린이/가족', '퍼포먼스'],
    콘서트: ['콘서트','힙합/랩', '내한공연', '발라드', '트로트', '락/메탈', '재즈/블루스', '일렉트로니카', '탱고']
  };

  const renderStep1 = () => (
    <div className="RM-Select">
      <button className="Genre-Musical" onClick={() => handleGenreSelect('뮤지컬')}>추천 받기</button>
    </div>
  );

  const renderStep3Musical = () => {
    if (selectedGenre !== '뮤지컬') return null;
  
    const handleGenreChange = (e) => {
      setSelectedMusicalGenre(e.target.value);
    };
  
    const handleBackToStep1 = () => {
      setSelectedStep(1); // 이 부분을 추가하여 화면을 Step 1로 변경합니다.
    };
  
    return (
      <div className="genre-component musical">
        <div>
          <IoIosArrowDropleft className="arrow-next" onClick={handleBackToStep1} /> {/* 수정된 부분 */}
        </div>
      </div>
    );
  };
  
  
  const renderStep3Concert = () => {
    
  };

  const handleRecommend = () => {
    setIsLoading(true);
    const data = {
      concertFavorites: [],
      musicalFavorites: []
    };
  
    if (selectedGenre === "콘서트" && favoriteSinger) {
      data.concertFavorites.push({
        cast: favoriteSinger,
        genre: selectedConcertGenre
      });
    }
  
    if (selectedGenre === "뮤지컬" && favoriteActor) {
      data.musicalFavorites.push({
        cast: favoriteActor,
        genre: selectedMusicalGenre
      });
    }
  
    axios
      .post("http://43.200.58.174:8080/api/v1/recommend", data, {
        headers: {
          "X-AUTH-TOKEN": token
        }
      })
      .then((response) => {
        console.log(response);
        const { recommendedConcerts, recommendedMusicals } = response.data;
        if (Array.isArray(recommendedConcerts) && Array.isArray(recommendedMusicals)) {
          const recommendations = [...recommendedConcerts, ...recommendedMusicals];
          setRecommendations(recommendations);
          setSelectedStep(3);
          setIsLoading(false);
        } else {
          console.error("Invalid recommendations data:", response.data);
        }

        console.log("콘서트 추천 : ");
        recommendedConcerts.forEach((concert, index) => {
          console.log(`concert ${index+1}: ${concert.no}`)
        })

        console.log("뮤지컬 추천 : ");
        recommendedMusicals.forEach((musical, index) => {
          console.log(`musical ${index+1}: ${musical.no}`)
        })
      })
      .catch((error) => {
        console.error("Error while recommending:", error);
      });
  };

  const renderStep3 = () => {
    return (
      <div className="recommend-result">
        {recommendations.length > 0 ? (
          <ul>
            {recommendations.map((recommendation, index) => (
              <li key={index}>
                {recommendation ? (
                  <>
                    {index === 0 ? (
                      <span className = "recommend-result-Span">해당 가수/배우에 대한 예정된 공연 : </span>
                    ) : (
                      <span className = "recommend-result-Span">추천 공연:</span>
                    )}
                    {recommendation.title && (
                      <span className = "recommend-result-Title" style={{ marginRight: "20px", color: "#000" }}>
                        {recommendation.title}
                      </span>
                    )}
              
                    <form>
                    {recommendation.genre && (
                      <span className = "recommend-result-Genre" style={{ marginRight: "20px" }}>
                        장르 : {recommendation.genre}
                      </span>
                    )}
                    {recommendation.date && (
                      <span className = "recommend-result-Data" style={{ marginRight: "20px" }}>
                        {recommendation.date}
                      </span>
                    )}
                    </form>
                    {recommendation.imgUrl && (
              <>
                {selectedGenre === '뮤지컬' ? (
                  <Link to={`/musicals/${recommendation.no}`}>
                    <img
                      className="recommend-result-Image"
                      src={recommendation.imgUrl}
                      style={{ width: "225px", height: "300px" }}
                      alt={recommendation.title}
                    />
                  </Link>
                ) : (
                  <Link to={`/concerts/${recommendation.no}`}>
                    <img
                      className="recommend-result-Image"
                      src={recommendation.imgUrl}
                      style={{ width: "225px", height: "300px" }}
                      alt={recommendation.title}
                    />
                  </Link>
                )}
              </>
            )}
                  </>
                ) : (
                  <span style={{ marginRight: "20px", color: "#000" }}>현재 {recommendation.cast}님이 출연하는 공연이 없습니다.</span>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <span>No recommendations available</span>
        )}
      </div>
    );
  };

  return (
    <div>
      <Header userInfo={userInfo} />
      <div className="RecommendMain">
        <div className="User-NickName">
          <h1 className = "Recommend-Title">{userInfo.nickname}님, 안녕하세요!</h1>
          <hr className="hr-recommend"/>
          <p className = "Recommend-NickName">{userInfo.nickname}님에게 맞춤 공연을 추천해드리겠습니다.</p>
        </div>
        <div className="selectSteps">
        {selectedStep === 1 && renderStep1()}
        {selectedStep === 2 && selectedGenre === '뮤지컬' && renderStep3Musical()}
        {selectedStep === 2 && selectedGenre === '콘서트' && renderStep3Concert()}
        {selectedStep === 3 && renderStep3()}
        {isLoading && ( // isLoading이 true일 때만 Loader 표시
            <BallTriangle
              type="Puff"
              color="#00BFFF"
              height={100}
              width={100}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default RecommendMain;