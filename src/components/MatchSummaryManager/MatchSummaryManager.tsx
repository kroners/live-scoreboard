import React from 'react';
import styled from 'styled-components';
import { useMatches } from '../../App';
import { MatchModel } from '../../models/scoreboard';

const SummaryContainer = styled.div`
  width: 100%;
  max-width: 800px;
  margin: 20px auto;
  padding: 20px;
  background-color: #f8f9fa;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
`;

const Th = styled.th`
  padding: 12px;
  text-align: left;
  background-color: #e9ecef;
  border-bottom: 2px solid #dee2e6;
`;

const Td = styled.td`
  padding: 12px;
  border-bottom: 1px solid #dee2e6;
`;

const ScoreInput = styled.input`
  width: 60px;
  padding: 6px;
  border: 1px solid #dee2e6;
  border-radius: 4px;
  text-align: center;
  
  &:focus {
    outline: none;
    border-color: #007bff;
  }
`;

const Button = styled.button`
  padding: 6px 12px;
  margin-left: 8px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

const Title = styled.h2`
  color: #343a40;
  margin-bottom: 20px;
`;

const MatchSummaryManager: React.FC = () => {
  const { matches, updateScore, finishMatch } = useMatches();

  if (matches.length === 0) return null;

  const handleUpdateScore = (matchId: string, homeScore: number, awayScore: number) => {
    updateScore(matchId, homeScore, awayScore);
  };

  const handleFinishMatch = (matchId: string) => {
    finishMatch(matchId);
  };

  return (
    <SummaryContainer>
      <Title>Match Summary Manager</Title>
      <Table>
        <thead>
          <tr>
            <Th>Match</Th>
            <Th>Home Score</Th>
            <Th>Away Score</Th>
            <Th>Status</Th>
            <Th>Actions</Th>
          </tr>
        </thead>
        <tbody>
          {matches.map((match: MatchModel) => (
            <tr key={match.id}>
              <Td>{`${match.homeTeam} - ${match.awayTeam}`}</Td>
              <Td>
                <ScoreInput
                  type="number"
                  placeholder="Home Score"
                  value={match.homeScore}
                  onChange={(e) => handleUpdateScore(
                    match.id,
                    parseInt(e.target.value),
                    match.awayScore
                  )}
                  min="0"
                />
              </Td>
              <Td>
                <ScoreInput
                  type="number"
                  placeholder="Away Score"
                  value={match.awayScore}
                  onChange={(e) => handleUpdateScore(
                    match.id,
                    match.homeScore,
                    parseInt(e.target.value)
                  )}
                  min="0"
                />
              </Td>
              <Td>{match.status}</Td>
              <Td>
                <Button onClick={() => handleFinishMatch(match.id)}>
                  Finish Match
                </Button>
              </Td>
            </tr>
          ))}
        </tbody>
      </Table>
    </SummaryContainer>
  );
};

export default MatchSummaryManager;