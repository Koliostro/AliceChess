import { Chess } from "./chess";
import {getValue, GameState, localLink, WAITING, SetWaiting} from "./web";

const GAME = new Chess();

// Set inital setup
getValue(GAME)

// Generate a visual board for game
GAME.createBoard();

// NOTES: This shit of code are should update board after each move
//        not think that is good solution, but it what i can belive
//        "mon petit péché".
// NOTES: This must be run after creation of pieces!
// THINK: For now i don't really know is this is need for me,
//        but i'll keep it for now.
document.body.addEventListener("click", checkIfClicked)

let isSend = false;

function checkIfClicked() : void {
    let board : GameState = {
        Left : GAME.generateNotation(true),
        Right : GAME.generateNotation(false)
    }

    if (WAITING && !isSend) {
        fetch(localLink + "/newState", {
            method: "POST",
            headers: new Headers({
                'content-type': 'application/json',
            }),
            body: JSON.stringify(board)
        })

        SetWaiting();

        isSend = true;
    }
}
