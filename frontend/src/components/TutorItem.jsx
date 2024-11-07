import profile1 from '../img/profile1.png';
import Profile2 from '../img/profile2.png';
import './TutorItem.css';

const TutorItem = ({ tutorname, tutorsch, reward, tutorsub }) => {
  return (
    <div className="TutorItem">
      <div className="tutorsub">{tutorsub}</div>
      <div className="info1">
        <div className="tutorname">{tutorname}</div>
        <div className="tutorsch">{tutorsch}</div>
      </div>
      <div className="reward">{reward}</div>
    </div>
  );
};
export default TutorItem;
