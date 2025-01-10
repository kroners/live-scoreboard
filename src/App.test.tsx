import React, { act } from 'react';
import { describe, it, expect } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import App from './App';
import Scoreboard from './components/Scoreboard/Scoreboard';

describe('useMatches', () => {
  it('throws an error when used outside of MatchesProvider', () => {
    expect(() => render(<Scoreboard />)).toThrow(
      'useMatches must be used within a MatchesProvider'
    );
  });
});

describe('App', () => {
  it('renders main title', () => {
    render(<App />);

    expect(screen.getByText('Live Football World Cup Scoreboard')).toBeInTheDocument();
  });

  it('renders Start New Match section only when no matches exist', () => {
    render(<App />);

    expect(screen.getByText('Start New Match')).toBeInTheDocument();
    expect(screen.queryByText('Live Matches')).not.toBeInTheDocument();
    expect(screen.queryByText('Match Summary Manager')).not.toBeInTheDocument();
  });

  it('renders all sections when matches exist', () => {
    render(<App />);

    const homeTeam = 'Spain';
    const awayTeam = 'Brazil';

    act(() => {
      const startButton = screen.getByText('Start Match');

      const homeTeamInput = screen.getByPlaceholderText('Home Team');
      const awayTeamInput = screen.getByPlaceholderText('Away Team');

      fireEvent.change(homeTeamInput, { target: { value: homeTeam } });
      fireEvent.change(awayTeamInput, { target: { value: awayTeam } });
      fireEvent.click(startButton);
    });

    expect(screen.getByText('Live Football World Cup Scoreboard')).toBeInTheDocument();
    expect(screen.getByText('Live Matches')).toBeInTheDocument();
    expect(screen.getByText('Match Summary Manager')).toBeInTheDocument();
    expect(screen.getByText(homeTeam)).toBeInTheDocument();
    expect(screen.getByText(awayTeam)).toBeInTheDocument();
  });


  it('renders all sections and updates match score', () => {
    render(<App />);

    const homeTeam = 'Uruguay';
    const awayTeam = 'Italy';

    act(() => {
      const startButton = screen.getByText('Start Match');

      const homeTeamInput = screen.getByPlaceholderText('Home Team');
      const awayTeamInput = screen.getByPlaceholderText('Away Team');

      fireEvent.change(homeTeamInput, { target: { value: homeTeam } });
      fireEvent.change(awayTeamInput, { target: { value: awayTeam } });
      fireEvent.click(startButton);
    });

    act(() => {
      const homeScoreInput = screen.getByPlaceholderText('Home Score');
      const awayScoreInput = screen.getByPlaceholderText('Away Score');
      fireEvent.change(homeScoreInput, { target: { value: '6' } });
      fireEvent.change(awayScoreInput, { target: { value: '6' } });
    });

    expect(screen.getByText(homeTeam)).toBeInTheDocument();
    expect(screen.getByText(awayTeam)).toBeInTheDocument();
    expect(screen.getAllByText('6')).toHaveLength(2);
  });

  it('renders all sections and finishes match', () => {
    render(<App />);

    const homeTeam = 'Uruguay';
    const awayTeam = 'Italy';

    act(() => {
      const startButton = screen.getByText('Start Match');
      const homeTeamInput = screen.getByPlaceholderText('Home Team');
      const awayTeamInput = screen.getByPlaceholderText('Away Team');
      fireEvent.change(homeTeamInput, { target: { value: homeTeam } });
      fireEvent.change(awayTeamInput, { target: { value: awayTeam } });
      fireEvent.click(startButton);
    });

    act(() => {
      const finishButton = screen.getByText('Finish Match');
      fireEvent.click(finishButton);
    });

    expect(screen.getByText('finished')).toBeInTheDocument();
  });
});
