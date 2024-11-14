import './TutorItem.css';
const TutorItem = ({ tutorname, tutorsch, tutorsub }) => {
  return (
    <div className="TutorItem">
      <div className="tutorsub">{tutorsub}</div>
      <div className="info1">
        <div className="tutorname">{tutorname}</div>
        <div className="tutorsch">{tutorsch}</div>
      </div>
    </div>
  );
};
export default TutorItem;
