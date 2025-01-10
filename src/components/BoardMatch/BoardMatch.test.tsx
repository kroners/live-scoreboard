import React from "react";
import { render, screen } from "@testing-library/react";

import  BoardMatch  from "./BoardMatch";
import { MatchStatus } from "../../models/scoreboard";
import { describe, expect, it } from "vitest";

describe('BoardMatch', () => {
  const mockMatch = {
    id: '1',
    date: new Date(),
    status: 'live' as MatchStatus,
    homeTeam: 'France',
    awayTeam: 'Germany',
    homeScore: 2,
    awayScore: 1
  };
    
  it('should render the match', () => {
    render(<BoardMatch match={mockMatch} />);
    
    expect(screen.getByText('France')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('-')).toBeInTheDocument();
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('Germany')).toBeInTheDocument();
  });

  it('shows live indicator for in-progress matches', () => {
    render(<BoardMatch match={mockMatch} />);
    
    expect(screen.getByTestId('live-indicator')).toBeInTheDocument();
  });

  it('hides live indicator for finished matches', () => {
    const finishedMatch = { ...mockMatch, status: 'finished' as MatchStatus };
    render(<BoardMatch match={finishedMatch} />);
    
    expect(screen.queryByTestId('live-indicator')).not.toBeInTheDocument();
  });
});