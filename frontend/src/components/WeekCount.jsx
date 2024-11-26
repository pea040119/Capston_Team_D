import React from 'react';

const WeekCount = ({
  weeklyClassCount,
  completedClassCount,
  remainingClassCount,
}) => {
  return (
    <div className="week-count-summary">
      <p
        style={{
          fontSize: '20px',
          color: '#40b3d2',
          textAlign: 'center',
        }}
      >
        예정 수업 횟수{' '}
        <span style={{ color: '#6E6E6E' }}>{weeklyClassCount}회</span>
      </p>

      <p
        style={{
          fontSize: '20px',
          color: '#40b3d2',
          textAlign: 'center',
        }}
      >
        진행 수업 횟수{' '}
        <span style={{ color: '#31B404' }}>{completedClassCount}회</span>
      </p>

      <p
        style={{
          fontSize: '20px',
          color: '#40b3d2',
          fontWeight: 'bold',
          textAlign: 'center',
        }}
      >
        잔여 수업 횟수{' '}
        <span style={{ color: '#FE2E2E' }}>{remainingClassCount}회</span>
      </p>
    </div>
  );
};

export default WeekCount;
