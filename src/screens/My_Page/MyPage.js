import React, { useContext, useEffect } from "react";
import { Link } from 'react-router-dom';
import Header from "../../Header";
import { AuthContext } from '../../contexts/AuthContext';
import Login from "../signup/Login";
import '../styles/MyPage.css';

function MyPage() {
    return(
        <div>
            <Header/>
           

            <div className = "Mypage-profile-wrap">
              <div className = "profile-wrap">
              <div className = "profile-Image"></div>
              <button className = "profile-edit">프로필 편집</button>
              </div>
              
              <div className = "Info-wrap">
              <table>
              <p className = "Mypage-Info">플레티넘 원딜님, 안녕하세요!</p> 
              <p className = "Mypage-Info">아이디 : </p>
              </table>
              </div>
              
            </div>

            <hr className = "Mypage-hr"></hr>
        </div>


    )
}

export default MyPage;