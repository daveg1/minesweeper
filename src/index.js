"use strict";

import Game from './Game.js'

window.onload = e => {
  const game = new Game(30,20,100)
  game.start()

  document.getElementById('new-game').onclick = game.start.bind(game)
}