import { useState } from 'react';
import './App.css';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Home from './pages/Home.jsx';
import Login from './pages/Login.jsx';
import Tutor from './pages/Tutor.jsx';
import Tutor2 from './pages/Tutor2.jsx';
import Student2 from './pages/Student2.jsx';
import Parents from './pages/Parents.jsx';
import Header from './components/Header.jsx';
import TutorManager from './pages/TutorManager.jsx';
import Signup from './pages/Signup.jsx';
import StudentManager from './pages/StudentManager.jsx';
import TutorCalendar from './pages/TutorCalendar.jsx';
function App() {
  return (
    <>
      <Header /> {}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/TutorManager/:id" element={<TutorManager />} />
        <Route path="/tutor" element={<Tutor2 />} />
        {/* <Route path="/student" element={<Student />} /> */}
        <Route path="/student" element={<Student2 />} />
        <Route path="/studentmanager/:id" element={<StudentManager />} />
        <Route path="/parents" element={<Parents />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="tutorcalendar" element={<TutorCalendar />} />
      </Routes>
    </>
  );
}

export default App;
