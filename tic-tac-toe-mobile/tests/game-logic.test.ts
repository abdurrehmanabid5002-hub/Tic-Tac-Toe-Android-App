import { describe, it, expect } from 'vitest';

// Game logic functions extracted for testing
function calculateWinner(squares: (string | null)[]): string | null {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

function isBoardFull(squares: (string | null)[]): boolean {
  return squares.every(square => square !== null);
}

describe('Tic-Tac-Toe Game Logic', () => {
  describe('calculateWinner', () => {
    it('should detect horizontal win for X', () => {
      const board = ['X', 'X', 'X', null, null, null, null, null, null];
      expect(calculateWinner(board)).toBe('X');
    });

    it('should detect horizontal win for O', () => {
      const board = [null, null, null, 'O', 'O', 'O', null, null, null];
      expect(calculateWinner(board)).toBe('O');
    });

    it('should detect vertical win for X', () => {
      const board = ['X', null, null, 'X', null, null, 'X', null, null];
      expect(calculateWinner(board)).toBe('X');
    });

    it('should detect diagonal win (top-left to bottom-right)', () => {
      const board = ['X', null, null, null, 'X', null, null, null, 'X'];
      expect(calculateWinner(board)).toBe('X');
    });

    it('should detect diagonal win (top-right to bottom-left)', () => {
      const board = [null, null, 'O', null, 'O', null, 'O', null, null];
      expect(calculateWinner(board)).toBe('O');
    });

    it('should return null when no winner', () => {
      const board = ['X', 'O', null, null, null, null, null, null, null];
      expect(calculateWinner(board)).toBeNull();
    });

    it('should return null for empty board', () => {
      const board = [null, null, null, null, null, null, null, null, null];
      expect(calculateWinner(board)).toBeNull();
    });
  });

  describe('isBoardFull', () => {
    it('should return true when board is full', () => {
      const board = ['X', 'O', 'X', 'O', 'X', 'O', 'X', 'O', 'X'];
      expect(isBoardFull(board)).toBe(true);
    });

    it('should return false when board has empty spaces', () => {
      const board = ['X', 'O', null, 'O', 'X', null, null, null, null];
      expect(isBoardFull(board)).toBe(false);
    });

    it('should return false for empty board', () => {
      const board = [null, null, null, null, null, null, null, null, null];
      expect(isBoardFull(board)).toBe(false);
    });
  });

  describe('Game scenarios', () => {
    it('should detect a tie (board full, no winner)', () => {
      const board = ['X', 'O', 'X', 'X', 'O', 'O', 'O', 'X', 'X'];
      expect(calculateWinner(board)).toBeNull();
      expect(isBoardFull(board)).toBe(true);
    });

    it('should allow game to continue with empty spaces', () => {
      const board = ['X', null, 'O', null, 'X', null, null, null, null];
      expect(calculateWinner(board)).toBeNull();
      expect(isBoardFull(board)).toBe(false);
    });

    it('should detect win before board is full', () => {
      const board = ['X', 'X', 'X', 'O', 'O', null, null, null, null];
      expect(calculateWinner(board)).toBe('X');
      expect(isBoardFull(board)).toBe(false);
    });
  });
});
