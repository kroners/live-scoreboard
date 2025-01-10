import { MatchModel, MatchStatus } from '../models/scoreboard';
import { v4 as uuidv4 } from 'uuid';

export class ScoreboardService {
  startMatch(matches: MatchModel[], homeTeamName: string, awayTeamName: string): MatchModel[] {
    const newMatch: MatchModel = {
      id: uuidv4(),
      homeTeam: homeTeamName,
      awayTeam: awayTeamName,
      homeScore: 0,
      awayScore: 0,
      date: new Date(),
      status: 'live' as MatchStatus,
    };
    return [...matches, newMatch];
  }

  updateScore(matches: MatchModel[], matchId: string, homeScore: number, awayScore: number): MatchModel[] {
    if (matches.length === 0) {
      throw new Error('Matches not found');
    }
    if (!matches.some(match => match.id === matchId)) {
      throw new Error('Match not found');
    }
    return matches.map(match => {
      if (match.id !== matchId) return match;
      if (match.status === 'finished') throw new Error('Cannot update finished match');
      if (homeScore < 0 || awayScore < 0) throw new Error('Scores cannot be negative');

      return { ...match, homeScore, awayScore };
    });
  }

  finishMatch(matches: MatchModel[], matchId: string): MatchModel[] {
    if (!matches.some(match => match.id === matchId)) {
      throw new Error('Match not found');
    }
    return matches.map(match => {
      if (match.id !== matchId) return match;
      return { ...match, status: 'finished' };
    });
  }
}
