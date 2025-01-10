import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from './App';

describe('App', () => {
  it('renders main title', () => {
    render(<App />);
    expect(screen.getByText('Live Football World Cup Scoreboard')).toBeInTheDocument();
  });

  it('renders all main components', () => {
    render(<App />);
    expect(screen.getByText('Start New Match')).toBeInTheDocument();
    expect(screen.getByText('World Cup Scoreboard')).toBeInTheDocument();
    expect(screen.getByText('Match Summary Manager')).toBeInTheDocument();
  });
});
