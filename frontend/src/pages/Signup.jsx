// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import './Signup.css';
// import kakaoLogo from '../img/kakao.png';
// import naverLogo from '../img/naver.png';
// import googleLogo from '../img/google.png';
// import logo from '../img/logo.png';

// const Signup = () => {
//   const [role, setRole] = useState('teacher');
//   const [email, setEmail] = useState('');
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const isButtonDisabled = email === '' || username === '' || password === '';

//   const onClickLogin = () => {
//     navigate('/login');
//   };

//   const navigate = useNavigate();

//   // const handleSubmit = (e) => {
//   //   e.preventDefault();

//   //   console.log('이메일:', email);
//   //   console.log('아이디:', username);
//   //   console.log('비밀번호:', password);
//   //   // API 호출

//   //   if (role === 'teacher') {
//   //     navigate('/tutor');
//   //   } else if (role === 'student') {
//   //     navigate('/student');
//   //   } else if (role === 'parent') {
//   //     navigate('/parents');
//   //   }
//   // };
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const payload = {
//       login_id: loginId,
//       login_pw: loginPw,
//       name: name,
//       role: role,
//     };

//     try {
//       const response = await axios.post('http://127.0.0.1:8000/signup/', payload);
//       console.log('Signup successful:', response.data);
//     } catch (error) {
//       console.error('Signup failed:', error.response ? error.response.data : error.message);
//     }
//   };

//   const handleImageClick = (platform) => {
//     console.log(`${platform} 회원가입 클릭!`);
//   };

//   return (
//     <div className="signup-container">
//       <header className="signup-header">
//         <h1 className="signup-header-title">올인과외</h1>
//         <img src={logo} alt="로고" className="signup-logo" />
//       </header>

//       <div className="signup-role-tabs">
//         <button
//           className={`signup-role-tab ${role === 'teacher' ? 'active' : ''}`}
//           onClick={() => setRole('teacher')}
//         >
//           선생님
//         </button>
//         <button
//           className={`signup-role-tab ${role === 'student' ? 'active' : ''}`}
//           onClick={() => setRole('student')}
//         >
//           학생
//         </button>
//         <button
//           className={`signup-role-tab ${role === 'parent' ? 'active' : ''}`}
//           onClick={() => setRole('parent')}
//         >
//           학부모
//         </button>
//       </div>

//       <form className="signup-form" onSubmit={handleSubmit}>
//         <input
//           type="email"
//           placeholder="이메일"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           required
//         />
//         <input
//           type="text"
//           placeholder="아이디"
//           value={username}
//           onChange={(e) => setUsername(e.target.value)}
//           required
//         />
//         <input
//           type="password"
//           placeholder="비밀번호"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           required
//         />
//         <div className="signup-button-container">
//           <button
//             type="submit"
//             className="signup-button"
//             disabled={isButtonDisabled}
//           >
//             회원가입
//           </button>
//         </div>
//       </form>

//       <div className="signup-gologin">
//         <p onClick={onClickLogin} style={{ cursor: 'pointer' }}>
//           Login
//         </p>
//       </div>
//       <div className="signup-alternative-login">
//         <p>다음으로 회원가입하기</p>
//         <SignupImageGallery handleImageClick={handleImageClick} />
//       </div>
//     </div>
//   );
// };

// const SignupImageGallery = ({ handleImageClick }) => {
//   return (
//     <div className="signup-icons">
//       <img
//         src={kakaoLogo}
//         alt="Kakao"
//         className="signup-icon"
//         onClick={() => handleImageClick('Kakao')}
//         style={{ cursor: 'pointer' }}
//       />
//       <img
//         src={naverLogo}
//         alt="Naver"
//         className="signup-icon"
//         onClick={() => handleImageClick('Naver')}
//         style={{ cursor: 'pointer' }}
//       />
//       <img
//         src={googleLogo}
//         alt="Google"
//         className="signup-icon"
//         onClick={() => handleImageClick('Google')}
//         style={{ cursor: 'pointer' }}
//       />
//     </div>
//   );
// };

// export default Signup;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Signup.css';
import kakaoLogo from '../img/kakao.png';
import naverLogo from '../img/naver.png';
import googleLogo from '../img/google.png';
import logo from '../img/logo.png';
import axios from 'axios'; // axios import 추가

const Signup = () => {
  const [role, setRole] = useState('teacher');
  const [loginId, setLoginId] = useState(''); // 아이디 상태 추가
  const [loginPw, setLoginPw] = useState(''); // 비밀번호 상태 추가
  const [name, setName] = useState(''); // 이름 상태 추가

  const isButtonDisabled = loginId === '' || loginPw === '' || name === '';

  const navigate = useNavigate();

  const onClickLogin = () => {
    navigate('/login');
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   const payload = {
  //     login_id: loginId,
  //     login_pw: loginPw,
  //     name: name,
  //     role: role,
  //   };
  //   console.log("회원가입 요청 데이터:", payload);  // 요청 데이터 출력

  //   try {
  //     const response = await axios.post('http://127.0.0.1:8000/signup/', payload);
  //     console.log('Signup successful:', response.data);
  //     // 회원가입 성공 후 화면 이동
  //     navigate('/login');  // 예시: 로그인 페이지로 이동
  //   } catch (error) {
  //     console.error('Signup failed:', error.response ? error.response.data : error.message);
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("회원가입 요청 시작");  // 로그 추가
  
    const payload = {
      login_id: loginId,
      login_pw: loginPw,
      name: name,  // 이름은 실제로 username으로 설정하였는지 확인
      role: role,
    };
  
    console.log("회원가입 요청 데이터:", payload);  // 요청 데이터 출력
  
    try {
      const response = await axios.post('http://127.0.0.1:8000/signup/', payload);
      console.log('회원가입 성공:', response.data);  // 성공 로그
      navigate('/login');  // 로그인 페이지로 이동
    } catch (error) {
      console.error('회원가입 실패:', error.response ? error.response.data : error.message);
    }
  };
  

  const handleImageClick = (platform) => {
    console.log(`${platform} 회원가입 클릭!`);
  };

  return (
    <div className="signup-container">
      <header className="signup-header">
        <h1 className="signup-header-title">올인과외</h1>
        <img src={logo} alt="로고" className="signup-logo" />
      </header>

      <div className="signup-role-tabs">
        <button
          className={`signup-role-tab ${role === 'teacher' ? 'active' : ''}`}
          onClick={() => setRole('teacher')}
        >
          선생님
        </button>
        <button
          className={`signup-role-tab ${role === 'student' ? 'active' : ''}`}
          onClick={() => setRole('student')}
        >
          학생
        </button>
        <button
          className={`signup-role-tab ${role === 'parent' ? 'active' : ''}`}
          onClick={() => setRole('parent')}
        >
          학부모
        </button>
      </div>

      <form className="signup-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="아이디"
          value={loginId}
          onChange={(e) => setLoginId(e.target.value)} // 아이디 상태 업데이트
          required
        />
        <input
          type="password"
          placeholder="비밀번호"
          value={loginPw}
          onChange={(e) => setLoginPw(e.target.value)} // 비밀번호 상태 업데이트
          required
        />
        <input
          type="text"
          placeholder="이름"
          value={name}
          onChange={(e) => setName(e.target.value)} // 이름 상태 업데이트
          required
        />
        <div className="signup-button-container">
          <button
            type="submit"
            className="signup-button"
            disabled={isButtonDisabled}
          >
            회원가입
          </button>
        </div>
      </form>

      <div className="signup-gologin">
        <p onClick={onClickLogin} style={{ cursor: 'pointer' }}>
          Login
        </p>
      </div>
      <div className="signup-alternative-login">
        <p>다음으로 회원가입하기</p>
        <SignupImageGallery handleImageClick={handleImageClick} />
      </div>
    </div>
  );
};

const SignupImageGallery = ({ handleImageClick }) => {
  return (
    <div className="signup-icons">
      <img
        src={kakaoLogo}
        alt="Kakao"
        className="signup-icon"
        onClick={() => handleImageClick('Kakao')}
        style={{ cursor: 'pointer' }}
      />
      <img
        src={naverLogo}
        alt="Naver"
        className="signup-icon"
        onClick={() => handleImageClick('Naver')}
        style={{ cursor: 'pointer' }}
      />
      <img
        src={googleLogo}
        alt="Google"
        className="signup-icon"
        onClick={() => handleImageClick('Google')}
        style={{ cursor: 'pointer' }}
      />
    </div>
  );
};

export default Signup;
