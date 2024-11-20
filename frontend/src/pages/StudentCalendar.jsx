import React, { useState } from 'react';
import Box from '../components/Box';
import logo from '../img/new_logo.png';
import Button from '../components/Button';
import TutorItem from '../components/TutorItem';
import './StudentCalendar.css';
import LogoutButton from '../components/LogoutButton';
import BigCalendar from '../components/BigCalendar';
import StudentAch from '../components/StudentAch';
import TutorModal from '../components/TutorModal';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const StudentCalendar = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [events, setEvents] = useState({});
  const [isAddingEvent, setIsAddingEvent] = useState(false);
  const [newEvent, setNewEvent] = useState('');
  const [isDday, setIsDday] = useState(false); // 추가된 D-Day 상태
  const [editingIndex, setEditingIndex] = useState(null);
  const [editingValue, setEditingValue] = useState('');
  const formatDate = (date) => {
    return `${date.getMonth() + 1}월 ${date.getDate()}일`;
  };
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tutors, setTutors] = useState([]);
  const calculateDaysLeft = (eventDate) => {
    const today = new Date();
    const targetDate = new Date(eventDate);
    const diffTime = targetDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const addTutor = (tutor) => {
    const newSchedule = tutor.schedule.reduce((acc, sch) => {
      const key = sch.time;
      if (acc[key]) {
        acc[key].push(sch.day);
      } else {
        acc[key] = [sch.day];
      }
      return acc;
    }, {});

    const formattedSchedule = Object.entries(newSchedule).map(
      ([time, days]) => `${days.join(', ')} ${time}`
    );

    const updatedTutor = {
      ...tutor,
      formattedSchedule,
    };

    setTutors([...tutors, updatedTutor]);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setIsAddingEvent(false);
    setEditingIndex(null);
    setEditingValue('');
  };

  const handleAddEventClick = () => {
    setIsAddingEvent(true);
    setEditingIndex(null);
  };

  const handleSaveEvent = () => {
    if (!newEvent.trim()) return;
    const dateKey = selectedDate.toISOString().split('T')[0];
    const eventDetails = {
      text: newEvent,
      isDday,
      date: dateKey, // D-Day 날짜 추가
    };

    setEvents((prevEvents) => ({
      ...prevEvents,
      [dateKey]: [...(prevEvents[dateKey] || []), eventDetails],
    }));

    setNewEvent('');
    setIsDday(false); // Reset D-Day state
    setIsAddingEvent(false);
  };

  const handleEditEvent = (index, value) => {
    setEditingIndex(index);
    setEditingValue(value.text);
    setIsAddingEvent(false);
  };

  const handleSaveEdit = () => {
    const dateKey = selectedDate.toISOString().split('T')[0];
    setEvents((prevEvents) => {
      const updatedEvents = [...prevEvents[dateKey]];
      updatedEvents[editingIndex] = {
        ...updatedEvents[editingIndex],
        text: editingValue,
      };
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
            <li key={index} className="calendar-event-item">
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

  // D-Day 이벤트 필터링
  const dDayEvents = Object.values(events)
    .flat()
    .filter((event) => event.isDday);

  return (
    <div className="studentcalendar">
      <div className="studentcalendar-left">
        <img src={logo} alt="schomelogo" className="schomelogo" />
        <div className="d-day">
          <p>D-Day</p>
          <ul className="d-day-list">
            {dDayEvents.map((event, index) => {
              const daysLeft = calculateDaysLeft(event.date); // D-Day 날짜 계산
              return (
                <ul key={index} className="d-day-item d-day-item-highlight">
                  {event.text + ' '}
                  {daysLeft > 0
                    ? `D-${daysLeft}`
                    : daysLeft === 0
                    ? 'D-Day'
                    : `D+${Math.abs(daysLeft)}`}
                </ul>
              );
            })}
          </ul>
        </div>

        <div className="TutorList">
          <div className="ButtonContainer">
            <Button
              onClick={() => setIsModalOpen(true)}
              text={'과외 등록'}
              style={{
                backgroundColor: '#94D2E4',
                color: 'white',
                width: '90px',
                fontSize: '15px',
              }}
            />
          </div>
          {isModalOpen && (
            <TutorModal
              onClose={() => setIsModalOpen(false)}
              onSave={addTutor}
            />
          )}
          <div className="tutor-list-view">
            <p>선생님 목록 | 상점</p>
          </div>
          {tutors.map((tutor, index) => (
            <TutorItem
              key={index}
              tutorname={tutor.tutorname}
              tutorsch={(tutor.formattedSchedule || []).join(', ')}
              tutorsub={tutor.tutorsub}
            />
          ))}
        </div>
        <div className="studenthomeach">
          <StudentAch />
        </div>
      </div>
      <div className="studentcalendar-right">
        <div className="Maincalendar">
          <div className="main-calendar-container">
            <Calendar
              onChange={handleDateChange}
              value={selectedDate}
              formatDay={(locale, date) => date.getDate()}
              showNeighboringMonth={false}
              tileContent={formatTileContent}
              tileClassName={tileClassName}
              prev2Label={null}
              next2Label={null}
              formatShortWeekday={(locale, date) =>
                date.toLocaleDateString('en-US', { weekday: 'short' }).charAt(0)
              }
              formatMonthYear={(locale, date) =>
                date.toLocaleDateString('en-US', { month: 'long' })
              }
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
                          <span>{event.text}</span>
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
                  type="text"
                  value={newEvent}
                  onChange={(e) => setNewEvent(e.target.value)}
                  placeholder="내용을 입력하세요."
                  className="ctext"
                />
                <label className="d-day-setting">
                  D-Day 설정
                  <input
                    type="checkbox"
                    checked={isDday}
                    onChange={(e) => setIsDday(e.target.checked)}
                  />
                </label>
                <button onClick={handleSaveEvent}>저장</button>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="tutorcalendar_logout">
        {' '}
        <LogoutButton />
      </div>
    </div>
  );
};

export default StudentCalendar;
