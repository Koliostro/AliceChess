import * as field from './field.js'

// movment section

function isValidMoveBishop(x, y, newX, newY, board) {
  // Проверка, двигался ли слон по диагонали
  if (Math.abs(newX - x) !== Math.abs(newY - y)) {
    return false;
  }

  const xOffset = newX > x ? 1 : -1;
  const yOffset = newY > y ? 1 : -1;

  let xPos = x + xOffset
  let yPos = y + yOffset

  while (xPos !== newX && yPos !== newY) {

    try {

      if (board[xPos][yPos] !== null || board[xPos][yPos] === undefined) {
        return false
      }

    } catch (TypeError) {
      return;
    }

    xPos += xOffset
    yPos += yOffset

  }

  return true; // Позиция является валидным ходом

}

export function allBishopMoves(x, y, board, visible_board, piceId) {

  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      if (isValidMoveBishop(x, y, i, j, board)) {
        lightMovableCells(i, j, visible_board, piceId)
      }
    }
  }

}

function isValidMoveRock(x, y, newX, newY, board) {
  // Проверка, двигался ли слон по диагонали
  if (x !== newX && y !== newY) {
    return false;
  }

  if (x === newX) {
    const yOffset = newY > y ? 1:-1;
    let yPos = y + yOffset;
    while (yPos !== newY) {
      if (board[x][yPos] !== null) {
        return false
      }
      yPos += yOffset
    }
  }

  if (y === newY) {
    const xOffset = newX > x ? 1:-1;
    let xPos = x + xOffset;
    while (xPos !== newX) {
      if (board[xPos][y] !== null) {
        return false
      }
      xPos += xOffset
    }
  }

  return true;
}

export function allRockMoves(x, y, board, visible_board, piceId) {

  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      if (isValidMoveRock(x, y, i, j, board)) {
        lightMovableCells(i, j, visible_board, piceId)
      }
    }
  }

}

function isValidMoveQueen(x, y, newX, newY, board) {
  if (isValidMoveBishop(x,y,newX, newY, board) || isValidMoveRock(x, y, newX, newY, board) === true) {
    return true;
  }
  return false;
}

export function allQueenMoves(x, y, board, visible_board, piceId) {

  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      if (isValidMoveQueen(x, y, i, j, board)) {
        lightMovableCells(i, j, visible_board, piceId)
      }
    }
  }

}

function isValidMoveKing(x, y, newX, newY) {
  if ((Math.abs(newX - x) <= 1) && (Math.abs(newY - y) <= 1)) {
    return true;
  }

  return false;
}

export function allKingMoves(x, y, board, visible_board, piceId) {

  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      if (isValidMoveKing(x, y, i, j, board)) {
        lightMovableCells(i, j, visible_board, piceId)
      }
    }
  }

}

function isValidMoveKnight(x, y, newX, newY) {
  if ((Math.abs(newX - x) === 1 && Math.abs(newY - y) === 2) || (Math.abs(newX - x) === 2 && Math.abs(newY - y) === 1)) {
    return true;
  }

  return false;
}

export function allKnightMoves(x, y, board, visible_board, piceId) {

  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      if (isValidMoveKnight(x, y, i, j, board)) {
        lightMovableCells(i, j, visible_board, piceId)
      }
    }
  }

}

// technucal section

//cell manipulation

function lightMovableCells(x, y, board, piceId) {
  const cell = document.getElementById(x + ',' + y + ',' + board);
  if (cell.hasChildNodes() !== true) {
    cell.classList.add(`lighttedCell`);
    cell.addEventListener('click', (event) => movingOfPices(event, piceId));
  }
}

export function clear() {
  const Cells = document.querySelectorAll('.cell');
  Cells.forEach(element => {
    element.classList.remove('lighttedCell')
    element.removeEventListener('click', (event) => movingOfPices)
  });
}

// basic pice operations

function movingOfPices(e, piceId) {
  const y = e.target.id.charAt(2)
  const x = e.target.id.charAt(0)
  if (e.target.classList.contains('lighttedCell')) {
    move(piceId, x, y)
  }
}

export function move(idOfMovingPice, xEnd, yEnd) {
  const positionOfSelectedPice = document.getElementById(idOfMovingPice).parentElement.id
  const boardOfSelectedPice = positionOfSelectedPice.charAt(positionOfSelectedPice.length - 1)

  if (boardOfSelectedPice === 'l') {
    document.getElementById(`${xEnd},${yEnd},` + 'r').appendChild(document.querySelector(`#${idOfMovingPice}`))
    field.rightField[xEnd][yEnd] = idOfMovingPice
    field.leftField[positionOfSelectedPice.charAt(0)][positionOfSelectedPice.charAt(2)] = ""
    clear()
  }
  else {
    document.getElementById(`${xEnd},${yEnd},` + 'l').appendChild(document.querySelector(`#${idOfMovingPice}`))
    field.leftField[xEnd][yEnd] = idOfMovingPice
    field.rightField[positionOfSelectedPice.charAt(0)][positionOfSelectedPice.charAt(2)] = ""
    clear()
  }
}

/* 
 
For pices I create some specific id : {(b)lack/(w)hite}_{(p)awn/(r)ock/k(n)ight/(b)ishop/(k)ing/(q)ueen}_{number}
 
for example: b_p_0 => black_pawn_0
             w_h_1 => white_knight_1
 
*/

export function addPice(x, y, board, pice_class, id) {
  document.getElementById(`${x},${y},${board}`).appendChild(field.createDiv(pice_class, id, true))
  if (board === 'l') {
    field.leftField[x][y] = id
  }
  else {
    field.rightField[x][y] = id
  }
}