import React, { useState, useEffect } from 'react';
import Table from '../components/Table.jsx';
import './TutorManager.css';
import { useNavigate } from 'react-router-dom';
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
  const navigate = useNavigate();
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
      loadSupplements(); // tutorId가 설정되면 준비물 목록 로드
      loadHomeworks(); // tutorId가 설정되면 숙제 목록 로드
      loadProgress(); // tutorId가 설정되면 진도 목록 로드

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

  const loadSupplements = async () => {
    try {
      console.log('튜터 ID:', tutorId);
      const response = await axios.get(
        `http://127.0.0.1:8000/tutor/get_supplements/${tutorId}/`
      );
  
      console.log('준비물 데이터:', response.data);
      if (Array.isArray(response.data.supplements)) {
        setSupplementData(
          response.data.supplements.map((item, index) => ({
            id: index + 1,
            name: item.name,
          }))
        );
      } else {
        setSupplementData([]); // supplements가 배열이 아닐 경우 빈 배열로 설정
      }
    } catch (error) {
      console.error('준비물 목록 로딩 실패:', error);
    }
  };
  

  const loadHomeworks = async () => {
    try {
      console.log('튜터 ID:', tutorId);
      const response = await axios.get(
        `http://127.0.0.1:8000/tutor/get_homeworks/${tutorId}/`
      );
      console.log('숙제 데이터:', response.data);
      if (Array.isArray(response.data.homeworks)) {
        setHomeworkData(
          response.data.homeworks.map((item, index) => ({
            id: index + 1,
            name: item.name,
            assignment: item.assignment,
            completed: false, // 기본적으로 completed 속성을 추가
          }))
        );
      } else {
        setHomeworkData([]); // homeworks가 배열이 아닐 경우 빈 배열로 설정
      }
    } catch (error) {
      console.error('숙제 목록 로딩 실패:', error);
    }
  };
  

  const loadProgress = async () => {
  try {
    console.log('튜터 ID:', tutorId);
    const response = await axios.get(
      `http://127.0.0.1:8000/tutor/get_progress/${tutorId}/`
    );
    console.log('진도 데이터:', response.data);
    if (Array.isArray(response.data.progress)) {
      setProgressData(
        response.data.progress.map((item, index) => ({
          id: index + 1,
          name: item.name,
          period: item.period,
        }))
      );
    } else {
      setProgressData([]); // progress가 배열이 아닐 경우 빈 배열로 설정
    }
  } catch (error) {
    console.error('진도 목록 로딩 실패:', error);
  }
};


  const addProgressRow = async() => {
    if (newProgressName && newProgressPeriod) {
      console.log(tutorId, newProgressName, newProgressPeriod);
      try {
        const response = await axios.post(
         `http://127.0.0.1:8000/tutor/add_progress/${tutorId}/`,
          {
            tutor_id: tutorId,
            name: newProgressName,
            period: newProgressPeriod,
          }
        );
        console.log('숙제 추가 응답:', response.data);
      } catch (error) {
        console.error('숙제 추가 실패:', error);
      }

      const newRow = [
        progressData.length + 1,
        newProgressName,
        newProgressPeriod,
      ];
      console.log('newRow:', newRow);
      console.log('progressData:', progressData);
      setProgressData([...progressData, newRow]);
      console.log('progressData:', progressData);
      setNewProgressName('');
      setNewProgressPeriod('');
      window.location.reload();
    }
  };

  const removeProgressRow = async(name) => {
    try {
      const response = await axios.post(
        `http://127.0.0.1:8000/tutor/delete_progress/${tutorId}/`,
        {
          tutor_id: tutorId,
          name: name,
        }
      );
      console.log('숙제 삭제 응답:', response.data);
    } catch (error) {
      console.error('숙제 삭제 실패:', error);
    }
    window.location.reload();
  };

  const addHomeworkRow = async () => {
    if (newHomeworkName && newHomeworkAssignment) {
      try {
        const response = await axios.post(
          `http://127.0.0.1:8000/tutor/add_homework/${tutorId}/`,
          {
            tutor_id: tutorId,
            name: newHomeworkName,
            assignment: newHomeworkAssignment,
          }
        );
        console.log('숙제 추가 응답:', response.data);
      } catch (error) {
        console.error('숙제 추가 실패:', error);
      }
      const newRow = [
        homeworkData.length + 1,
        newHomeworkName,
        newHomeworkAssignment,
        false,
      ];
      setHomeworkData([...homeworkData, newRow]);
      setNewHomeworkName('');
      setNewHomeworkAssignment('');
      window.location.reload();
    }
  };

  const toggleHomeworkCompletion = (id) => {
    setHomeworkData(
      homeworkData.map((row) =>
        row[0] === id ? [row[0], row[1], row[2], !row[3]] : row
      )
    );
  };

  const removeHomeworkRow = async(name) => {
    try {
      const response = await axios.post(
        `http://127.0.0.1:8000/tutor/delete_homework/${tutorId}/`,
        {
          tutor_id: tutorId,
          name: name,
        }
      );
      console.log('숙제 삭제 응답:', response.data);
    } catch (error) {
      console.error('숙제 삭제 실패:', error);
    }
    window.location.reload();
  }; /*삭제 추가*/

  const addSupplementRow = async() => {
    if (newSupplementItem) {
      try {
        const response = await axios.post(
          `http://127.0.0.1:8000/tutor/add_supplement/${tutorId}/`,
          {
            tutor_id: tutorId,
            name: newSupplementItem,
          }
        );
        console.log('숙제 추가 응답:', response.data);
      } catch (error) {
        console.error('숙제 추가 실패:', error);
      }
      const newRow = [supplementData.length + 1, newSupplementItem];
      setSupplementData([...supplementData, newRow]);
      setNewSupplementItem('');
      window.location.reload();
    }
  };

  const removeSupplementRow = async(name) => {
    try {
      const response = await axios.post(
        `http://127.0.0.1:8000/tutor/delete_supplement/${tutorId}/`,
        {
          tutor_id: tutorId,
          name: name,
        }
      );
      console.log('숙제 삭제 응답:', response.data);
    } catch (error) {
      console.error('숙제 삭제 실패:', error);
    }
    window.location.reload();
  };

  // const addStudent = (newStudent) => {
  //   setStudents([...students, newStudent]);
  // };

  return (
    <>
      <div className="MainLayout">
        <div className="leftoption">
          <img
            src={logo}
            alt="homelogo"
            className="homelogo"
            onClick={() => navigate('/tutor')}
          />

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
                         item.id,
                         item.name,
                         item.period,
                         <button onClick={() => removeSupplementRow(item.name)}>삭제</button>,
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
                        item.id,
                        item.name,
                        item.assignment,
                        <button onClick={() => removeHomeworkRow(item.name)}>삭제</button>,
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
                        item.id,
                        item.name,
                        <button onClick={() => removeSupplementRow(item.name)}>삭제</button>,
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
                        <button className="Sub_button" onClick={addSupplementRow}>
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
