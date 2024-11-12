import React, { useState } from 'react';
import './TutorModal.css';

const TutorModal = ({ onClose, onSave }) => {
  const [tutorname, setName] = useState('');
  const [tutorsch, setTime] = useState('');
  const [tutorsub, setSubject] = useState('');
  const [reward, setreward] = useState('');

  const handleSave = () => {
    onSave({
      tutorname,
      tutorsub,
      tutorsch,
      reward,
    });
    onClose();
  };

  // const handleSave = () => {
  //   const newTutor = {
  //     tutorname,
  //     tutorsub,
  //     tutorsch,
  //     reward,
  //     schedule: [],
  //   };
  //   onSave(newTutor);
  //   onClose();
  // };

  // const isSaveDisabled = !tutorname || !tutorsch || !tutorsub || !reward;

  // const handleSave = () => {
  //   onSave({ tutorname, tutorsch, tutorsub, reward: parseInt(reward) || 0 });
  //   onClose();
  // };

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
        <label>상점</label>
        <input value={reward} onChange={(e) => setreward(e.target.value)} />

        {/* <button onClick={handleSave} disabled={isSaveDisabled}>
          저장
        </button> */}
        <button onClick={handleSave}>저장</button>
        <button onClick={onClose}>닫기</button>
      </div>
    </div>
  );
};

export default TutorModal;
