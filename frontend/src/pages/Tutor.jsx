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
    '일요일',
    '월요일',
    '화요일',
    '수요일',
    '목요일',
    '금요일',
    '토요일',
  ];

  useEffect(() => {
    const date = new Date();
    const dayIndex = date.getDay();
    const dayName = days[dayIndex];
    const formattedDate = `${date.getDate()}일(${dayName[0]})`;
    setToday(formattedDate);
  }, []);

  const addStudent = (student) => {
    setStudents([...students, student]);
    setTotalFee(totalFee + student.fee);
  };

  const schedule = {
    월요일: [
      { time: '09:00', name: '김철수 영어' },
      { time: '11:00', name: '이영희 수학' },
    ],
    금요일: [{ time: '9:00', name: '박민수 과학', type: 'blue' }],
  };

  return (
    <>
      <img src={logo} alt="logo" className="logo" />
      <div className="header-container">
        <Header
          title="11월 1주차"
          leftchild={<img src={larrow} alt="Left" className="header-image" />}
          rightchild={<img src={rarrow} alt="Right" className="header-image" />}
        />
      </div>
      <div className="box-container">
        <Box text={'이달의 수입'} />
        <div className="total-fee">
          <img src={won} alt="won" className="won" />
          <div>{totalFee.toLocaleString()}원</div>
        </div>
      </div>

      <div className="calendar-container">
        <div className="calendar">
          {days.map((day, index) => {
            const date = new Date();
            date.setDate(date.getDate() - date.getDay() + index);
            const formattedDate = `${date.getDate()}일(${day[0]})`;

            return (
              <div key={day} className="day-section">
                <Cbutton
                  text={formattedDate}
                  type={today === formattedDate ? 'selected' : 'default'}
                  onClick={() => {}}
                />
                <div className="day-content">
                  {schedule[day] &&
                    schedule[day].map((item, idx) => (
                      <Content key={idx} time={item.time} name={item.name} />
                    ))}
                </div>
              </div>
            );
          })}
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
          <div className="ButtonContiner">
            <Button
              onClick={() => setIsModalOpen(true)}
              text={'등록'}
              style={{
                backgroundColor: '#6ac665',
                color: 'white',
                left: 130,
              }}
            />
          </div>
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
