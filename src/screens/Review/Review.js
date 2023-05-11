import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import Header from "../../Header";
import '../styles/Review.css';
import { FaSearch } from "react-icons/fa";
import axios from "axios";
import { AiFillCaretDown } from 'react-icons/ai';
import { AuthContext } from "../../contexts/AuthContext";

const Review = () => {
  const [review, setReview] = useState([]);
  const [showAllReviews, setShowAllReviews] = useState(false);
  const [searchTitle, setSearchTitle] = useState("");

  const {authenticated} = useContext(AuthContext);
  const navigate = useNavigate();

  const validateUser = async () => {
    const token = localStorage.getItem('token');

    try {
      const response = await axios.post('http://43.200.58.174:8080/api/v1/theater-review/auth', null, {
        headers: {
          "Content-Type": "application/json",
          "X-AUTH-TOKEN": token
        }
      });
      
      console.log(response);

      if (response.data === 'SUCCESS') {
        navigate("/ReviewPost");
      } else {
        alert("로그인 한 사용자만 작성 가능합니다.");
      }
    } catch (error) {
      console.error(error);
      alert("서버 오류가 발생했습니다.");
    }
  };

  useEffect(() => {
    axios({
      method: "GET",
      url: "http://43.200.58.174:8080/api/v1/theater-review/",
    }).then((response) => {
      const sortedReview = response.data.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
      setReview(sortedReview);
      console.log(localStorage);
    });
  }, [authenticated]);

  const toggleShowAllReviews = () => {
    setShowAllReviews(!showAllReviews);
  };

  const searchHandler = () => {
    axios
      .get(
        `http://43.200.58.174:8080/api/v1/theater-review/search?q=${searchTitle}`
      )
      .then((response) => {
        const sortedReview = response.data.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        setReview(sortedReview);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  
    return (
      <div>
        <Header />
        <div className="Review-WrapContent">
          <input
            className="Review-Input"
            placeholder="공연 혹은 공연장 이름을 검색해주세요"
            onChange={(e) => setSearchTitle(e.target.value)}
            onKeyDown={(e) => {
                if (e.key === "Enter") {
                  searchHandler();
                }
              }}
          ></input>
          <button className="Review-Search" onClick={searchHandler}>
            <FaSearch size="30" />
          </button>
          <button className="Review-WriteBtn" onClick={validateUser}>글쓰기</button>
          <hr className="Review-hr" />
          <div className="Review-Content">
            <ul>
              {review
                .slice(0, showAllReviews ? review.length : 5)
                .map((reviews) => (
                  <li key={reviews.post_no}>
                    <Link to={`/Review/${reviews.post_no}`}>
                      <span style={{ marginRight: "20px", color: "#000" }}>
                        {reviews.title}
                      </span>
                      <span style={{ marginRight: "20px", color: "#000" }}>
                        {reviews.createdAt}
                      </span>
                      <span style={{ marginRight: "20px", color: "#000" }}>
                        {reviews.nickname}
                      </span>
                    </Link>
                  </li>
                ))}
            </ul>
            {!showAllReviews && (
              <AiFillCaretDown
                className="showMore_btn"
                onClick={toggleShowAllReviews}
              >
                더보기
              </AiFillCaretDown>
            )}
          </div>
        </div>
      </div>
    );
  };
  
  export default Review;