import { Chess } from "./chess";
import { InitializeSocket } from "./web";

InitializeSocket()

const GAME = new Chess();

// Generate a visual board for game
GAME.createBoard();

GAME.generateBoardSetUp("8/8/8/8/8/8/8/6r1", true);
GAME.generateBoardSetUp("8/8/8/8/8/4R3/R6R/rK5R", false);

GAME.visualCreationOfPieces();

// NOTES: This shit of code are should update board after each move
//        not think that is good solution, but it what i can belive
//        "mon petit péché".
// NOTES: This must be run after creation of pieces!
// THINK: For now i don't really know is this is need for me,
//        but i'll keep it for now.
//document.body.addEventListener("click", checkIfClicked)
//
//function checkIfClicked() : void {
//    let left = GAME.generateNotation(true);
//    let right = GAME.generateNotation(false)
//
//    GAME.generateBoardSetUp(left, true);
//    GAME.generateBoardSetUp(right, false);
//}
