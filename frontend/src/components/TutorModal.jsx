import React, { useState } from 'react';
import './TutorModal.css';
const TutorModal = ({ onClose, onSave }) => {
  const [tutorname, setName] = useState('');
  const [tutorsch, setTime] = useState('');
  const [tutorsub, setSubject] = useState('');
  const [reward, setReward] = useState('');
  const handleSave = () => {
    onSave({ tutorname, tutorsch, tutorsub, reward: parseInt(reward) || 0 });
    onClose();
  };
  return (
    <div className="tutormodal">
      <div className="tutormodal-content">
        <h2>과외 추가</h2>
        <label>선생님 성함</label>
        <input value={tutorname} onChange={(e) => setName(e.target.value)} />
        <label>시간</label>
        <input value={tutorsch} onChange={(e) => setTime(e.target.value)} />
        <label>과목</label>
        <input value={tutorsub} onChange={(e) => setSubject(e.target.value)} />
        <div className="reward-output">
          <label>상점</label>
          <input
            type="number"
            value={reward}
            onChange={(e) => setReward(e.target.value)}
          />
        </div>
        <button onClick={handleSave}>저장</button>
        <button onClick={onClose}>닫기</button>
      </div>
    </div>
  );
};
export default TutorModal;
