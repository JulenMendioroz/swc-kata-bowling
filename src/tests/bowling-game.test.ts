import { describe, expect, it } from '@jest/globals';

type Frame = {
  startsAt: number;
};

class BowlingGame {
  private rolls: number[] = [];

  roll(pins: number) {
    this.rolls.push(pins);
  }

  calculateTotalScore() {
    return this.frames().reduce((total, frame) => total + this.calculateFrameScore(frame), 0);
  }

  calculateFrameScore({ startsAt }: Frame) {
    return (this.rolls.at(startsAt) ?? 0) + (this.rolls.at(startsAt + 1) ?? 0);
  }

  frames(): Frame[] {
    const amountOfFrames = 10;
    return Array.from({ length: amountOfFrames }, (_, i) => ({ startsAt: 2 * i }));
  }
}

describe('bowling game', () => {
  it('should be able to calculate the total score for the worst game', () => {
    const game = new BowlingGame();
    rollMany(game, 20, 0);
    expect(game.calculateTotalScore()).toBe(0);
  });

  it('should be able to calculate the total score for game with all ones', () => {
    const game = new BowlingGame();
    rollMany(game, 20, 1);
    expect(game.calculateTotalScore()).toBe(20);
  });

  it('should be able to calculate the total score for a game with a spare and an extra non-zero roll', () => {
    const game = new BowlingGame();
    rollMany(game, 3, 5);
    rollMany(game, 17, 0);
    expect(game.calculateTotalScore()).toBe(20);
  });
});

function rollMany(game: BowlingGame, times: number, pins: number) {
  Array.from({ length: times }).forEach(() => game.roll(pins));
}
