import React, { useState, useEffect } from 'react';
import Box from '../components/Box';
import logo from '../img/new_logo.png';
import Button from '../components/Button';
import StudentItem from '../components/StudentItem';
import StudentModal from '../components/StudentModal';
import './TutorCalendar.css';
import LogoutButton from '../components/LogoutButton';
import BigCalendar from '../components/BigCalendar';

const TutorCalendar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [students, setStudents] = useState([]);
  const addStudent = (student) => {
    const newSchedule = student.schedule.reduce((acc, sch) => {
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

    const updatedStudent = {
      ...student,
      formattedSchedule,
    };

    setStudents([...students, updatedStudent]);
    setTotalFee(totalFee + student.fee);
  };

  return (
    <div className="tutorcalendar">
      <div className="tutor-calendar-left">
        <img src={logo} alt="homelogo" className="homelogo" />
        <div className="weeksummary">
          <p>주간 요약</p>
        </div>
        <div className="StudentList">
          <div className="ButtonContainer">
            <Button
              onClick={() => setIsModalOpen(true)}
              text={'학생 등록'}
              style={{
                backgroundColor: '#94D2E4',
                color: 'white',
                width: '90px', // 원하는 너비 설정
                fontSize: '15px', // 텍스트 크기 조정
              }}
            />
          </div>
          {isModalOpen && (
            <StudentModal
              onClose={() => setIsModalOpen(false)}
              onSave={addStudent}
            />
          )}

          <div className="student-list-view">
            <p>학생 목록</p>
          </div>

          {students.map((student, index) => (
            <StudentItem
              key={index}
              name={student.name}
              sch={(student.formattedSchedule || []).join(', ')}
              grade={student.grade}
              sub={student.subject}
            />
          ))}
        </div>
      </div>
      <div className="tutormaincalendar">
        <BigCalendar />
      </div>
      <div className="tutorcalendar_logout">
        {' '}
        <LogoutButton />
      </div>
    </div>
  );
};
export default TutorCalendar;
