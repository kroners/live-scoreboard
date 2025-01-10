import React from 'react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import StartMatch from './StartMatch';
import { MatchesContext } from '../../App';
import { ScoreboardService } from '../../service/scoreboardService';

describe('StartMatch', () => {
  const mockSetMatches = vi.fn();
  const scoreboardService = new ScoreboardService();

  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <MatchesContext.Provider 
      value={{ 
        matches: [], 
        setMatches: mockSetMatches, 
        scoreboardService 
      }}
    >
      {children}
    </MatchesContext.Provider>
  );

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders form inputs and button', () => {
    render(<StartMatch />, { wrapper });
    expect(screen.getByPlaceholderText('Home Team')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Away Team')).toBeInTheDocument();
    expect(screen.getByText('Start Match')).toBeInTheDocument();
  });

  it('submits form with team names', () => {
    render(<StartMatch />, { wrapper });
    
    const homeInput = screen.getByPlaceholderText('Home Team');
    const awayInput = screen.getByPlaceholderText('Away Team');
    const submitButton = screen.getByText('Start Match');

    fireEvent.change(homeInput, { target: { value: 'Spain' } });
    fireEvent.change(awayInput, { target: { value: 'Brazil' } });
    fireEvent.click(submitButton);

    expect(mockSetMatches).toHaveBeenCalled();
  });
}); 