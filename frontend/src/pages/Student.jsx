import React, { useState, useEffect } from 'react';
import Box from '../components/Box';
import TutorItem from '../components/TutorItem';
import TutorModal from '../components/TutorModal';
import Button from '../components/Button';
import Content from '../components/Content';
import Header from '../components/Header';
import logo from '../img/logo.png';
import rarrow from '../img/rightarrow.png';
import larrow from '../img/leftarrow.png';
//import './Student.css';
import Cbutton from '../components/Cbutton';
import DivBox from '../components/DivBox';
import LogoutButton from '../components/LogoutButton';

const Student = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tutors, setTutors] = useState([]);
  const [today, setToday] = useState(null);
  const days = [
    '일요일',
    '월요일',
    '화요일',
    '수요일',
    '목요일',
    '금요일',
    '토요일',
  ];

  useEffect(() => {
    const todayIndex = new Date().getDay();
    setToday(days[todayIndex]);
  }, []);

  const addTutor = (tutor) => {
    setTutors([...tutors, tutor]);
  };

  const studentschedule = {
    월요일: [
      { time: '09:00', name: '영어' },
      { time: '11:00', name: '수학' },
    ],
    금요일: [{ time: '9:00', name: '과학' }],
    // 다른 요일에 맞는 스케줄 추가
  };
  return (
    <>
      <LogoutButton />
      <div className="CalendarHeader">
        <Header
          title="11월 1주차"
          leftchild={<img src={larrow} alt="Left" className="header-image" />}
          rightchild={<img src={rarrow} alt="Right" className="header-image" />}
        />
      </div>
      <div className="calendar-container">
        <div className="calendar">
          {days.map((day) => (
            <div key={day} className="day-section">
              <Cbutton
                text={day}
                type={today === day ? 'selected' : 'default'}
                onClick={() => {}}
              />
              <div className="day-content">
                {studentschedule[day] &&
                  studentschedule[day].map((item, index) => (
                    <Content key={index} time={item.time} name={item.name} />
                  ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <img src={logo} alt="logo" className="logo" />
      <div className="WeekProgress">
        <Box text={'이번 주 진도'} />
      </div>
      <div className="WeekAssignment">
        <Box text={'이번 주 과제'} />
      </div>
      <div className="StudentAchievement">
        <Box text={'이 달의 주요 성과'} />
      </div>
      <div className="TutorList">
        <DivBox leftText={'과외 목록'} rightText={'상점'} type={'gray'} />
        {tutors.map((tutor, index) => (
          <TutorItem
            key={index}
            tutorname={tutor.tutorname}
            tutorsch={tutor.tutorsch}
            tutorsub={tutor.tutorsub}
          />
        ))}
        <Button
          onClick={() => setIsModalOpen(true)}
          className="add-tutor-button"
          text={'등록'}
          style={{ backgroundColor: '#6ac995', color: 'white', left: 130 }}
        />
      </div>

      {isModalOpen && (
        <TutorModal onClose={() => setIsModalOpen(false)} onSave={addTutor} />
      )}
    </>
  );
};

export default Student;
