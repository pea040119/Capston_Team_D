import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './MiniCalendar.css';

function MiniCalendar() {
  const [date, setDate] = useState(new Date());

  // 선택한 날짜를 기준으로 특정 범위의 날짜를 강조하는 함수
  const isInHighlightedRange = (selectedDate) => {
    const selectedDay = date.getDay();
    const startOfWeek = new Date(date);
    const endOfWeek = new Date(date);

    startOfWeek.setDate(date.getDate() - selectedDay); // 이번 주 월요일
    endOfWeek.setDate(date.getDate() + (7 - selectedDay)); // 이번 주 일요일

    return selectedDate >= startOfWeek && selectedDate <= endOfWeek;
  };

  return (
    <div className="mini-calendar">
      <Calendar
        onChange={setDate}
        value={date}
        tileClassName={({ date, view }) =>
          view === 'month' && isInHighlightedRange(date) ? 'highlight' : null
        }
        next2Label={null} // 다음 연도 버튼 숨기기
        prev2Label={null} // 이전 연도 버튼 숨기기
        showNeighboringMonth={false} // 이웃한 달의 날짜 숨기기
        formatDay={(locale, date) => date.getDate()} // 날짜에서 "일"을 제외하고 숫자만 표시
        formatShortWeekday={(locale, date) =>
          date.toLocaleDateString('en-US', { weekday: 'short' }).charAt(0)
        } // 요일 약자를 M T W T F S S 형식으로 표시
        formatMonthYear={(locale, date) =>
          date.toLocaleDateString('en-US', { month: 'long' })
        } // "November"와 같은 형식으로 월 표시
      />
    </div>
  );
}

export default MiniCalendar;
