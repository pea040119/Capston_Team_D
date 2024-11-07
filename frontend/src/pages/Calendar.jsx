import React, { useState } from 'react';
import './Calendar.css';

const Calendar = () => {
  const [selectedWeek, setSelectedWeek] = useState([
    21, 22, 23, 24, 25, 26, 27,
  ]);

  const days = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
  const monthDays = Array.from({ length: 31 }, (_, i) => i + 1);

  return (
    <div className="calendar-container">
      <div className="calendar-header">
        <button className="nav-button">{'<'}</button>
        <span className="month-name">October</span>
        <button className="nav-button">{'>'}</button>
      </div>
      <div className="calendar-days">
        {days.map((day, index) => (
          <span
            key={index}
            className={`day-header ${day === 'S' ? 'weekend' : ''}`}
          >
            {day}
          </span>
        ))}
      </div>
      <div className="calendar-dates">
        {monthDays.map((day, index) => (
          <span
            key={index}
            className={`date ${selectedWeek.includes(day) ? 'selected' : ''} ${
              index % 7 === 5 || index % 7 === 6 ? 'weekend' : ''
            }`}
          >
            {day}
          </span>
        ))}
      </div>
    </div>
  );
};

export default Calendar;
