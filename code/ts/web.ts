import {Chess} from "./chess";

export let WAITING = true;
export let IS_WHITE_TURN: boolean;

declare const LINK : string;

export interface GameState {
    IsYourTurn : boolean
    IsGameStarted : boolean
    Left : string
    Right : string
}

// TODO:
//      Need to make game by default in listening mode and only if there is 
//      their turn go into talking mode. Because for now we are in shit position.

export class WEB {
    // 5 sec
    private timeBetweenFetch = 5000;
    private board : GameState 
    private localLink : string = LINK.substring(-1, LINK.length - 8);

    // NOTE: I can't get it working with proper types
    private Pender : any | null = null;
    private GAME : Chess

    constructor(GAME : Chess) {
        this.board = {
            IsGameStarted : false,
            IsYourTurn : false,
            Left : "",
            Right: "" 
        } 
        this.GAME = GAME
        window.addEventListener("turnDone", () => {this.TurnHandler()})

        if (!this.board.IsGameStarted) {
            console.log("constr: START WAITING");
            this.SetWaiting() 
        }
        else {
            console.log("constr: STOP WAITING");
            this.StopWaiting()
        }
    }

    private ModifyCurtain(isRemove : boolean = true) {
        let value
        if (isRemove) {
            value = -1
        }
        else {
            value = 999
        }
        const element = document.querySelector(".curtain") as HTMLElement;
        if (element != null) {
            element.style.setProperty("z-index", `${value}`)
        } 
    }

    private WaitingPender() {
        console.log("WAITIGN");
        this.Pender = setInterval(() => {
            this.getValue() 
            console.log("PENDING");
        }, this.timeBetweenFetch) 
    }

    private TurnHandler() {
        console.log("Turn done");

        let currentTurn : string = "";

        console.log(`Res : ${this.board.Left.substring(this.board.Left.indexOf(" ") + 1 ) === "w"}`)
        console.log(`Index of space : ${this.board.Left.indexOf(" ")}`)
        console.log(`String : ${this.board.Left}`)

        if (this.board.Left.substring(this.board.Left.indexOf(" ") + 1) === "w") {
            currentTurn = "b";
        }
        else {
            currentTurn = "w"; 
        }

        // TODO: Need to check what is wrong. Because system are working, but it sometimes
        //       corrupt itself.

        this.board.Left = this.GAME.generateNotation(true) + ` ${currentTurn}`
        this.board.Right = this.GAME.generateNotation(false) + ` ${currentTurn}`

        console.log(`Sended board = ${this.board.Left}`)

        this.sendNewState()
        console.log("NOW WAIT");
        this.SetWaiting();
    }

    private SetWaiting() {
        WAITING = true
        this.WaitingPender()
    }

    private StopWaiting() {
        WAITING = false;

        if (this.Pender != null) {
            clearInterval(this.Pender);
        }
    }

    public updateGameState(state : GameState, Game : Chess) {
        const leftState = Game.generateNotation(true)
        const rightState = Game.generateNotation(false)
        let isUpdate = false

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

            this.StopWaiting();
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

            if (state.IsGameStarted) {
                this.ModifyCurtain()
                this.board.IsYourTurn = state.IsYourTurn
                this.board.Left = state.Left
                this.board.Right = state.Right

                // TODO: Need chenge to smh 'cause before first turn black has no image.
                if (state.IsYourTurn) {
                    this.updateGameState(state, this.GAME)
                }
            }
        })
        .catch((err) => {
            console.error(err)
            clearInterval(this.Pender)
        });
    }

    public async sendNewState() {
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
