import React, { useState } from 'react';
import './StudentModal.css';

const DAYS = ['월', '화', '수', '목', '금', '토', '일'];
const TIMES = Array.from({ length: 18 }, (_, i) => `${i + 7}:00`);

const StudentModal = ({ onClose, onSave }) => {
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

  const handleSave = () => {
    onSave({
      name,
      schedule,
      grade,
      subject,
      fee: parseInt(fee) || 0,
    });
    onClose();
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
