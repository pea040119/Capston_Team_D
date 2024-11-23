import React, { useState, useEffect } from 'react';
import './Content.css';
import memo from '../img/memo.png';
import memo2 from '../img/memo2.png';
import WeekPopup from './WeekPopup';

const Content = ({ time, name, type: initialType, onDoubleClick }) => {
  const [type, setType] = useState(initialType); // 전달받은 타입을 상태로 관리
  const [currentMemo, setCurrentMemo] = useState(memo); // 현재 메모 이미지
  const [isPopupOpen, setIsPopupOpen] = useState(false); // 팝업 열림 상태

  useEffect(() => {
    setType(initialType); // 부모 컴포넌트에서 전달받은 타입 반영
  }, [initialType]); // initialType이 변경될 때마다 업데이트

  const backgroundColor =
    type === 'today'
      ? '#94D2E4'
      : type === 'canceled'
      ? '#EF74766E'
      : type === 'makeup'
      ? '#6AC995'
      : '#e9eff0'; // 기본값

  const handleContentClick = (e) => {
    if (e.target.tagName !== 'IMG') {
      if (type === 'canceled') {
        const isReconfirmed = window.confirm('일정을 다시 활성화하시겠습니까?');
        if (isReconfirmed) {
          setType('today'); // 오늘로 복구
        }
      } else {
        const isConfirmed = window.confirm('일정을 취소하시겠습니까?');
        if (isConfirmed) {
          setType('canceled'); // 상태를 취소로 변경
        }
      }
    }
  };

  const handleMemoClick = () => {
    setIsPopupOpen(true); // 팝업 열기
  };

  const handleSave = (updatedData) => {
    setCurrentMemo(memo2); // 저장 후 이미지 변경
    setIsPopupOpen(false); // 팝업 닫기
  };

  const handleClose = () => {
    setIsPopupOpen(false); // 팝업 닫기
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
          onClick={handleMemoClick} // 메모 클릭 시 팝업 열기
        />
      </div>
      {isPopupOpen && (
        <WeekPopup
          onClose={handleClose}
          onSave={handleSave} // 저장 시 이미지 변경 콜백 호출
        />
      )}
    </>
  );
};

export default Content;
