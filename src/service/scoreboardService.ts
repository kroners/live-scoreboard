import { MatchModel, MatchStatus } from '../models/scoreboard';
import { v4 as uuidv4 } from 'uuid';

export class ScoreboardService {
  private matches: MatchModel[] = [];

  startMatch(homeTeamName: string, awayTeamName: string): MatchModel {
    const newMatch: MatchModel = {
      id: uuidv4(),
      homeTeam: homeTeamName,
      awayTeam: awayTeamName,
      homeScore: 0,
      awayScore: 0,
      date: new Date(),
      status: 'live' as MatchStatus,

    };

    this.matches.push(newMatch);
    return newMatch;
  }

  updateScore(matchId: string, homeScore: number, awayScore: number): MatchModel {
    const match = this.matches.find(m => m.id === matchId);
    if (!match) throw new Error('Match not found');
    if (match.status === 'finished') throw new Error('Cannot update finished match');
    if (homeScore < 0 || awayScore < 0) throw new Error('Scores cannot be negative');

    match.homeScore = homeScore;
    match.awayScore = awayScore;
    return match;
  }

  finishMatch(matchId: string): void {
    console.log({ matchId, matches: this.matches})
    const match = this.matches.find(m => m.id === matchId);
    if (!match) throw new Error('Match not found');
    
    match.status = 'finished';
  }

  getSummary(): MatchModel[] {
    return [...this.matches].sort((a, b) => {
      const totalScoreA = a.homeScore + a.awayScore;
      const totalScoreB = b.homeScore + b.awayScore;
      
      if (totalScoreB !== totalScoreA) {
        return totalScoreB - totalScoreA;
      }
      return b.date.getTime() - a.date.getTime();
    });
  }
}