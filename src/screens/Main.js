import React, { useState } from 'react';
import Header from '../Header';
import {BrowserRouter} from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import './styles/Main.css'
import './styles/SearchBar.css'
import {FaSearch} from "react-icons/fa";
import SliderContainer from "../components/SliderContainer";
import SearchBar from '../components/SearchBar';


function Main ()
{
    
    const handleSearch = (searchTerm) => {
        console.log(`Search for "${searchTerm}"`);
    }

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
        <div className = "Ranking">
        </div>

        </div>
        </div>

    )
}

export default Main;
