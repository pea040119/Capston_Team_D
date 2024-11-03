import React, { useState } from 'react';
import Cbutton from '../components/Cbutton';
import './Tutor.css';
import Header from '../components/Header';
import Box from '../components/Box';

const Calendar = () => {
  const [selectedDay, setSelectedDay] = useState(null);

  const days = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
  ];

  const handleDayClick = (day) => {
    setSelectedDay(day);
  };

  return (
    <>
      <Header title={'10월 3주차'} />
      <div className="box-container">
        <Box text={'이달의 수입'} />
      </div>
      <div className="calendar-container">
        <div className="calendar">
          {days.map((day) => (
            <Cbutton
              key={day}
              text={day}
              type={selectedDay === day ? 'selected' : 'default'}
              onClick={() => handleDayClick(day)}
            />
          ))}
        </div>
        {selectedDay && (
          <div className="day-content">
            {/* 선택된 요일에 대한 내용 표시 */}
            <p>{selectedDay}의 내용이 여기에 표시됩니다.</p>
          </div>
        )}
      </div>
    </>
  );
};

export default Calendar;
