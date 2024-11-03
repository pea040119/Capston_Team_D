import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import kakaoLogo from '../img/kakao.png';
import naverLogo from '../img/naver.png';
import googleLogo from '../img/google.png';
import logo192 from '../img/logo192.png';

const Login = () => {
  const [role, setRole] = useState('teacher');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const isButtonDisabled = username === '' || password === '';

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log('아이디:', username);
    console.log('비밀번호:', password);
    // API 호출

    if (role === 'teacher') {
      navigate('/tutor'); // 선생님 역할일 때
    } else if (role === 'student') {
      navigate('/student'); // 학생 역할일 때
    } else if (role === 'parent') {
      navigate('/parents'); // 학부모 역할일 때
    }
  };

  const handleImageClick = (platform) => {
    console.log(`${platform} 로그인 클릭!`);
  };

  return (
    <div className="login-container">
      <header className="header">
        <h1 className="header-title">올인과외</h1>
        <img src={logo192} alt="로고" className="logo" />
      </header>

      <div className="role-tabs">
        <button
          className={`role-tab ${role === 'teacher' ? 'active' : ''}`}
          onClick={() => setRole('teacher')}
        >
          선생님
        </button>
        <button
          className={`role-tab ${role === 'student' ? 'active' : ''}`}
          onClick={() => setRole('student')}
        >
          학생
        </button>
        <button
          className={`role-tab ${role === 'parent' ? 'active' : ''}`}
          onClick={() => setRole('parent')}
        >
          학부모
        </button>
      </div>

      <form className="login-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="아이디"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <div className="button-container">
          <button
            type="submit"
            className="login-button"
            disabled={isButtonDisabled}
          >
            로그인
          </button>
        </div>
      </form>

      <div className="alternative-login">
        <p>다음으로 로그인하기</p>
        <ImageGallery handleImageClick={handleImageClick} /> {}
      </div>
    </div>
  );
};

const ImageGallery = ({ handleImageClick }) => {
  return (
    <div className="icons">
      <img
        src={kakaoLogo}
        alt="Kakao"
        className="icon"
        onClick={() => handleImageClick('Kakao')}
        style={{ cursor: 'pointer' }}
      />
      <img
        src={naverLogo}
        alt="Naver"
        className="icon"
        onClick={() => handleImageClick('Naver')}
        style={{ cursor: 'pointer' }}
      />
      <img
        src={googleLogo}
        alt="Google"
        className="icon"
        onClick={() => handleImageClick('Google')}
        style={{ cursor: 'pointer' }}
      />
    </div>
  );
};

export default Login;
