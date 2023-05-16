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

    const [myreview, setMyreview] = useState([]);
    

    useEffect(() => {
      axios.get ('http://43.200.58.174:8080/api/v1/user/my-review/theater', {
          headers: {
              "X-AUTH-TOKEN" : token
          }
      })
      .then((response) => {
          console.log(response.data);
          setMyreview(response.data);
      })
      .catch((error) => {
          console.log(error);
      });
  }, [token]);


    useEffect(() => {
        axios.get ('http://43.200.58.174:8080/api/v1/user/mypage', {
            headers: {
                "X-AUTH-TOKEN" : token
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
        axios.put('http://43.200.58.174:8080/api/v1/user/profile', {nickname}, {
          headers: {
            "X-AUTH-TOKEN" : token
          }
        })
        .then((response) => {
          console.log(response.data);
          setShowModal(false);
          setUserInfo({...userInfo, nickname: nickname});
          setUserInfo({...userInfo, email: email});
          setEmail("");
          setNickname("");
        })
        .catch((error) => {
          console.log(error);
        });
      }
    

      const handleCheckNickname = () => {
        axios.post('http://43.200.58.174:8080/api/v1/user/profile/check-nickname', {nickname}, {
            headers: {
                "X-AUTH-TOKEN" : token
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

    return(
        <div>
            <Header/>
            <hr className="Mypage-hr"></hr>

            <div className="Mypage-profile-wrap">
                <div className="profile-wrap">
                   
                    <button className="profile-edit" onClick={() => setShowModal(true)}>프로필 편집</button>
                </div>
                
                <div className="Info-wrap">
                    <table>
                        <p className="Mypage-Info">{userInfo ? `${userInfo.nickname} 님, 안녕하세요!` : null}</p> 
                        <p className="Mypage-Info-ID">{userInfo ? `아이디 : ${userInfo.email}` : null}</p>
                    </table>
                </div>
            </div>

            {showModal ? (
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
      ) : null}

          <div>
            <p>내가 작성한 공연장 후기글</p>
          {myreview.map((review) => (
                <div key={review.post_no}>
                    <p>{review.title}</p>
                    <p>{review.createdAt}</p>
                </div>
            ))}
          </div>
        </div>
    )
}

export default MyPage;
