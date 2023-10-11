import * as field from './field.js'
import * as pice from './pice_staff.js'

field.visualFieldGeneration()

pice.addPice(3,6, 'l', 'pice bishop_black', 'b_b_0')
pice.addPice(1,4, 'l', 'pice rock_black', 'b_r_0')
pice.addPice(1,7, 'l', 'pice knight_white', 'b_n_0')
pice.addPice(2, 3, 'l', 'pice queen_white', 'w_q_0')
pice.addPice(1,1, 'l', 'pice king_black', 'b_k_0')
pice.addPice(1,0, 'l', 'pice pawn_white', 'w_p_0')
pice.addPice(6,0, 'l', 'pice pawn_black', 'b_p_0')

const allPices = document.querySelectorAll('.pice')

allPices.forEach( pice => {
    pice.addEventListener('click', moveingForPices)
})

function moveingForPices (event) {
    const y = Number(event.target.parentElement.id.charAt(2))
    const x = Number(event.target.parentElement.id.charAt(0))
    const board = event.target.parentElement.id.charAt(4)
    let id = event.target.id

    let boards = {
        'l': field.update_field('l'),
        'r': field.update_field('r')
    }

    pice.clear()

    switch (id.charAt(2)) {
        case 'p':
            pice.allPawnMoves(x, y, board, id, boards[board])
            boards = {
                'l': field.update_field('l'),
                'r': field.update_field('r')
            }
            break;
        case 'n':
            pice.allKnightMoves(x, y, boards[board], board, id)
            boards = {
                'l': field.update_field('l'),
                'r': field.update_field('r')
            }
            break;
        case 'k':
            pice.allKingMoves(x, y, board, id)
            boards = {
                'l': field.update_field('l'),
                'r': field.update_field('r')
            }
            break;
        case 'q':
            pice.allQueenMoves(x, y, boards[board], board, id)
            boards = {
                'l': field.update_field('l'),
                'r': field.update_field('r')
            }
            break;
        case 'r':
            pice.allRockMoves(x, y, boards[board], board, id)
            boards = {
                'l': field.update_field('l'),
                'r': field.update_field('r')
            }
            break;
        case 'b':
            pice.allBishopMoves(x, y, boards[board], board, id)
            boards = {
                'l': field.update_field('l'),
                'r': field.update_field('r')
            }
            break;
    }
}