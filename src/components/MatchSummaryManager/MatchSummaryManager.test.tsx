import React from 'react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import MatchSummaryManager from './MatchSummaryManager';
import { MatchesContext } from '../../App';
import { MatchModel } from '../../models/scoreboard';

describe('MatchSummaryManager', () => {
  const mockStartMatch = vi.fn();
  const mockUpdateScore = vi.fn();
  const mockFinishMatch = vi.fn();

  const mockMatch: MatchModel = {
    id: '1',
    homeTeam: 'Spain',
    awayTeam: 'Brazil',
    homeScore: 0,
    awayScore: 0,
    date: new Date(),
    status: 'live',
  };

  const renderWithContext = (matches: MatchModel[]) => {
    return render(
      <MatchesContext.Provider
        value={{
          matches,
          startMatch: mockStartMatch,
          updateScore: mockUpdateScore,
          finishMatch: mockFinishMatch
        }}
      >
        <MatchSummaryManager />
      </MatchesContext.Provider>
    );
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders match summary table when matches exist', () => {
    renderWithContext([mockMatch]);
    expect(screen.getByText('Match Summary Manager')).toBeInTheDocument();
    expect(screen.getByText('Spain - Brazil')).toBeInTheDocument();
  });

  it('does not render anything when no matches exist', () => {
    renderWithContext([]);
    expect(screen.queryByText('Match Summary Manager')).not.toBeInTheDocument();
  });

  it('updates score when input changes', () => {
    renderWithContext([mockMatch]);
    
    const homeScoreInput = screen.getAllByRole('spinbutton')[0];
    fireEvent.change(homeScoreInput, { target: { value: '2' } });
    expect(mockUpdateScore).toHaveBeenCalledWith(mockMatch.id, 2, mockMatch.homeScore);
    
    const awayScoreInput = screen.getAllByRole('spinbutton')[1];
    fireEvent.change(awayScoreInput, { target: { value: '2' } });
    expect(mockUpdateScore).toHaveBeenCalledWith(mockMatch.id, 2, mockMatch.awayScore);
  });

  it('finishes match when finish button is clicked', () => {
    renderWithContext([mockMatch]);
    
    const finishButton = screen.getByText('Finish Match');
    fireEvent.click(finishButton);
    expect(mockFinishMatch).toHaveBeenCalledWith(mockMatch.id);
  });
});
