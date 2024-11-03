import './Button.css';
const Button = ({ text, style, onClick }) => {
  return (
    <button onClick={onClick} className="Button" style={style}>
      {text}
    </button>
  );
};

export default Button;
