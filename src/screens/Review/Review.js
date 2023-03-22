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
    const [showAllReviews, setShowAllReviews] = useState(5);
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResult, setSearchResult] = useState([]);

    useEffect(() => {
        axios({
            method:'GET',
            url : `http://43.200.58.174:8080/api/v1/theater-review/`
        }).then(response => {
            const sortedReview = response.data.sort(
                (a,b) => new Date(b.createdAt) - new Date(a.createdAt)
            );
            setReview(sortedReview)
        })
    }, []);

    const toggleShowAllReviews = () => {
        setShowAllReviews(showAllReviews === 5 ? review.length : 5);
    }

    const searchHandler = () => {
        axios.get(`http://43.200.58.174:8080/api/v1/theater-review/search?q=${searchQuery}`)
          .then((response) => {
            setSearchResult(response.data)
          })
          .catch(error => {
            console.error(error);
          });
      };

    const reviewToDisplay = searchResult.length > 0 ? searchResult : review;

    return (
        <div>
            <Header/>
            <div className="Review-WrapContent">
                <div className="Review-SearchBar">
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="공연 혹은 공연장 이름을 검색해주세요"
                        className="Review-Input"
                    />
                    <button className="Review-Search" onClick={searchHandler}>
                        <FaSearch size="30"/>
                    </button>
                </div>
                <Link to="/perform_review">
                    <button className="Review-WriteBtn">글쓰기</button>
                </Link>
                <hr className="Review-hr"/>
                <div className="Review-Content">
                    <ul>
                        {reviewToDisplay.slice(0, showAllReviews).map((review) => (
                            <li key={review.post_no}>
                                <Link to={`/Review/${review.post_no}`}/>
                                <p className="Review-Title">{review.title}</p>
                            </li>
                        ))}
                    </ul>
                </div>
                <AiFillCaretDown className="showMore_btn" onClick={toggleShowAllReviews}>더보기</AiFillCaretDown>
            </div>
        </div>
    );
}

export default Review;
