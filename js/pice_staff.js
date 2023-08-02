import * as field from './field.js'

export function move(idOfMovingPice, xEnd, yEnd) {
    const positionOfSelectedPice = document.getElementById(idOfMovingPice).parentElement.id
    const boardOfSelectedPice = positionOfSelectedPice.charAt(positionOfSelectedPice.length - 1)
   
    if (boardOfSelectedPice === 'l') {
        document.getElementById(`${xEnd},${yEnd},` + 'r').appendChild(document.querySelector(`#${idOfMovingPice}`))
        field.rightField[xEnd][yEnd] = idOfMovingPice
        field.leftField[positionOfSelectedPice.charAt(0)][positionOfSelectedPice.charAt(2)] = ""
    }
    else {
        document.getElementById(`${xEnd},${yEnd},` + 'l').appendChild(document.querySelector(`#${idOfMovingPice}`))
        field.leftField[xEnd][yEnd] = idOfMovingPice
        field.rightField[positionOfSelectedPice.charAt(0)][positionOfSelectedPice.charAt(2)] = ""
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