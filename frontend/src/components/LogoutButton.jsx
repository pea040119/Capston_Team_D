import React from 'react';
import { useNavigate } from 'react-router-dom';
import './LogoutButton.css';

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // 세션 데이터 초기화
    localStorage.removeItem('authToken'); // 토큰 제거
    console.log('로그아웃 성공');

    // 로그인 페이지로 이동
    navigate('/login');
  };

  return (
    <button onClick={handleLogout} className="logout-button">
      로그아웃
    </button>
  );
};

export default LogoutButton;
