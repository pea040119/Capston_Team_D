import React, { useState, useEffect } from 'react';
import Table from '../components/Table.jsx';
import './TutorManager.css';
import '../components/ScoreChart.css';
import '../components/Memo.css';
import ScoreCharts from '../components/ScoreChart.jsx';
import Memo from '../components/Memo.jsx';
import StudentItem from '../components/StudentItem';
import StudentModal from '../components/StudentModal';
import Box from '../components/Box';
import Button from '../components/Button';
import ExCalendar from '../components/Excalendar.jsx';
import LogoutButton from '../components/LogoutButton.jsx';
import logo from '../img/new_logo.png';
import { useUser } from '../context/UserContext';
import axios from 'axios';

const TutorManager = () => {
  const [progressData, setProgressData] = useState([]);
  const [homeworkData, setHomeworkData] = useState([]);
  const [supplementData, setSupplementData] = useState([]);
  const [newProgressName, setNewProgressName] = useState('');
  const [newProgressPeriod, setNewProgressPeriod] = useState('');
  const [newHomeworkName, setNewHomeworkName] = useState('');
  const [newHomeworkAssignment, setNewHomeworkAssignment] = useState('');
  const [newSupplementItem, setNewSupplementItem] = useState('');

  const [isModalOpen, setIsModalOpen] = useState(false);

  const progressColumns = ['#', '내용', '진도', ''];
  const homeworkColumns = ['#', '숙제', '기간', ''];
  const supplementColumns = ['#', '준비물', ''];

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
      const response = await axios.get(`http://127.0.0.1:8000/tutor/student_list/${tutorId}/`);

      console.log(response.data);
      console.log(response.data.classes);


      setStudents(response.data.classes);

    } catch (error) {
      console.error('학생 목록 로딩 실패:', error);
    } finally {
      setLoading(false);  // 데이터 로딩 완료
    }
  };

  useEffect(() => {
    if (students.length > 0) {
      console.log("students:", students);  // students 값이 업데이트된 후 실행
    }
  }, [students]);

  const addProgressRow = () => {
    if (newProgressName && newProgressPeriod) {
      const newRow = [
        progressData.length + 1,
        newProgressName,
        newProgressPeriod,
      ];
      setProgressData([...progressData, newRow]);
      setNewProgressName('');
      setNewProgressPeriod('');
    }
  };

  const removeProgressRow = (id) => {
    setProgressData(progressData.filter((row) => row[0] !== id));
  };

  const addHomeworkRow = () => {
    if (newHomeworkName && newHomeworkAssignment) {
      const newRow = [
        homeworkData.length + 1,
        newHomeworkName,
        newHomeworkAssignment,
        false,
      ];
      setHomeworkData([...homeworkData, newRow]);
      setNewHomeworkName('');
      setNewHomeworkAssignment('');
    }
  };

  const toggleHomeworkCompletion = (id) => {
    setHomeworkData(
      homeworkData.map((row) =>
        row[0] === id ? [row[0], row[1], row[2], !row[3]] : row
      )
    );
  };

  const removeHomeworkRow = (id) => {
    setHomeworkData(homeworkData.filter((row) => row[0] !== id));
  }; /*삭제 추가*/

  const addSupplementRow = () => {
    if (newSupplementItem) {
      const newRow = [supplementData.length + 1, newSupplementItem];
      setSupplementData([...supplementData, newRow]);
      setNewSupplementItem('');
    }
  };

  const removeSupplementRow = (id) => {
    setSupplementData(supplementData.filter((row) => row[0] !== id));
  };

  // const addStudent = (newStudent) => {
  //   setStudents([...students, newStudent]);
  // };

  return (
    <>
      <div className="MainLayout">
        <div className="leftoption">
          <img src={logo} alt="homelogo" className="homelogo" />

          <div className="excalendar">
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
          {/* 
            <div className="ButtonContainer"> */}

          {/* </div> */}
        </div>

        <div className="right-section">
          <div className="row">
            <div className="onerow">
              <div className="Progress-container">
                {/* Progress Section */}
                <div className="Progress-section">
                  <Box text={'진도'} />
                  {/* <p className="Progress">진도</p> */}
                  <div className="Progress_table">
                    <Table
                      title=""
                      data={[
                        ...progressData.map((item) => [
                          ...item,
                          <button onClick={() => removeProgressRow(item[0])}>
                            삭제
                          </button>,
                        ]),
                        [
                          '',
                          <input
                            className="input_text"
                            type="text"
                            value={newProgressName}
                            onChange={(e) => setNewProgressName(e.target.value)}
                            placeholder="진도 내용"
                          />,
                          <input
                            className="input_num"
                            type="text"
                            value={newProgressPeriod}
                            onChange={(e) =>
                              setNewProgressPeriod(e.target.value)
                            }
                            placeholder="진도(예: p30~50)"
                          />,
                          <button onClick={addProgressRow}>추가</button>,
                        ],
                      ]}
                      columns={progressColumns}
                    />
                  </div>
                </div>
              </div>

              {/* Homework Section */}
              <div className="Homework-section">
                {/* <p className="Homework">숙제</p> */}
                <Box text={'숙제'} />
                <div className="Homework_table">
                  <Table
                    title=""
                    data={[
                      ...homeworkData.map((item) => [
                        item[0],
                        item[1],
                        item[2],
                        <input
                          className="checkbox"
                          type="checkbox"
                          checked={item[3]}
                          onChange={() => toggleHomeworkCompletion(item[0])}
                        />,
                        ,
                      ]),
                      [
                        '',
                        <input
                          className="input_text"
                          type="text"
                          value={newHomeworkName}
                          onChange={(e) => setNewHomeworkName(e.target.value)}
                          placeholder="숙제 내용"
                        />,
                        <input
                          className="input_num"
                          type="text"
                          value={newHomeworkAssignment}
                          onChange={(e) =>
                            setNewHomeworkAssignment(e.target.value)
                          }
                          placeholder="기간 (예:24.10.31)"
                        />,
                        <button onClick={addHomeworkRow}>추가</button>,
                      ],
                    ]}
                    columns={homeworkColumns}
                  />
                </div>
              </div>

              {/* Supplement Section */}
              <div className="classSupplement-container">
                <Box text={'수업 준비물'} />
                {/* <p className="classSupplement">수업 준비물</p> */}
                <div className="supplement_table">
                  <Table
                    title=""
                    data={[
                      ...supplementData.map((item) => [
                        ...item,
                        <button onClick={() => removeSupplementRow(item[0])}>
                          삭제
                        </button>,
                      ]),
                      [
                        '',
                        <input
                          className="input_text"
                          type="text"
                          value={newSupplementItem}
                          onChange={(e) => setNewSupplementItem(e.target.value)}
                          placeholder="준비물"
                        />,
                        <button
                          className="Sub_button"
                          onClick={addSupplementRow}
                        >
                          추가
                        </button>,
                      ],
                    ]}
                    columns={supplementColumns}
                  />
                </div>
              </div>
            </div>
            <div className="towrow">
              <div className="Score-container">
                <Box text={'성적결과'} />
                {/* <p className="Score">성적결과</p> */}
                <ScoreCharts barTitle="미적분 성적" lineTitle="쪽지시험 성적" />
              </div>

              <div className="Comment-container">
                <div className="Comment_box1">
                  <Box text={'메모'} />
                  {/* <p className="Comment">메모</p> */}
                  <Memo />
                </div>
              </div>
            </div>
          </div>
        </div>
        <LogoutButton />
      </div>
      {/* Student List Section */}
      

      {isModalOpen && (
        <StudentModal
          onClose={() => setIsModalOpen(false)}
          onSave={addStudent}
        />
      )}
    </>
  );
};

export default TutorManager;
