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

    // 빈 칸 추가 (달 시작 요일 전까지)
    for (let i = 0; i < startOfMonth.getDay(); i++) {
      dates.push('');
    }

    // 달의 날짜 추가
    for (let i = 1; i <= endOfMonth.getDate(); i++) {
      dates.push(i);
    }

    return dates;
  };

  const dates = generateCalendarDates();

  const startOfWeek = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    new Date().getDate() - new Date().getDay()
  );
  const endOfWeek = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    new Date().getDate() + (6 - new Date().getDay())
  );

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
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, index) => (
          <div
            key={day}
            className={`ex-calendar-day-${
              index === 0 ? 'sun' : index === 6 ? 'sat' : 'name'
            }`}
          >
            {day[0]} {/* 첫 글자만 표시 */}
          </div>
        ))}

        {dates.map((date, index) => {
          const dateObj = new Date(
            currentDate.getFullYear(),
            currentDate.getMonth(),
            date
          );
          const isCurrentWeek = dateObj >= startOfWeek && dateObj <= endOfWeek;

          return (
            <div
              key={index}
              className={`ex-calendar-date ${
                isCurrentWeek ? 'ex-calendar-current-week' : ''
              } ${
                date === new Date().getDate() &&
                currentDate.getMonth() === new Date().getMonth() &&
                currentDate.getFullYear() === new Date().getFullYear()
                  ? 'ex-calendar-today'
                  : ''
              }`}
            >
              {date}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ExCalendar;
