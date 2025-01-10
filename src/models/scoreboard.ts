export type MatchStatus = 'live' | 'finished';
export type MatchModel = {
    id: string;
    homeTeam: string;
    awayTeam: string;
    homeScore: number;
    awayScore: number;
    date: Date;
    status: MatchStatus;
};

export type ScoreboardModel = {
    matches: MatchModel[];
};
