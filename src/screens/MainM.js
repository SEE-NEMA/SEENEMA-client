import React, { useState, useEffect } from 'react';
// import Header from '../Header';
import HeaderM from '../HeaderM';
import './styles/Main.css'
import SliderContainer from "../components/SliderContainer";
import axios from 'axios';
import RankingSlider from '../components/RankingSlider';
import ConcertRankingSlider from '../components/ConcertRankingSlider';

const token = localStorage.getItem('token');

function Main () {
 

  return (
    <div>

      <HeaderM/>

        {/* <div className="Main-Rank">
        <p className="Main-Rank-title">실시간 랭킹</p>
        <RankingSlider/>
        <ConcertRankingSlider/>
        </div>
        <SliderContainer/> */}

    </div>
  )
}  

export default Main;
