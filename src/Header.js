import React, { useState } from 'react';
import './screens/styles/Header.css';
import { RxGear } from "react-icons/rx";
import Modal from './components/Modal';

const Header = (props) => {
const [modal, setmodal]= useState(false);
const [showPlayDropdown, setShowPlayDropdown] = useState(false);
const [showReviewDropdown, setShowReviewDropdown] = useState(false);

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

return (
<div className="header">
<div className="Header-Play" onMouseEnter={togglePlayDropdown} onMouseLeave={togglePlayDropdown}>
<a href="#">공연</a>
{showPlayDropdown && (
<div className="Header-Dropdown">
<ul>
<li><a href="/musicallist" onClick={handleMusicalClick}>뮤지컬</a></li>
<li><a href="/concertlist" onClick={handleMusicalClick}>콘서트</a></li>
</ul>
</div>
)}
</div>
<div className="Header-Review" onMouseEnter={toggleReviewDropdown} onMouseLeave={toggleReviewDropdown}>
    <a href="#">후기 모아보기</a>
    {showReviewDropdown && (
      <div className="Header-Dropdown">
        <ul>
          <li><a href="/seeyamain">시야 후기</a></li>
          <li><a href="/seeyaseatmain">좌석 보기</a></li>
          <li><a href="/Review">공연 후기</a></li>
        </ul>
      </div>
    )}
  </div>

  <div className="header-item">
    <a href="/" className="Header-Logo">
      SEE-NEMA
    </a>
  </div>

  <div className="Header-Facility">
    <a href="/RecommendMain">맞춤 추천</a>
  </div>
  
  <div className="Header-Mypage">
    <a href="/mypage">마이페이지</a>
  </div>

  <button className="Header-User" onClick={() => setmodal(!modal)}>
    <RxGear size="30"/>
  </button>

  {modal && (
    <Modal closeModal={() => setmodal(!modal)}></Modal>
  )}
</div>
);
}

export default Header;