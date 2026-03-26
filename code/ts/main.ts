import { Chess } from "./chess";
import { InitializeSocket, stateString } from "./web";

InitializeSocket()

function waitUntilGetState() : Promise<string> {
    return new Promise((resolve, reject) => {
        const maxAttampts = 10;
        let attempts = 0;

        const interval = setInterval(() => {
            if (attempts >= maxAttampts) {
                clearInterval(interval) 
                reject(new Error('Max attempts'))
            }                
            else if (stateString !== "") {
                clearInterval(interval) 
                resolve(stateString)
            }
            attempts++
        }, 2000)        
    })
}

async function getStartstate() {
    console.log("Waiting for the state");
    let startState = "";
    try {
       startState = await waitUntilGetState() 
    } catch (error) {
        console.error(`Error: ${error}`)
    }
    return startState
}

const GAME = new Chess();

let PromisState = getStartstate().then((value) => {
    console.log(value)                                     
    
    GAME.generateBoardSetUp(value, true);
    GAME.generateBoardSetUp("8/8/8/8/8/4R3/R6R/rK5R", false);

    GAME.visualCreationOfPieces();
})

// Generate a visual board for game
GAME.createBoard();

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
