import React from "react";
import { render, screen } from "@testing-library/react";

import { BoardMatch } from "./BoardMatch";
import { MatchStatus } from "../../models/scoreboard";

describe('BoardMatch', () => {
    it('should render the match', () => {
        const match = {
            id: '1',
            date: new Date(),
            status: 'live' as MatchStatus,
            homeTeam: 'France',
            awayTeam: 'Germany',
            homeScore: 2,
            awayScore: 1
        };
         render(<BoardMatch match={match} />);
        expect(screen.getByText('France 2 - Germany 1')).toBeInTheDocument();
    });
});
