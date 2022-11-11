import React, { useState } from 'react';
import { useHistory } from "react-router-dom";

export const CreatePage = () => {

    const [name, setName]       = useState('');
    const [reps, setReps]       = useState('');
    const [weight, setWeight]   = useState('');
    const [unit, setUnit]       = useState('');
    const [date, setDate]       = useState('');
    
    const history = useHistory();

    const addExercise = async () => {
        const newExercise = { name, reps, weight, unit, date };
        const response = await fetch('/exercises', {
            method: 'post',
            body: JSON.stringify(newExercise),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if(response.status === 201){
            alert("Successfully added the exercise!");
        } else {
            alert(`Failed to add exercise, status code = ${response.status}`);
        }
        history.push("/");
    };


    return (
        <>
        <article>
            <h2>New Exercise</h2>
            <p>Please enter exercise information.</p>
            <form onSubmit={(e) => { e.preventDefault();}}>
                <fieldset>
                    <legend>Exercise info:</legend>

                    <p>
                        <label for="name">Name</label>
                        <input
                            type="text"
                            value={name}
                            onChange={e => setName(e.target.value)} 
                            id="name"
                        />
                    </p>
                    
                    <p>
                        <label for="reps">Reps</label>
                        <input 
                            type="number"
                            value={reps}
                            onChange={e => setReps(e.target.value)}
                            id="reps"
                        />
                    </p>

                    <p>
                        <label for="weight">Weight</label>
                        <input 
                            type="number"
                            value={weight}
                            onChange={e => setWeight(e.target.value)}
                            id="weight"
                        />
                    </p>

                    <p>
                        <label for="unit">Unit</label>
                        <select 
                            type="text"
                            value={unit}
                            onChange={e => setUnit(e.target.value)}
                            id="unit"
                        >
                            <option value="">--Please choose an option--</option>
                            <option value="lbs">lbs</option>
                            <option value="kgs">kgs</option>
                            <option value="miles">miles</option>
                            <option value="km">km</option>
                        </select>
                    </p>

                    <p>
                        <label for="date">Date</label>
                        <input 
                            type="date"
                            value={date}
                            onChange={e => setDate(e.target.value)}
                            id="date"
                        />
                    </p>

                    <label for="submit">
                    <button
                        onClick={addExercise}
                        id="submit"
                    >Save</button></label>
                </fieldset>
                </form>
            </article>
        </>
    );
}

export default CreatePage;