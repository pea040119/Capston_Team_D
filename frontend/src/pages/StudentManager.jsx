// StudentManager.jsx
import React, { useState, useEffect } from 'react';
import Box from '../components/Box';
import logo from '../img/logo.png';
import Button from '../components/Button';
import MiniCalendar from '../components/MiniCalendar';
import TutorItem from '../components/TutorItem';
import TutorModal from '../components/TutorModal';
//import './StudentManager.css';

const StudentManager = () => {
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
    setTutors([...tutors, tutor]);
  };

  const calculateTopPosition = (time) => {
    const [hour, minute] = time.split(':').map(Number);
    const hourOffset = (hour - 9) * 20;
    const minuteOffset = (minute / 60) * 20;
    return hourOffset + minuteOffset;
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
  return (
    <>
      <MiniCalendar />
      <img src={logo} alt="logo" className="logo" />

      <div className="box-container">
        <Box text={'이번주 진도'} />
        <Box text={'이번주 과제'} />
      </div>
      <div className="exam_result">
        <Box text={'시험 성적표'} />
      </div>
      <div>
        <div className="TutorList">
          <Box text={'과외 목록 | 상점'} type={'gray'} />
          {tutors.map((tutor, index) => (
            <TutorItem
              key={index}
              tutorname={tutor.tutorname}
              tutorsch={tutor.tutorsch}
              tutorsub={tutor.tutorsub}
              reward={tutor.reward}
            />
          ))}
          <Button
            onClick={() => setIsModalOpen(true)}
            className="add-tutor-button"
            text={'등록'}
            style={{ backgroundColor: '#6ac665', color: 'white' }}
          />
        </div>
        {/* </div> */}
      </div>
      {isModalOpen && (
        <TutorModal onClose={() => setIsModalOpen(false)} onSave={addTutor} />
      )}
    </>
  );
};

export default StudentManager;
