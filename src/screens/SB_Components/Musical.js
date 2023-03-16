import React, { useState } from "react";
import Header from "../../Header";
import "../styles/Musical.css"
import { FaSearch } from "react-icons/fa";
import {Nav} from "react-bootstrap";
import {TabContent} from 'react-bootstrap';
import { NavLink } from "react-router-dom";

function Musical () {

    return (
        <div>
        <Header/>

            <div className = "Musical-Image"> </div>
           

            <div className = "Musical-Detail-Info">
                <div className = "Musical-T">
                    <p className = "Musical-Catecory">카테고리</p>
                    <p className = "Musical-Title">뮤지컬 제목</p>
                </div>

                <div className = "MusicalST">
                    <p className = "Musical-Place">장소</p>
                    <p className = "Musical-Rate">공연장 총평</p>
                    <p className = "Musical-Date">기간</p>
                    <p className = "Musical-RunningTime">러닝타임</p>
                </div>
            </div>

        </div>
    )
}

export default Musical;