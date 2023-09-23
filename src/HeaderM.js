import React, { useState } from 'react';
import './screens/styles/Header.css';
import { useNavigate } from 'react-router-dom';
import { RxGear } from "react-icons/rx";
import Modal from './components/Modal';

const Header = (props) => {
const [modal, setmodal]= useState(false);
const [showPlayDropdown, setShowPlayDropdown] = useState(false);
const [showReviewDropdown, setShowReviewDropdown] = useState(false);
const navigate = useNavigate();

const togglePlayDropdown = () => {
setShowPlayDropdown(!showPlayDropdown);
}

const toggleReviewDropdown = () => {
setShowReviewDropdown(!showReviewDropdown);
}

const handleMusicalClick = (event) => {
  event.stopPropagation();
  // 뮤지컬 항목 클릭 시 수행할 작업
}

const shouldLogin = () => {
  const token = localStorage.getItem('token');
  if(token===null){
    alert("로그인한 사용자만 사용가능한 서비스입니다 !");
    navigate("/login");
  }
  else{
    navigate("/RecommendMain");
  }
}
const shouldLoginForMypage = () => {
  const token = localStorage.getItem('token');
  if(token===null){
    alert("로그인한 사용자만 사용가능한 서비스입니다 !");
    navigate("/login");
  }
  else{
    navigate("/mypage");
  }
}

return (
<div className="headerM">
  <div className="headerM-logo">
    <a href="/M">
        SEE-NEMA
    </a>
  </div>

  <div className="headerM-Menu">
    <div className="menuM" onMouseEnter={togglePlayDropdown} onMouseLeave={togglePlayDropdown}>
      <a href="#">공연</a>
      {showPlayDropdown && (
        <div className="dropdownM">
          <ul>
            <li><a href="/musicalListM" onClick={handleMusicalClick}>뮤지컬</a></li>
            <li><a href="/concertListM" onClick={handleMusicalClick}>콘서트</a></li>
          </ul>
        </div>
      )}
    </div>

    <div className="menuM" onMouseEnter={toggleReviewDropdown} onMouseLeave={toggleReviewDropdown}>
      <a href="#">후기 모아보기</a>
        {showReviewDropdown && (
          <div className="dropdownM">
            <ul>
              <li><a href="/seeyamainM">시야 후기</a></li>
              <li><a href="/ReviewM">공연 후기</a></li>
              <li><a href="/seeyaseatmain">좌석 보기</a></li>
            </ul>
          </div>
        )}
    </div>

    <div className="menuM">
      <a href="" onClick={shouldLogin}>맞춤 추천</a>
    </div>
    
    <div className="menuM">
      <a href="/MapMain">지도로 보기</a>
    </div>
    
    <div className="menuM">
      <button className="setting-btnM" onClick={() => setmodal(!modal)}>
        <RxGear size="30"/>
      </button>
    </div>

    {modal && (
      <Modal closeModal={() => setmodal(!modal)}></Modal>
    )}
  </div>
</div>
);
}

export default Header;