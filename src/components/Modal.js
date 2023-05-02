import React, { useContext, useState } from 'react';
import Header from '../Header';
import '../screens/styles/Modal.css';
import { AuthContext } from '../contexts/AuthContext';

function Modal(props) {
    const {user} = useContext(AuthContext);
    
    console.log(user);

    function closeModal() {
        props.closeModal();
    }

    function handleClick(e) {
        window.location.href = "/mypage"
    }

    function gotoSignup(e) {
        localStorage.removeItem('user');
        window.location.href = "/signup";
    }

    return (
        <div className="Modal" onClick={closeModal}>
            <div className="modalBody" onClick={(e)=>e.stopPropagation()}>
                <div>
                    <button id="modalCloseBtn" onClick={closeModal}>X</button>
                    <button className="profile_circle"></button>
                    <h4 className='modal_username'>{user}</h4>
                    <hr className="hr_modal"/>
                    <hr className="hr_modal2"/>
                    <button className="modal_mypage" onClick={handleClick}>마이페이지</button>
                    <button className="modal_logout" onClick={gotoSignup}>로그아웃</button>
                </div>
            </div>
        </div>
    )
}

export default Modal;