import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import Scoreboard from './Scoreboard';
import { MatchesContext } from '../../App';
import { MatchModel } from '../../models/scoreboard';

describe('Scoreboard', () => {
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
          startMatch: vi.fn(), 
          updateScore: vi.fn(),
          finishMatch: vi.fn()
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

  it('orders matches by total score', () => {
    const mockLiveMatch2: MatchModel = {
      id: '3',
      homeTeam: 'Germany',
      awayTeam: 'France',
      homeScore: 2,
      awayScore: 2,
      date: new Date('2024-10-02T10:00:00Z'),
      status: 'live'
    };

    const matches = [mockLiveMatch, mockLiveMatch2];
    renderWithContext(matches);
    
    const matchElements = screen.getAllByTestId(/match-/);
    expect(matchElements[0]).toHaveTextContent('Germany');
    expect(matchElements[1]).toHaveTextContent('Spain');
  });


  it('orders matches by creation date when scores are equal', () => {
    const mockLiveMatch3: MatchModel = {
      id: '4',
      homeTeam: 'Italy',
      awayTeam: 'Netherlands',
      homeScore: 2,
      awayScore: 1,
      date: new Date('2023-10-03T10:00:00Z'),
      status: 'live'
    };

    const matches = [mockLiveMatch3, mockLiveMatch];
    renderWithContext(matches);
    
    const matchElements = screen.getAllByTestId(/match-/);
    expect(matchElements[0]).toHaveTextContent('Spain');
    expect(matchElements[1]).toHaveTextContent('Italy');
  });

  it('does not render anything when only finished matches exist', () => {
    renderWithContext([mockFinishedMatch]);
    expect(screen.queryByText('Live Matches')).not.toBeInTheDocument();
  });
});
