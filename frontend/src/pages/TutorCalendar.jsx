import React, { useState, useEffect } from 'react';
import Box from '../components/Box';
import logo from '../img/new_logo.png';
import Button from '../components/Button';
import TutorItem from '../components/TutorItem';
import TutorModal from '../components/TutorModal';
import './TutorCalendar.css';
import LogoutButton from '../components/LogoutButton';
import Maincalendar from '../components/Maincalendar';

const TutorCalendar = () => {
  return (
    <div className="tutorcalendar">
      <div className="tutor-calendar-left">
        <img src={logo} alt="homelogo" className="homelogo" />
        <div className="weeksummary">
          <Box text={'주간 요약'} />
        </div>
        <div className="StudentList">
          <Box text={'학생 목록'} type={'gray'} />
        </div>
      </div>
      <div className="tutormaincalendar">
        <Maincalendar />
      </div>
      <div className="tutorcalendar_logout">
        {' '}
        <LogoutButton />
      </div>
    </div>
  );
};
export default TutorCalendar;
