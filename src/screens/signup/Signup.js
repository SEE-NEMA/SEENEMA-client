import React, { useState } from 'react';
import axios from 'axios';
import '../styles/Login.css';
import SignupModal from '../../SignupModal';
import Login from './Login';

function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const data = {
      email: email,
      password: password,
    };
  
    try {
      const response = await axios.post(
        'http://43.200.58.174:8080/api/v1/user/signup',
        data
      );
      setIsModalOpen(true);
      setModalMessage(response.data);
      console.log(response.data);
    } catch (error) {
      console.error(error);
      setIsModalOpen(true);
      setModalMessage('회원가입에 실패하였습니다.');
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <h4 className="Login-Title">seeNEMA에 오신걸 환영합니다!</h4>

      <div className="Login-page">
        <div className="Login-contentWrap">
          <div className="EmailWrap">
            <input
              className="Login-input"
              placeholder="ID"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <p></p>

          <input
            className="Login-input"
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
      </div>

      <div>
        <button className="Login-certify" onClick={handleSubmit}>
          회원가입
        </button>
      </div>

      <h3 className="QuestionText">
        이미 회원이신가요?
        <a href="/login" className="signup_link">
          로그인
        </a>
      </h3>

      <SignupModal
        isOpen={isModalOpen}
        content={modalMessage}
        onClose={closeModal}
      />
    </div>
  );
}

export default Signup;
