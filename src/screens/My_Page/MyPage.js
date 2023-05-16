import React, { useContext, useEffect, useState } from "react";
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
    

    const token = localStorage.getItem('token');

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
        })
        .catch((error) => {
            console.log(error);
        });
    }

    return(
        <div>
            <Header/>
            <hr className="Mypage-hr"></hr>

            <div className="Mypage-profile-wrap">
                <div className="profile-wrap">
                    <div className="profile-Image"></div>
                    <button className="profile-edit" onClick={() => setShowModal(true)}>프로필 편집</button>
                </div>
                
                <div className="Info-wrap">
                    <table>
                        <p className="Mypage-Info">{userInfo ? `${userInfo.nickname} 님, 안녕하세요!` : null}</p> 
                        <p className="Mypage-Info">{userInfo ? `아이디 : ${userInfo.email}` : null}</p>
                    </table>
                </div>
            </div>

            {showModal ? (
                <div className="Profile-edit-modal">
                    <div className="Profile-edit-modal-content">
                        <input type="text" value={nickname} onChange={(e) => setNickname(e.target.value)} />
                        <button onClick={handleCheckNickname}>중복확인</button>
                        <button onClick={handleUpdateNickname}>수정</button>
                    </div>
                </div>
            ) : null}

        </div>
    )
}

export default MyPage;
