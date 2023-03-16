import React, { useEffect, useState } from 'react';
import Header from '../Header';
import {BrowserRouter} from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import './styles/Main.css'
import './styles/SearchBar.css'
import {FaSearch} from "react-icons/fa";
import SliderContainer from "../components/SliderContainer";
import SearchBar from '../components/SearchBar';
import axios from 'axios';

function Main ()
{
    const handleSearch = (searchTerm) => {
        console.log(`Search for "${searchTerm}"`);
    }

    // useEffect(() => {
    //     axios({
    //         method:'GET',
    //         url : `http://43.200.58.174:8080/api/v1/`
    //     }).then(response => {
    //         setRank(response.data)
    //     })
    // }, [])

    return (
        <div>
        <Header/>
        <Sidebar width={280}/>

        <h4 className="MainTitle">SEEnema</h4>

        <div className = "Search-Bar-Wrap">
        <SearchBar onSearch={handleSearch} />
        </div>

        <div className = "WrapSlider">
        <SliderContainer/>
        </div>
        
        <div className = "Ranking-Wrap">
        <p className = "Ranking-Text">Ranking</p>
        {/* <div className = "Ranking">
            {rank.map(ranks => {
                <span>{ranks.rank}</span>
            })}
        </div> */}

        </div>
        </div>

    )
}

export default Main;