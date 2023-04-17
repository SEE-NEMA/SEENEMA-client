import React, { useState } from 'react';
import './screens/styles/Header.css';


function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isReviewOpen, setIsReviewOpen] = useState(false);

 
  function toggleMenu() {
    setIsMenuOpen(!isMenuOpen);
    setIsReviewOpen(false);
  }

  function toggleReview() {
    setIsReviewOpen(!isReviewOpen);
  }

  return (
    <div className="header">
      <p classNAme="menu-logo">seeNEMA</p>
      <div
        className="menu-item"
        onMouseEnter={toggleReview}
        onMouseLeave={toggleReview}
      >
        공연
        {isReviewOpen && (
          <div className="menu-dropdown review-dropdown">
            <div className="menu-dropdownitem">뮤지컬</div>
            <div className="menu-dropdownitem">콘서트</div>
          </div>
        )}
      </div>
      <div className="menu-item" onClick={toggleMenu}>
        주변시설
      </div>
      <div
        className="menu-item"
        onMouseEnter={toggleReview}
        onMouseLeave={toggleReview}
      >
        후기 모아보기
        {isReviewOpen && (
          <div className="menu-dropdown review-dropdown">
            <div className="menu-dropdownitem">시야 후기</div>
            <div className="menu-dropdownitem">공연장 후기</div>
          </div>
        )}
      </div>

    
    </div>
  );
}

export default Header;
