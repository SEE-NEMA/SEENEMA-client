/* 시야 페이지 진입 시 메인화면 */

import {Link} from 'react-router-dom';
import Header from "../../Header";
import '../styles/SeeyaMain.css';
import {FaSearch} from "react-icons/fa";
import React, { useState, useEffect } from 'react';
import axios from 'axios';


function SeeyaMain() {
  

    const [theaterName, setSearchTerm] = useState("");
    const [items, setItems] = useState([]);
  
    const searchHandler = () => {
      axios.get(`http://43.200.58.174:8080/api/v1/view-review/search?q=${theaterName}`)
        .then(response => {
          setItems(response.data);
        })
        .catch(error => {
          console.error(error);
        });
    }
  
    return (
        <div>
           <Header/>
           <div className = "SeeyaMain-Wrap">
            <input className="SeeyaMain-input" placeholder="공연장 이름을 검색해주세요" type="text" value={theaterName} onChange={e => setSearchTerm(e.target.value)}></input>
                <button onClick={searchHandler} className="SeeyaMain-Search">
                    <FaSearch size="30"/>
                </button>
                <hr className = "SeeyaMain-hr"/>
            </div>
            <ul>
            {items.map(item => (
            <li key={item.id}>{item.name}</li>
            ))}
      </ul>
        </div>
         
       

    )
}


export default SeeyaMain;