import React, { useState } from 'react';
import './TutorModal.css';

const DAYS = ['월', '화', '수', '목', '금', '토', '일'];
const TIMES = Array.from({ length: 14 }, (_, i) => `${i + 9}:00`);

const TutorModal = ({ onClose, onSave, students }) => {
  const [tutorname, setTutorName] = useState('');
  const [tutorsub, setSubject] = useState('');
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
      tutorname,
      schedule,
      tutorsub,
    });
    onClose();
  };

  return (
    <div className="tutormodal">
      <div className="tutormodal-content">
        <h2>과외 추가</h2>
        <label>선생님 성함</label>
        <input
          value={tutorname}
          onChange={(e) => setTutorName(e.target.value)}
        />
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
            <option value="">시간 선택</option>
            {TIMES.map((time) => (
              <option key={time} value={time}>
                {time}
              </option>
            ))}
          </select>
          <button className="add-tschedule-button" onClick={addSchedule}>
            추가
          </button>
        </div>
        <ul className="schedule-list">
          {schedule.map((sch, index) => (
            <li key={index}>
              {`${sch.day} ${sch.time}`}
              <button
                className="remove-schedule-button"
                onClick={() => removeSchedule(index)}
              >
                제거
              </button>
            </li>
          ))}
        </ul>
        <label>과목</label>
        <input value={tutorsub} onChange={(e) => setSubject(e.target.value)} />
        <button onClick={handleSave}>저장</button>
        <button onClick={onClose}>닫기</button>
      </div>
    </div>
  );
};

export default TutorModal;
