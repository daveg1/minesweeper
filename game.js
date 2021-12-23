"use strict";

const game = {
  components: {},
  mines: 10,
  flags: 10
}

const board = {
  cells: [],
  mines: [],
  width: 10,
  height: 10
}

// ========= Old code. 1st attempt

const getAdjacentCells = (x,y) => {
  const cells = []

  console.log(x-1, y-1)

  // Iterate adjacent & diagonal cells
  for (let i = x-1; i < x+2; ++i) {
    for (let j = y-1; j < y+2; ++j) {
      // Avoid out of bounds cells
      if (i < 0 || j < 0 || i >= board.width || j >= board.height)
        continue;

      cells.push([i,j])
    }
  }

  return cells
}

const openCell = (x,y) => {
  const cell = document.querySelector(`.c-cell[data-x="${x}"][data-y="${y}"]`)
  cell.dataset.state = 'opened'
  cell.innerHTML = `<span>${board.cells[x][y]}</span>`
}

const generateCells = () => {
  // 1. fill grid with zeros
  for (let i = 0; i < board.width; ++i) {
    board.cells[i] = []
    for (let j = 0; j < board.height; ++j) {
      board.cells[i][j] = 0;

      // Create HTML for cell
      const cell = document.createElement('div')
      cell.className = 'c-cell'
      cell.dataset.state = 'hidden'
      cell.dataset.x = i
      cell.dataset.y = j

      game.components.board.appendChild(cell)
    }
  }

  board.mines = []

  // 2. Place mines
  for (let i = 0; i < game.mines; ++i) {
    let placed = false;
    do {
      const x = Math.floor(Math.random() * board.width);
      const y = Math.floor(Math.random() * board.width);

      if (board.cells[x][y] !== 'x') {
        board.mines.push([x,y])
        board.cells[x][y] = 'x'
        placed = true
      }
    } while (!placed)
  }
  
  // 3. Place numbers
  let i = 0;
  for (const coords of board.mines) {
    const [x,y] = coords;
    const adjacentCells = getAdjacentCells(x,y)

    for (const cell of adjacentCells) {
      const [x,y] = cell
      // Ignore if has bomb
      if (board.cells[x][y] === 'x')
        continue;

      // Otherweise, increment number
      board.cells[x][y]++
    }
  }
}

const gameOver = () => {
  // Reveal all mines
  for (const coords of board.mines) {
    const [x,y] = coords
    openCell(x,y)
  }

  // Remove event listeners
  for (const cell of game.components.board.children) {
    cell.onclick = null
  }
}

const revealSpace = (x,y) => {
  const cells = getAdjacentCells(x,y)

  console.log(x,y,cells)
}

const checkCell = (cell) => {
  const { x, y } = cell.dataset
  const value = board.cells[x][y]

  // If hit bomb, G.O.
  if (value === 'x') {
    gameOver()
    return
  }

  // If empty space, auto expand adjacent spaces
  if (value === 0) {
    revealSpace(x,y)
  }

  cell.dataset.state = 'opened'
}

const handleClick = function(e) {
  const cell = this
  checkCell(cell)

  // if (value !== 0) cell.innerHTML = `<span data-value="${value}">${value}</span>`;

  // Unbind listener
  cell.onclick = null;
}

function newGame() {
  game.components.board = document.getElementById('board')

  // Generate bombs and numbers
  generateCells()

  // Handle cell clicks
  for (const cell of game.components.board.children) {
    cell.onclick = handleClick
    cell.oncontextmenu = e => e.preventDefault()
  }

  // Handle score
  // Handle timer
}

window.onload = e => {
  newGame()

  // button to start new game
}