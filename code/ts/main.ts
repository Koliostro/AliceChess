import { Chess } from "./chess";

let GAME = new Chess();

// Generate a visual board for game
GAME.createBoard();

// Generate empty boards for initiation
const empty_board = GAME.setUpEmptyBoards();

GAME.fillLeftBoard(empty_board);
GAME.fillRightBoard(empty_board);

// Generate notation for current setup
console.log(GAME.generateNotation(true));
