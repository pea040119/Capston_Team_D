import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './MainCalendar.css';

function MainCalendar() {
  const [date, setDate] = useState(new Date());

  return (
    <div className="main-calendar">
      <Calendar
        className="tutorcalendar"
        onChange={setDate}
        value={date}
        tileClassName="day-tile"
        next2Label={null}
        prev2Label={null}
        showNeighboringMonth={false}
        formatDay={(locale, date) => date.getDate()}
        formatShortWeekday={(locale, date) => {
          const days = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
          return days[date.getDay()];
        }}
        formatMonthYear={(locale, date) => {
          const monthName = date.toLocaleDateString('en-US', { month: 'long' });
          return monthName.charAt(0).toUpperCase() + monthName.slice(1);
        }}
      />
    </div>
  );
}

export default MainCalendar;
