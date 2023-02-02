import React, { useState } from 'react';
interface Person {
    name: string;
    friends: string[];
}

const addPerson = (name: string): boolean => {
    let people: Person[] = JSON.parse(localStorage.getItem('people') || '[]');
    const existingPerson = people.find(person => person.name === name);
    if (existingPerson) {
        return false;
    } else {
        people.push({ name, friends: [] });
        localStorage.setItem('people', JSON.stringify(people));
        return true;
    }
};

const AddPerson: React.FC = () => {
    const [personName, setPersonName] = useState('');
    const [message, setMessage] = useState('');
    const handleAddPerson = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const result = addPerson(personName);
        if (result) {
            setMessage('');
            setPersonName('');
        } else {
            setMessage(`${personName} already exists`);
        }
    };
    return (
        <div className='d-flex justify-content-center align-items-center'>
            <form onSubmit={handleAddPerson} className="badge container p-4">
                <h4 className='text-light'>ADD PEOPLE</h4>
                <hr />
                <input className="form-control" type="text" placeholder="Enter person name" value={personName} onChange={e => setPersonName(e.target.value)} />
                <div className='d-flex justify-content-center align-items-center pt-2'>
                    <button className="btn btn-info "
                        type="submit">Add Person</button>
                    {message && <span className='alert alert-danger m-2 p-2'>{message}</span>}
                </div>
            </form>
        </div>
    );
};

export default AddPerson;