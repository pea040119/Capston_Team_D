import './Cbutton.css';
const Cbutton = ({ text, type, onClick }) => {
  return (
    <button onClick={onClick} className={`Cbutton Cbutton_${type}`}>
      {text}
    </button>
  );
};

export default Cbutton;
