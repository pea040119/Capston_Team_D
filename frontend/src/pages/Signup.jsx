import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Signup.css';
import kakaoLogo from '../img/kakao.png';
import naverLogo from '../img/naver.png';
import googleLogo from '../img/google.png';
import logo from '../img/new_logo.png';
import axios from 'axios';

const Signup = () => {
  const [role, setRole] = useState('teacher');
  const [loginId, setLoginId] = useState('');
  const [loginPw, setLoginPw] = useState('');
  const [name, setName] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const isButtonDisabled = loginId === '' || loginPw === '' || name === '';

  const navigate = useNavigate();

  const onClickLogin = () => {
    navigate('/login');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('회원가입 요청 시작');

    const payload = {
      login_id: loginId,
      login_pw: loginPw,
      name: name,
      role: role,
    };

    console.log('회원가입 요청 데이터:', payload);

    try {
      const response = await axios.post(
        'http://127.0.0.1:8000/signup/',
        payload
      );
      console.log('회원가입 성공:', response.data);
      navigate('/login');
    } catch (error) {
      console.error(
        '회원가입 실패:',
        error.response ? error.response.data : error.message
      );
      setErrorMessage(
        error.response?.data.message ||
        '회원가입 실패: 이미 존재하는 아이디입니다.'
      );
    }
  };

  const handleImageClick = (platform) => {
    console.log(`${platform} 회원가입 클릭!`);
  };

  return (
    <div className="signup-container">
      <header className="signup-header">
        <img src={logo} alt="signup-logo" className="signup-logo" />
        <h1 className="signup-header-title">올인과외</h1>
      </header>

      <div className="signup-role-tabs">
        <button
          className={`signup-role-tab ${role === 'teacher' ? 'active' : ''}`}
          onClick={() => setRole('teacher')}
        >
          선생님
        </button>
        <button
          className={`signup-role-tab ${role === 'student' ? 'active' : ''}`}
          onClick={() => setRole('student')}
        >
          학생
        </button>
        <button
          className={`signup-role-tab ${role === 'parent' ? 'active' : ''}`}
          onClick={() => setRole('parent')}
        >
          학부모
        </button>
      </div>

      <form className="signup-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="아이디"
          value={loginId}
          onChange={(e) => setLoginId(e.target.value)} // 아이디 상태 업데이트
          required
        />
        <input
          type="password"
          placeholder="비밀번호"
          value={loginPw}
          onChange={(e) => setLoginPw(e.target.value)} // 비밀번호 상태 업데이트
          required
        />
        <input
          type="text"
          placeholder="이름"
          value={name}
          onChange={(e) => setName(e.target.value)} // 이름 상태 업데이트
          required
        />
        <div className="signup-button-container">
          <button
            type="submit"
            className="signup-button"
            disabled={isButtonDisabled}
          >
            회원가입
          </button>
        </div>
      </form>

      <div className="error-container">
        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </div>

      <div className="signup-gologin">
        <p onClick={onClickLogin} style={{ cursor: 'pointer' }}>
          로그인으로 돌아가기
        </p>
      </div>
      <div className="signup-alternative-login">
        <p>다음으로 회원가입하기</p>
        <SignupImageGallery handleImageClick={handleImageClick} />
      </div>
    </div>
  );
};

const SignupImageGallery = ({ handleImageClick }) => {
  return (
    <div className="signup-icons">
      {/* <img
        src={kakaoLogo}
        alt="Kakao"
        className="signup-icon"
        onClick={() => handleImageClick('Kakao')}
        style={{ cursor: 'pointer' }}
      /> */}
      <img
        src={naverLogo}
        alt="Naver"
        className="signup-icon"
        onClick={() => handleImageClick('Naver')}
        style={{ cursor: 'pointer' }}
      />
      <img
        src={googleLogo}
        alt="Google"
        className="signup-icon"
        onClick={() => handleImageClick('Google')}
        style={{ cursor: 'pointer' }}
      />
    </div>
  );
};

export default Signup;
