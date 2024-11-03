import { useState } from 'react';
import './App.css';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Home from './pages/Home.jsx';
import Login from './pages/Login.jsx';
import Tutor from './pages/Tutor.jsx';
import Student from './pages/Student.jsx';
import Parents from './pages/Parents.jsx';
import Header from './components/Header.jsx';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />

        <Route path="/tutor" element={<Tutor />} />
        <Route path="/student" element={<Student />} />
        <Route path="/parents" element={<Parents />} />
      </Routes>
    </>
  );
}

export default App;
