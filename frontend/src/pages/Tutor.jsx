import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import axios from 'axios';
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
import SupContent from '../components/SupContent';
import SupplementModal from '../components/SupplementModal';

const Tutor = () => {
  const { user } = useUser();
  const [tutorId, setTutorId] = useState(null);
  const [students, setStudents] = useState([]);
  const [totalFee, setTotalFee] = useState(0);
  const [loading, setLoading] = useState(true);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentWeek, setCurrentWeek] = useState(new Date());
  const [today, setToday] = useState({ formattedDate: '', formattedDay: '' });
  const [selectedSchedule, setSelectedSchedule] = useState(null);
  const [isWeekPopupOpen, setIsWeekPopupOpen] = useState(false);
  const [selectedDateForSupplement, setSelectedDateForSupplement] =
    useState(null);
  const [supplementSchedules, setSupplementSchedules] = useState({});

  const [isFormOpen, setIsFormOpen] = useState(false);

  const navigate = useNavigate();
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
    if (user) {
      console.log('로그인된 유저:', user);
      setTutorId(user.user_id);
    } else {
      console.log('로그인된 유저가 없습니다.');
    }
  }, [user]);

  useEffect(() => {
    if (tutorId) {
      loadStudents(); // tutorId가 설정되면 학생 목록 로드
    }
  }, [tutorId]); // tutorId가 변경될 때마다 실행

  const loadStudents = async () => {
    try {
      console.log('튜터 ID:', tutorId);
      const response = await axios.get(
        `http://127.0.0.1:8000/tutor/student_list/${tutorId}/`
      );

      console.log(response.data);
      console.log(response.data.classes);

      setStudents(response.data.classes);

      //   // 수업료 합산
      //   const total = response.data.classes.reduce((acc, student) => acc + student.tuition, 0);
      // setTotalFee(total);
    } catch (error) {
      console.error('학생 목록 로딩 실패:', error);
    } finally {
      setLoading(false); // 데이터 로딩 완료
    }
  };
  useEffect(() => {
    if (students.length > 0) {
      console.log('students:', students); // students 값이 업데이트된 후 실행
      const total = students.reduce((acc, student) => acc + student.tuition, 0);
      setTotalFee(total);
    }
  }, [students]); // students 값이 변경될 때마다 실행

  useEffect(() => {
    const date = new Date();
    const dayIndex = date.getDay();
    const dayName = days[(dayIndex + 6) % 7];
    const formattedDate = `${date.getDate()}일`;
    const formattedDay = `(${dayName[0]})`;
    setToday({ formattedDate, formattedDay });
  }, []);

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

  const handleAddSupplementClick = (date) => {
    setSelectedDateForSupplement(date);
    setIsFormOpen(true);
  };

  const handleAddSchedule = (studentName, time) => {
    const student = students.find((s) => s.student_name === studentName);

    if (!student) return;

    setSupplementSchedules((prev) => {
      const newSchedules = { ...prev };
      if (!newSchedules[selectedDateForSupplement]) {
        newSchedules[selectedDateForSupplement] = [];
      }
      newSchedules[selectedDateForSupplement].push({
        student: student.student_name,
        subject: student.subject,
        time,
      });
      return newSchedules;
    });
  };
  const handleSaveSupplement = ({ student, time }) => {
    const studentData = students.find((s) => s.student_name === student);

    if (!studentData) {
      alert('학생 정보를 찾을 수 없습니다.');
      return;
    }

    setSupplementSchedules((prev) => {
      const newSchedules = { ...prev };
      if (!newSchedules[selectedDateForSupplement]) {
        newSchedules[selectedDateForSupplement] = [];
      }
      newSchedules[selectedDateForSupplement].push({
        student: studentData.student_name,
        subject: studentData.subject,
        time,
      });
      return newSchedules;
    });
  };
  return (
    <div className="tutorcontainer">
      <div className="left-section">
        <img src={logo} alt="homelogo" className="homelogo" />
        <div className="excalendar" onClick={() => navigate('/tutorcalendar')}>
          <ExCalendar />
        </div>
        <div className="ButtonContainer">
          <Button
            onClick={() => setIsModalOpen(true)}
            text={'학생 등록'}
            style={{
              backgroundColor: '#94D2E4',
              color: 'white',
              width: '90px',
              fontSize: '15px',
            }}
          />
        </div>
        <div className="student-list-view">
          <p>학생 목록</p>
        </div>
        <div className="StudentList">
          {loading ? (
            <p>학생 목록을 불러오는 중입니다...</p>
          ) : students.length > 0 ? (
            students.map((student, index) => {
              const formattedSchedule = student.scheduled_classes
                .map(({ day, time }) => `${day} ${time}`)
                .join(', ');
              return (
                <StudentItem
                  key={index}
                  name={student.student_name}
                  sch={formattedSchedule}
                  grade={student.grade}
                  sub={student.subject}
                />
              );
            })
          ) : (
            <p>학생 목록이 없습니다.</p>
          )}
        </div>
      </div>
      <div className="right-section">
        <div className="header-container">
          <Header
            title={`${currentWeek.getMonth() + 1}월 ${Math.ceil(
              (currentWeek.getDate() +
                new Date(
                  currentWeek.getFullYear(),
                  currentWeek.getMonth(),
                  1
                ).getDay()) /
                7
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
                    onClick={() => handleAddSupplementClick(formattedDate)}
                  />
                  <div
                    className="weekday-content"
                    style={{ position: 'relative', marginTop: '10px' }}
                  >
                    {students.flatMap((student) =>
                      student.scheduled_classes
                        .filter((sch) => sch.day === day[0])
                        .map((sch) => (
                          <div
                            key={`${student.student_name}-${sch.time}`}
                            style={{
                              position: 'absolute',
                              top: `${calculateTopPosition(sch.time)}px`,
                            }}
                          >
                            <Content
                              time={sch.time}
                              name={`${student.student_name} ${student.subject}`}
                              type={
                                // canceled, makeup 추가해야됨
                                today?.formattedDate === formattedDate
                                  ? 'today'
                                  : 'default'
                              }
                              onMove={() => {}}
                            />
                          </div>
                        ))
                    )}
                    {supplementSchedules[formattedDate]?.map(
                      (schedule, index) => (
                        <div
                          key={`${schedule.student}-${schedule.time}`}
                          style={{
                            position: 'absolute',
                            top: `${calculateTopPosition(schedule.time)}px`,
                          }}
                        >
                          {supplementSchedules[formattedDate]?.map(
                            (schedule, i) => (
                              <SupContent
                                key={i}
                                time={schedule.time}
                                name={`${schedule.student} ${schedule.subject}`}
                              />
                            )
                          )}
                        </div>
                      )
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        {isFormOpen && (
          <SupplementModal
            onClose={() => setIsFormOpen(false)}
            onSave={handleSaveSupplement}
            students={students}
            selectedDate={selectedDateForSupplement}
          />
        )}
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
          onClose={() => {
            loadStudents();
            setIsModalOpen(false);
          }}
          tutorId={tutorId}
        />
      )}
      {isWeekPopupOpen && (
        <WeekPopup
          onClose={() => setIsWeekPopupOpen(false)}
          selectedSchedule={selectedSchedule}
          // tutorId={tutorId}
          onSave={(updatedStudent) => {
            const newStudents = students.map((student) =>
              student.student_name === updatedStudent.student_name
                ? updatedStudent
                : student
            );
            setStudents(newStudents);
          }}
          student={students}
          
        />
      )}
    </div>
  );
};

export default Tutor;
