import React from 'react';
import { ScoreboardModel } from '../../models/scoreboard';
import { BoardMatch } from '../BoardMatch';

export const Scoreboard = ({ matches }: ScoreboardModel) => {
    return <div>
      <h1>World Cup Scoreboard</h1>
      <div>
        <h2>Matches</h2>
        <ul>
          {matches.map((match) => (
            <BoardMatch match={match} />
          ))}
        </ul>
      </div>
    </div>;
};