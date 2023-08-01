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
  const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);
  const [selectedTag, setSelectedTag] = useState(null);
  const [activeTag, setActiveTag] = useState(1);

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
    setActiveTag(tagId);
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
  <button
    className={`tag-button ${activeTag === 1 ? "active" : ""}`}
    onClick={() => handleTagClick(1)}
  >
    맛집
  </button>
  <button
    className={`tag-button ${activeTag === 2 ? "active" : ""}`}
    onClick={() => handleTagClick(2)}
  >
    카페
  </button>
  <button
    className={`tag-button ${activeTag === 3 ? "active" : ""}`}
    onClick={() => handleTagClick(3)}
  >
    대여
  </button>
  <button
    className={`tag-button ${activeTag === 4 ? "active" : ""}`}
    onClick={() => handleTagClick(4)}
  >
    물품 보관소
  </button>
  <button
    className={`tag-button ${activeTag === 5 ? "active" : ""}`}
    onClick={() => handleTagClick(5)}
  >
    주차장
  </button>
  <button
    className={`tag-button ${activeTag === 6 ? "active" : ""}`}
    onClick={() => handleTagClick(6)}
  >
    화장실
  </button>
</div>
        <button className="Review-WriteBtn" onClick={validateUser}>
          글쓰기
        </button>
        <hr className="Review-hr" />

        {review.length === 0 ? (
          <div className= "Review-None">리뷰가 없습니다.</div>
        ) : (
          <>
            <div className="SeeyaDetail-Container">
              {paginateReviews(review).map((item, index) => (
                <div key={index} className="SeeyaDetail-Wrap">
                  <Link to={`/Review/${item.post_no}`} className="SeeyaDetail-title">{item.title}</Link>
                  <p className="SeeyaDetail-createdAt">{item.createdAt} </p>
                  <div className="SeeyaDetail-nickName">{item.nickname}</div>
                </div>
              ))}

              <div className="SeeyaDetail-Pagination">
                {pageNumbers.map((pageNumber) => (
                <button className="PageMoveButton"
                  key={pageNumber}
                  onClick={() => handlePageChange(pageNumber + 1)}
                  disabled={pageNumber === currentPage}>{pageNumber}</button>
                ))}
              </div>
            </div>


          </>
        )}
      </div>
    </div>
  );
};

export default Review;