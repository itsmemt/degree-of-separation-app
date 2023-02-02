import React, { useState, useEffect, useCallback } from "react";

interface Person {
  name: string;
  friends: string[];
}

const DegreeOfSeparation: React.FC = () => {
  const [person1, setPerson1] = useState<string>("");
  const [person2, setPerson2] = useState<string>("");
  const [degreeOfSeparation, setDegreeOfSeparation] = useState<string[]>([]);
  const [showResult, setShowResult] = useState<boolean>(false);

  const findDegreesOfSeparation = useCallback((person1Data: Person, person2Data: Person, data: Person[], degrees: string[]): string[] => {
    if (person1Data.friends.includes(person2Data.name)) {
      degrees.push(person2Data.name);
      return degrees;
    } else {
      for (const friend of person1Data.friends) {
        const friendData = data.find((person: Person) => person.name === friend);
        if (friendData) {
          const degreesOfSeparation = findDegreesOfSeparation(
            friendData,
            person2Data,
            data,
            [...degrees, friendData.name]
          );
          if (degreesOfSeparation) {
            return degreesOfSeparation;
          }
        }
      }
      return [];
    }
  }, []);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("people") || "[]");
    const person1Data = data.find((person: Person) => person.name === person1);
    const person2Data = data.find((person: Person) => person.name === person2);
    if (person1Data && person2Data) {
      const degrees = findDegreesOfSeparation(
        person1Data,
        person2Data,
        data,
        []
      );
      setDegreeOfSeparation(degrees || []);
    }
  }, [person1, person2, findDegreesOfSeparation]);

  const handleShowResult = () => {
    if (!showResult) {
      setShowResult(!showResult);
    }
    // setPerson1("");
    // setPerson2("");
  };

  return (
    <div className='d-flex justify-content-center align-items-center'>
      <div className="badge container p-4">
        <h4 className='text-light text-wrap'>FIND DEGREE OF SEPARATION</h4>
        <hr />
        {/* <label>Enter first Name: </label> */}
        <input className="form-control mb-2"
          type="text" placeholder="Enter first Name"
          value={person1}
          onChange={(e) => setPerson1(e.target.value)}
        />
        {/* <label>Enter Second Name: </label> */}
        <input
          className="form-control"
          type="text" placeholder="Enter Second Name"
          value={person2}
          onChange={(e) => setPerson2(e.target.value)}
        />
        <div className='d-flex justify-content-center align-items-center pt-2'>  <button className="btn btn-info" onClick={() => handleShowResult()}>
          Show Result
        </button></div>

        {showResult && (
          <div className="alert alert-danger mt-3 w-100">
            <p className="text-dark ">Degree of Separation is {degreeOfSeparation.length}</p>
            <ul className="badge text-secondary"><span>{person1}</span>
              {degreeOfSeparation.map((personName, index) => (
                <span key={index}> is friend of {personName} <br /><span >{index < degreeOfSeparation.length - 1 && personName}</span> </span>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};
export default DegreeOfSeparation;