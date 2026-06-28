/**
 * Any alive cell with less than 2 neighbors dies from under population
 * Any alive cell with 2-3 neighbors stays alive
 * Any alive cell with more than 3 neighbors dies from over population
 * Any dead cell with exactly 3 neighbors revives
 */

import { describe, expect, it } from '@jest/globals';

const CellStatus = {
  alive: 'alive',
  dead: 'dead',
} as const;
type CellStatus = (typeof CellStatus)[keyof typeof CellStatus];

class Cell {
  private status: CellStatus;

  private constructor(status: CellStatus) {
    this.status = status;
  }

  public static alive() {
    return new Cell(CellStatus.alive);
  }

  public static dead() {
    return new Cell(CellStatus.dead);
  }

  isAlive() {
    return this.status === CellStatus.alive;
  }

  die() {
    this.status = CellStatus.dead;
  }

  revive() {
    this.status = CellStatus.alive;
  }
}

describe('The game of life', () => {
  describe('cells', () => {
    it('can be alive', () => {
      const cell = Cell.alive();
      expect(cell.isAlive()).toBe(true);
    });
    it('can be dead', () => {
      const cell = Cell.dead();
      expect(cell.isAlive()).toBe(false);
    });
    it('can die', () => {
      const cell = Cell.alive();
      cell.die();
      expect(cell.isAlive()).toBe(false);
    });
    it('can revive', () => {
      const cell = Cell.dead();
      cell.revive();
      expect(cell.isAlive()).toBe(true);
    });
  });
});
