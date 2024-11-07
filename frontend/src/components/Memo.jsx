import React, { useState } from 'react';
import './Memo.css';

const Memo = () => {
  const [memo, setMemo] = useState('');
  const [savedMemo, setSavedMemo] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  const handleSave = () => {
    if (memo.trim()) {
      setSavedMemo(memo);
      setIsEditing(false);
    }
  };

  const handleEdit = () => {
    setMemo(savedMemo);
    setIsEditing(true);
  };

  return (
    <div className="memo-container">
      <textarea
        type="text"
        className="memo-input"
        placeholder="메모를 입력하세요."
        value={isEditing ? memo : savedMemo}
        onChange={(e) => setMemo(e.target.value)}
      />
      <div className="button">
        {!isEditing && savedMemo && <button onClick={handleEdit}>수정</button>}{' '}
        {/* 수정 버튼 */}
        {isEditing ? (
          <button onClick={handleSave}>저장</button>
        ) : (
          <button onClick={handleSave} disabled={!memo.trim()}>
            저장
          </button>
        )}
      </div>
    </div>
  );
};

export default Memo;
