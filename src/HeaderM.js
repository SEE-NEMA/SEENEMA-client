import React, { useState } from 'react';
import './screens/styles/Header.css';
import './screens/styles/MusicalDetail.css';
import { useNavigate } from 'react-router-dom';
import { RxGear } from "react-icons/rx";
import ModalM from './components/ModalM';

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
    navigate("/loginM");
  }
  else{
    navigate("/RecommendMain");
  }
}
const shouldLoginForMypage = () => {
  const token = localStorage.getItem('token');
  if(token===null){
    alert("로그인한 사용자만 사용가능한 서비스입니다 !");
    navigate("/loginM");
  }
  else{
    navigate("/mypage");
  }
}
const [showModal, setShowModal] = useState(false);

const openModal = () => {
  setShowModal(true);
};

const closeModal = () => {
  setShowModal(false);
};

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
              <li><a href="#" onClick={openModal}>좌석 보기</a></li>
                {showModal && (
                  <div className="modalM">
                    <div className="modal-contentM">
                      {/* 모달 내용 */}
                      <p>PC 버전만 지원하는 기능입니다.</p>
                      {/* 모달 내용 추가 가능 */}
                      
                      {/* 확인 버튼 */}
                      <button className="close-modalM" onClick={closeModal}>확인</button>                  </div>
                  </div>
                )}
            </ul>
          </div>
        )}
    </div>

    <div className="menuM">
      <a href="#" onClick={openModal}>맞춤 추천</a>
      {showModal && (
                  <div className="modalM">
                    <div className="modal-contentM">
                      {/* 모달 내용 */}
                      <p>PC 버전만 지원하는 기능입니다.</p>
                      {/* 모달 내용 추가 가능 */}
                      
                      {/* 확인 버튼 */}
                      <button className="close-modalM" onClick={closeModal}>확인</button>                  </div>
                  </div>
                )}
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
      <ModalM closeModal={() => setmodal(!modal)}></ModalM>
    )}
  </div>
</div>
);
}

export default Header;