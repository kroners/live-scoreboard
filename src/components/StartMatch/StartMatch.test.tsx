import React from 'react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import StartMatch from './StartMatch';
import { MatchesContext } from '../../App';

describe('StartMatch', () => {
    const mockStartMatch = vi.fn();
    const mockUpdateScore = vi.fn();
    const mockFinishMatch = vi.fn();

  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <MatchesContext.Provider 
      value={{ 
        matches: [], 
        startMatch: mockStartMatch, 
        updateScore: mockUpdateScore,
        finishMatch: mockFinishMatch
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

    expect(mockStartMatch).toHaveBeenCalled();
  });
}); 