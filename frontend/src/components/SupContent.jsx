import React, { useState, useEffect } from 'react';
import './SupContent.css';
import memo from '../img/memo.png';
import memo2 from '../img/memo2.png';
import WeekPopup from './WeekPopup';

const SupContent = ({ time, name }) => {
  const [currentMemo, setCurrentMemo] = useState(memo);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleMemoClick = () => {
    setIsPopupOpen(true);
  };

  const handleSave = (updatedData) => {
    setCurrentMemo(memo2);
    setIsPopupOpen(false);
  };

  const handleClose = () => {
    setIsPopupOpen(false);
  };

  return (
    <>
      <div className="SupContent">
        <div className="time">{time}</div>
        <div className="name-subject-container">
          <div className="name">{name}</div>
        </div>
        <img
          src={currentMemo}
          alt="memo"
          className="memo"
          onClick={handleMemoClick}
        />
      </div>
      {isPopupOpen && <WeekPopup onClose={handleClose} onSave={handleSave} />}
    </>
  );
};

export default SupContent;
