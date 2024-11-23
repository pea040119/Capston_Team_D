import React, { useState, useEffect } from 'react';
import './Content.css';
import memo from '../img/memo.png';
import memo2 from '../img/memo2.png';
import WeekPopup from './WeekPopup';

const Content = ({ time, name, type: initialType, onDoubleClick }) => {
  const [type, setType] = useState(initialType);
  const [currentMemo, setCurrentMemo] = useState(memo);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  useEffect(() => {
    setType(initialType);
  }, [initialType]);

  const backgroundColor =
    type === 'today'
      ? '#94D2E4'
      : type === 'canceled'
      ? '#EF74766E'
      : type === 'makeup'
      ? '#6AC995'
      : '#e9eff0';

  const handleContentClick = (e) => {
    if (e.target.tagName !== 'IMG') {
      if (type === 'canceled') {
        const isReconfirmed = window.confirm('일정을 다시 활성화하시겠습니까?');
        if (isReconfirmed) {
          setType(undefined);
        }
      } else {
        const isConfirmed = window.confirm('일정을 취소하시겠습니까?');
        if (isConfirmed) {
          setType('canceled');
        }
      }
    }
  };

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
      <div
        className="Content"
        style={{ backgroundColor }}
        onDoubleClick={onDoubleClick}
        onClick={handleContentClick}
      >
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

export default Content;
