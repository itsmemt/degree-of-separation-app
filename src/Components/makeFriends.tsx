import React, { useState } from 'react';

interface Person {
    name: string;
    friends: string[];
}

const makeFriends = (person1: string, person2: string): string => {
    let people: Person[] = JSON.parse(localStorage.getItem('people') || '[]');
    const person1Index = people.findIndex(person => person.name === person1);
    const person2Index = people.findIndex(person => person.name === person2);

    if (person1 === person2) {
        return `${person1} cannot be friends with himself/herself.`;
    }

    if (person1Index === -1 || person2Index === -1) {
        return `Either ${person1} or ${person2} does not exist.`;
    }

    people[person1Index].friends.push(person2);

    localStorage.setItem('people', JSON.stringify(people));
    return `${person1} and ${person2} are now friends.`;
};
const MakeFriends: React.FC = () => {
    const [person1Name, setPerson1Name] = useState('');
    const [person2Name, setPerson2Name] = useState('');
    const [message, setMessage] = useState('');

    const handleMakeFriends = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setMessage(makeFriends(person1Name, person2Name));
        setPerson1Name('');
        setPerson2Name('');
    };

    return (
        <div className='d-flex justify-content-center align-items-center'>
            <form onSubmit={handleMakeFriends} className="badge container p-3">
                <h4 className='text-light '>MAKE FRIENDS</h4>
                <hr />
                <input className="form-control mb-2" type="text" placeholder="Enter first person name" value={person1Name} onChange={e => setPerson1Name(e.target.value)} />
                <input className="form-control" type="text" placeholder="Enter second person name" value={person2Name} onChange={e => setPerson2Name(e.target.value)} />
                <div className='d-flex justify-content-center align-items-center pt-2'>
                    <button className="btn btn-info mb-4" type="submit">Make Friends</button></div>
                {message && <span className='d-flex alert alert-danger p-2 text-wrap '>{message}</span>}
            </form>
        </div>
    );
};
export default MakeFriends;