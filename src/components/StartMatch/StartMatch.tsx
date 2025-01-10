import React, { useState } from 'react';
import styled from 'styled-components';
import { MatchModel } from '../../models/scoreboard';
import { useMatches } from '../../App';

const FormContainer = styled.div`
  width: 100%;
  max-width: 800px;
  margin: 20px auto;
  padding: 20px;
  background-color: #f8f9fa;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
`;

const Form = styled.form`
  display: flex;
  gap: 15px;
  align-items: center;
`;

const Input = styled.input`
  flex: 1;
  padding: 10px;
  border: 1px solid #dee2e6;
  border-radius: 4px;
  font-size: 1rem;
  
  &:focus {
    outline: none;
    border-color: #007bff;
    box-shadow: 0 0 0 2px rgba(0,123,255,0.25);
  }
`;

const Button = styled.button`
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.2s;

  &:hover {
    background-color: #0056b3;
  }
`;

const Title = styled.h2`
  color: #343a40;
  margin-bottom: 20px;
`;

interface StartMatchProps {
  matches: MatchModel[];
  onMatchesUpdate: (matches: MatchModel[]) => void;
}

const StartMatch: React.FC = () => {
  const [homeTeam, setHomeTeam] = useState('');
  const [awayTeam, setAwayTeam] = useState('');
  const { matches, setMatches, scoreboardService } = useMatches();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newMatch = scoreboardService.startMatch(homeTeam, awayTeam);
    setMatches([...matches, newMatch]);
    setHomeTeam('');
    setAwayTeam('');
  };

  return (
    <FormContainer>
      <Title>Start New Match</Title>
      <Form onSubmit={handleSubmit}>
        <Input
          type="text"
          placeholder="Home Team"
          value={homeTeam}
          onChange={(e) => setHomeTeam(e.target.value)}
          required
        />
        <Input
          type="text"
          placeholder="Away Team"
          value={awayTeam}
          onChange={(e) => setAwayTeam(e.target.value)}
          required
        />
        <Button type="submit">Start Match</Button>
      </Form>
    </FormContainer>
  );
};

export default StartMatch;