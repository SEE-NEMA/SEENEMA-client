import React, { useContext, useState } from 'react';
import Header from '../Header';
import '../screens/styles/Modal.css';
import { AuthContext } from '../contexts/AuthContext';

function Modal(props) {
    const [email, setEmail] = useState(localStorage.getItem('email'));
    const { isAuthenticated, logout } = useContext(AuthContext);

    console.log(email);

    function closeModal() {
        props.closeModal();
    }

    function handleClick(e) {
        window.location.href = "/mypage"
    }

    function handleLogout(e) {
        logout();
        localStorage.removeItem('email');
        window.location.href = "/";
    }

    function handleLogin(e) {
        window.location.href = "/login";
    }

    return (
        <div className="Modal" onClick={closeModal}>
            <div className="modalBody" onClick={(e)=>e.stopPropagation()}>
                <div>
                    <button id="modalCloseBtn" onClick={closeModal}>X</button>
                    <button className="profile_circle"></button>
                    <h4 className='modal_username'>{email}</h4>
                    <hr className="hr_modal"/>
                    <hr className="hr_modal2"/>
                    {isAuthenticated ? (
                      <>
                        <button className="modal_mypage" onClick={handleClick}>마이페이지</button>
                        <button className="modal_logout" onClick={handleLogout}>로그아웃</button>
                      </>
                    ) : (
                        <>
                        <button className="modal_mypage" onClick={handleClick}>마이페이지</button>
                        <button className="modal_login" onClick={handleLogin}>로그인</button>
                      </>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Modal;
