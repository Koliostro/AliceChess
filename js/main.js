import * as field from './field.js'
import * as pice from './pice_staff.js'

field.visualFieldGeneration()

pice.addPice(3,6, 'l', 'pice bishop_black', 'b_b_0')
pice.addPice(1,4, 'l', 'pice rock_black', 'b_r_0')
pice.addPice(1,7, 'l', 'pice knight_white', 'b_n_0')

const allPices = document.querySelectorAll('.pice')

allPices.forEach( pice => {
    pice.addEventListener('click', moveingForPices)
})

function moveingForPices (event) {
    const y = Number(event.target.parentElement.id.charAt(2))
    const x = Number(event.target.parentElement.id.charAt(0))
    const board = event.target.parentElement.id.charAt(4)
    let id = event.target.id

    pice.clear()

    switch (id.charAt(2)) {
        case 'p':
            pice.pawnMovment(x,y,board, id)
            break
        case 'r':
            pice.rockMovment(x,y,board, id)
            break
        case 'b':
            pice.bishopMovment(x,y,board, id)
            break
        case 'q':
            pice.queenMovment(x, y, board, id)
            break
        case 'k':
            pice.kingMovment(x, y, board, id)
            break
        case 'n':
            pice.knightMovment(x, y, board, id)
            break
    }
}