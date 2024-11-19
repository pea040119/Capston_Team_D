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
//import './Parents.css';
import LogoutButton from '../components/LogoutButton';

const Parents = () => {
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
  return (
    <div className="parents_container">
      <div className="parents-left-section">
        <img src={logo} alt="homelogo" className="homelogo" />
        <MiniCalendar />
        <div className="TutorList">
          <Box text={'과외 목록 '} type={'gray'} />
          {/* 이부분도 학생 과외 목록에서 불러와야할 것 같아요 */}
          {/* {tutors.map((tutor, index) => (
            <TutorItem
              key={index}
              tutorname={tutor.tutorname}
              tutorsch={(tutor.formattedSchedule || []).join(', ')}
              tutorsub={tutor.tutorsub}
            />
          ))} */}
        </div>
      </div>
      <div className="parents-right-section">
        <div className="Parents_Progress">
          <Box text={'수업 진도'} />
        </div>
        <div className="Parents_Memo">
          <Box text={'메모'} />
        </div>
      </div>
      <div className="parents-right-section2">
        <div className="Parents_fee">
          <Box text={'수업료 지불'} />
        </div>
        <div className="Parents_Score">
          <Box text={'성적'} />
        </div>
      </div>
      <div className="phlogout">
        <LogoutButton />
      </div>

      <div className="calendar-container">{/* </div> */}</div>
      {isModalOpen && (
        <TutorModal onClose={() => setIsModalOpen(false)} onSave={addTutor} />
      )}
    </div>
  );
};

export default Parents;
