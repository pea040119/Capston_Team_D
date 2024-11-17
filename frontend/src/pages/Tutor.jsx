import React, { useState, useEffect } from 'react';
import Cbutton from '../components/Cbutton';
//import './Tutor.css';
import Header from '../components/Header';
import Box from '../components/Box';
import rarrow from '../img/rightarrow.png';
import larrow from '../img/leftarrow.png';
import logo from '../img/new_logo.png';
import StudentItem from '../components/StudentItem';
import StudentModal from '../components/StudentModal';
import won from '../img/won.png';
import Button from '../components/Button';
import Content from '../components/Content';
import MiniCalendar from '../components/MiniCalendar';
import LogoutButton from '../components/LogoutButton';

const Tutor = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [students, setStudents] = useState([]);
  const [totalFee, setTotalFee] = useState(0);
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
      <LogoutButton />
      <MiniCalendar />
      <img src={logo} alt="logo" className="logo" />
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
      <div className="fee-box-container">
        <Box text={'이달의 수입'} />
        <div className="total-fee">
          <img src={won} alt="won" className="won" />
          <div>{totalFee.toLocaleString()}원</div>
        </div>
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
                  {students.flatMap((student, studentIndex) =>
                    student.schedule
                      .filter((sch) => sch.day === day[0])
                      .map((sch) => (
                        <div
                          key={`${student.name}-${sch.time}`}
                          style={{
                            position: 'absolute',
                            top: `${calculateTopPosition(sch.time)}px`,
                          }}
                        >
                          <Content
                            time={sch.time}
                            name={`${student.name} ${student.subject}`}
                            index={studentIndex} // 색상 순환을 위해 studentIndex를 전달
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
        <div className="StudentList">
          <Box text={'학생 목록'} type={'gray'} />
          {students.map((student, index) => (
            <StudentItem
              key={index}
              name={student.name}
              sch={(student.formattedSchedule || []).join(', ')}
              grade={student.grade}
              sub={student.subject}
            />
          ))}
          <div className="ButtonContainer">
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
