import './Content.css';

const Content = ({ time, name, onMove, type }) => {
  const backgroundColor = 
  type === 'today' ? '#94D2E4' : 
  type === 'canceled' ? '#EF74766E' : 
  type === 'makeup' ? '#6AC995' : 
  '#e9eff0'; // 기본값


  return (
    <div className="Content" style={{ backgroundColor }}>
      <div className="time">{time}</div>
      <div className="name-subject-container">
        <div className="name">{name}</div>
      </div>
    </div>
  );
};


export default Content;