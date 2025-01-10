import React from 'react';
import styled, { keyframes } from 'styled-components';
import { MatchModel } from '../../models/scoreboard';

const blink = keyframes`
  0% { opacity: 1; }
  50% { opacity: 0; }
  100% { opacity: 1; }
`;

const MatchRow = styled.div`
  display: flex;
  align-items: center;
  padding: 15px;
  margin-bottom: 10px;
  background-color: white;
  border-radius: 4px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
`;

const TeamName = styled.span`
  flex: 1;
  font-weight: 500;
`;

const Score = styled.span`
  font-size: 1.2em;
  font-weight: bold;
  margin: 0 15px;
`;

const LiveIndicator = styled.div`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: red;
  margin-left: 10px;
  animation: ${blink} 1s infinite;
`;

interface BoardMatchProps {
  match: MatchModel;
}

const BoardMatch: React.FC<BoardMatchProps> = ({ match }) => {
  return (
    <MatchRow>
      <TeamName>{match.homeTeam}</TeamName>
      <Score>{match.homeScore}</Score>
      <span>-</span>
      <Score>{match.awayScore}</Score>
      <TeamName>{match.awayTeam}</TeamName>
      {match.status === 'live' && <LiveIndicator />}
    </MatchRow>
  );
};

export default BoardMatch;