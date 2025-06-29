import { Board } from "./field"
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

    /* Here need to make sure that coordinates are [x, y] */
    private placePieceLeft (position : number[], Piece : GamePiece) : number {
        if (position.every(num => ((num >= 0) && (num < 8)))) {
            this.leftField[position[0]][position[1]] = Piece;
            return 0;
        }
        else {
            return -1;
        }
    }

    private placePieceRight (position : number[], Piece : GamePiece) : number {
        if (position.every(num => ((num >= 0) && (num < 8)))) {
            this.rightField[position[0]][position[1]] = Piece;
            return 0;
        }
        else {
            return -1;
        }
    }
    
    public placePiece (isLeft : boolean, Piece : GamePiece, position : number[]) : number {
        if (position.length !== 2) {
            return -1;
        }

        if (isLeft) {
            return this.placePieceLeft(position, Piece);
        }
        else {
            return this.placePieceRight(position, Piece);
        }
    }

    public getBoard(isLeft : boolean) : GamePiece[][] {
        if (isLeft) {
            return this.leftField;
        }
        else {
            return this.rightField;
        }
    }

    public prepeareBoard() : void {
        this.boardObject = new Board()
    }

    public getIsBlackTurn() : boolean {
        return this.isBlackTurn;
    }

    public fillLeftBoard(state : GamePiece[][]) : void {
        this.leftField = state; 
    }
    
    public fillRightBoard(state : GamePiece[][]) : void {
        this.rightField = state; 
    }

    public generateNotation(isLeft : boolean) : string {
        let board : GamePiece[][];

        if (isLeft) {
            if (this.leftField.length == 0) {
                console.log("Game field are not filled with values");
                return '-1';
            }
            
            board = this.leftField;   
        }
        else {
            if (this.rightField.length == 0) {
                console.log("Game field are not filled with values");
                return '-1';
            }
            
            board = this.rightField;
        }

        // TODO : create proper generator of notation of position
        // TODO : for now we only generate position string to empty board
        //        next extension should be added when we can add pieces on
        //        board. 
        //        So next thing to add it is a piece placment on board. 
        // For now we will use only part of FEN with position

        let count_empty : number = 0;
        let position_string : string = '';

        for (let i = 0; i < board.length; i++) {
            for (let j = 0; j < board[i].length; j++) {
                if (board[i][j].color === Color.NONE) {
                    count_empty++;
                }
                else {
                    position_string = position_string.concat(count_empty.toString(), "\\");
                    count_empty = 0;
                }
            } 
            
            if (count_empty !== 0) {
                position_string = position_string.concat(count_empty.toString(), "\\");
                count_empty = 0;
            }
        }
        
        return position_string; 
    }

    // TODO : create generator for board from position string
    
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
