import { Chess } from "./chess";
import {WEB, WAITING} from "./web";

const GAME = new Chess();

let MPHandler = new WEB(GAME)

// Set inital setup
MPHandler.getValue()

console.log("FIRST :", WAITING);

// TODO: Make lock presistent white between refresh.

// Generate a visual board for game
GAME.createBoard();

// NOTE : This shit of code are should update board after each move
//        not think that is good solution, but it what i can belive
//        "mon petit péché".
// NOTE : This must be run after creation of pieces!
// THINK: For now i don't really know is this is need for me,
//        but i'll keep it for now.
// document.body.addEventListener("click", checkIfClicked)
