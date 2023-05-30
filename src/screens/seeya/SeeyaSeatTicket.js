import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import axios from "axios";
import Header from "../../Header";
import modal from "modal";
import '../styles/SeeyaSeatTicket.css';
import { FaStar } from 'react-icons/fa';

const SeeyaSeatTicket = () => {

    const [ticketImage, setTicketImage] = useState({});
    const [ticketInfo, setTicketInfo] = useState({});
    
    const handleFileChange = (event) => {
        const ticketImage = event.target.files[0];
        setTicketImage(ticketImage);
    };
    
    const handleTicketUpload = async () => {
        if (ticketImage) {
            const formData = new FormData();
            formData.append("ticket", ticketImage);
      
            try {
                const response = await axios.post(
                    `http://localhost:8081/api/v1/seats/ticket`,
                    formData,
                    {
                        headers: {
                            'Content-Type' : 'multipart/form-data'
                        }
                    }
                );
                console.log(response.data);
                setTicketInfo(response.data); // 받은 데이터를 ticketInfo 상태에 저장
               
            } catch (error) {
                console.log(formData);
                console.log(error);
            }
        } else {
            console.log("No ticket image selected");
        }
    };


    return(
        <div>
            <Header/>
            <div className="SS-Ticket-Wrap">
                <input
                    type="file"
                    onChange={handleFileChange}
                />
                <button className="SeeyaSeatTicket" onClick={handleTicketUpload}>
                    티켓 인증하기
                </button>
            </div>
            {ticketInfo && (
                <div className="TicketInfo">
                    <p>일시: {ticketInfo.일시}</p>
                    <p>장소: {ticketInfo.장소}</p>
                    <p>좌석: {ticketInfo.좌석}</p>
                </div>
            )}
        </div>
    );
};

export default SeeyaSeatTicket;
