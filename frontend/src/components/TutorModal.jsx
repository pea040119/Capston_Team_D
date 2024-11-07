import React, { useState } from 'react';
import './TutorModal.css';

const TutorModal = ({ onClose, onSave }) => {
  const [tutorname, setName] = useState('');
  const [tutorsch, setTime] = useState('');
  const [tutorsub, setSubject] = useState('');
  const [fee, setFee] = useState('');

  const handleSave = () => {
    onSave({ tutorname, tutorsch, tutorsub, fee: parseInt(fee) || 0 });
    onClose();
  };

  return (
    <div className="tutormodal">
      <div className="tutormodal-content">
        <h2>선생님 추가</h2>
        <label>이름</label>
        <input value={tutorname} onChange={(e) => setName(e.target.value)} />
        <label>시간</label>
        <input value={tutorsch} onChange={(e) => setTime(e.target.value)} />
        <label>과목</label>
        <input value={tutorsub} onChange={(e) => setSubject(e.target.value)} />
        <label>과외비</label>
        <input
          type="number"
          value={fee}
          onChange={(e) => setFee(e.target.value)}
        />
        <button onClick={handleSave}>저장</button>
        <button onClick={onClose}>닫기</button>
      </div>
    </div>
  );
};

export default TutorModal;
