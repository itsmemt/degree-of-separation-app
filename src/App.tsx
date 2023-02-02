import React from 'react';
import AddPerson from './Components/addPerson';
import DegreeOfSeparation from './Components/degreeOfSeparation';
import MakeFriends from './Components/makeFriends';
import "./App.css"
const App: React.FC = () => {
  return (
    <div className="bg-info p-2">
      <div className="alert alert-info text-center mb-5" role="alert">
        <h1>Degree of Separation</h1>
      </div>
      <div className='d-lg-flex align-items-center justify-content-evenly'>
        <div className='pt-2 pb-2'>
          <AddPerson />
        </div>
        <div className='pt-2 pb-2'>
          <MakeFriends />
        </div>
        <div className='pt-2 pb-2'>
          <DegreeOfSeparation />
        </div>
      </div>
      <div className="alert alert-info text-center mt-5" role="alert">
        <h5>Copyright@RaftLab Assignment </h5>
      </div>
    </div>
  );
};

export default App;