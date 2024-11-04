import React, { useState } from 'react';
import './StudentModal.css';

const StudentModal = ({ onClose, onSave }) => {
  const [name, setName] = useState('');
  const [sch, setTime] = useState('');
  const [grade, setGrade] = useState('');
  const [subject, setSubject] = useState('');
  const [fee, setFee] = useState(''); // 과외비 상태 추가

  const handleSave = () => {
    onSave({ name, sch, grade, subject, fee: parseInt(fee) || 0 });
    onClose();
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>학생 추가</h2>
        <label>이름</label>
        <input value={name} onChange={(e) => setName(e.target.value)} />
        <label>시간</label>
        <input value={sch} onChange={(e) => setTime(e.target.value)} />
        <label>학년</label>
        <input value={grade} onChange={(e) => setGrade(e.target.value)} />
        <label>과목</label>
        <input value={subject} onChange={(e) => setSubject(e.target.value)} />
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

export default StudentModal;
