import {Chess} from "./chess";

export let WAITING = false;
export let IS_WHITE_TURN: boolean;

declare const LINK : string;

export interface GameState {
    IsWhiteTurn : boolean
    Left : string
    Right : string
}

export class WEB {
    private board : GameState 
    private localLink : string = LINK.substring(-1, LINK.length - 8);
    private GAME : Chess

    constructor(GAME : Chess) {
        this.board = {
            IsWhiteTurn : true,
            Left : "",
            Right: "" 
        } 
        this.GAME = GAME
        window.addEventListener("turnDone", () => {this.TurnHandler()})
    }

    private TurnHandler() {
        console.log("Turn done");

        this.board.IsWhiteTurn = !IS_WHITE_TURN
        this.board.Left = this.GAME.generateNotation(true)
        this.board.Right = this.GAME.generateNotation(false)

        console.log(this.GAME.getBoard(true))
        console.log(this.GAME.generateNotation(false))

        this.sendNewState()
    }

    static SetWaiting() {
        WAITING = true
    }

    static StopWaiting() {
        WAITING = false;
    }

    public updateGameState(state : GameState, Game : Chess) {
        const leftState = Game.generateNotation(true)
        const rightState = Game.generateNotation(false)
        let isUpdate = false

        try {
            if (state.Left != leftState) {
                Game.generateBoardSetUp(state.Left, true);
                isUpdate = true
            }
            if (state.Right != rightState) {
                Game.generateBoardSetUp(state.Right, false);
                isUpdate = true
            }
            if (isUpdate) {
                Game.clearBoards()
                Game.visualCreationOfPieces();
            }
        }
        catch(err) {
            console.error(err)
        }
    }

    public async getValue() {
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

            const state : GameState = JSON.parse(text)

            IS_WHITE_TURN = state.IsWhiteTurn

            this.updateGameState(state, this.GAME)
        })
        .catch((err) => {
            console.error(err)
        });
    }
    public sendNewState() : void {
        console.log("New state!");
        fetch(this.localLink + "/newState", {
            method: "POST",
            headers: new Headers({
                'content-type': 'application/json',
            }),
            body: JSON.stringify(this.board)
        })
    }
}
