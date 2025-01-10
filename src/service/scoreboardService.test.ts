import { describe, it, expect, beforeEach } from 'vitest';
import { ScoreboardService } from './scoreboardService';

describe('ScoreboardService', () => {
  let scoreboardService: ScoreboardService;

  beforeEach(() => {
    scoreboardService = new ScoreboardService();
  });

  it('starts a new match', () => {
    const match = scoreboardService.startMatch('Spain', 'Brazil');
    expect(match.homeTeam).toBe('Spain');
    expect(match.awayTeam).toBe('Brazil');
    expect(match.status).toBe('live');
  });

  it('updates match score', () => {
    const match = scoreboardService.startMatch('Spain', 'Brazil');
    const updatedMatch = scoreboardService.updateScore(match.id, 2, 1);
    
    expect(updatedMatch.homeScore).toBe(2);
    expect(updatedMatch.awayScore).toBe(1);
  });

  it('changes match status to finished', () => {
    const match = scoreboardService.startMatch('Spain', 'Brazil');
    scoreboardService.finishMatch(match.id);
    
    const summary = scoreboardService.getSummary();
    const finishedMatch = summary.find(m => m.id === match.id);
    
    expect(finishedMatch?.status).toBe('finished');
  });

  it('throws error when updating non-existent match', () => {
    expect(() => {
      scoreboardService.updateScore('non-existent', 1, 1);
    }).toThrow('Match not found');
  });
}); 