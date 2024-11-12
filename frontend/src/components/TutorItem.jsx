// import profile1 from '../img/profile1.png';
// import Profile2 from '../img/profile2.png';
// import './TutorItem.css';

// const TutorItem = ({ tutorname, tutorsch, reward, tutorsub }) => {
//   return (
//     <div className="TutorItem">
//       <div className="tutorsub">{tutorsub}</div>
//       <div className="info1">
//         <div className="tutorname">{tutorname}</div>
//         <div className="tutorsch">{tutorsch}</div>
//       </div>
//       <div className="reward">{reward}</div>
//     </div>
//   );
// };
// export default TutorItem;

import React from 'react';
// import { useNavigate } from 'react-router-dom';
import './TutorItem.css';

const TutorItem = ({ tutorname, tutorsch, reward, tutorsub }) => {
  // const navigate = useNavigate();

  // const handleClick = () => {
  //   navigate(`/TutorManager/${id}`);
  // };
  return (
    <div
      className="TutorItem"
      onClick={handleClick}
      style={{ cursor: 'pointer' }}
    >
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
