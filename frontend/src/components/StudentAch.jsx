import React, { useState } from 'react';
import './StudentAch.css';
import Box from './Box.jsx';

const StudentAch = () => {
  const [achievements, setAchievements] = useState([]);
  const [newAchievement, setNewAchievement] = useState('');

  const handleInputChange = (e) => {
    setNewAchievement(e.target.value);
  };

  const handleAddAchievement = () => {
    if (newAchievement.trim() !== '') {
      setAchievements([...achievements, newAchievement]);
      setNewAchievement('');
    }
  };

  const handleDeleteAchievement = (index) => {
    setAchievements(achievements.filter((_, i) => i !== index));
  };

  return (
    <div className="student-ach">
      <Box text="이달의 주요 성과"></Box>
      <ul className="ach-list">
        {achievements.map((ach, index) => (
          <li key={index} className="ach-item">
            {ach}
            <button
              className="delete-button"
              onClick={() => handleDeleteAchievement(index)}
            >
              삭제
            </button>
          </li>
        ))}
      </ul>
      <div className="input-section">
        <input
          type="text"
          placeholder="성과를 입력하세요"
          value={newAchievement}
          onChange={handleInputChange}
          className="ach-input"
        />
        <button onClick={handleAddAchievement} className="ach-add-button">
          추가
        </button>
      </div>
    </div>
  );
};

export default StudentAch;
