import { Chess } from "./chess";

const GAME = new Chess();

// Generate a visual board for game
GAME.createBoard();

//GAME.generateBoardSetUp("8\\8\\8\\8\\8\\8\\8\\8\\", true);
//const leftboard = GAME.getBoard(true);

GAME.generateBoardSetUp("8/8/8/8/8/4R3/R6R/RK5R", false);
const rightboard = GAME.getBoard(false);

for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
//        GAME.createPiece(leftboard[j][i], [i,j], true); 
        GAME.createPiece(rightboard[j][i], [i,j], false); 
    }
}

console.log(GAME.getAllWhitePieces());
