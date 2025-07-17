import { Chess } from "./chess";
import {Color, GamePiece, Piece} from "./types";

let GAME = new Chess();

// Generate a visual board for game
GAME.createBoard();

GAME.generateBoardSetUp("8\\2r6\\8\\4B3\\8\\8\\8\\8\\", true);
const leftboard = GAME.getBoard(true);

GAME.generateBoardSetUp("8\\8\\8\\4r3\\8\\8\\8\\8\\", false);
const rightboard = GAME.getBoard(false);

for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
        GAME.createPiece(leftboard[j][i], [j,i], true); 
        GAME.createPiece(rightboard[j][i], [j,i], false); 
    }
}

// Generate notation for current setup
let selectedPiece = GAME.getPieceFromPos([4,3], true);

console.log("Bishop:");
if (selectedPiece !== null) {
    console.log(selectedPiece.generateAllMoves(true, GAME));
}

//GAME.generateBoardSetUp(GAME.generateNotation(true), true);
//selectedPiece = GAME.getPieceFromPos([4,3], false);
//
//console.log("Rock:");
//if (selectedPiece !== null) {
//    console.log(selectedPiece.generateAllMoves(true, GAME));
//}
