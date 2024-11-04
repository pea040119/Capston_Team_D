import React, { useState, useEffect } from 'react';
import Box from '../components/Box';
import TutorItem from '../components/TutorItem';
import TutorModal from '../components/TutorModal';
import Button from '../components/Button';
import Content from '../components/Content';
import './Student.css';

const Student = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tutors, setTutors] = useState([]);
  const addTutor = (tutor) => {
    setTutors([...tutors, tutor]);
  };
  return (
    <>
      <div className="TutorList">
        <Box text={'과외 목록'} type={'gray'} />
        {tutors.map((tutor, index) => (
          <TutorItem
            key={index}
            tutorname={tutor.tutorname}
            tutorsch={tutor.tutorsch}
            tutorsub={tutor.tutorsub}
          />
        ))}
        <Button
          onClick={() => setIsModalOpen(true)}
          className="add-tutor-button"
          text={'등록'}
          style={{ backgroundColor: '#40B3DE', color: 'white' }}
        />
      </div>

      {isModalOpen && (
        <TutorModal onClose={() => setIsModalOpen(false)} onSave={addTutor} />
      )}
    </>
  );
};

export default Student;
