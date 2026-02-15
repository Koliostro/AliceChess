import { Chess } from "./chess";
import { Piece } from "./types";

const GAME = new Chess();

// Generate a visual board for game
GAME.createBoard();

GAME.generateBoardSetUp("8/8/8/8/8/8/8/6r1", true);
const leftboard = GAME.getBoard(true);

GAME.generateBoardSetUp("8/8/8/8/8/4R3/R6R/rK5R", false);
const rightboard = GAME.getBoard(false);

for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
        // Need check and DON'T run createPiece on damn empty cell!!!!
        if (leftboard[j][i].type !== Piece.EMPTY) {
            GAME.createPiece(leftboard[j][i], [i,j], true); 
        }
        
        // Need check and DON'T run createPiece on damn empty cell!!!!
        if (rightboard[j][i].type !== Piece.EMPTY) {
            GAME.createPiece(rightboard[j][i], [i,j], false); 
        } 
    }
}

console.log(GAME.getAllWhitePieces());
