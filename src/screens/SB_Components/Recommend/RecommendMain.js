import React, { useEffect, useState } from "react";
import Header from "../../../Header";
import axios from "axios";
import { IoIosArrowDropright } from "react-icons/io";
import "../../styles/RecommendMain.css"
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
  const [no, setNo] = useState();

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
      <h5>원하는 공연의 종류를 선택해주세요.</h5>
      <button className="Genre-Musical" onClick={() => handleGenreSelect('뮤지컬')}>뮤지컬</button>
      <button className="Genre-Concert" onClick={() => handleGenreSelect('콘서트')}>콘서트</button>
    </div>
  );

  const renderStep3Musical = () => {
    if (selectedGenre !== '뮤지컬') return null;
  
    const handleGenreChange = (e) => {
      setSelectedMusicalGenre(e.target.value);
    };
  
    return (
      <div className="genre-component musical">
        <div>
        <p>뮤지컬의 장르 또는 좋아하는 배우를 입력해보세요!</p>
        <br/><br/>
        <select className="recommend-select" value={selectedMusicalGenre} onChange={handleGenreChange}>
          {genres['뮤지컬'].map((option) => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
        <input type="text" className="input-recommend" placeholder="좋아하는 배우" value={favoriteActor} onChange={handleActorInput} />
        </div>
        <IoIosArrowDropright className="arrow-next" onClick={handleRecommend}/>
      </div>
    );
  };
  
  const renderStep3Concert = () => {
    if (selectedGenre !== '콘서트') return null;
  
    const handleGenreChange = (e) => {
      setSelectedConcertGenre(e.target.value);
    };
  
    return (
      <div className="genre-component concert">
        <h4>장르 : 콘서트</h4>
        <select value={selectedConcertGenre} onChange={handleGenreChange}>
          {genres['콘서트'].map((option) => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
        <input type="text" placeholder="좋아하는 가수" value={favoriteSinger} onChange={handleSingerInput} />
        <IoIosArrowDropright className="arrow-next" onClick={handleRecommend}/>
      </div>
    );
  };

  const handleRecommend = () => {
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
          setNo(recommendations.no);
          setSelectedStep(3);
          console.log(recommendations.no);
        } else {
          console.error("Invalid recommendations data:", response.data);
        }
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
                      <span>해당 가수/배우에 대한 예정된 공연:</span>
                    ) : (
                      <span>추천 공연:</span>
                    )}
                    {recommendation.title && (
                      <span style={{ marginRight: "20px", color: "#000" }}>
                        {recommendation.title}
                      </span>
                    )}
                    {recommendation.cast && (
                      <span style={{ marginRight: "20px", color: "#000" }}>
                        {recommendation.cast}
                      </span>
                    )}
                    {recommendation.genre && (
                      <span style={{ marginRight: "20px", color: "#000" }}>
                        {recommendation.genre}
                      </span>
                    )}
                    {recommendation.date && (
                      <span style={{ marginRight: "20px", color: "#000" }}>
                        {recommendation.date}
                      </span>
                    )}
                    {recommendation.imgUrl && (
                    <img src={recommendation.imgUrl} style={{width : "225px", height : "300px"}} alt={recommendation.title} />
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
        {selectedStep === 3 && renderStep3()}
        {selectedStep === 2 && selectedGenre === '뮤지컬' && renderStep3Musical()}
        {selectedStep === 2 && selectedGenre === '콘서트' && renderStep3Concert()}
        </div>
      </div>
    </div>
  );
};

export default RecommendMain;
