import { onSnake, expandSnake } from './snake.js'
import { randomGridPosition } from './grid.js'

let apple = getRandomApplePosition()
let score = 0;
//  Creating 1st apple animation element
let appleElement = document.createElement('div');

const appleBoard = document.getElementById('board-apple');

const EXPANSION_RATE = 1;

export function render() {
  // Checking if the apple animation & the apple element are on the same spot
  const isAppleShouldMove = (
    appleElement.style.gridColumnStart != apple.x ||
    appleElement.style.gridRowStart != apple.y
  )

  if (isAppleShouldMove) {
    console.log('We should be creating an apple');
    // Deleting every apple animation element from the desegnated board
    appleBoard.innerHTML = '';
    // recreating it on the spot of the new apple element.
    appleElement = document.createElement('div');
    appleElement.classList.add('apple');
    appleElement.style.gridColumnStart = apple.x;
    appleElement.style.gridRowStart = apple.y;
    appleBoard.appendChild(appleElement);
  }
}

export function update() {
  if (onSnake(apple)) {
    expandSnake(EXPANSION_RATE);
    apple = getRandomApplePosition()
    score ++
    document.getElementById('score').innerHTML = `Score: ${score}`
  }
}

function getRandomApplePosition() {
  let newApplePosition
  while (newApplePosition == null || onSnake(newApplePosition)) {
    newApplePosition = randomGridPosition(1, 21)
  }
  return newApplePosition
}
