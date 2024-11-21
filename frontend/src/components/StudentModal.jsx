import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './StudentModal.css';

const DAYS = ['월', '화', '수', '목', '금', '토', '일'];
const TIMES = Array.from({ length: 18 }, (_, i) => `${i + 7}:00`);

const StudentModal = ({ onClose, onSave, tutorId }) => {

  useEffect(() => {
    console.log("tutorId from props:", tutorId); // tutorId 출력
  }, [tutorId]); // tutorId가 변경될 때마다 출력

  const [name, setName] = useState('');
  const [grade, setGrade] = useState('');
  const [subject, setSubject] = useState('');
  const [fee, setFee] = useState('');
  const [schedule, setSchedule] = useState([]);
  const [selectedDay, setSelectedDay] = useState('');
  const [selectedTime, setSelectedTime] = useState('');

  const addSchedule = () => {
    if (selectedDay && selectedTime) {
      setSchedule([...schedule, { day: selectedDay, time: selectedTime }]);
      setSelectedDay('');
      setSelectedTime('');
    }
  };

  const removeSchedule = (index) => {
    setSchedule(schedule.filter((_, i) => i !== index));
  };

  // const handleSave = async () => {
  //   const studentData = {
  //     name,
  //     schedule,
  //     grade,
  //     subject,
  //     fee: parseInt(fee) || 0,
  //     tutor_id: tutorId,
  //   };
  
  //   try {
  //     console.log("학생 데이터:", studentData); // 학생 데이터 확인
  
  //     // 1. 수업 등록 API 호출
  //     const classResponse = await axios.post('http://localhost:5000/api/class_create', {
  //       subject,
  //       tutor_id: tutorId,
  //     });
  //     console.log("수업 등록 응답:", classResponse.data); // 수업 등록 응답 확인
  
  //     const classId = classResponse.data.class;
  //     if (!classId) {
  //       console.error("수업 ID가 없습니다.");
  //       alert('수업 등록에 실패했습니다. 다시 시도해주세요.');
  //       return;
  //     }
  
  //     // 2. 수업 시간 설정 API 호출
  //     for (const sch of schedule) {
  //       try {
  //         const classTimeResponse = await axios.post('http://localhost:5000/api/class_set_time', {
  //           class_id: classId,
  //           day: sch.day,
  //           time: sch.time,
  //         });
  //         console.log(`수업 시간 설정 완료: ${sch.day} ${sch.time}`, classTimeResponse.data); // 수업 시간 설정 성공
  //       } catch (timeError) {
  //         console.error(`수업 시간 설정 실패: ${sch.day} ${sch.time}`, timeError);
  //         alert('수업 시간 설정에 실패했습니다. 다시 시도해주세요.');
  //         return;
  //       }
  //     }
  
  //     // 3. 학생 등록 API 호출
  //     const studentResponse = await axios.post('http://localhost:5000/api/students', studentData);
  //     console.log("학생 등록 응답:", studentResponse.data); // 학생 등록 응답 확인
  
  //     const studentId = studentResponse.data.student_id; // 응답에서 student_id 받기
  //     if (!studentId) {
  //       console.error("학생 ID가 없습니다.");
  //       alert('학생 등록에 실패했습니다. 다시 시도해주세요.');
  //       return;
  //     }
  
  //     // 4. 수업과 학생 연결 API 호출
  //     const classStudentResponse = await axios.post('http://localhost:5000/api/class_set_student', {
  //       class_id: classId,
  //       student_id: studentId,
  //     });
  //     console.log("수업-학생 연결 응답:", classStudentResponse.data); // 수업-학생 연결 응답 확인
  
  //     // onSave 콜백 호출 (선택 사항)
  //     onSave(studentData);
  
  //     // 모달 닫기
  //     onClose();
  //   } catch (error) {
  //     console.error('학생 데이터 저장 실패:', error); // 전체 에러 메시지 출력
  //     alert('저장에 실패했습니다. 다시 시도해주세요.');
  //   }
  // };
  
  const handleSave = () => {
    onSave({
      name,
      schedule,
      grade,
      subject,
      fee: parseInt(fee) || 0,
    });
    onClose();
  };

  return (
    <div className="studentmodal">
      <div className="studentmodal-content">
        <h2>학생 등록</h2>
        <label>이름</label>
        <input value={name} onChange={(e) => setName(e.target.value)} />

        <label>스케줄</label>
        <div className="schedule-input">
          <select
            value={selectedDay}
            onChange={(e) => setSelectedDay(e.target.value)}
          >
            <option value="">요일 선택</option>
            {DAYS.map((day) => (
              <option key={day} value={day}>
                {day}
              </option>
            ))}
          </select>
          <select
            value={selectedTime}
            onChange={(e) => setSelectedTime(e.target.value)}
          >
            <option value="">시작 시간 선택</option>
            {TIMES.map((time) => (
              <option key={time} value={time}>
                {time}
              </option>
            ))}
          </select>
          <button className="add-schedule-button" onClick={addSchedule}>
            추가
          </button>
        </div>

        <ul className="schedule-list">
          {schedule.map((sch, index) => (
            <li key={index}>
              <span>{`${sch.day} ${sch.time}`}</span>
              <button
                className="remove-schedule-button"
                onClick={() => removeSchedule(index)}
              >
                제거
              </button>
            </li>
          ))}
        </ul>

        <label>학년</label>
        <input value={grade} onChange={(e) => setGrade(e.target.value)} />
        <label>과목</label>
        <input value={subject} onChange={(e) => setSubject(e.target.value)} />
        <label>과외비</label>
        <input
          type="number"
          value={fee}
          onChange={(e) => setFee(e.target.value)}
        />

        <button onClick={handleSave}>저장</button>
        <button onClick={onClose}>닫기</button>
      </div>
    </div>
  );
};

export default StudentModal;
