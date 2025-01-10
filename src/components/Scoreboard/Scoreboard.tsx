import React from 'react';
import { ScoreboardModel } from '../../models/scoreboard';
import { BoardMatch } from '../BoardMatch/BoardMatch';
import styled from 'styled-components';

const ScoreboardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

export const Scoreboard = ({ matches }: ScoreboardModel) => {
    return <ScoreboardWrapper>
      <h1>World Cup Scoreboard</h1>
      <div>
        <h2>Matches</h2>
        <ul>
          {matches.map((match) => (
            <BoardMatch key={match.id} match={match} />
          ))}
        </ul>
      </div>
    </ScoreboardWrapper>;
};