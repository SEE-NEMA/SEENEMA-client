import React, { useState } from 'react';
import Header from '../Header';
import {BrowserRouter} from 'react-router-dom';
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
       <SliderContainer/>
       
       
        
       
        </div>

      
      
    )
}

export default Main;