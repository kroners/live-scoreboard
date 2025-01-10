import { describe, it, expect, beforeEach } from 'vitest';
import { ScoreboardService } from './scoreboardService';
import { MatchModel } from '../models/scoreboard';

describe('ScoreboardService', () => {
  let scoreboardService: ScoreboardService;

  beforeEach(() => {
    scoreboardService = new ScoreboardService();
  });

  it('starts a new match', () => {
    const matches = scoreboardService.startMatch([], 'Spain', 'Brazil');
    expect(matches[0].homeTeam).toBe('Spain');
    expect(matches[0].awayTeam).toBe('Brazil');
    expect(matches[0].status).toBe('live');
  });

  it('throws an error when trying to update a score for empty scoreboard', () => {
    const matches = [];
    expect(() => scoreboardService.updateScore(matches, 'some-id', 2, 1)).toThrow('Matches not found');
  });

  it('updates match score', () => {
    const matches = scoreboardService.startMatch([], 'Spain', 'Brazil');
    const updatedMatches = scoreboardService.updateScore(matches, matches[0].id, 2, 1);

    expect(updatedMatches[0].homeScore).toBe(2);
    expect(updatedMatches[0].awayScore).toBe(1);
  });

  it('updates 3rd match score', () => {
    let matches: MatchModel[] = [];
     matches = scoreboardService.startMatch(matches, 'Spain', 'Brazil');
    matches = scoreboardService.startMatch(matches, 'Mexico', 'Canada');
    const updatedMatches = scoreboardService.updateScore(matches, matches[1].id, 2, 1);

    expect(updatedMatches[1].homeScore).toBe(2);
    expect(updatedMatches[1].awayScore).toBe(1);
    expect(updatedMatches[0].homeScore).toBe(0);
    expect(updatedMatches[0].awayScore).toBe(0);
  });

  it('throws an error when updating a finished match', () => {
    const matches = scoreboardService.startMatch([], 'Spain', 'Brazil');
    const updatedMatches = scoreboardService.finishMatch(matches, matches[0].id);
    expect(() => scoreboardService.updateScore(updatedMatches, updatedMatches[0].id, 2, 1)).toThrow('Cannot update finished match');
  });

  it('throws an error when updating a non-existent match', () => {
    const matches = scoreboardService.startMatch([], 'Spain', 'Brazil');
    expect(() => scoreboardService.updateScore(matches, 'invalid-id', 2, 1)).toThrow('Match not found');
  });

  it('throws an error when updating with negative scores', () => {
    const matches = scoreboardService.startMatch([], 'Spain', 'Brazil');
    expect(() => scoreboardService.updateScore(matches, matches[0].id, -1, 1)).toThrow('Scores cannot be negative');
  });

  it('changes match status to finished', () => {
    let matches: MatchModel[] = [];
    matches = scoreboardService.startMatch(matches, 'Spain', 'Brazil');
    matches = scoreboardService.startMatch(matches, 'Mexico', 'Canada');
    const updatedMatches = scoreboardService.finishMatch(matches, matches[0].id);

    const finishedMatch = updatedMatches.find(m => m.id === matches[0].id);

    expect(finishedMatch?.status).toBe('finished');
  });

  it('throws an error when finishing a non-existent match', () => {
    expect(() => scoreboardService.finishMatch([], 'invalid-id')).toThrow('Match not found');
  });
});
