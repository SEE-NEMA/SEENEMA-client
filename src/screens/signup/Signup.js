import React, { useState } from 'react';
import axios from 'axios';
import '../styles/Signup.css';
import SignupModal from '../../SignupModal';

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
      setModalMessage(response.data.message);
      setIsModalOpen(true);
    } catch (error) {
      console.error(error);
      setModalMessage('회원가입에 실패하였습니다.');
      setIsModalOpen(true);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <h4 className="Signup-titlename">시작하기</h4>

      <div className="Signup-Page">
        <div className="Signup-ContentWrap">
          <div className="EmailWrap">
            <input
              className="Signup-input"
              placeholder="ID"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <p></p>

          <input
            className="Signup-input"
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
      </div>

      <div>
        <button className="bottomButton2" onClick={handleSubmit}>
          회원가입
        </button>
      </div>

      <h3 className="QuestionText2">
        이미 회원이신가요?
        <a href="/Login" className="link_login">
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
