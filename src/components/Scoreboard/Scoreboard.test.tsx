import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import Scoreboard from './Scoreboard';
import { MatchesContext } from '../../App';
import { ScoreboardService } from '../../service/scoreboardService';
import { MatchModel } from '../../models/scoreboard';

describe('Scoreboard', () => {
  const scoreboardService = new ScoreboardService();
  
  const mockLiveMatch: MatchModel = {
    id: '1',
    homeTeam: 'Spain',
    awayTeam: 'Brazil',
    homeScore: 2,
    awayScore: 1,
    date: new Date(),
    status: 'live'
  };

  const mockFinishedMatch: MatchModel = {
    id: '2',
    homeTeam: 'Germany',
    awayTeam: 'France',
    homeScore: 0,
    awayScore: 0,
    date: new Date(),
    status: 'finished'
  };

  const renderWithContext = (matches: MatchModel[]) => {
    return render(
      <MatchesContext.Provider 
        value={{ 
          matches, 
          setMatches: vi.fn(), 
          scoreboardService 
        }}
      >
        <Scoreboard />
      </MatchesContext.Provider>
    );
  };

  it('renders live matches', () => {
    renderWithContext([mockLiveMatch]);
    expect(screen.getByText(/Spain/)).toBeInTheDocument();
    expect(screen.getByText(/Brazil/)).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('1')).toBeInTheDocument();
  });

  it('does not render finished matches', () => {
    renderWithContext([mockLiveMatch, mockFinishedMatch]);
    expect(screen.queryByText(/Germany/)).not.toBeInTheDocument();
  });

  it('does not render anything when no matches exist', () => {
    renderWithContext([]);
    expect(screen.queryByText('Live Matches')).not.toBeInTheDocument();
  });

  it('does not render anything when only finished matches exist', () => {
    renderWithContext([mockFinishedMatch]);
    expect(screen.queryByText('Live Matches')).not.toBeInTheDocument();
  });
});
