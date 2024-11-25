// import React, { useState } from 'react';
// import './Memo.css';

// const Memo = () => {
//   const [memo, setMemo] = useState('');
//   const [savedMemo, setSavedMemo] = useState('');
//   const [isEditing, setIsEditing] = useState(false);

//   const handleSave = () => {
//     if (memo.trim()) {
//       setSavedMemo(memo);
//       setIsEditing(false);
//     }
//   };

//   const handleEdit = () => {
//     setMemo(savedMemo);
//     setIsEditing(true);
//   };

//   return (
//     <div className="memo-container">
//       <textarea
//         type="text"
//         className="memo-input"
//         placeholder="메모를 입력하세요."
//         value={isEditing ? memo : savedMemo}
//         onChange={(e) => setMemo(e.target.value)}
//       />
//       <div className="memobutton">
//         {!isEditing && savedMemo && <button onClick={handleEdit}>수정</button>}{' '}
//         {/* 수정 버튼 */}
//         {isEditing ? (
//           <button onClick={handleSave}>저장</button>
//         ) : (
//           <button onClick={handleSave} disabled={!memo.trim()}>
//             저장
//           </button>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Memo;
import React, { useState, useEffect } from 'react';
import './Memo.css';

const Memo = () => {
  // Load the saved memo from localStorage or default to an empty string
  const [memo, setMemo] = useState('');
  const [savedMemo, setSavedMemo] = useState('');

  // Load saved memo when the component mounts
  useEffect(() => {
    const storedMemo = localStorage.getItem('memo');
    if (storedMemo) {
      setSavedMemo(storedMemo);
      setMemo(storedMemo);
    }
  }, []);

  // Save the memo to localStorage when saved (even if empty)
  const handleSave = () => {
    setSavedMemo(memo);
    localStorage.setItem('memo', memo); // Store in localStorage, even if it's empty
  };

  // Handle edit mode (optional, to allow clearing the saved memo)
  const handleEdit = () => {
    setMemo(savedMemo); // Load saved memo to be edited
  };

  return (
    <div className="memo-container">
      {savedMemo !== '' && <p> {savedMemo}</p>}{' '}
      <textarea
        type="text"
        className="memo-input"
        placeholder="메모를 입력하세요."
        value={memo}
        onChange={(e) => setMemo(e.target.value)} // Allow editing at all times
      />
      <div className="memobutton">
        <button onClick={handleSave}>저장</button>
        {/* <button onClick={handleEdit}>수정</button> */}
      </div>
      {/* Show saved memo */}
    </div>
  );
};

export default Memo;
