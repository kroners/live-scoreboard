import React from 'react';
import './App.css';
import { Scoreboard } from './components/Scoreboard/Scoreboard';

function App() {
  return (
    <div className="App">
      <Scoreboard matches={[]} />
    </div>
  );
}

export default App;
