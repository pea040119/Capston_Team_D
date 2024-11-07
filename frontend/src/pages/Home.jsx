import { useState, useRef, useEffect } from 'react';
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

  const onClickLogin = () => {
    nav('/login');
  };

  const onClickSignup = () => {
    nav('/signup');
  };

  const texts = [
    '나만의 수업을\n관리하세요.',
    '편리한 일정 공유.\n동기화 된 일정.',
    '나만을 위한\n분석리포트.',
    '과외에 대한\n편한 매니지먼트.',
  ];

  const images = [home1, home2, home3, home4];

  // 각 텍스트와 이미지 섹션을 참조할 배열 생성
  const sectionsRef = useRef([]);
  const [visibleSections, setVisibleSections] = useState([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = sectionsRef.current.indexOf(entry.target);
            setVisibleSections((prevVisibleSections) =>
              prevVisibleSections.includes(index)
                ? prevVisibleSections
                : [...prevVisibleSections, index]
            );
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px' }
    );

    sectionsRef.current.forEach((section) => {
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div>
      <img src={logo} alt="logo" className="logo" />
      <div className="home-container">
        <Button
          text={'로그인'}
          onClick={onClickLogin}
          style={{ backgroundColor: '#40B3DE', color: 'white' }}
        />
        <Button
          text={'회원가입'}
          onClick={onClickSignup}
          style={{ backgroundColor: '#e9eff0', color: '#40B3DE' }}
        />
      </div>

      <div className="scroll-container">
        {texts.map((text, index) => (
          <div
            key={index}
            ref={(el) => (sectionsRef.current[index] = el)}
            className={`scroll-item ${visibleSections.includes(index) ? 'visible' : ''}`}
          >
            <div className="left-text">
              {text}
            </div>

            <img src={images[index]} alt={`home${index + 1}`} className="center-left-image" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
