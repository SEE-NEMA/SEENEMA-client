import React, { useState } from 'react';
import './screens/styles/Header.css';

function Header() {
  const [showPerformances, setShowPerformances] = useState(false);
  const [showReviews, setShowReviews] = useState(false);

  function handlePerformancesMouseOver() {
    setShowPerformances(true);
  }

  function handlePerformancesMouseLeave() {
    setShowPerformances(false);
  }

  function handleReviewsMouseOver() {
    setShowReviews(true);
  }

  function handleReviewsMouseLeave() {
    setShowReviews(false);
  }

  return (
    <div className="header">
      <div className="header-item">
        <a href="#" onMouseOver={handlePerformancesMouseOver} onMouseLeave={handlePerformancesMouseLeave}>
          공연
        </a>
        {showPerformances && (
          <div className="dropdown">
            <a href="#">뮤지컬</a>
            <a href="#">콘서트</a>
          </div>
        )}
      </div>
      <div className="header-item">
        <a href="#">주변시설</a>
      </div>
      <div className="header-item">
        <a href="/facility" className="Header-Logo">
          SEE-NEMA
        </a>
      </div>
      <div className="header-item">
        <a href="#" onMouseOver={handleReviewsMouseOver} onMouseLeave={handleReviewsMouseLeave}>
          후기
        </a>
        {showReviews && (
          <div className="dropdown">
            <a href="#">공연장 후기</a>
            <a href="#">시야 후기</a>
          </div>
        )}
      </div>
      <div className="header-item">
        <a href="#">마이페이지</a>
      </div>
    </div>
  );
}

export default Header;
