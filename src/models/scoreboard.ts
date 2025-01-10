export type Match = {
    id: string;
    homeTeam: string;
    awayTeam: string;
    homeScore: number;
    awayScore: number;
    date: Date;
    status: 'live' | 'finished';
};

export type Scoreboard = {
    matches: Match[];
};
