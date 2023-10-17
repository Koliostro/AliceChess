import * as field from './field.js'

// movment section

function isValidMoveBishop(x, y, newX, newY, board) {
  // Diagonal movement check
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

  return true;

}

export function allBishopMoves(x, y, board, visible_board, pieceId) {

  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      if (isValidMoveBishop(x, y, i, j, board)) {
        lightMovableCells(i, j, visible_board, pieceId)
      }
    }
  }

}

function isValidMoveRock(x, y, newX, newY, board) {
  // strait line movement check
  if (x !== newX && y !== newY) {
    return false;
  }

  if (x === newX) {
    const yOffset = newY > y ? 1 : -1;
    let yPos = y + yOffset;
    while (yPos !== newY) {
      if (board[x][yPos] !== null) {
        return false
      }
      yPos += yOffset
    }
  }

  if (y === newY) {
    const xOffset = newX > x ? 1 : -1;
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

export function allRockMoves(x, y, board, visible_board, pieceId) {

  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      if (isValidMoveRock(x, y, i, j, board)) {
        lightMovableCells(i, j, visible_board, pieceId)
      }
    }
  }

}

function isValidMoveQueen(x, y, newX, newY, board) {
  if (isValidMoveBishop(x, y, newX, newY, board) || isValidMoveRock(x, y, newX, newY, board) === true) {
    return true;
  }
  return false;
}

export function allQueenMoves(x, y, board, visible_board, pieceId) {

  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      if (isValidMoveQueen(x, y, i, j, board)) {
        lightMovableCells(i, j, visible_board, pieceId)
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

export function allKingMoves(x, y, visible_board, pieceId) {

  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      if (isValidMoveKing(x, y, i, j)) {
        lightMovableCells(i, j, visible_board, pieceId)
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

export function allKnightMoves(x, y, board, visible_board, pieceId) {

  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      if (isValidMoveKnight(x, y, i, j, board)) {
        lightMovableCells(i, j, visible_board, pieceId)
      }
    }
  }

}

function isValidMovePawn(x, y, newX, newY, pieceId, board) {
  const pawn_color = pieceId.charAt(0)

  if (pawn_color === 'w') {
    if ((x === 1) && (board[2][y] === null)) {
      if ((newY === y) && (newX - x ===  2)) {
        return true;
      }
    }
    if ((newY === y) && (newX - x === 1)) {
      return true;
    }
  }

  if (pawn_color === 'b') {
    if ((x === 6) && (board[4][y] === null)) {
      if ((newY === y) && (newX - x ===  -2)) {
        return true;
      }
    }
    if ((newY === y) && (newX - x === -1)) {
      return true;
    }
  }

  return false;
}

export function allPawnMoves(x, y, visible_board, pieceId, board) {

  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      if (isValidMovePawn(x, y, i, j, pieceId, board)) {
        lightMovableCells(i, j, visible_board, pieceId)
      }
    }
  }

}

// technucal section

//cell manipulation
var pieceid;

function lightMovableCells(x, y, board, pieceId) {
  const cell = document.getElementById(x + ',' + y + ',' + board);
  if (cell.hasChildNodes() !== true) {
    pieceid = pieceId;
    cell.classList.add(`lighttedCell`);
    cell.addEventListener('click', movingOfpieces);
  }
}

export function clear() {
  const Cells = document.querySelectorAll('.cell');
  Cells.forEach(element => {
    element.classList.remove('lighttedCell')
    element.removeEventListener('click', movingOfpieces)
  });
}

// basic piece operations

function movingOfpieces(e) {
  let pieceId = pieceid;
  const y = e.target.id.charAt(2)
  const x = e.target.id.charAt(0)
  if (e.target.classList.contains('lighttedCell')) {
    move(pieceId, x, y)
  }
}

export function move(idOfMovingPiece, xEnd, yEnd) {
  const positionOfSelectedPiece = document.getElementById(idOfMovingPiece).parentElement.id
  const boardOfSelectedPiece = positionOfSelectedPiece.charAt(positionOfSelectedPiece.length - 1)

  if (boardOfSelectedPiece === 'l') {
    document.getElementById(`${xEnd},${yEnd},` + 'r').appendChild(document.querySelector(`#${idOfMovingPiece}`))
    field.rightField[xEnd][yEnd] = idOfMovingPiece
    field.leftField[positionOfSelectedPiece.charAt(0)][positionOfSelectedPiece.charAt(2)] = ""
    clear()
  }
  else {
    document.getElementById(`${xEnd},${yEnd},` + 'l').appendChild(document.querySelector(`#${idOfMovingPiece}`))
    field.leftField[xEnd][yEnd] = idOfMovingPiece
    field.rightField[positionOfSelectedPiece.charAt(0)][positionOfSelectedPiece.charAt(2)] = ""
    clear()
  }
}

/* 
 
For pieces I create some specific id : {(b)lack/(w)hite}_{(p)awn/(r)ock/k(n)ight/(b)ishop/(k)ing/(q)ueen}_{number}
 
for example: b_p_0 => black_pawn_0
             w_h_1 => white_knight_1
 
*/

export function addpiece(x, y, board, piece_class, id) {
  document.getElementById(`${x},${y},${board}`).appendChild(field.createDiv(piece_class, id, true))
  if (board === 'l') {
    field.leftField[x][y] = id
  }
  else {
    field.rightField[x][y] = id
  }
}