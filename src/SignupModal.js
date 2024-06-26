import ReactModal from 'react-modal';
import './screens/styles/SignupModal.css';

function SignupModal({ isOpen, content, onClose }) {
  ReactModal.setAppElement('#root'); // 이 부분 추가

  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onClose}
      className="SignupModal"
      overlayClassName="SignupModal-overlay"
    >
      <div className="SignupModal-content">
        <div className="SignupModal-message">{content}</div>
        <button className="SignupModal-closeButton" onClick={onClose}>닫기</button>
      </div>
    </ReactModal>
  );
}

export default SignupModal;
