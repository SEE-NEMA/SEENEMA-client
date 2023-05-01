import React, { useState, useEffect } from 'react';
import Header from '../Header';
import './styles/Main.css'
import SliderContainer from "../components/SliderContainer";
import axios from 'axios';
import RankingSlider from '../components/RankingSlider';
import ConcertRankingSlider from '../components/ConcertRankingSlider';

function Main () {
 

  return (
    <div>

      <Header/>

        <div className="Main-Rank">
        <p className="Main-Rank-title">실시간 랭킹</p>
        <RankingSlider/>
        <ConcertRankingSlider/>
        </div>

        <SliderContainer/>

    </div>
  )
}  

export default Main;
