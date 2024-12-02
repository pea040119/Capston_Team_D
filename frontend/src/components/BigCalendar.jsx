import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './BigCalendar.css';
import axios from 'axios';

const BigCalendar = ({ students, userId }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [events, setEvents] = useState({});
  const [isAddingEvent, setIsAddingEvent] = useState(false);
  const [newEvent, setNewEvent] = useState('');
  const [editingIndex, setEditingIndex] = useState(null);
  const [editingValue, setEditingValue] = useState('');
  const [selectedStudent, setSelectedStudent] = useState("");
  const [studentColors, setStudentColors] = useState({});
  //const [endDate, setEndDate] = useState(new Date());

  const colors = ['#F0F1B3', '#C8E2E9', '#CA9BE3', '#EF74766E'];

  useEffect(() => {
    const tempStudentColors = {};
    students.forEach((student, index) => {
      tempStudentColors[student.student_name] = colors[index % colors.length];
    });
    setStudentColors(tempStudentColors);
  }, [students]);

  useEffect(() => {
    loadEvents();
    console.log('Events', events);
  }, [userId]);

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

  const loadEvents = async () => { 
    if (!userId) {
      return;
    }
    try {
      const response = await fetch(
         `http://127.0.0.1:8000/calendar/get_time/${userId}/`,
      );
      console.log(response);
      let timeData = response.data;

        // 만약 timeData가 배열이 아니라면 빈 배열로 초기화
        if (!Array.isArray(timeData)) {
          // console.log('timeData is not an array. Converting to empty array.');
          timeData = [];
        }

        // 서버로부터 가져온 데이터를 상태로 설정
        const eventMap = timeData.reduce((acc, item) => {
          const dateKey = item.date;
          const event = {
            name: item.name,
            color: item.color,
          };
          if (!acc[dateKey]) {
            acc[dateKey] = [];
          }
          acc[dateKey].push(event);
          return acc;
        }, {});

        setEvents(eventMap);
    } catch (error) {
      alert(error.message);
    }
  };

  const handleSaveEvent = async() => {
    if (!newEvent.trim()) {
      alert('내용을 입력하세요.');
      return;
    }
    const dateKey = selectedDate.toISOString().split('T')[0];
    const color =
      selectedStudent && selectedStudent !== '선택 x'
        ? studentColors[selectedStudent]
        : 'white'; // 선택 x는 흰색
    const fullEvent = {
      text:
        selectedStudent && selectedStudent !== '선택 x'
          ? `${selectedStudent} ${newEvent}`
          : newEvent,
      color,
    };
    console.log(fullEvent);

    try {
      console.log(fullEvent);

      const data = {
        "text": fullEvent.text,
        "color": fullEvent.color,
        "date": dateKey,
      }
      const response = await fetch( `http://127.0.0.1:8000/calendar/add_time/${userId}/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
  
      if (!response.ok) {
        throw new Error('이벤트를 저장하는 동안 오류가 발생했습니다.');
      }
  
      // 서버에 성공적으로 저장된 경우, 클라이언트 측에서도 상태 업데이트
      setEvents((prevEvents) => ({
        ...prevEvents,
        [dateKey]: [...(prevEvents[dateKey] || []), fullEvent],
      }));
  
      setNewEvent('');
      setSelectedStudent(''); // Reset selected student
      setIsAddingEvent(false);
    } catch (error) {
      alert(error.message);
    }
  };

  {
    /*const handleSaveEvent = () => {
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
  };*/
  }

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
            {/*<label>종료일 선택:</label>*/}

            {/* 
<DatePicker
  selected={endDate}
  onChange={(date) => setEndDate(date)}
  minDate={selectedDate}
  className="date-picker"
/> 
*/}
            <button onClick={handleSaveEvent}>저장</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default BigCalendar;
