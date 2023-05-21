/*시야 후기 모아보기 화면 */

import React from "react";
import {Link} from 'react-router-dom';
import Header from "../../Header";
import '../styles/Review.css';
import {FaSearch} from "react-icons/fa";

const Review = () => {
  const [review, setReview] = useState([]);
  const [searchTitle, setSearchTitle] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

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
    axios({
      method: "GET",
      url: `http://43.200.58.174:8080/api/v1/theater-review/`,
    })
      .then((response) => {
        const sortedReview = response.data.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        setReview(sortedReview);
        setTotalPages(Math.ceil(sortedReview.length / 5));
        console.log(localStorage);
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
            <Link to="/perform_review">
                <button className="Review-WriteBtn">글쓰기</button>
            </Link>
            <hr className="Review-hr"/>
            </div>
        </div>
    );
}

export default Review;