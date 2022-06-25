import { update as updateSnake, render as renderSnake, SNAKE_MOVES_PER_SECOND, snakeHead, SnakeAteItSelf } from './snake.js' // snake methods
import { update as updateApple, render as renderApple } from './apple.js'
import { outsideGird } from './grid.js'
import { mobileMovment } from './input.js'

let lastRenderTime = 0;
let gameOver = false

const gameBoard = document.getElementById('board-snake')

function mainGame(currentTime) {
  if (gameOver) {
    if (confirm('You lost, press ok to restart')) {
      window.location = '/'
    }
    return
  }

  window.requestAnimationFrame(mainGame); // when I can render the next frame
  const secondsSinceLastRender = (currentTime - lastRenderTime) / 1000
  if (secondsSinceLastRender < (1 / SNAKE_MOVES_PER_SECOND)) return;

  lastRenderTime = currentTime;

  update()
  render()
}

window.requestAnimationFrame(mainGame);

function update() {
  gameBoard.innerHTML = '';
  updateSnake();
  updateApple();
  checkDeath()
}

function render() {
  renderSnake(gameBoard);
  renderApple(gameBoard);
}

function checkDeath() {
  gameOver = outsideGird(snakeHead) || SnakeAteItSelf()
}

document.addEventListener("DOMContentLoaded", mobileMovment);

let tiles = []

window.onload = function() {
  fieldSetUp();
  fieldColors(tiles);
}

function fieldSetUp() {
  for (let r = 0; r < 21; r++) {
    for (let c = 0; c < 21; c++) {
      let tile = document.createElement('div');
      tiles.push(tile)
      document.getElementById('board').appendChild(tile)
    }
  }
}

function fieldColors(tiles) {
  let counter = 0
  tiles.forEach(tile => {
    counter ++
    if (counter % 2 == 0) {
      // Give green color
      tile.classList.add('green');
    } else {
      // Give light-green color
      tile.classList.add('light-green');
    }
  });
}
