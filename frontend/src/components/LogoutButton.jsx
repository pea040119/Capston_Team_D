import React from 'react';
import { useNavigate } from 'react-router-dom';
import './LogoutButton.css';

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    console.log('로그아웃 성공');

    navigate('/login');
  };

  return (
    <button onClick={handleLogout} className="logout-button">
      로그아웃
    </button>
  );
};

export default LogoutButton;
