import * as field from './field.js'

export function pawnMovment(x, y, board, piceId) {
    if (piceId.charAt(0) === 'b') {
        if (x === 1) {
            ++x
            for (let i = 0; i < 2; i++) {
                lightMovableCells (x,y,board,piceId)
                x++
            }
        }
        else {
            ++x
            lightMovableCells (x,y,board,piceId)
        }
    }

    else {
        if (x === 6) {
            --x
            for (let i = 0; i < 2; i++) {
                lightMovableCells (x,y,board,piceId)
                x--
            }
        }
        else {
            --x
            lightMovableCells (x,y,board,piceId)
        }
    }
}

export function rockMovment(x, y, board, piceId) {
    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            if ((j === x) || (i === y)) {
                lightMovableCells(j,i,board,piceId)
            }
        }
    }
}

export function bishopMovment(x, y, board, piceId) {
    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            if (Math.abs(j - x) === Math.abs(i - y)) {
                lightMovableCells(j,i,board,piceId)
            }
        }
    }
}

export function queenMovment(x, y, board, piceId) {
    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            bishopMovment(x, y, board, piceId)
            rockMovment(x, y, board, piceId)
        }
    }
}

export function kingMovment(x, y, board, piceId) {
    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            if (Math.abs(j - x) <= 1 && Math.abs(i - y) <= 1) {
                lightMovableCells(j, i, board, piceId)
            }
        }
    }
}

export function knightMovment (x, y, board, piceId) {
    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            if ((Math.abs(j - x) === 1 && Math.abs(i - y) === 2) || (Math.abs(j - x) === 2 && Math.abs(i - y) === 1)) {
                lightMovableCells(j, i, board, piceId)
            }
        }
    }
}

function lightMovableCells (x,y,board,piceId) {
    const cell = document.getElementById(`${x},${y},${board}`)
    if (cell.hasChildNodes() !== true) {
        cell.classList.add('lighttedCell')
        cell.addEventListener('click', (event) => movingOfPices(event, piceId))
    }
}

function movingOfPices(e, piceId) {
    const y = e.target.id.charAt(2)
    const x = e.target.id.charAt(0)
    if (e.target.classList.contains('lighttedCell')) {
        move(piceId, x, y)
    }
}

export function clear() {
    const Cells = document.querySelectorAll('.cell');
    Cells.forEach(element => {
        element.classList.remove('lighttedCell')
        element.removeEventListener('click', (event) => movingOfPices)
    });
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