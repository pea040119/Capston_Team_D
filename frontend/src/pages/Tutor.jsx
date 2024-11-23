import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // useNavigate 추가
import { useUser } from '../context/UserContext';
import Cbutton from '../components/Cbutton';
import './Tutor.css';
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
import LogoutButton from '../components/LogoutButton';
import ExCalendar from '../components/Excalendar';
import WeekPopup from '../components/WeekPopup';
const Tutor = () => {
  const { user } = useUser(); // 로그인된 유저 정보 가져오기

  if (user) {
    console.log('로그인된 유저:', user);
  } else {
    console.log('로그인된 유저가 없습니다.');
  }

  const tutorId = user?.user_id; // 유저에서 tutorId (user_id) 가져오기
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [students, setStudents] = useState([]);
  const [totalFee, setTotalFee] = useState(0);
  const [currentWeek, setCurrentWeek] = useState(new Date());
  const [today, setToday] = useState({ formattedDate: '', formattedDay: '' });
  //추가
  const [selectedSchedule, setSelectedSchedule] = useState(null);
  const [isWeekPopupOpen, setIsWeekPopupOpen] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      const tutorId = user.user_id;
      console.log('로그인된 tutorId:', user);
    }
  }, [user]);

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

  const handleScheduleClick = (student, date) => {
    setSelectedSchedule({ student, date });
    setIsWeekPopupOpen(true); // WeekPopup 열기
  };
  return (
    <>
      <div className="tutorcontainer">
        <div className="left-section">
          <img src={logo} alt="homelogo" className="homelogo" />

          <div
            className="excalendar"
            onClick={() => navigate('/tutorcalendar')}
          >
            <ExCalendar />
          </div>

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

          <div className="student-list-view">
            <p>학생 목록</p>
          </div>

          <div className="StudentList">
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

          <div className="weekcalendar-container">
            <div className="weekcalendar">
              {days.map((day, index) => {
                const date = new Date(currentWeek);
                date.setDate(
                  currentWeek.getDate() - ((date.getDay() + 6) % 7) + index
                );
                const formattedDate = `${date.getDate()}일`;
                const formattedDay = `(${day[0]})`;

                return (
                  <div key={day} className="weekday-section">
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
                      className="weekday-content"
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
                              // 여기에 클릭 시 팝업을 열기 위한 onClick 설정 추가
                              // 학생과 날짜를 인자로 전달
                            >
                              <Content
                                time={sch.time}
                                name={`${student.name} ${student.subject}`}
                                type={
                                  today?.formattedDate === formattedDate
                                    ? 'today'
                                    : undefined
                                } // 오늘 날짜에 'today' 타입 지정
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

          {/* <div className="weekcalendar-container">
            <div className="weekcalendar">
              {days.map((day, index) => {
                const date = new Date(currentWeek);
                date.setDate(
                  currentWeek.getDate() - ((date.getDay() + 6) % 7) + index
                );
                const formattedDate = `${date.getDate()}일`;
                const formattedDay = `(${day[0]})`;

                return (
                  <div key={day} className="weekday-section">
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
                      className="weekday-content"
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
          </div> */}
          <div className="fee-box-container">
            <Box text={'이달의 수입'} />
            <div className="total-fee">
              <img src={won} alt="won" className="won" />
              <div>{totalFee.toLocaleString()}원</div>
            </div>
          </div>
        </div>
        <LogoutButton />

        {isModalOpen && (
          <StudentModal
            onClose={() => setIsModalOpen(false)}
            onSave={addStudent}
            tutorId={tutorId} // tutorId 전달
          />
        )}
        {isWeekPopupOpen && (
          <WeekPopup
            onClose={() => setIsWeekPopupOpen(false)}
            selectedSchedule={selectedSchedule}
          />
        )}
      </div>
    </>
  );
};

export default Tutor;
