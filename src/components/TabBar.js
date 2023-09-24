// TabBar.js
import React from 'react';

const TabBar = ({ activeTab, onTabChange }) => {
  return (
    <div className="tab-bar">
      <button
        className={`tab-button ${activeTab === 'direction' ? 'active' : ''}`}
        onClick={() => onTabChange('direction')}
      >
        오시는 길
      </button>
      <button
        className={`tab-button ${activeTab === 'parking' ? 'active' : ''}`}
        onClick={() => onTabChange('parking')}
      >
        주차
      </button>
      <button
        className={`tab-button ${activeTab === 'musicals' ? 'active' : ''}`}
        onClick={() => onTabChange('musicals')}
      >
        예매 가능한 공연
      </button>
    </div>
  );
};

export default TabBar;
