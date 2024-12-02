import React, { useState, useEffect } from 'react';
import Box from '../components/Box';
import logo from '../img/new_logo.png';
import Button from '../components/Button';
import StudentItem from '../components/StudentItem';
import StudentModal from '../components/StudentModal';
import { useNavigate } from 'react-router-dom';
import './TutorCalendar.css';
import LogoutButton from '../components/LogoutButton';
import BigCalendar from '../components/BigCalendar';
import { useUser } from '../context/UserContext';
import axios from 'axios';
import WeekCount from '../components/WeekCount';

const TutorCalendar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
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
  const { user } = useUser();
  const [tutorId, setTutorId] = useState(null);
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

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
    } catch (error) {
      console.error('학생 목록 로딩 실패:', error);
    } finally {
      setLoading(false); // 데이터 로딩 완료
    }
  };

  useEffect(() => {
    if (students.length > 0) {
      console.log('students:', students); // students 값이 업데이트된 후 실행
    }
  }, [students]);
  return (
    <div className="tutorcalendar">
      <div className="tutor-calendar-left">
        <img
          src={logo}
          alt="tchomelogo"
          className="tchomelogo"
          onClick={() => navigate('/tutor')}
        />
        <div className="weeksummaryoutline">
          <div className="weeksummary">
            <p>주간 요약</p>
          </div>
        </div>
        <WeekCount students={students} />

        <div className="c-ButtonContainer">
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
        <div className="c-student-list-view">
          <p>학생 목록</p>
        </div>

        <div className="c-StudentList">
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

      <div className="tutormaincalendar">
        <BigCalendar 
          students={students}
          userId={tutorId}
        />
      </div>
      <div className="tutorcalendar_logout">
        {' '}
        <LogoutButton />
      </div>
    </div>
  );
};
export default TutorCalendar;
