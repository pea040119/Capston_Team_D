import React, { useState, useEffect } from 'react';
import './WeekPopup.css';

const WeekPopup = ({ student, date, onClose, onSave }) => {
  const [progress, setProgress] = useState(student?.progress || '');
  const [lastprogress, setLastprogress] = useState(student?.lastprogress || '');
  const [parentMessage, setParentMessage] = useState(
    student?.parentMessage || ''
  );
  const [examResults, setExamResults] = useState(
    student?.examResults || { wordTest: '', mockExam: '', dictation: '' }
  );
  const [assignment, setAssignment] = useState(student?.assignment || '');

  useEffect(() => {
    if (student) {
      setLastprogress(student.lastprogress || '');
      setProgress(student.progress || '');
      setParentMessage(student.parentMessage || '');
      setExamResults(
        student.examResults || { wordTest: '', mockExam: '', dictation: '' }
      );
      setAssignment(student.assignment || '');
    }
  }, [student]);

  const handleSave = () => {
    const updatedStudent = {
      ...student,
      lastprogress,
      progress,
      parentMessage,
      examResults,
      assignment,
    };
    onSave(updatedStudent);
    onClose();
  };

  return (
    <div className="progress-popup">
      <div className="popup-header">
        {/* 학생 이름, 과목, 날짜 */}
        <h3>
          {student?.name} {student?.subject}
        </h3>
        <p>{date}</p>
      </div>
      <div className="pop-container">
        <div className="leftmemo">
          <h4>지난수업요약</h4>
          <textarea
            value={lastprogress}
            style={{
              height: '450px',
              backgroundColor: 'rgba(233, 239, 240, 100)',
              border: '8px solid #C8E2E9',
              borderRadius: '20px',
            }}
            onChange={(e) => setLastprogress(e.target.value)} // lastprogress만 업데이트
            placeholder="지난수업"
          />
        </div>
        <div className="rightmemo">
          <div className="popup-body">
            <h4>오늘의 수업</h4>
            <textarea
              value={progress}
              style={{
                height: '100px',
                width: '500px',
                backgroundColor: 'rgba(255, 255, 255, 255)',
                border: '1px solid #cccccc',
                borderRadius: '10px',
              }}
              onChange={(e) => setProgress(e.target.value)} // progress만 업데이트
              placeholder="오늘의 수업 내용을 입력하세요."
            />
            <h4>학부모에게</h4>

            <textarea
              value={parentMessage}
              style={{
                height: '80px',
                width: '500px',
                backgroundColor: 'rgba(255, 255, 255, 255)',
                border: '1px solid #cccccc',
                borderRadius: '10px',
              }}
              onChange={(e) => setParentMessage(e.target.value)}
              placeholder="학부모에게 보낼 내용을 입력하세요."
            />
            <div className="bottommemo">
              <div className="exam-results">
                <h4>오늘의 시험 결과</h4>
                <div className="exam-item">
                  <label>단어시험</label>
                  <input
                    type="text"
                    style={{
                      width: '100px',
                      height: '20px',
                      border: '1px solid #cccccc',
                    }}
                    value={examResults.wordTest}
                    onChange={(e) =>
                      setExamResults({
                        ...examResults,
                        wordTest: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="exam-item">
                  <label>모의고사</label>
                  <input
                    type="text"
                    style={{
                      width: '100px',
                      height: '20px',
                      border: '1px solid #cccccc',
                    }}
                    value={examResults.mockExam}
                    onChange={(e) =>
                      setExamResults({
                        ...examResults,
                        mockExam: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="exam-item">
                  <label>쪽지시험</label>
                  <input
                    type="text"
                    style={{
                      width: '100px',
                      height: '20px',
                      border: '1px solid #cccccc',
                    }}
                    value={examResults.dictation}
                    onChange={(e) =>
                      setExamResults({
                        ...examResults,
                        dictation: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
              <div className="todayhomework">
                <h4>오늘의 과제</h4>
                <textarea
                  value={assignment}
                  style={{
                    height: '120px',
                    width: '290px',
                    backgroundColor: 'rgba(255, 255, 255, 255)',
                    border: '1px solid #cccccc',
                    borderRadius: '10px',
                  }}
                  onChange={(e) => setAssignment(e.target.value)}
                  placeholder="오늘의 과제를 입력하세요."
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="popup-footer">
        <button
          style={{
            color: 'rgba(255,255,255,255)',
            backgroundColor: 'rgba(64, 179, 210, 1)',
          }}
          onClick={handleSave}
        >
          저장
        </button>
        <button
          style={{
            color: 'rgba(255,255,255,255)',
            backgroundColor: 'rgba(239, 116, 118, 0.43)',
          }}
          onClick={onClose}
        >
          취소
        </button>
      </div>
    </div>
  );
};

export default WeekPopup;

// // export default WeekPopup;
// import React, { useState, useEffect } from 'react';
// import './WeekPopup.css';

// const WeekPopup = ({ student, date, onClose, onSave }) => {
//   const [progress, setProgress] = useState(student?.progress || '');
//   const [parentMessage, setParentMessage] = useState(
//     student?.parentMessage || ''
//   );
//   const [examResults, setExamResults] = useState(
//     student?.examResults || { wordTest: '', mockExam: '', dictation: '' }
//   );
//   const [assignment, setAssignment] = useState(student?.assignment || '');

//   useEffect(() => {
//     if (student) {
//       setProgress(student.progress || '');
//       setParentMessage(student.parentMessage || '');
//       setExamResults(
//         student.examResults || { wordTest: '', mockExam: '', dictation: '' }
//       );
//       setAssignment(student.assignment || '');
//     }
//   }, [student]);

//   const handleSave = () => {
//     const updatedStudent = {
//       ...student,
//       progress,
//       parentMessage,
//       examResults,
//       assignment,
//     };
//     onSave(updatedStudent);
//     onClose();
//   };

//   return (
//     <div className="progress-popup">
//       <div className="popup-header">
//         {/* 학생 이름, 과목, 날짜 */}
//         <h3>
//           {student?.name} - {student?.subject}
//         </h3>
//         <p>{date}</p> {/* 날짜 출력 */}
//       </div>
//       <div className="popup-body">
//         <h4>오늘의 수업</h4>
//         <textarea
//           value={progress}
//           onChange={(e) => setProgress(e.target.value)}
//           placeholder="오늘의 수업 내용을 입력하세요."
//         />
//         <h4>학부모에게</h4>
//         <textarea
//           value={parentMessage}
//           onChange={(e) => setParentMessage(e.target.value)}
//           placeholder="학부모에게 보낼 내용을 입력하세요."
//         />
//         <h4>오늘의 시험 결과</h4>
//         <div className="exam-results">
//           <label>단어 시험</label>
//           <input
//             type="text"
//             value={examResults.wordTest}
//             onChange={(e) =>
//               setExamResults({ ...examResults, wordTest: e.target.value })
//             }
//           />
//           <label>모의고사</label>
//           <input
//             type="text"
//             value={examResults.mockExam}
//             onChange={(e) =>
//               setExamResults({ ...examResults, mockExam: e.target.value })
//             }
//           />
//           <label>받아쓰기</label>
//           <input
//             type="text"
//             value={examResults.dictation}
//             onChange={(e) =>
//               setExamResults({ ...examResults, dictation: e.target.value })
//             }
//           />
//         </div>
//         <h4>오늘의 과제</h4>
//         <textarea
//           value={assignment}
//           onChange={(e) => setAssignment(e.target.value)}
//           placeholder="오늘의 과제를 입력하세요."
//         />
//       </div>
//       <div className="popup-footer">
//         <button onClick={handleSave}>저장</button>
//         <button onClick={onClose}>취소</button>
//       </div>
//     </div>
//   );
// };

// export default WeekPopup;
