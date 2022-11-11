import React from 'react';
import { useHistory } from "react-router-dom";
import { useState } from 'react';

export const EditPage = ({ exercise }) => {
 
    const [name, setName] = useState(exercise.name);
    const [reps, setReps] = useState(exercise.reps);
    const [weight, setWeight] = useState(exercise.weight);
    const [unit, setUnit] = useState(exercise.unit);
    const [date, setDate] = useState(exercise.date);
    
    const history = useHistory();

    const editExercise = async () => {
        const response = await fetch(`/exercises/${exercise._id}`, {
            method: 'PUT',
            body: JSON.stringify({ 
                name: name,
                reps: reps,
                weight: weight,
                unit: unit,
                date: date
            }),
            headers: {'Content-Type': 'application/json',},
        });

        if (response.status === 200) {
            alert("Successfully edited document!");
        } else {
            const errMessage = await response.json();
            alert(`Failed to update document. Status ${response.status}. ${errMessage.Error}`);
        }
        history.push("/");
    }

    return (
        <>
        <article>
            <h2>Edit Exercise</h2>
            <p>Edit exercise information below.</p>
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
                        onClick={editExercise}
                        id="submit"
                    >Save</button></label>
                </fieldset>
                </form>
            </article>
        </>
    );
}
export default EditPage;