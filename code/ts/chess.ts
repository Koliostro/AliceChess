import { Board } from "./field";
import { Color, GamePiece, Piece } from "./types";

export class Chess {
    private isBlackTurn : boolean
    private isGameEnd : boolean
    private leftField : GamePiece[][] = []
    private rightField : GamePiece[][] = []
    private boardObject : Board | null = null

    constructor(isBlackTurn : boolean = false, isGameEnd : boolean = false) {
        this.isBlackTurn = isBlackTurn;
        this.isGameEnd = isGameEnd
    }

    public prepeareBoard() : void {
        this.boardObject = new Board()
    }

    public getIsBlackTurn() : boolean {
        return this.isBlackTurn;
    }
    
    public createBoard() : void {
        if (this.boardObject !== null) {
            this.boardObject.fieldGeneration();
        }

        else {
            this.prepeareBoard();
            this.createBoard();
        }
    }

    public setUpEmptyBoards() : GamePiece[][] {
        let board : GamePiece[][] = [];

        const EMPTY_CELL : GamePiece = {
           type : Piece.EMPTY,
           color : Color.NONE 
        }

        for (let i = 0; i < 8 ; i++) {
            board[i] = new Array(8).fill(EMPTY_CELL);
        }

        return board;
    }
}
