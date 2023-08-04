import * as field from './field.js'
import * as pice from './pice_staff.js'

field.visualFieldGeneration()

pice.addPice(0,0, 'l', 'pice pawn_black', 'b_p_0')
pice.addPice(0,1, 'l', 'pice pawn_black', 'b_p_1')
pice.addPice(0,2, 'l', 'pice pawn_black', 'b_p_2')

const allPices = document.querySelectorAll('.pice')

allPices.forEach( pice => {
    pice.addEventListener('click', moveingForPices)
})

function moveingForPices (event) {
    const y = Number(event.target.parentElement.id.charAt(2))
    const x = Number(event.target.parentElement.id.charAt(0))
    const board = event.target.parentElement.id.charAt(4)

    console.log(event.target.id)

    pice.pawnMovment(x,y,board, event.target.id)
}