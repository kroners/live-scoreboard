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
        expect(screen.getByText('France 2 - Germany 1')).toBeInTheDocument();
    });
    it('shows live indicator for in-progress matches', () => {
    const { container } = render(<BoardMatch match={mockMatch} />);
    
    expect(container.querySelector('div[class*="LiveIndicator"]')).toBeInTheDocument();
  });

  it('hides live indicator for finished matches', () => {
    const finishedMatch = { ...mockMatch, status: 'finished' as MatchStatus };
    const { container } = render(<BoardMatch match={finishedMatch} />);
    
    expect(container.querySelector('div[class*="LiveIndicator"]')).not.toBeInTheDocument();
  });
});
