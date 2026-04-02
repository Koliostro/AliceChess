import {Chess} from "./chess";

declare const LINK : string;

export let localLink : string = LINK.substring(0, LINK.length - 8);
export let WAITING = false;

export interface GameState {
    Left : string
    Right : string
}

export interface SmallState {
    IsReaded : boolean
    IsWritten : boolean
    Board : GameState
}

export function SetWaiting() {
    if (WAITING === true) {
        WAITING = false;
    }
    else {
        WAITING = true
    }
}

function updateGameState(state : GameState, Game : Chess) {
    console.log(state)
    Game.generateBoardSetUp(state.Left, true);
    Game.generateBoardSetUp(state.Right, false);
    Game.visualCreationOfPieces();
}

export async function getValue(Game : Chess) {
    fetch(LINK)
    .then((response) => {
        if (!response.ok) {
            console.error(`HTTP error: ${response.status}`)
            return "";
        }

        return response.text()
    })
    .then((text) => {
        if (text == "") {
            return "";
        }

        const state : SmallState = JSON.parse(text)

        if (!state.IsReaded) {
            return
        }

        updateGameState(state.Board, Game)
    })
    .catch((err) => {
        console.error(err)
    });
}
