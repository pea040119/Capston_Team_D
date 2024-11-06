import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Login.css';
import kakaoLogo from '../img/kakao.png';
import naverLogo from '../img/naver.png';
import googleLogo from '../img/google.png';
import logo from '../img/logo.png';

const Login = () => {
  const [role, setRole] = useState('teacher');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const isButtonDisabled = username === '' || password === '';

  const navigate = useNavigate();

  // const handleSubmit = (e) => {
  //   e.preventDefault();

  //   console.log('아이디:', username);
  //   console.log('비밀번호:', password);
  //   // API 호출

  //   if (role === 'teacher') {
  //     navigate('/tutor'); // 선생님 역할일 때
  //   } else if (role === 'student') {
  //     navigate('/student'); // 학생 역할일 때
  //   } else if (role === 'parent') {
  //     navigate('/parents'); // 학부모 역할일 때
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault(); // 기본 폼 제출 동작을 막음

    try {
      // 로그인 API 호출
      const response = await axios.post('http://localhost:8000/api/login/', {
        username, // 사용자 아이디
        password, // 사용자 비밀번호
      });

      if (response.status === 200) {
        console.log('로그인 성공', response.data);
        // 로그인 성공 후, 역할에 따라 페이지 이동
        if (role === 'teacher') {
          navigate('/tutor');
        } else if (role === 'student') {
          navigate('/student');
        } else if (role === 'parent') {
          navigate('/parents');
        }
      }
    } catch (error) {
      console.error('로그인 실패:', error);
      setError('로그인 실패. 다시 시도해주세요.');
    }
  };

  const handleImageClick = (platform) => {
    console.log(`${platform} 로그인 클릭!`);
    if (platform === 'Naver') {
      const clientId = 'JeOy14JJKcJ6zoekf8XT';
      const redirectUri = 'http://localhost:3000/naver/callback';
      const state = 'random_string_for_state';
      const naverAuthUrl = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}&state=${state}`;

      window.location.href = naverAuthUrl;
    } else if (platform === 'Google') {
      const googleClientId =
        '357474094849-7cv15bj3j64iru2drltjejb4aeuqldap.apps.googleusercontent.com';
      const redirectUri = 'http://localhost:3000/google/callback';
      const googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?scope=openid%20profile%20email&response_type=code&redirect_uri=${redirectUri}&client_id=${googleClientId}`;

      window.location.href = googleAuthUrl;
    }
  };

  return (
    <div className="login-container">
      <header className="header">
        <h1 className="header-title">올인과외</h1>
        <img src={logo} alt="로고" className="login-logo" />
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
