import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './BigCalendar.css';
const BigCalendar = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [events, setEvents] = useState({});
  const [isAddingEvent, setIsAddingEvent] = useState(false);
  const [newEvent, setNewEvent] = useState('');
  const [editingIndex, setEditingIndex] = useState(null);
  const [editingValue, setEditingValue] = useState('');
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
    if (!newEvent.trim()) return;
    const dateKey = selectedDate.toISOString().split('T')[0];
    setEvents((prevEvents) => ({
      ...prevEvents,
      [dateKey]: [...(prevEvents[dateKey] || []), newEvent],
    }));
    setNewEvent('');
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
      updatedEvents[editingIndex] = editingValue;
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

    // Check if there are events for this date
    if (view === 'month' && events[dateKey]) {
      return (
        <ul className="event-list">
          {events[dateKey].map((event, index) => (
            <li key={index} className="calendar-event-item">
              {event}
            </li>
          ))}
        </ul>
      );
    }
    return null;
  };
  const tileClassName = ({ date, view }) => {
    const dateKey = date.toISOString().split('T')[0];

    if (view === 'month' && events[dateKey] && date.getDay() === 6) {
      return 'saturday-event';
    }
    // Check if there are events on this date
    if (view === 'month' && events[dateKey]) {
      return 'has-event'; // Add a custom CSS class
    }

    // Check if the day is Saturday
    if (view === 'month' && date.getDay() === 6) {
      return 'saturday-tile';
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
          tileClassName={tileClassName} // Added this line
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
                    <div>
                      <span>{event}</span>
                      <button onClick={() => handleEditEvent(index, event)}>
                        수정
                      </button>
                      <button onClick={() => handleDeleteEvent(index)}>
                        삭제
                      </button>
                    </div>
                  )}
                </li>
              )
            )}
          </ul>
        </div>
        {isAddingEvent && (
          <div className="add-event-form">
            <input
              className="ctext"
              type="text"
              value={newEvent}
              onChange={(e) => setNewEvent(e.target.value)}
              placeholder="내용을 입력하세요."
            />
            <button onClick={handleSaveEvent}>저장</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default BigCalendar;