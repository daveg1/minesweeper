import Board from './Board.js'
import Cell from './Cell.js'

/**
 * Manages the game state and other settings.
 */
class Game {
  constructor (width, height, mines) {
    this.width = width
    this.height = height
    this.mines = mines
    this.flags = mines
    this.board = null
  }

  updateFlags() {
    document.getElementById('flags').textContent = this.flags
  }

  updateGrid() {
    document.getElementById('board').style.cssText = `--w: ${this.width}; --h: ${this.height}`
  }

  /**
   * Starts a new game
   */
  start() {
    this.updateGrid()
    this.flags = this.mines
    this.updateFlags()
    this.board = new Board(this.height, this.width, this.mines, this)
  }

  /**
   * Signals a win
   */
  win() {
    this.board.clearMouseEvents()
    this.board.setStateOfMines(Cell.states.FLAGGED)
    document.getElementById('flags').textContent = "You win!"
  }

  /**
   * Signals a loss
   */
  lose() {
    this.board.clearMouseEvents()
    this.board.setStateOfMines(Cell.states.EXPLODED)
    document.getElementById('flags').textContent = "You lose!"
  }
}

export default Game