import { Routes, Route } from 'react-router-dom';
import { UserProvider } from './context/UserContext';
import Home from './pages/Home.jsx';
import Login from './pages/Login.jsx';
import Tutor from './pages/Tutor.jsx';
import Student from './pages/Student.jsx';
import Parents from './pages/Parents.jsx';
import Header from './components/Header.jsx';
import TutorManager from './pages/TutorManager.jsx';
import Signup from './pages/Signup.jsx';
import StudentManager from './pages/StudentManager.jsx';
import TutorCalendar from './pages/TutorCalendar.jsx';
import StudentCalendar from './pages/StudentCalendar.jsx';

function App() {
  return (
    <UserProvider>  
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/TutorManager/:id" element={<TutorManager />} />
        <Route path="/tutor" element={<Tutor />} />
        <Route path="/student" element={<Student />} />
        <Route path="/studentmanager/:id" element={<StudentManager />} />
        <Route path="/parents" element={<Parents />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/tutorcalendar" element={<TutorCalendar />} />
        <Route path="/studentcalendar" element={<StudentCalendar />} />
      </Routes>
    </UserProvider>
  );
}

export default App;
