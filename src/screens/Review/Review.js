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
  const [searchTitle, setSearchTitle] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedTag, setSelectedTag] = useState(null);

  const { authenticated } = useContext(AuthContext);
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
    fetchData();
  }, [authenticated, currentPage]);

  const fetchData = () => {
    const url = selectedTag
    ? `http://43.200.58.174:8080/api/v1/theater-review/tags?tagId=${selectedTag}`
    : `http://43.200.58.174:8080/api/v1/theater-review/`

    axios({
      method: "GET",
      url: url,
    })
      .then((response) => {
        const sortedReview = response.data.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        setReview(sortedReview);
        setTotalPages(Math.ceil(sortedReview.length / 5));
      })
      .catch((error) => {
        console.error(error);
      });
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
        setTotalPages(1);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const paginateReviews = (reviews) => {
    const startIndex = (currentPage - 1) * 5;
    const endIndex = startIndex + 5;
    return reviews.slice(startIndex, endIndex);
  };

  const handleTagClick = (tagId) => {
    setSelectedTag(tagId);
    setCurrentPage(1);
    fetchData();
    console.log(tagId);
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
        />
                <button className="Review-Search" onClick={searchHandler}>
          <FaSearch size="30" />
        </button>
        <div className="tag-button-wrap">
        <button className = "tag-button" onClick={() => handleTagClick(1)}>맛집</button>
        <button className = "tag-button" onClick={() => handleTagClick(2)}>카페</button>
        <button className = "tag-button" onClick={() => handleTagClick(3)}>대여</button>
        <button className = "tag-button" onClick={() => handleTagClick(4)}>물품 보관소</button>
        <button className = "tag-button" onClick={() => handleTagClick(5)}>주차장</button>
        <button className = "tag-button" onClick={() => handleTagClick(6)}>화장실</button>
      </div>
        <button className="Review-WriteBtn" onClick={validateUser}>
          글쓰기
        </button>
        <hr className="Review-hr" />

        {review.length === 0 ? (
          <div>리뷰가 없습니다.</div>
        ) : (
          <>
            <ul className="Review-Content">
              {paginateReviews(review).map((item, index) => (
                <li key={index} className="Review-Item">
                  <Link to={`/Review/${item.post_no}`}>
                    <span style={{ marginRight: "20px", color: "#000" }}>
                      {item.title}
                    </span>
                    <span style={{ marginRight: "20px", color: "#000" }}>
                      {item.createdAt}
                    </span>
                    <span style={{ marginRight: "20px", color: "#000" }}>
                      {item.nickname}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
            <div className="Review-Pagination">
              {Array.from({ length: totalPages }, (_, index) => (
                <button
                  key={index}
                  className={`Review-PageBtn ${
                    currentPage === index + 1 ? "active" : ""
                  }`}
                  onClick={() => handlePageChange(index + 1)}
                >
                  {index + 1}
                </button>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Review;