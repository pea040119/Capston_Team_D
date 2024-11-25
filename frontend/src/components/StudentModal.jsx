import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './StudentModal.css';

const DAYS = ['월', '화', '수', '목', '금', '토', '일'];
const TIMES = Array.from({ length: 14 }, (_, i) => `${i + 9}:00`);

const StudentModal = ({ onClose, onSave, tutorId }) => {
  const [name, setName] = useState('');
  const [grade, setGrade] = useState('');
  const [subject, setSubject] = useState('');
  const [fee, setFee] = useState('');
  const [schedule, setSchedule] = useState([]);
  const [selectedDay, setSelectedDay] = useState('');
  const [selectedTime, setSelectedTime] = useState('');

  const addSchedule = () => {
    if (selectedDay && selectedTime) {
      setSchedule([...schedule, { day: selectedDay, time: selectedTime }]);
      setSelectedDay('');
      setSelectedTime('');
    }
  };

  const removeSchedule = (index) => {
    setSchedule(schedule.filter((_, i) => i !== index));
  };

  const handleSave = async () => {
    const data = {
      name,
      schedule,
      grade,
      subject,
      fee: parseInt(fee) || 0,
      tutor_id: tutorId,
    };

    try {
      console.log('데이터:', data);

      const response = await axios.post(
        'http://127.0.0.1:8000/tutor/class_register',
        {
          subject,
          tutor_id: tutorId,
          fee,
          grade,
          name,
          schedule,
        }
      );
      console.log('수업 등록 응답:', response.data);

      if (onSave) {
        onSave(data);
      }

      if (onClose) {
        onClose();
      }
    } catch (error) {
      console.error('학생 데이터 저장 실패:', error);
      alert('저장에 실패했습니다. 다시 시도해주세요.');
    }
  };

  return (
    <div className="studentmodal">
      <div className="studentmodal-content">
        <h2>학생 등록</h2>
        <label>이름</label>
        <input value={name} onChange={(e) => setName(e.target.value)} />

        <label>스케줄</label>
        <div className="schedule-input">
          <select
            value={selectedDay}
            onChange={(e) => setSelectedDay(e.target.value)}
          >
            <option value="">요일 선택</option>
            {DAYS.map((day) => (
              <option key={day} value={day}>
                {day}
              </option>
            ))}
          </select>
          <select
            value={selectedTime}
            onChange={(e) => setSelectedTime(e.target.value)}
          >
            <option value="">시작 시간 선택</option>
            {TIMES.map((time) => (
              <option key={time} value={time}>
                {time}
              </option>
            ))}
          </select>
          <button className="add-schedule-button" onClick={addSchedule}>
            추가
          </button>
        </div>

        <ul className="schedule-list">
          {schedule.map((sch, index) => (
            <li key={index}>
              <span>{`${sch.day} ${sch.time}`}</span>
              <button
                className="remove-schedule-button"
                onClick={() => removeSchedule(index)}
              >
                제거
              </button>
            </li>
          ))}
        </ul>

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
