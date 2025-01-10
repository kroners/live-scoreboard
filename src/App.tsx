import React from 'react';
import './App.css';
import { Scoreboard } from './components/Scoreboard/Scoreboard';
import { MatchStatus } from './models/scoreboard';

function App() {
  const      matches = [
      {
        id: '1',
        homeTeam: 'France',
        awayTeam: 'Germany',
        homeScore: 2,
        awayScore: 1,
        date: new Date(),
        status: 'live' as MatchStatus,
      },
    ];
  return (
    <div className="App">
      <Scoreboard matches={matches} />
    </div>
  );
}

export default App;
