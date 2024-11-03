import profile1 from '../img/profile1.png';
import Profile2 from '../img/profile2.png';
import './StudentItem.css';

const StudentItem = ({ name, time, grade, sub }) => {
  return (
    <div className="StudentItem">
      <div className="img_section">
        <img src={profile1} />
      </div>
      <div className="info1">
        <div className="name">{name}</div>
        <div className="time">{time}</div>
      </div>
      <div className="info2">
        {grade} {sub}
      </div>
    </div>
  );
};
export default StudentItem;
