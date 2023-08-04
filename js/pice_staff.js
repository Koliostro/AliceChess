import * as field from './field.js'

export function pawnMovment(x, y, board, piceId) {
    x = x + 1
    for (let i = 0; i < 2; i++) {
        const cell = document.getElementById(`${x},${y},${board}`)
        cell.classList.add('lighttedCell')
        cell.addEventListener('click', (event) => {
            const y = event.target.id.charAt(2)
            const x = event.target.id.charAt(0)
            console.log(event.target)
            if (event.target.classList.contains('lighttedCell')) {
                move(piceId, x, y)
            }
        })
        x++
    }
}

function clear() {
    const Cells = document.querySelectorAll('.cell');
    Cells.forEach(element => {
        element.classList.remove('lighttedCell')
        element.removeEventListener('click', (event) => {
            const y = event.target.id.charAt(2)
            const x = event.target.id.charAt(0)
            console.log('deleted')
            move(id, x, y)})
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