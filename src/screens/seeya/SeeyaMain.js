/* 시야 페이지 진입 시 메인화면 */

import React from "react";
import {Link} from 'react-router-dom';
import Header from "../../Header";
import '../styles/SeeyaMain.css';
import {FaSearch} from "react-icons/fa";

function SeeyaMain() {
    
    return (
        <div>
           <Header/>
           <div className = "SeeyaMain-Wrap">
            <input className="SeeyaMain-input" placeholder="공연장 이름을 검색해주세요"></input>
                <button className="SeeyaMain-Search">
                    <FaSearch size="30"/>
                </button>
                <hr className = "SeeyaMain-hr"/>
            </div>
        </div>
    )
}

export default SeeyaMain;