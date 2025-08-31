import { Chess } from "./chess";
import { Board } from "./field";
import { cellStates } from "./types";

let GAME = new Chess();

// Generate a visual board for game
GAME.createBoard();

GAME.generateBoardSetUp("8\\8\\8\\8\\8\\8\\8\\8\\", true);
const leftboard = GAME.getBoard(true);

GAME.generateBoardSetUp("8\\8\\8\\4B3\\5r3\\8\\8\\8\\", false);
const rightboard = GAME.getBoard(false);

for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
        GAME.createPiece(leftboard[j][i], [i,j], true); 
        GAME.createPiece(rightboard[j][i], [i,j], false); 
    }
}

// Generate notation for current setup
let selectedPiece = GAME.getPieceFromPos([4,3], false);

console.log(selectedPiece)
console.log(rightboard)

if (selectedPiece !== null) {
    let all_cells = selectedPiece.generateAllMoves(false, GAME);
   
    // Need to finish    
    if (all_cells !== undefined) {
        for (let i = 0; i < all_cells.length; i++) {
            let HTML_cell = Board.getCellbyPosition(all_cells[i], false)

            if (HTML_cell !== null) {
                Board.lightupCell(HTML_cell, cellStates.moveble)            
            }
        }
    }
}
