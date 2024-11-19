import React, { useState, useEffect } from 'react';
import Cbutton from '../components/Cbutton';
import Header from '../components/Header';
import Box from '../components/Box';
import rarrow from '../img/rightarrow.png';
import larrow from '../img/leftarrow.png';
import logo from '../img/new_logo.png';
import Button from '../components/Button';
import Content from '../components/Content';
import MiniCalendar from '../components/MiniCalendar';
import TutorItem from '../components/TutorItem';
import TutorModal from '../components/TutorModal';
import './Student2.css';
import LogoutButton from '../components/LogoutButton';
import StudentAch from '../components/StudentAch';
import ExCalendar from '../components/Excalendar.jsx';
const Student2 = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tutors, setTutors] = useState([]);
  const [students, setStudents] = useState([]);
  const [currentWeek, setCurrentWeek] = useState(new Date());
  const [today, setToday] = useState({ formattedDate: '', formattedDay: '' });

  const days = [
    '월요일',
    '화요일',
    '수요일',
    '목요일',
    '금요일',
    '토요일',
    '일요일',
  ];

  useEffect(() => {
    const date = new Date();
    const dayIndex = date.getDay();
    const dayName = days[(dayIndex + 6) % 7];
    const formattedDate = `${date.getDate()}일`;
    const formattedDay = `(${dayName[0]})`;
    setToday({ formattedDate, formattedDay });
  }, []);

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

  const changeWeek = (direction) => {
    const newDate = new Date(currentWeek);
    newDate.setDate(currentWeek.getDate() + direction * 7);
    setCurrentWeek(newDate);
  };

  const getWeekOfMonth = (date) => {
    const firstDay = new Date(date.getFullYear(), date.getMonth(), 1).getDay();
    return Math.ceil((date.getDate() + firstDay) / 7);
  };

  const calculateTopPosition = (time) => {
    const [hour, minute] = time.split(':').map(Number);
    const hourOffset = (hour - 9) * 20;
    const minuteOffset = (minute / 60) * 20;
    return hourOffset + minuteOffset;
  };

  return (
    <>
      <div className="studentcontainer">
        <div className="left-section">
          <img src={logo} alt="homelogo" className="homelogo" />
          <div className="excalendar">
            <ExCalendar />
          </div>
          <div className="TutorList">
            <Box text={'과외 목록 | 상점'} type={'gray'} />
            {tutors.map((tutor, index) => (
              <TutorItem
                key={index}
                tutorname={tutor.tutorname}
                tutorsch={(tutor.formattedSchedule || []).join(', ')}
                tutorsub={tutor.tutorsub}
              />
            ))}
            <Button
              onClick={() => setIsModalOpen(true)}
              className="add-tutor-button"
              text={'등록'}
              style={{ backgroundColor: '#6ac665', color: 'white', left: 130 }}
            />
          </div>
          <StudentAch className="studentach" />
        </div>
        <div className="right-section">
          <div className="header-container">
            <Header
              title={`${currentWeek.getMonth() + 1}월 ${getWeekOfMonth(
                currentWeek
              )}주차`}
              leftchild={
                <img
                  src={larrow}
                  alt="Left"
                  className="header-image"
                  onClick={() => changeWeek(-1)}
                />
              }
              rightchild={
                <img
                  src={rarrow}
                  alt="Right"
                  className="header-image"
                  onClick={() => changeWeek(1)}
                />
              }
            />
          </div>
          <div className="calendar-container">
            <div className="calendar">
              {days.map((day, index) => {
                const date = new Date(currentWeek);
                date.setDate(
                  currentWeek.getDate() - ((date.getDay() + 6) % 7) + index
                );
                const formattedDate = `${date.getDate()}일`;
                const formattedDay = `(${day[0]})`;

                return (
                  <div key={day} className="day-section">
                    <Cbutton
                      text={
                        <>
                          {formattedDate}
                          <span className="small-text">{formattedDay}</span>
                        </>
                      }
                      type={
                        today?.formattedDate === formattedDate
                          ? 'selected'
                          : 'default'
                      }
                      onClick={() => {}}
                    />
                    <div
                      className="day-content"
                      style={{ position: 'relative', marginTop: '10px' }}
                    >
                      {tutors.flatMap((tutor, tutorIndex) =>
                        tutor.schedule
                          .filter((sch) => sch.day === day[0])
                          .map((sch) => (
                            <div
                              key={`${tutor.name}-${tutor.time}`}
                              style={{
                                position: 'absolute',
                                top: `${calculateTopPosition(sch.time)}px`,
                              }}
                            >
                              <Content
                                time={sch.time}
                                name={tutor.tutorsub}
                                index={tutorIndex}
                                onMove={() => {}}
                              />
                            </div>
                          ))
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="boxes">
            <div className="WeekProgress">
              <Box text={'이번 주 진도'} />
            </div>
            <div className="WeekAssignment">
              <Box text={'이번 주 과제'} />
            </div>
          </div>
        </div>

        {isModalOpen && (
          <TutorModal onClose={() => setIsModalOpen(false)} onSave={addTutor} />
        )}
        <LogoutButton />
      </div>
    </>
  );
};

export default Student2;
