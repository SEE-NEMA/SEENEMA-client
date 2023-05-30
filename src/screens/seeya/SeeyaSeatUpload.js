import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import axios from "axios";
import Header from "../../Header";
import '../styles/SeeyaSeatUpload.css';
import { Link } from "react-router-dom";
import { FaStar } from 'react-icons/fa';

const SeeyaSeatUpload = () => {
    const token = localStorage.getItem('token');
    const navigate = useNavigate();
    
    const [images, setImages] = useState([null]);
   

 

    return (
        <div >
            <Header/>

            <div className="center">
                <div className="SS-Ticket-Link">
                    <Link to={"http://localhost:3000/seeyaseatticket"}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;티켓 인증하기 <br/> (인증 시 포인트 지급)</Link>
                </div>
                <div className="SS-Review-Write-Link">
                    <button>리뷰 작성하기</button>
                </div>

                

            </div>
        </div>
    );
};

export default SeeyaSeatUpload;
