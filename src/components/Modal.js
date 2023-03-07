import React, { Component } from "react";
import Header from '../Header';
import '../screens/styles/Modal.css';

function Modal(props) {
    function closeModal() {
        props.closeModal();
    }

    return (
        <div className="Modal" onClick={closeModal}>
            <div className="modalBody" onClick={(e)=>e.stopPropagation()}>
                <div>
                    <button id="modalCloseBtn" onClick={closeModal}>X</button>
                    <button className="profile_circle"></button>
                    <hr className="hr_modal"/>
                    <hr className="hr_modal2"/>
                    <button className="modal_mypage">마이페이지</button>
                    <button className="modal_logout">로그아웃</button>
                </div>
            </div>
        </div>
    )
}

export default Modal;