import './Content.css';

const Content = ({ time, name, subject, type, onMove }) => {
  return (
    <div
      className={`Content Content_${type}`}
      onClick={() => onMove(time, name)}
    >
      <div className="time">{time}</div>
      <div className="name-subject-container">
        <div className="name">{name}</div>
        <div className="subject">{subject}</div>
      </div>
    </div>
  );
};

export default Content;
