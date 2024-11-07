import './DivBox.css';

const DivBox = ({ leftText, rightText, type }) => {
  return (
    <div className={`Box Box_${type}`}>
      <div className="Box_left">{leftText}</div>
      <span className="Box_divider"></span>
      <div className="Box_right">{rightText}</div>
    </div>
  );
};

export default DivBox;
