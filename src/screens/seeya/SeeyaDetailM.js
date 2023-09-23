import React, { useState, useEffect, useHistory} from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import HeaderM from "../../HeaderM";
import '../styles/SeeyaDetail.css';
import { FaSearch } from "react-icons/fa";

function SeeyaDetail() {
  const { theaterId } = useParams();
  const [reviews, setReviews] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 번호
  const itemsPerPage = 4; // 페이지당 항목 수

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedReviews = reviews.slice(startIndex, endIndex);

  const maxPage = Math.ceil(reviews.length / itemsPerPage);
  const pageNumbers = Array.from({ length: maxPage }, (_, index) => index + 1);


  const goToPage = (pageNumber) => {
  setCurrentPage(pageNumber);
};


  useEffect(() => {
    axios.get(`http://43.200.58.174:8080/api/v1/view-review/${theaterId}`)
      .then(response => {
        console.log(response);
        setReviews(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, [theaterId]);


  const handleSearch = () => {
    const encodedSearchQuery = encodeURIComponent(searchQuery);
    axios.get(`http://43.200.58.174:8080/api/v1/view-review/${theaterId}/search?q=${encodedSearchQuery}`)
      .then(response => {
        setReviews(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  };

  return (
    <div>
      <HeaderM/>
      <div className="contentWrap">
        <div className="search-inputM">
          <input 
                  className="SeeyaMain-input" 
                  placeholder="좌석 검색 (ex:1층, 1층5열)" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button className="SeeyaMain-Search" onClick={handleSearch}>
            <FaSearch size="30" />
          </button>
          <hr className="hrM" />
        </div>

        <div className="view-reivew-write-btn">
          <Link to={`/SeeyaUpload/${theaterId}`}>
            <button>
              글쓰기
            </button>
          </Link>
        </div>

        <div>
          <div className="result-basic-rowM">
            <p className="basic-row-titleM">제목</p>
            <p className="basic-row-dateM">작성 일자</p>
            <p className="basic-row-writerM">작성자</p>
          </div>
          {paginatedReviews.map((review, index) => (
            <div key={index} className="search-result-rowM"> 
              <Link to={`/view-review/${theaterId}/${review.viewNo}`} className="result-row-titleM">
                {review.title}
              </Link>
              <p className="result-row-dateM">{review.createdAt} </p>
              <p className="result-row-writerM">{review.nickName}</p>
            </div>
          ))}
        </div>

        <div>
            {pageNumbers.map((pageNumber) => (
              <button className = "PageMoveButton"
                      key={pageNumber}
                      onClick={() => goToPage(pageNumber)}
                      disabled={pageNumber === currentPage}
                      >
              {pageNumber}
              </button>
            ))}
          </div>
{/* 
        <div className="SeeyaDetail-Container">
          {paginatedReviews.map((review, index) => (
            <div key={index} className="SeeyaDetail-Wrap"> 
              <Link to={`/view-review/${theaterId}/${review.viewNo}`} className="SeeyaDetail-title">
                {review.title}
              </Link>
              <p className="SeeyaDetail-createdAt">{review.createdAt} </p>
              <div className="SeeyaDetail-nickName">{review.nickName}</div>
            </div>
          ))}
          
          <div className = "SeeyaDetail-Pagination">
            {pageNumbers.map((pageNumber) => (
              <button className = "PageMoveButton"
                      key={pageNumber}
                      onClick={() => goToPage(pageNumber)}
                      disabled={pageNumber === currentPage}
                      >
              {pageNumber}
              </button>
            ))}
          </div>

        </div> */}
      </div>
    </div>
  );
}

export default SeeyaDetail;