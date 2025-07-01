import { Chess } from "./chess";
import {Color, GamePiece, Piece} from "./types";

let GAME = new Chess();

// Generate a visual board for game
GAME.createBoard();

// Generate empty boards for initiation
const empty_board = GAME.setUpEmptyBoards();

GAME.fillLeftBoard(empty_board);
GAME.fillRightBoard(empty_board);

const TestPiece : GamePiece = {
    type : Piece.BISHOP,
    color : Color.BLACK
}

const TestPiece2 : GamePiece = {
    type : Piece.ROCK,
    color : Color.WHITE
}

GAME.placePiece(true, TestPiece, [0,2]);
GAME.placePiece(true, TestPiece2, [1,2]);

// Generate notation for current setup
console.log(GAME.generateNotation(true));
console.log(GAME.getBoard(true));

GAME.generateBoardSetUp(GAME.generateNotation(true), true);
