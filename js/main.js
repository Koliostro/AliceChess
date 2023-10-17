import * as field from './field.js'
import * as piece from './pice_staff.js'

field.visualFieldGeneration()

piece.addpiece(3,6, 'l', 'piece bishop_black', 'b_b_0')
piece.addpiece(1,4, 'l', 'piece rock_black', 'b_r_0')
piece.addpiece(1,7, 'l', 'piece knight_white', 'b_n_0')
piece.addpiece(2, 3, 'l', 'piece queen_white', 'w_q_0')
piece.addpiece(1,1, 'l', 'piece king_black', 'b_k_0')
piece.addpiece(1,0, 'l', 'piece pawn_white', 'w_p_0')
piece.addpiece(6,0, 'l', 'piece pawn_black', 'b_p_0')

const allPeices = document.querySelectorAll('.piece')

allPeices.forEach( piece => {
    piece.addEventListener('click', moveingForPieces)
})

function moveingForPieces (event) {
    const y = Number(event.target.parentElement.id.charAt(2))
    const x = Number(event.target.parentElement.id.charAt(0))
    const board = event.target.parentElement.id.charAt(4)
    let id = event.target.id

    let boards = {
        'l': field.update_field('l'),
        'r': field.update_field('r')
    }

    piece.clear()

    switch (id.charAt(2)) {
        case 'p':
            piece.allPawnMoves(x, y, board, id, boards[board])
            boards = {
                'l': field.update_field('l'),
                'r': field.update_field('r')
            }
            break;
        case 'n':
            piece.allKnightMoves(x, y, boards[board], board, id)
            boards = {
                'l': field.update_field('l'),
                'r': field.update_field('r')
            }
            break;
        case 'k':
            piece.allKingMoves(x, y, board, id)
            boards = {
                'l': field.update_field('l'),
                'r': field.update_field('r')
            }
            break;
        case 'q':
            piece.allQueenMoves(x, y, boards[board], board, id)
            boards = {
                'l': field.update_field('l'),
                'r': field.update_field('r')
            }
            break;
        case 'r':
            piece.allRockMoves(x, y, boards[board], board, id)
            boards = {
                'l': field.update_field('l'),
                'r': field.update_field('r')
            }
            break;
        case 'b':
            piece.allBishopMoves(x, y, boards[board], board, id)
            boards = {
                'l': field.update_field('l'),
                'r': field.update_field('r')
            }
            break;
    }
}