import React, { useEffect, useState } from 'react';
import Header from '../Header';
import { BrowserRouter } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import './styles/Main.css'
import './styles/SearchBar.css'
import { FaSearch } from "react-icons/fa";
import SliderContainer from "../components/SliderContainer";
import SearchBar from '../components/SearchBar';
import axios from 'axios';

function Main() {
  const [musicalRank, setMusicalRank] = useState([]);
  const [concertRank, setConcertRank] = useState([]);

  useEffect(() => {
    axios
    .get(`http://43.200.58.174:8080/api/v1/`)
    .then((response) => {
      const musicalRank = response.data.musicalRank
      const concertRank = response.data.concertRank
      setMusicalRank(musicalRank);
      setConcertRank(concertRank);
    })
    .catch((error) => {
      console.log(error);
    })
  })

  const handleSearch = (searchTerm) => {
    console.log(`Search for "${searchTerm}"`);
  }

  return (
    <div>
      <Header />
      <Sidebar width={280} />

      <h4 className="MainTitle">SEEnema</h4>

      <div className="Search-Bar-Wrap">
        <SearchBar onSearch={handleSearch} />
      </div>

      <div className="WrapSlider">
        <SliderContainer />
      </div>

      <div className="Ranking-Wrap1">
        <p className="Ranking-Text">뮤지컬 랭킹</p>
        <div className="Ranking1" key={musicalRank.rank}>
          {musicalRank.map(musical => (
          <div key={musical.rank}>
          <p className='rank'>{musical.rank}. {musical.title}</p>
          </div>
            ))}
        </div>
      </div>

      <div className="Ranking-Wrap2">
        <p className="Ranking-Text2">콘서트 랭킹</p>
        <div className="Ranking" key={concertRank.rank}>
          {concertRank.map(concert => (
            <div key={concert.rank}>
            <p className='rank'>{concert.rank}. {concert.title}</p>
            </div>
            ))}
        </div>
      </div>
    </div>

  )
}

export default Main;