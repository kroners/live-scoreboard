import React from 'react';
import { MatchModel } from '../../models/scoreboard';

export const BoardMatch = ({ match }: {match:MatchModel}) => {
    return <div>
        <h2>{match.homeTeam} {match.homeScore} - {match.awayTeam} {match.awayScore}</h2>
    </div>;
};