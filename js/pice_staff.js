import * as field from './field.js'

export function move(idOfMovingPice, xEnd, yEnd) {
    const positionOfSelectedPice = document.getElementById(idOfMovingPice).parentElement.id
    const boardOfSelectedPice = positionOfSelectedPice.charAt(positionOfSelectedPice.length - 1)

   
    if (boardOfSelectedPice === 'l') {
        document.getElementById(`${xEnd},${yEnd},` + 'r').appendChild(document.querySelector(`#${idOfMovingPice}`))
    }
    else {
        document.getElementById(`${xEnd},${yEnd},` + 'l').appendChild(document.querySelector(`#${idOfMovingPice}`))
    }
}

export function addPice(x, y, board, pice_class, id) {
    document.getElementById(`${x},${y},${board}`).appendChild(field.createDiv(pice_class, id, true))
    if (board === 'l') {
        field.leftField[x][y] = id
    }
    else {
        field.rightField[x][y] = id
    }
}