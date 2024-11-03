import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import logo from '../img/logo.png';
import home1 from '../img/home1.png';
import home2 from '../img/home2.png';
import home3 from '../img/home3.png';
import home4 from '../img/home4.png';
import './Home.css';

const Home = () => {
  const nav = useNavigate();
  const onClickButton = () => {
    nav('/login');
  };

  // 상태 변수로 텍스트와 이미지를 관리
  const [contentIndex, setContentIndex] = useState(0);

  const texts = [
    '나만의 수업을\n관리하세요.',
    '편리한 일정 공유.\n동기화 된 일정.',
    '나만을 위한\n분석리포트.',
    '과외에 대한\n편한 매니지먼트.',
  ];

  const images = [home1, home2, home3, home4];

  // 마우스 휠 이벤트 핸들러
  const handleWheel = (event) => {
    if (event.deltaY > 0) {
      // 휠을 아래로 내릴 때
      setContentIndex((prevIndex) =>
        prevIndex < texts.length - 1 ? prevIndex + 1 : prevIndex
      );
    } else {
      // 휠을 위로 올릴 때
      setContentIndex((prevIndex) =>
        prevIndex > 0 ? prevIndex - 1 : prevIndex
      );
    }
  };

  return (
    <div onWheel={handleWheel}>
      {' '}
      {/* 마우스 휠 이벤트 추가 */}
      <img src={logo} alt="logo" className="logo" />
      <div className="home-container">
        <Button
          text={'로그인'}
          onClick={onClickButton}
          style={{ backgroundColor: '#40B3DE', color: 'white' }}
        />
        <Button
          text={'회원가입'}
          style={{ backgroundColor: '#e9eff0', color: '#40B3DE' }}
        />
      </div>
      <div className="centered-text">
        {texts[contentIndex].split('\n').map((line, index) => (
          <span key={index}>
            {line}
            <br />
          </span>
        ))}
      </div>
      <img
        src={images[contentIndex]}
        alt="home"
        className="center-left-image"
      />
    </div>
  );
};

export default Home;
