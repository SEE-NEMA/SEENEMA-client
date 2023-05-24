import React, { useContext, useEffect, useState, useRef } from "react";
import { Link } from 'react-router-dom';
import Header from "../../Header";
import { AuthContext } from '../../contexts/AuthContext';
import Login from "../signup/Login";
import axios from "axios";
import '../styles/MyPage.css';

function MyPage() {
  const [showModal, setShowModal] = useState(false);
  const [nickname, setNickname] = useState("");
  const [email, setEmail] = useState("");
  const [userInfo, setUserInfo] = useState(null);
  const [checkNicknameResponse, setCheckNicknameResponse] = useState(null);
  const modalRef = useRef(null);

  const token = localStorage.getItem('token');

  const [theaterReview, setTheaterReview] = useState([]);
  const [theaterComment, setTheaterComment] = useState([]);
  const [theaterCommentId, setTheaterCommentId] = useState(null);
  const [theaterCommentContent, setTheaterCommentContent] = useState("");
  const [seeyaReview, setSeeyaReview] = useState([]);
  const [viewNo, setViewNo] = useState(null);
  const [theaterId, setTheaterId] = useState(null);
  const [postNo, setPostNo] = useState();
  const [heartTheater, setHeartTheater] = useState([]);
  const [heartSeeya, setHeartSeeya] = useState([]);
  const [activeTab, setActiveTab] = useState("mymusicalpost");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    setCurrentPage(1); 
  };

  const getCurrentPageItems = (items) => {
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return items.slice(startIndex, endIndex);
  };

  
  const getTotalPages = (items) => {
    return Math.ceil(items.length / pageSize);
  };

  useEffect(() => {
    axios
      .get('http://43.200.58.174:8080/api/v1/user/my-review/theater', {
        headers: {
          "X-AUTH-TOKEN": token
        }
      })
      .then((response) => {
        console.log(response.data);
        setTheaterReview(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [token]);

  useEffect(() => {
    axios
      .get('http://43.200.58.174:8080/api/v1/user/my-review/view', {
        headers: {
          "X-AUTH-TOKEN": token
        }
      })
      .then((response) => {
        console.log(response.data);
        setTheaterId(response.data.theaterId);
        setViewNo(response.data.viewNo);
        setSeeyaReview(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [token]);

  useEffect(() => {
    axios
      .get('http://43.200.58.174:8080/api/v1/user/my-review/theater/comment', {
        headers: {
          "X-AUTH-TOKEN": token
        }
      })
      .then((response) => {
        setTheaterComment(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [token]);

  useEffect(() => {
    axios
    .get('http://43.200.58.174:8080/api/v1/user/my-heart/theater', {
      headers: {
        "X-AUTH-TOKEN" : token
      }
    })
    .then((response) => {
      setHeartTheater(response.data);
    })
  }, [token]);

  useEffect(() => {
    axios
    .get('http://43.200.58.174:8080/api/v1/user/my-heart/view', {
      headers: {
        "X-AUTH-TOKEN" : token
      }
    })
    .then((response) => {
      setHeartSeeya(response.data);
      console.log(response.data);
    })
  }, [token]);

  useEffect(() => {
    axios
      .get('http://43.200.58.174:8080/api/v1/user/mypage', {
        headers: {
          "X-AUTH-TOKEN": token
        }
      })
      .then((response) => {
        console.log(response.data);
        setUserInfo(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [token]);

  const handleUpdateNickname = () => {
    axios
      .put('http://43.200.58.174:8080/api/v1/user/profile', { nickname }, {
        headers: {
          "X-AUTH-TOKEN": token
        }
      })
      .then((response) => {
        console.log(response.data);
        setShowModal(false);
        setUserInfo({ ...userInfo, nickname: nickname, email: email });
        setEmail("");
        setNickname("");
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const handleCheckNickname = () => {
    axios
      .post('http://43.200.58.174:8080/api/v1/user/profile/check-nickname', { nickname }, {
        headers: {
          "X-AUTH-TOKEN": token
        }
      })
      .then((response) => {
        console.log(response.data);
        setCheckNicknameResponse(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const closeModal = () => {
    setShowModal(false);
  }

  const handleModalClick = (e) => {
    e.stopPropagation();
  }

  const handleEditButtonClick = () => {
    setShowModal(true);
  }


  return (
    <div>
      <Header />

      <div className="Mypage-profile-wrap">
        <div className="profile-wrap">
          <button className="profile-edit" onClick={handleEditButtonClick}>프로필 편집</button>
        </div>

        <div className="Info-wrap">
          <table>
            <p className="Mypage-Info">{userInfo ? `${userInfo.nickname} 님, 안녕하세요!` : null}</p>
            <p className="Mypage-Info-ID">{userInfo ? `아이디 : ${userInfo.email}` : null}</p>
          </table>
        </div>
      </div>

      {showModal && (
        <div className="Profile-edit-modal" onClick={closeModal}>
          <div className="Profile-edit-modal-content" onClick={handleModalClick} ref={modalRef}>
            <p className="Profile-edit-title">닉네임 수정</p>
            <p className="Profile-edit-alert">*중복확인 먼저 해주세요</p>
            <p className="Profile-edit-check">{checkNicknameResponse}</p>
            <input className="Profile-edit-input" type="text" placeholder="수정할 닉네임을 입력해주세요" value={nickname} onChange={(e) => setNickname(e.target.value)} />
            <button className="Profile-edit-button1" onClick={handleCheckNickname}>중복확인</button>
            <button className="Profile-edit-button2" onClick={handleUpdateNickname}>수정완료</button>
          </div>
        </div>
      )}

      <hr className="My-hr-wrap" />


      <div className="Mypage-Tab-bar">
        <button
          className={activeTab === "mymusicalpost" ? "active" : ""}
          onClick={() => handleTabClick("mymusicalpost")}
        >
          내가 작성한 공연 후기
        </button>
        <button
          className={activeTab === "myseeyapost" ? "active" : ""}
          onClick={() => handleTabClick("myseeyapost")}
        >
          내가 작성한 시야 후기
        </button>
        <button
          className={activeTab === "mycomment" ? "active" : ""}
          onClick={() => handleTabClick("mycomment")}
        >
          내가 작성한 댓글
        </button>
        <button
          className={activeTab === "mymusicallike" ? "active" : ""}
          onClick={() => handleTabClick("mymusicallike")}
        >
          좋아요한 공연후기
        </button>
        <button
          className={activeTab === "myseeyalike" ? "active" : ""}
          onClick={() => handleTabClick("myseeyalike")}
        >
          좋아요한 시야후기
        </button>
      </div>

          {activeTab === "mymusicalpost" && (
        <div className="My-Post-Wrap">
          {getCurrentPageItems(theaterReview).map((review) => (
            <div key={review.post_no}>
              <Link to={`/Review/${review.post_no}`}>
                <p style={{ marginRight: "20px", color: "#000" }}>{review.title} {review.createdAt}</p>
              </Link>
            </div>
          ))}
          {/* 페이징 컴포넌트 추가 */}
          {getTotalPages(theaterReview) > 1 && (
            <div className="Pagination">
              {Array.from({ length: getTotalPages(theaterReview) }, (_, index) => (
                <button
                  key={index + 1}
                  className={currentPage === index + 1 ? "active" : ""}
                  onClick={() => setCurrentPage(index + 1)}
                >
                  {index + 1}
                </button>
              ))}
            </div>
          )}
        </div>
      )}

        {activeTab === "myseeyapost" && (
        <div className="My-Post-Wrap">
        {getCurrentPageItems(seeyaReview).map((review) => (
          <div key={review.post_no}>
            <Link to={`/view-review/${review.theaterId}/${review.viewNo}`}>
              <p style={{ marginRight: "20px", color: "#000" }}>{review.title}   {review.createdAt}</p>
            </Link>
          </div>
        ))}
        {/* 페이징 컴포넌트 추가 */}
        {getTotalPages(seeyaReview) > 1 && (
          <div className="Pagination">
            {Array.from({ length: getTotalPages(seeyaReview) }, (_, index) => (
              <button
                key={index + 1}
                className={currentPage === index + 1 ? "active" : ""}
                onClick={() => setCurrentPage(index + 1)}
              >
                {index + 1}
              </button>
            ))}
          </div>
        )}
      </div>
    )}

    {/* 내가 작성한 댓글 탭 */}
    {activeTab === "mycomment" && (
      <div className="My-Post-Wrap">
        {getCurrentPageItems(theaterComment).map((comment) => (
          <div key={comment.commentId}>
            <Link to={`/Review/${comment.postNo}`}>
              <p style={{ marginRight: "20px", color: "#000" }}>{comment.content}</p>
            </Link>
          </div>
        ))}
        {/* 페이징 컴포넌트 추가 */}
        {getTotalPages(theaterComment) > 1 && (
          <div className="Pagination">
            {Array.from({ length: getTotalPages(theaterComment) }, (_, index) => (
              <button
                key={index + 1}
                className={currentPage === index + 1 ? "active" : ""}
                onClick={() => setCurrentPage(index + 1)}
              >
                {index + 1}
              </button>
            ))}
          </div>
        )}
      </div>
    )}

    {/* 좋아요한 공연후기 탭 */}
    {activeTab === "mymusicallike" && (
      <div className="My-Post-Wrap">
        {getCurrentPageItems(heartTheater).map((heart) => (
          <div key={heart.post_no}>
            <Link to={`/Review/${heart.post_no}`}>
              <p style={{ marginRight: "20px", color: "#000" }}>{heart.title}</p>
            </Link>
          </div>
        ))}
        {/* 페이징 컴포넌트 추가 */}
        {getTotalPages(heartTheater) > 1 && (
          <div className="Pagination">
            {Array.from({ length: getTotalPages(heartTheater) }, (_, index) => (
              <button
                key={index + 1}
                className={currentPage === index + 1 ? "active" : ""}
                onClick={() => setCurrentPage(index + 1)}
              >
                {index + 1}
              </button>
            ))}
          </div>
        )}
      </div>
    )}

    {/* 좋아요한 시야후기 탭 */}
    {activeTab === "myseeyalike" && (
      <div className="My-Post-Wrap">
        {getCurrentPageItems(heartSeeya).map((heart) => (
          <div key={heart.viewNo}>
            <Link to={`/view-review/${heart.theaterId}/${heart.viewNo}`}>
              <p style={{ marginRight: "20px", color: "#000" }}>{heart.title}</p>
            </Link>
          </div>
        ))}
        {/* 페이징 컴포넌트 추가 */}
        {getTotalPages(heartSeeya) > 1 && (
          <div className="Pagination">
            {Array.from({ length: getTotalPages(heartSeeya) }, (_, index) => (
              <button
                key={index + 1}
                className={currentPage === index + 1 ? "active" : ""}
                onClick={() => setCurrentPage(index + 1)}
              >
                {index + 1}
              </button>
            ))}
          </div>
        )}
      </div>
    )}
    </div>)}

export default MyPage;