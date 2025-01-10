import React from 'react';
import styled from 'styled-components';
import { useMatches } from '../../App';
import BoardMatch from '../BoardMatch/BoardMatch';

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

const Scoreboard: React.FC = () => {
  const { matches } = useMatches();
  const liveMatches = matches
    .filter(match => match.status === 'live')
    .sort((a, b) => {
      const totalScoreA = a.homeScore + a.awayScore;
      const totalScoreB = b.homeScore + b.awayScore;
      if (totalScoreB !== totalScoreA) {
        return totalScoreB - totalScoreA;
      }
      return b.date.getTime() - a.date.getTime();
    });

  if (liveMatches.length === 0) return null;

  return (
    <ScoreboardWrapper>
      <Title>Live Matches</Title>
      {liveMatches.map((match) => (
        <BoardMatch key={match.id} match={match} />
      ))}
    </ScoreboardWrapper>
  );
};

export default Scoreboard;