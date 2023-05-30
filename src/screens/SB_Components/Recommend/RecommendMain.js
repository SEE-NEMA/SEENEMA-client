import React, { useEffect, useState } from "react";
import Header from "../../../Header";
import axios from "axios";
import { AiOutlineConsoleSql } from "react-icons/ai";

const RecommendMain = () => {
  const token = localStorage.getItem('token');
  const [userInfo, setUserInfo] = useState("");
  const [selectedStep, setSelectedStep] = useState(1);
  const [selectedGenre, setSelectedGenre] = useState(""); // 추가: 선택한 장르 상태값 추가
  const [favoriteActor, setFavoriteActor] = useState("");
  const [favoriteSinger, setFavoriteSinger] = useState("");
  const [recommendations, setRecommendations] = useState([]);

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
    뮤지컬: ['라이선스', '창작', '오리지널', '어린이/가족', '퍼포먼스', '뮤지컬'],
    콘서트: ['힙합/랩', '내한공연', '발라드', '트로트', '락/메탈', '재즈/블루스', '일렉트로니카', '탱고']
  };

  const renderStep1 = () => (
    <div className="RM-Select">
      <h4>원하는 공연을 선택해주세요.</h4>
      <button onClick={() => handleGenreSelect('뮤지컬')}>뮤지컬</button>
      <button onClick={() => handleGenreSelect('콘서트')}>콘서트</button>
    </div>
  );

  const renderGenreSelect = () => (
    <div className="genre-container">
      <button className="back-button" onClick={() => handleStepChange(1)}>
        뒤로 가기
      </button>
      <div className="genre-component">
        <h4>장르 선택</h4>
        <select value={selectedGenre} onChange={e => setSelectedGenre(e.target.value)}>
          <option value="">장르 선택</option>
          {Object.keys(genres).map(genre => (
            <option key={genre} value={genre}>{genre}</option>
          ))}
        </select>
        <button onClick={handleRecommend}>다음</button>
      </div>
    </div>
  );

  const renderStep3Musical = () => (
    <div className="genre-component musical">
      <h4>장르 : 뮤지컬</h4>
      <select value={selectedGenre} onChange={e => setSelectedGenre(e.target.value)}>
        {genres['뮤지컬'].map((option) => (
          <option key={option} value={option}>{option}</option>
        ))}
      </select>
      <input type="text" placeholder="좋아하는 배우" value={favoriteActor} onChange={handleActorInput} />
      <button onClick={handleRecommend}>다음</button>
    </div>
  );

  const renderStep3Concert = () => (
    <div className="genre-component concert">
      <h4>장르 : 콘서트</h4>
      <select value={selectedGenre} onChange={e => setSelectedGenre(e.target.value)}>
        {genres['콘서트'].map((option) => (
          <option key={option} value={option}>{option}</option>
        ))}
      </select>
      <input type="text" placeholder="좋아하는 가수" value={favoriteSinger} onChange={handleSingerInput} />
      <button onClick={handleRecommend}>다음</button>
    </div>
  );

  const handleRecommend = () => {
    const data = {
      concertFavorites: [],
      musicalFavorites: []
    };
  
    if (selectedGenre === "콘서트" && favoriteSinger) {
      data.concertFavorites.push({
        cast: favoriteSinger,
        genre: selectedGenre
      });
    }
  
    if (selectedGenre === "뮤지컬" && favoriteActor) {
      data.musicalFavorites.push({
        cast: favoriteActor,
        genre: selectedGenre
      });
    }
  
    axios
      .post("http://43.200.58.174:8080/api/v1/recommend", data, {
        headers: {
          "X-AUTH-TOKEN": token
        }
      })
      .then((response) => {
        const { recommendedConcerts, recommendedMusicals } = response.data;
        console.log(response.data)
        if (Array.isArray(recommendedConcerts) && Array.isArray(recommendedMusicals)) {
          const recommendations = [...recommendedConcerts, ...recommendedMusicals];
          setRecommendations(recommendations);
          setSelectedStep(3);
        } else {
          console.error("Invalid recommendations data:", response.data);
        }
      })
      .catch((error) => {
        console.error("Error while recommending:", error);
      });
  };
  
  
  return (
    <div>
      <Header />
      <div className="RecommendMain">
        <div className="User-NickName">
          <h1>{userInfo.nickname}님, 안녕하세요!</h1>
          <p>{userInfo.nickname}님에게 맞춤 공연을 추천해드리겠습니다.</p>
        </div>
        {selectedStep === 1 && renderStep1()}
        {selectedStep === 2 && (selectedGenre === '뮤지컬' ? renderStep3Musical() : renderStep3Concert())}
        {selectedStep === 3 && recommendations && (
          <div>
            <h4>추천 결과</h4>
            <ul>
              {recommendations.map((recommendation) => (
                <div key={recommendation.no}>
                  <li key={recommendation.no}>
                    <span style={{ marginRight: "20px", color: "#000" }}>{recommendation.title}</span>
                    <img src={recommendation.imgUrl} alt={recommendation.title} />
                  </li>
                </div>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default RecommendMain;
