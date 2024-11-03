import './Box.css';

const Box = ({ text, type }) => {
  return <div className={`Box Box_${type}`}>{text}</div>;
};

export default Box;
