import React, { useState, createContext, useContext } from 'react';
import styled from 'styled-components';
import StartMatch from './components/StartMatch/StartMatch';
import Scoreboard from './components/Scoreboard/Scoreboard';
import MatchSummaryManager from './components/MatchSummaryManager/MatchSummaryManager';
import { MatchModel } from './models/scoreboard';
import { ScoreboardService } from './service/scoreboardService';

const AppContainer = styled.div`
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
`;

const Title = styled.h1`
  text-align: center;
  color: #343a40;
  margin-bottom: 30px;
`;

interface MatchesContextType {
  matches: MatchModel[];
  startMatch: (homeTeam: string, awayTeam: string) => void;
  updateScore: (matchId: string, homeScore: number, awayScore: number) => void;
  finishMatch: (matchId: string) => void;
}

export const MatchesContext = createContext<MatchesContextType | undefined>(undefined);

export const useMatches = () => {
  const context = useContext(MatchesContext);
  if (!context) {
    throw new Error('useMatches must be used within a MatchesProvider');
  }
  return context;
};

const App: React.FC = () => {
  const [matches, setMatches] = useState<MatchModel[]>([]);
  const scoreboardService = new ScoreboardService();

  const startMatch = (homeTeam: string, awayTeam: string) => {
    setMatches(scoreboardService.startMatch(matches, homeTeam, awayTeam));
  };

  const updateScore = (matchId: string, homeScore: number, awayScore: number) => {
    setMatches(scoreboardService.updateScore(matches, matchId, homeScore, awayScore));
  };

  const finishMatch = (matchId: string) => {
    setMatches(scoreboardService.finishMatch(matches, matchId));
  };

  return (
    <MatchesContext.Provider value={{ matches, startMatch, updateScore, finishMatch }}>
      <AppContainer>
        <Title>Live Football World Cup Scoreboard</Title>
        <StartMatch />
        <Scoreboard />
        <MatchSummaryManager />
      </AppContainer>
    </MatchesContext.Provider>
  );
};

export default App;
