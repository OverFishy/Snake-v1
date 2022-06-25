import { getInputDirection } from "./input.js";

export const SNAKE_MOVES_PER_SECOND = 5;

const snakeBody = [ {x: 11, y: 11} ]
export const snakeHead = snakeBody[0];
let newSegments = 0; // by default our snake is not growing

export function update(params) {
  addSegments()
  const inputDirection = getInputDirection()
  for (let i = snakeBody.length - 2; i >= 0; i--) {
    snakeBody[i + 1] = { ...snakeBody[i] }; // spread it into a new object to avoid refrenece problems
  }

  snakeHead.x += inputDirection.x
  snakeHead.y += inputDirection.y
}

export function SnakeAteItSelf() {
  return onSnake(snakeHead, { ignoreHead: true })
}

export function render(gameBoard) {
  snakeBody.forEach(sagment => {
    const snakeElement = document.createElement('div');
    snakeElement.style.gridColumnStart = sagment.x;
    snakeElement.style.gridRowStart = sagment.y;
    snakeElement.classList.add('snake');
    gameBoard.appendChild(snakeElement);
  })
}

export function expandSnake(amount) {
  newSegments += amount
}

export function onSnake(position, { ignoreHead = false } = {}) {
  return snakeBody.some((segment, index) => {
    if (ignoreHead && index === 0) return false
    return equalPositions(segment, position)
  })
}

function equalPositions(pos1, pos2) {
  return pos1.x === pos2.x && pos1.y === pos2.y
}

function addSegments() {
  for ( let i = 0; i < newSegments ; i++) {
    snakeBody.push( {... snakeBody[snakeBody.length - 1]})
  }

  newSegments = 0;
}

// TRIALS

// first attmpt to decorate the snake board game, I choose to create new divs and putting them on the grid,
// they are behaving like a seperate part of the grid, and not a park of it.
// function DecorBoard() {
//   let tile = document.createElement('div');
//   tile.classList.add('gameboard-tile');
//   document.getElementById('game-board').appendChild(tile)
// }
