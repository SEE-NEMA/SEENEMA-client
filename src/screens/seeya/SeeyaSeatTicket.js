import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import Header from "../../Header";
import modal from "modal";
import '../styles/SeeyaSeatTicket.css';
import { FaStar } from 'react-icons/fa';

const SeeyaSeatTicket = () => {

    const [ticketImage, setTicketImage] = useState({});
    const [ticketInfo, setTicketInfo] = useState({});
    const [editMode, setEditMode] = useState(false);
    const [editData, setEditData] = useState({
        일시: "",
        장소: "",
        좌석: ""
    });
    
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
    
    const handleEdit = () => {
        setEditMode(true);
        setEditData(ticketInfo);
    };
    
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setEditData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };
    
    const handleSave = async () => {
        try {
            const response = await axios.put(
                'http://localhost:8081/api/v1/seats/ticket',
                editData,
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            );
            console.log(response.data);
            setTicketInfo(editData);
            setEditMode(false);
        } catch (error) {
            console.log(error);
        }
    };


    return(
        <div>
            <Header/>
    
            <p className = "Ticket-Title">티켓 인증</p>

            <div className="SS-Ticket-Wrap">
                <input
                    className="Ticket-Image-Add"
                    type="file"
                    onChange={handleFileChange}
                />
                <button className="SeeyaSeatTicket" onClick={handleTicketUpload}>
                    티켓 인증하기
                </button>
                
                {ticketInfo && (
                    <div className="TicketInfo">
                        {editMode ? (
                            <>  

                                <form>
                                <label className = "Ticket-Label">일시 : </label>
                                <input
                                    className="Ticket-Input"
                                    type="text"
                                    name="일시"
                                    value={editData.일시}
                                    onChange={handleInputChange}
                                />
                                </form>

                                <form>
                                <label className = "Ticket-Label">장소 : </label>
                                <input
                                    className="Ticket-Input"
                                    type="text"
                                    name="장소"
                                    value={editData.장소}
                                    onChange={handleInputChange}
                                />
                                </form>

                                <form>
                                <label className = "Ticket-Label">좌석 : </label>
                                <input
                                    className="Ticket-Input"
                                    type="text"
                                    name="좌석"
                                    value={editData.좌석}
                                    onChange={handleInputChange}
                                />
                                </form>

                                <button className="SeeyaSeatTicket-Save" onClick={handleSave}>
                                    저장하기
                                </button>
                            </>
                        ) : (
                            <>
                                <p className="Ticket-Info">일시: {ticketInfo.일시}</p>
                                <p className="Ticket-Info">장소: {ticketInfo.장소}</p>
                                <p className="Ticket-Info">좌석: {ticketInfo.좌석}</p>
                                <button className="SeeyaSeatTicket-Modify" onClick={handleEdit}>
                                    수정하기
                                </button>
                            </>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default SeeyaSeatTicket;
