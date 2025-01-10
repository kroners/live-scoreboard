import React from 'react';
import styled from 'styled-components';
import { ScoreboardModel } from '../../models/scoreboard';
import  BoardMatch  from '../BoardMatch/BoardMatch';

const ScoreboardWrapper = styled.div`
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f8f9fa;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
`;

const Title = styled.h1`
  text-align: center;
  color: #343a40;
  margin-bottom: 20px;
`;

const Scoreboard: React.FC<ScoreboardModel> = ({ matches }) => {
  return (
    <ScoreboardWrapper>
      <Title>World Cup Scoreboard</Title>
      {matches.map((match) => (
        <BoardMatch key={match.id} match={match} />
      ))}
    </ScoreboardWrapper>
  );
};

export default Scoreboard;