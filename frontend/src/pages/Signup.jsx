import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Signup.css';
import kakaoLogo from '../img/kakao.png';
import naverLogo from '../img/naver.png';
import googleLogo from '../img/google.png';
import logo from '../img/logo.png';

const Signup = () => {
  const [role, setRole] = useState('teacher');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const isButtonDisabled = email === '' || username === '' || password === '';

  const onClickLogin = () => {
    navigate('/login');
  };

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log('이메일:', email);
    console.log('아이디:', username);
    console.log('비밀번호:', password);
    // API 호출

    if (role === 'teacher') {
      navigate('/tutor');
    } else if (role === 'student') {
      navigate('/student');
    } else if (role === 'parent') {
      navigate('/parents');
    }
  };

  const handleImageClick = (platform) => {
    console.log(`${platform} 회원가입 클릭!`);
  };

  return (
    <div className="signup-container">
      <header className="signup-header">
        <h1 className="signup-header-title">올인과외</h1>
        <img src={logo} alt="로고" className="signup-logo" />
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
          type="email"
          placeholder="이메일"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
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

      <div className="signup-gologin">
        <p onClick={onClickLogin} style={{ cursor: 'pointer' }}>
          Login
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
      <img
        src={kakaoLogo}
        alt="Kakao"
        className="signup-icon"
        onClick={() => handleImageClick('Kakao')}
        style={{ cursor: 'pointer' }}
      />
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
