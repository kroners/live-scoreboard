import React from "react";
import { MatchStatus } from "../../models/scoreboard";
import { render, screen } from "@testing-library/react";
import { Scoreboard } from "./Scoreboard";

describe('Scoreboard', () => {
  it('should render the scoreboard', () => {
    const matches = [
      {
        id: '1',
        homeTeam: 'France',
        awayTeam: 'Germany',
        homeScore: 2,
        awayScore: 1,
        date: new Date(),
        status: 'live' as MatchStatus,
      },
    ];
    render(<Scoreboard matches={matches} />);
    expect(screen.getByText('France 2 - Germany 1')).toBeInTheDocument();
  });
});
