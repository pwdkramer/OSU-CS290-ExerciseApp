// Import dependencies
import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { useState } from 'react';

// Import Components, styles, media
import Navigation from './components/Navigation';
import './App.css';

// Import Pages
import HomePage from './pages/HomePage';
import CreatePage from './pages/CreatePage';
import EditPage from './pages/EditPage';

// Define the function that renders the content in routes using State.
function App() {

  const [exercise, setExercise] = useState([]);

  return (
    <>
      <Router>

          <header>
            <h1>My Exercise Log</h1>
            <p>A record of why I feel so sore.</p>
          </header>

          <Navigation />

          <main>
            <Route path="/" exact>
              <HomePage setExercise={setExercise} />
            </Route>

            <Route path="/CreatePage">
              <CreatePage />
            </Route>
            
            <Route path="/EditPage">
              <EditPage exercise={exercise} />
            </Route>
          </main>

          <footer>
            <p><cite>&copy; 2022 Patrick Kramer</cite>.</p>
          </footer>

      </Router>
    </>
  );
}

export default App;