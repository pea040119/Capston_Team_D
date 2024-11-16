import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
//import './MainCalendar.css';

function MainCalendar() {
  const [date, setDate] = useState(new Date());

  return (
    <Calendar
      className="maincalendar"
      onChange={setDate}
      value={date}
      next2Label={null}
      prev2Label={null}
      showNeighboringMonth={false}
      formatDay={(locale, date) => date.getDate()}
      // formatShortWeekday={(locale, date) => {
      //   const days = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
      //   return days[date.getDay()];
      // }}
      formatShortWeekday={(locale, date) =>
        date.toLocaleDateString('en-US', { weekday: 'short' }).charAt(0)
      }
      formatMonthYear={(locale, date) => {
        const monthName = date.toLocaleDateString('en-US', { month: 'long' });
        return monthName.charAt(0).toUpperCase() + monthName.slice(1);
      }}
    />
  );
}

export default MainCalendar;
