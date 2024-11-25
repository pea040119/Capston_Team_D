import React, { useState } from 'react';
import './SupplementModal.css';

const SupplementModal = ({ onClose, onSave, students, selectedDate }) => {
  const [selectedStudent, setSelectedStudent] = useState('');
  const [selectedTime, setSelectedTime] = useState('');

  const handleSave = () => {
    if (!selectedStudent || !selectedTime) {
      alert('학생과 시간을 모두 선택해주세요.');
      return;
    }
    onSave({ student: selectedStudent, time: selectedTime });
    onClose();
  };

  return (
    <div className="supplement-modal">
      <div className="supplement-modal-content">
        <h2>보강 일정 추가</h2>
        <p>{selectedDate}</p>

        <label>학생</label>
        <select
          value={selectedStudent}
          onChange={(e) => setSelectedStudent(e.target.value)}
        >
          <option value="" disabled>
            학생 선택
          </option>
          {students.map((student) => (
            <option key={student.student_name} value={student.student_name}>
              {student.student_name}
            </option>
          ))}
        </select>

        <label>시간</label>
        <select
          value={selectedTime}
          onChange={(e) => setSelectedTime(e.target.value)}
        >
          <option value="" disabled>
            시간 선택
          </option>
          {Array.from({ length: 14 }, (_, i) => `${i + 9}:00`).map((time) => (
            <option key={time} value={time}>
              {time}
            </option>
          ))}
        </select>

        <button onClick={handleSave}>저장</button>
        <button onClick={onClose}>닫기</button>
      </div>
    </div>
  );
};

export default SupplementModal;
