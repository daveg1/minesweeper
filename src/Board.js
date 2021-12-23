import Cell from './Cell.js'

function random(limit) {
  return Math.floor(Math.random() * limit);
}

class Board {
  constructor (width = 10, height = 10, mines = 10, game = null) {
    this.cells = []
    this.grid = []
    this.width = width
    this.height = height
    this.mines = mines
    this.game = game
    this.element = document.getElementById('board')

    // 1. Fill grid with empty cells
    // 2. Place mines
    this.setUpBoard()
    this.generateMines()
    this.handleMouseEvents()
  }

  // ========== Setup
  setUpBoard() {
    // Wipe board
    this.grid = []
    this.cells = []
    this.element.innerHTML = ''
  
    for (let i = 0; i < this.width; ++i) {
      // Row
      const row = []
  
      for (let j = 0; j < this.height; ++j) {
        const element = document.createElement('div')
        element.className = 'c-cell'
        element.dataset.state = 'hidden'

        const cell = new Cell(i,j,element)
        
        row.push(cell)
        this.cells.push(cell)
        this.element.appendChild(element)
      }
  
      this.grid.push(row)
    }
  }
  
  generateMines() {
    for (let i = 0; i < this.mines; ++i) {
      let placed = false;
      do {
        const x = random(this.width)
        const y = random(this.height)
        const cell = this.grid[x][y]
  
        if (!cell.isMine) {
          cell.isMine = true
          placed = true
        }
      } while (!placed)
    }
  }

  handleMouseEvents() {
    this.cells.forEach(cell => {
      
      // Mouse 1 pressed on cell
      // Mouse 1 moved over cell whilst pressed
      cell.element.onmousedown = // next line
      cell.element.onmouseover = e => {
        if (e.target.dataset.state !== Cell.states.HIDDEN)
          return;

        if (e.which === 1) {
          cell.state = Cell.states.PRESSED
        }
      }

      cell.element.onmouseup = e => {
        if (e.which === 1) {
          this.openCell(cell)
          this.checkWin()
        }
      }

      cell.element.onmouseout = e => {
        if (e.target.dataset.state === Cell.states.PRESSED)
          cell.state = Cell.states.HIDDEN
      }

      // Right click
      cell.element.oncontextmenu = e => {
        e.preventDefault()
        this.markCell(cell)
        this.game.updateFlags()
      }
    })
  }
  
  // ========== Helpers
  getAdjacentCells({ x, y }) {
    const adjacent = []
  
    for (let i = x-1; i <= x+1; ++i) {
      for (let j = y-1; j <= y+1; ++j) {
        // Skip out of bounds cells
        if (i < 0 || j < 0 || i >= this.width || j >= this.height)
          continue;
  
        // Skip same cell
        if (i === x && j === y)
          continue;
  
        adjacent.push(this.grid[i][j])
      }
    }
  
    return adjacent
  }

  clearMouseEvents() {
    this.cells.forEach(cell => {
      cell.element.onmousedown   = null
      cell.element.onmouseover   = null
      cell.element.onmouseup     = null
      cell.element.onmouseout    = null
      cell.element.oncontextmenu = null
    })
  }

  // ========== Actions
  openCell(cell) {
    if (cell.state !== Cell.states.HIDDEN && cell.state !== Cell.states.PRESSED)
      return;

    if (cell.isMine) {
      this.game.lose()
      return;
    }
  
    cell.state = Cell.states.OPENED

    const adjacent = this.getAdjacentCells(cell)
    const mines = adjacent.filter(c => c.isMine)
  
    if (mines.length === 0) {
      adjacent.forEach(this.openCell.bind(this))
    } else {
      cell.fill(mines.length)
      cell.remove
    }
  }

  markCell(cell) {
    if (cell.state === Cell.states.FLAGGED) {
      cell.state = Cell.states.HIDDEN
      this.game.flags++
    } else if (cell.state === Cell.states.HIDDEN) {
      cell.state = Cell.states.FLAGGED
      this.game.flags--
    }
  }
  
  setStateOfMines(state) {
    const mines = this.cells.filter(c => c.isMine)

    mines.forEach(mine => {
      mine.state = state
    })
  }

  checkWin() {
    const remaining = this.cells.filter(c => c.state !== Cell.states.OPENED && c.state !== Cell.states.PRESSED)

    if (this.game.flags === 0 || remaining.length === this.mines) {
      this.game.win()
    }
  }
}

export default Board