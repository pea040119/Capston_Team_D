import React, { useState } from 'react';
import './Excalendar.css';

const ExCalendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const goToPreviousMonth = () => {
    const prevMonth = new Date(
      currentDate.setMonth(currentDate.getMonth() - 1)
    );
    setCurrentDate(new Date(prevMonth));
  };

  const goToNextMonth = () => {
    const nextMonth = new Date(
      currentDate.setMonth(currentDate.getMonth() + 1)
    );
    setCurrentDate(new Date(nextMonth));
  };

  const getMonthName = () => {
    return currentDate.toLocaleString('default', {
      month: 'long',
      year: 'numeric',
    });
  };

  const generateCalendarDates = () => {
    const startOfMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      1
    );
    const endOfMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1,
      0
    );
    const dates = [];

    for (let i = 0; i < startOfMonth.getDay(); i++) {
      dates.push('');
    }

    for (let i = 1; i <= endOfMonth.getDate(); i++) {
      dates.push(i);
    }

    return dates;
  };

  const dates = generateCalendarDates();

  return (
    <div className="ex-calendar-container">
      <div className="ex-calendar-header">
        <button className="ex-calendar-nav-btn" onClick={goToPreviousMonth}>
          {'<'}
        </button>
        <h2>{getMonthName()}</h2>
        <button className="ex-calendar-nav-btn" onClick={goToNextMonth}>
          {'>'}
        </button>
      </div>

      <div className="ex-calendar-grid">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
          <div key={day} className="ex-calendar-day-name">
            {day}
          </div>
        ))}

        {dates.map((date, index) => (
          <div
            key={index}
            className={`ex-calendar-date ${
              date === new Date().getDate() &&
              currentDate.getMonth() === new Date().getMonth() &&
              currentDate.getFullYear() === new Date().getFullYear()
                ? 'ex-calendar-today'
                : ''
            }`}
          >
            {date}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExCalendar;
