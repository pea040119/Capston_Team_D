import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './MiniCalendar.css';
function MiniCalendar() {
  const [date, setDate] = useState(new Date());

  const isInHighlightedRange = (selectedDate) => {
    const selectedDay = date.getDay();
    const startOfWeek = new Date(date);
    const endOfWeek = new Date(date);

    startOfWeek.setDate(date.getDate() - selectedDay);
    endOfWeek.setDate(date.getDate() + (7 - selectedDay));

    return selectedDate >= startOfWeek && selectedDate <= endOfWeek;
  };

  return (
    <div className="minicalendar">
      '
      <Calendar
        onChange={setDate}
        value={date}
        tileClassName={({ date, view }) =>
          view === 'month' && isInHighlightedRange(date) ? 'highlight' : null
        }
        next2Label={null}
        prev2Label={null}
        showNeighboringMonth={false}
        formatDay={(locale, date) => date.getDate()}
        formatShortWeekday={(locale, date) =>
          date.toLocaleDateString('en-US', { weekday: 'short' }).charAt(0)
        }
        formatMonthYear={(locale, date) =>
          date.toLocaleDateString('en-US', { month: 'long' })
        }
      />
    </div>
  );
}

export default MiniCalendar;
