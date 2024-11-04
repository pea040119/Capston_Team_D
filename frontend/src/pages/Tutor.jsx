import React, { useState, useEffect } from 'react';
import Cbutton from '../components/Cbutton';
import './Tutor.css';
import Header from '../components/Header';
import Box from '../components/Box';
import rarrow from '../img/rightarrow.png';
import larrow from '../img/leftarrow.png';
import logo from '../img/logo.png';
import StudentItem from '../components/StudentItem';
import StudentModal from '../components/StudentModal';
import won from '../img/won.png';
import Button from '../components/Button';
import Content from '../components/Content';

const Tutor = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [students, setStudents] = useState([]);
  const [totalFee, setTotalFee] = useState(0);
  const [today, setToday] = useState(null);

  const days = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];

  useEffect(() => {
    const todayIndex = new Date().getDay();
    setToday(days[todayIndex]);
  }, []);

  const addStudent = (student) => {
    setStudents([...students, student]);
    setTotalFee(totalFee + student.fee);
  };

  const schedule = {
    Monday: [
      { time: '09:00', name: '김철수 영어' },
      { time: '11:00', name: '이영희 수학' },
    ],
    Tuesday: [{ time: '10:00', name: '박민수 과학' }],
    // 다른 요일에 맞는 스케줄 추가
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
        <div className="total-fee">
          <Header
            title={totalFee.toLocaleString()}
            leftchild={<img src={won} alt="won icon" />}
          />
        </div>
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
                {schedule[day] &&
                  schedule[day].map((item, index) => (
                    <Content key={index} time={item.time} name={item.name} />
                  ))}
              </div>
            </div>
          ))}
        </div>
        <div className="StudentList">
          <Box text={'학생 목록'} type={'gray'} />
          {students.map((student, index) => (
            <StudentItem
              key={index}
              name={student.name}
              sch={student.sch}
              grade={student.grade}
              sub={student.subject}
            />
          ))}
          <Button
            onClick={() => setIsModalOpen(true)}
            className="add-student-button"
            text={'등록'}
            style={{ backgroundColor: '#40B3DE', color: 'white' }}
          />
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
