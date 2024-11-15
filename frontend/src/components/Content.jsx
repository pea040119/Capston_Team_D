import './Content.css';
const colors = ['#94d2e4', '#e9eff0', '#f0a1a1', '#f0f1b3'];

const Content = ({ time, name, onMove, index }) => {
  const backgroundColor = colors[index % colors.length];

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
