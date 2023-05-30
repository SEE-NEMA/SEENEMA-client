import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import axios from "axios";
import Header from "../../Header";
import modal from "modal";
import '../styles/SeeyaSeatUpload.css';
import { FaStar } from 'react-icons/fa';

const SeeyaSeatUpload = () => {

    return(
        <div>
            <Header/>

            <button>티켓 인증하기</button>
            <button>리뷰 작성하기</button>
        </div>
    )
}

export default SeeyaSeatUpload;