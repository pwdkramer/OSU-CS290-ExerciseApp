import 'dotenv/config';
import express from 'express';
import * as exercises from './model.mjs';

const PORT = process.env.PORT;
const app = express();
app.use(express.json());


// CREATE controller
app.post('/exercises', (req, res) => {
    exercises.createExercise(
        req.body.name,
        req.body.reps,
        req.body.weight,
        req.body.unit,
        req.body.date
    )
    .then(exercise => {
        res.status(201).json(exercise);
    })
    .catch(error => {
        console.log(error);
        res.status(400).json({ error: 'Invalid request'});
    })
});

// RETRIEVE controller
// Retrieve all
app.get('/exercises', (req, res) => {
    exercises.findExercises().then(exercises => {
        res.send(exercises);
    }).catch(error => {
        console.error(error);
        res.send({ Error: 'Request failed' });
    });
});

// Retrieve by id
app.get('/exercises/:_id', (req, res) => {
    const exerciseId = req.params._id;
    exercises.findExerciseById(exerciseId)
        .then(exercise => {
            if (exercise !== null) {
                res.json(exercise);
            } else {
                res.status(404).json({ Error: 'Not Found'});
            }
        })
        .catch(error => {
            res.status(400).json({ Error: 'Request Failed' });
        });
});


// UPDATE controller
app.put('/exercises/:_id', (req, res) => {
    exercises.updateExercise(
        req.params._id,
        req.body.name,
        req.body.reps,
        req.body.weight,
        req.body.unit,
        req.body.date
    )
    .then(numUpdated => {
        if (numUpdated === 1) {
            res.json({
                _id: req.params._id,
                name: req.body.name,
                reps: req.body.reps,
                weight: req.body.weight,
                unit: req.body.unit,
                date: req.body.date
            })
        } else {
            res.status(400).json({ Error: 'Not found' });
        }
    })
    .catch(error => {
        console.error(error);
        res.status(400).json({ Error: 'Request failed' });
    });
});


// DELETE controller
app.delete('/exercises/:_id', (req, res) => {
    exercises.deleteById(req.params._id)
        .then(deletedCount => {
            if (deletedCount === 1) {
                res.status(204).send();
            } else {
                res.status(404).json({ Error: 'Not found' });
            }
        })
        .catch(error => {
            console.error(error);
            res.send({ error: 'Reqest failed' });
        });
});

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
});