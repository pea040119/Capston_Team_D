import './Content.css';

const Content = ({ time, name, type }) => {
  return (
    <div className={`Content Content_${type}`}>
      <div className="time">{time}</div>
      <div className="name">{name}</div>
    </div>
  );
};

export default Content;
