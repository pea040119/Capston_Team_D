import React, { useState } from 'react';
import Cbutton from '../components/Cbutton';
import './Tutor.css';
import Header from '../components/Header';
import Box from '../components/Box';
import rarrow from '../img/rightarrow.png';
import larrow from '../img/leftarrow.png';
import logo from '../img/logo.png';
import StudentItem from '../components/StudentItem';
import StudentModal from '../components/StudentModal';
import Button from '../components/Button';

const Tutor = () => {
  const [selectedDay, setSelectedDay] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [students, setStudents] = useState([]);

  const days = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
  ];

  const handleDayClick = (day) => {
    setSelectedDay(day);
  };

  const addStudent = (student) => {
    setStudents([...students, student]);
  };

  return (
    <>
      <img src={logo} alt="logo" className="logo" />
      <div className="header-container">
        <Header
          title="10월 3주차"
          leftchild={<img src={larrow} alt="Left" className="header-image" />}
          rightchild={<img src={rarrow} alt="Right" className="header-image" />}
        />
      </div>
      <div className="box-container">
        <Box text={'이달의 수입'} />
      </div>
      <div className="calendar-container">
        <div className="calendar">
          {days.map((day) => (
            <Cbutton
              key={day}
              text={day}
              type={selectedDay === day ? 'selected' : 'default'}
              onClick={() => handleDayClick(day)}
            />
          ))}
        </div>
        {selectedDay && (
          <div className="day-content">
            <p>{selectedDay}의 내용이 여기에 표시됩니다.</p>
          </div>
        )}
        <div className="StudentList">
          <Box text={'학생 목록'} type={'gray'} />
          {students.map((student, index) => (
            <StudentItem
              key={index}
              name={student.name}
              time={student.time}
              grade={student.grade}
              sub={student.subject}
            />
          ))}
          <Button
            onClick={() => setIsModalOpen(true)}
            className="add-student-button"
            text={'등록'}
            style={{ backgroundColor: '#40B3DE', color: 'white' }}
          ></Button>
        </div>
      </div>
      {isModalOpen && (
        <StudentModal
          onClose={() => setIsModalOpen(false)}
          onSave={addStudent}
        />
      )}
    </>
  );
};

export default Tutor;
