import React, { useState } from 'react';
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

const TutorManager = () => {
  const [progressData, setProgressData] = useState([]);
  const [homeworkData, setHomeworkData] = useState([]);
  const [supplementData, setSupplementData] = useState([]);
  const [newProgressName, setNewProgressName] = useState('');
  const [newProgressPeriod, setNewProgressPeriod] = useState('');
  const [newHomeworkName, setNewHomeworkName] = useState('');
  const [newHomeworkAssignment, setNewHomeworkAssignment] = useState('');
  const [newSupplementItem, setNewSupplementItem] = useState('');

  const [students, setStudents] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const progressColumns = ['#', '내용', '진도', ''];
  const homeworkColumns = ['#', '숙제', '기간', ''];
  const supplementColumns = ['#', '준비물', ''];

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

  const addStudent = (newStudent) => {
    setStudents([...students, newStudent]);
  };

  return (
    <div className="Progress-container" style={{ padding: '20px' }}>
      {/* Progress Section */}
      <div className="Progress-section">
        <p className="Progress">진도</p>
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
                  onChange={(e) => setNewProgressPeriod(e.target.value)}
                  placeholder="진도(예: p30~50)"
                />,
                <button onClick={addProgressRow}>추가</button>,
              ],
            ]}
            columns={progressColumns}
          />
        </div>
      </div>

      {/* Homework Section */}
      <div className="Homework-section">
        <p className="Homework">숙제</p>
        <div className="Homework_table">
          <Table
            title=""
            data={[
              ...homeworkData.map((item) => [
                item[0],
                item[1],
                item[2],
                <input
                  type="checkbox"
                  checked={item[3]}
                  onChange={() => toggleHomeworkCompletion(item[0])}
                />,
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
                  onChange={(e) => setNewHomeworkAssignment(e.target.value)}
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
        <p className="classSupplement">수업 준비물</p>
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
                <button className="Sub_button" onClick={addSupplementRow}>
                  추가
                </button>,
              ],
            ]}
            columns={supplementColumns}
          />
        </div>
      </div>

      <div className="Score-container">
        <p className="Score">성적결과</p>
        <ScoreCharts barTitle="미적분 성적" lineTitle="쪽지시험 성적" />
      </div>

      <div className="Comment-container">
        <div className="Comment_box1"></div>
        <p className="Comment">메모</p>
        <Memo />
      </div>

      {/* Student List Section */}
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

      {/* Student Modal for adding new students */}
      {isModalOpen && (
        <StudentModal
          onClose={() => setIsModalOpen(false)}
          onSave={addStudent}
        />
      )}
    </div>
  );
};

export default TutorManager;