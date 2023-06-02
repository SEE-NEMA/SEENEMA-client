import React, { useState } from "react";
import axios from "axios";
import Header from "../../Header";
import modal from "modal";
import '../styles/SeeyaSeatTicket.css';
import { FaStar } from 'react-icons/fa';
import { useNavigate, useParams} from 'react-router-dom';


const SeeyaSeatTicket = () => {

    const token = localStorage.getItem('token');
    const navigate = useNavigate();
    const { theaterId, x, y, z, viewNo } = useParams();
    const [modalData, setModalData] = useState(null);
    const [seatReviews, setSeatReviews] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
    const [content, setContent] = useState("");
    const [play, setPlay] = useState("");
    const [title, setTitle] = useState("");
    const [viewScore, setViewScore] = useState(0);
    const [seatScore, setSeatScore] = useState(0);
    const [lightScore, setLightScore] = useState(0);
    const [soundScore, setSoundScore] = useState(0);
    const [images, setImages] = useState([null]);

    const [ticketImage, setTicketImage] = useState({});
    const [ticketInfo, setTicketInfo] = useState({});
    const [editMode, setEditMode] = useState(false);
    const [editData, setEditData] = useState({
        일시: "",
        장소: "",
        좌석: ""
    });
    
    const handleGoBack = () => {
      navigate(`/seeyaseatupload/${theaterId}/${z}/${x}/${y}`);
    };

    
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

const renderStarScore = (score, setStars) => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
          stars.push(
            <FaStar
              key={i}
              style={{ color: i <= score ? 'yellow' : 'lightgray' }}
              onClick={() => setStars(i)}
            />
          );
        }
        return stars;
      };
 
      const handleModalClose = () => {
        setModalData(null);
        setIsModalOpen(false);
      };
    
      const handleReviewModalOpen = () => {
        const seatInfo = ticketInfo.좌석;
        const [ticketZ, ticketX, ticketY] = seatInfo.match(/\d+/g);
        // 좌석 정보 비교
        if (ticketZ === z && ticketX === x && ticketY === y) {
          setIsReviewModalOpen(true);
         
        } else {
          // 좌석 정보 불일치한 경우 알림 창 띄우기
          alert("좌석 정보가 일치하지 않습니다.");
          console.log(ticketX, ticketY, ticketZ);
        }
      };
      
    
      const handleReviewModalClose = () => {
        setIsReviewModalOpen(false);
      };

   
    
          const handleReviewSubmit = async () => {
            try {
              // 좌석 정보 추출
              const seatInfo = ticketInfo.좌석;
              const [ticketZ, ticketX, ticketY] = seatInfo.match(/\d+/g);

          const formData = new FormData();
          formData.append("images", images);
          formData.append("play", play);
          formData.append("title", title);
          formData.append("content", content);
          formData.append("viewScore", viewScore);
          formData.append("seatScore", seatScore);
          formData.append("lightScore", lightScore);
          formData.append("soundScore", soundScore);
          
              // 좌석 정보 비교
              if (ticketZ === z && ticketX === x && ticketY === y) {
                // 일치하는 경우 인증 요청 보내기
                axios
                  .post(`http://43.200.58.174:8080/api/v1/seats/auth`, {}, {
                    headers: {
                      "X-AUTH-TOKEN": token
                    }
                  })
                  .then((response) => {
                    console.log(response.data);
                    console.log(formData);
                  
                    if (response.data === "SUCCESS") {
                      // 인증 성공한 경우 글 작성 요청 보내기
                      axios
                        .post(`http://43.200.58.174:8080/api/v1/seats/ticket/${theaterId}/${z}/${x}/${y}/upload`,
                          formData, {
                            headers: {
                              "Content-Type": "multipart/form-data",
                              "X-AUTH-TOKEN": token
                            }
                          })
                        .then((response) => {
                          console.log(response.data);
                          console.log(viewNo);
                          handleReviewModalClose();
                          navigate(`/SeeyaSeatList/${theaterId}/${z}/${x}/${y}`);
                          const newReview = {
                            viewScore: viewScore,
                            seatScore: seatScore,
                            lightScore: lightScore,
                            soundScore: soundScore,
                          };
                          setModalData((prevData) => ({
                            ...prevData,
                            ...newReview,
                          }));
                        })
                        .catch((error) => {
                          console.log(error);
                        });
                    } else {
                      // 인증 실패한 경우 알림 창 띄우기
                      alert("인증에 실패하였습니다.");
                    }
                  })
                  .catch((error) => {
                    console.log(error);
                  });
              } else {
                // 좌석 정보 불일치한 경우 알림 창 띄우기
                alert("좌석 정보가 일치하지 않습니다.");
                console.log(ticketX, ticketY, ticketZ);
              }
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
                               
                                <button className="SeeyaSeatTicket-Review" onClick={handleReviewModalOpen}>글 작성하기</button>
                                                           
                            </>

                            
                        )}


                    </div>
                    
                )}
            </div>

            <button className="SeeyaSeatTicket-Goback" onClick={handleGoBack}>뒤로가기</button>

            {isReviewModalOpen && (
            <div className="SeeyaSeat-modal">
            <div className="SeeyaSeat-modal-content">
              <h3 className = "SS-Modal-Edit-Title">리뷰 작성</h3>

              <form>
              <label>제목 : </label>
              <input
                className="SS-Modal-Edit-Content"
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="제목을 작성해주세요."
              />
              </form>

              <form>
              <label>공연 : </label>
              <input
                className="SS-Modal-Edit-Content"
                value={play}
                onChange={(e) => setPlay(e.target.value)}
                placeholder="공연 이름을 작성해주세요."
              />
              </form>

              <form>
              <textarea
                className="SS-Modal-Edit-Review"
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
              </form>
              <br/>
              
              <form>
              <label>사진 : </label>
              <input
                className = "SS-Modal-Edit-Image"
                type="file"
                onChange={setImages}
              />
              </form>

              <div className = "SS-Modal-Edit-StarRating">
              <div className = "SS-Modal-Edit-Star">
                <label>시야평점 : </label>
                {renderStarScore(viewScore, setViewScore)}
              </div>
              <div className = "SS-Modal-Edit-Star">
                <label>좌석평점 : </label>
                {renderStarScore(seatScore, setSeatScore)}
              </div>
              <div className = "SS-Modal-Edit-Star">
                <label>조명평점 : </label>
                {renderStarScore(lightScore, setLightScore)}
              </div>
              <div className = "SS-Modal-Edit-Star">
                <label>음향평점 : </label>
                {renderStarScore(soundScore, setSoundScore)}
              </div>

              <button className = "SS-Modal-Edit-Modify" onClick={handleReviewSubmit}>작성</button>
              <button className = "SS-Modal-Edit-Cancel" onClick={handleReviewModalClose}>취소</button>
            </div>
            </div>
          </div>
        )}
        </div>
    );
};

export default SeeyaSeatTicket;
