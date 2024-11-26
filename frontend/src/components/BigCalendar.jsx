import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './BigCalendar.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
const BigCalendar = ({ students }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [events, setEvents] = useState({});
  const [isAddingEvent, setIsAddingEvent] = useState(false);
  const [newEvent, setNewEvent] = useState('');
  const [editingIndex, setEditingIndex] = useState(null);
  const [editingValue, setEditingValue] = useState('');
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [studentColors, setStudentColors] = useState({});
  const [endDate, setEndDate] = useState(new Date());

  const colors = ['#F0F1B3', '#C8E2E9', '#CA9BE3', '#EF74766E'];

  useEffect(() => {
    const tempStudentColors = {};
    students.forEach((student, index) => {
      tempStudentColors[student.student_name] = colors[index % colors.length];
    });
    setStudentColors(tempStudentColors);
  }, [students]);

  const formatDate = (date) => {
    return `${date.getMonth() + 1}월 ${date.getDate()}일`;
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setIsAddingEvent(false);
    setEditingIndex(null);
    setEditingValue('');
  };

  const formatDay = (locale, date) => date.getDate();

  const handleAddEventClick = () => {
    setIsAddingEvent(true);
    setEditingIndex(null);
  };

  const handleSaveEvent = () => {
    if (!newEvent.trim()) {
      alert('내용을 입력하세요.');
      return;
    }

    let current = new Date(selectedDate); // 시작일
    const end = new Date(endDate); // 종료일
    const color =
      selectedStudent && selectedStudent !== '선택 x'
        ? studentColors[selectedStudent]
        : 'white';

    const fullEvent = {
      text:
        selectedStudent && selectedStudent !== '선택 x'
          ? `${selectedStudent} ${newEvent}`
          : newEvent,
      color,
    };

    const updatedEvents = { ...events };

    // 날짜 반복하면서 이벤트 추가
    while (current <= end) {
      const dateKey = current.toISOString().split('T')[0];
      updatedEvents[dateKey] = [...(updatedEvents[dateKey] || []), fullEvent];
      current.setDate(current.getDate() + 1); // 다음 날로 이동
    }

    setEvents(updatedEvents);
    setNewEvent('');
    setSelectedStudent('');
    setEndDate(new Date());
    setIsAddingEvent(false);
  };
  const handleEditEvent = (index, value) => {
    setEditingIndex(index);
    setEditingValue(value);
    setIsAddingEvent(false);
  };

  const handleSaveEdit = () => {
    const dateKey = selectedDate.toISOString().split('T')[0];
    setEvents((prevEvents) => {
      const updatedEvents = [...prevEvents[dateKey]];
      updatedEvents[editingIndex].text = editingValue;
      return { ...prevEvents, [dateKey]: updatedEvents };
    });
    setEditingIndex(null);
    setEditingValue('');
  };

  const handleDeleteEvent = (index) => {
    const dateKey = selectedDate.toISOString().split('T')[0];
    setEvents((prevEvents) => {
      const updatedEvents = [...prevEvents[dateKey]];
      updatedEvents.splice(index, 1);
      return { ...prevEvents, [dateKey]: updatedEvents };
    });
  };

  const formatTileContent = ({ date, view }) => {
    const dateKey = date.toISOString().split('T')[0];
    if (view === 'month' && events[dateKey]) {
      return (
        <ul className="event-list">
          {events[dateKey].map((event, index) => (
            <li
              key={index}
              className="calendar-event-item"
              style={{ backgroundColor: event.color }}
            >
              {event.text}
            </li>
          ))}
        </ul>
      );
    }
    return null;
  };

  const tileClassName = ({ date, view }) => {
    const dateKey = date.toISOString().split('T')[0];
    if (view === 'month' && events[dateKey]) {
      return 'has-event';
    }
    return null;
  };

  return (
    <div className="Maincalendar">
      <div className="main-calendar-container">
        <Calendar
          onChange={handleDateChange}
          value={selectedDate}
          formatDay={formatDay}
          showNeighboringMonth={false}
          formatShortWeekday={(locale, date) =>
            date.toLocaleDateString('en-US', { weekday: 'short' }).charAt(0)
          }
          formatMonthYear={(locale, date) =>
            date.toLocaleDateString('en-US', { month: 'long' })
          }
          prev2Label={null}
          next2Label={null}
          tileContent={formatTileContent}
          tileClassName={tileClassName}
        />
      </div>
      <button className="add-event-button" onClick={handleAddEventClick}>
        + 일정 추가
      </button>
      <div className="right-events">
        <div className="event-list-container">
          <h3>{formatDate(selectedDate)} 일정</h3>
          <ul className="event-list">
            {(events[selectedDate.toISOString().split('T')[0]] || []).map(
              (event, index) => (
                <li key={index} className="event-item">
                  {editingIndex === index ? (
                    <div>
                      <input
                        type="text"
                        value={editingValue}
                        onChange={(e) => setEditingValue(e.target.value)}
                      />
                      <button onClick={handleSaveEdit}>저장</button>
                    </div>
                  ) : (
                    <div className="edit_delete">
                      <div>
                        <div className="event_title">
                          <span>{event.text}</span>
                          <div className="event_button">
                            <button
                              onClick={() => handleEditEvent(index, event.text)}
                            >
                              수정
                            </button>
                            <button onClick={() => handleDeleteEvent(index)}>
                              삭제
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </li>
              )
            )}
          </ul>
        </div>
        {isAddingEvent && (
          <div className="add-event-form">
            <select
              className="student-dropdown"
              value={selectedStudent}
              onChange={(e) => setSelectedStudent(e.target.value)}
            >
              <option value="">학생 선택</option>

              {students.map((student, index) => (
                <option key={index} value={student.student_name}>
                  {student.student_name}
                </option>
              ))}
              <option value="선택 x">선택 x</option>
            </select>
            <input
              className="ctext"
              type="text"
              value={newEvent}
              onChange={(e) => setNewEvent(e.target.value)}
              placeholder="내용을 입력하세요."
            />
            <label>종료일 선택:</label>
            <DatePicker
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              minDate={selectedDate}
              className="date-picker"
            />
            <button onClick={handleSaveEvent}>저장</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default BigCalendar;
