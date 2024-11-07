import React from 'react';
import { useNavigate } from 'react-router-dom';
import profile1 from '../img/profile1.png';
import './StudentItem.css';

const StudentItem = ({ id, name, sch, grade, sub }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/TutorManager/${id}`);
  };

  return (
    <div
      className="StudentItem"
      onClick={handleClick}
      style={{ cursor: 'pointer' }}
    >
      <div className="img_section">
        <img src={profile1} alt={`${name}'s profile`} />
      </div>
      <div className="info1">
        <div className="name">{name}</div>
        <div className="sch">{sch}</div>
      </div>
      <div className="info2">
        {grade} {sub}
      </div>
    </div>
  );
};

export default StudentItem;
