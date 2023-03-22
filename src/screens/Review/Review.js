/*시야 후기 모아보기 화면 */

import React, { useEffect, useState } from "react";
import {Link} from 'react-router-dom';
import Header from "../../Header";
import '../styles/Review.css';
import {FaSearch} from "react-icons/fa";
import axios from "axios";
import {AiFillCaretDown} from 'react-icons/ai';


const Review = () => {
    const [review, setReview] = useState([]);
    const [showAllReviews, setShowAllReviews] = useState(false);
    const [searchTitle, setSearchTitle] = useState("");
  
    useEffect(() => {
      axios({
        method: "GET",
        url: "http://43.200.58.174:8080/api/v1/theater-review/",
      }).then((response) => {
        const sortedReview = response.data.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        setReview(sortedReview);
      });
    }, []);
  
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
          ></input>
          <button className="Review-Search" onClick={searchHandler}>
            <FaSearch size="30" />
          </button>
          <Link to="/perform_review">
            <button className="Review-WriteBtn">글쓰기</button>
          </Link>
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
  