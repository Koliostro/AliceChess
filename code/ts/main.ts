import { Chess } from "./chess";
import {Color, GamePiece, Piece} from "./types";

let GAME = new Chess();

// Generate a visual board for game
GAME.createBoard();

// Generate empty boards for initiation
const empty_board = GAME.setUpEmptyBoards();

GAME.fillLeftBoard(empty_board);
GAME.fillRightBoard(empty_board);

GAME.generateBoardSetUp("B7\\8\\8\\8\\8\\8\\8\\8\\", true);

const leftboard = GAME.getBoard(true);

for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
        GAME.createPiece(leftboard[j][i], [j,i], true); 
    }
}

// Generate notation for current setup
console.log(GAME.generateNotation(true));
console.log(GAME.getBoard(true));

GAME.generateBoardSetUp(GAME.generateNotation(true), true);
console.log(GAME.getPieceFromPos([0,0], true));
