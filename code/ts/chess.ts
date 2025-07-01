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

    /* Here need to make sure that coordinates are [x, y] 
    *  And need to test if numbers are in range
    * */
    private placePieceLeft (position : number[], Piece : GamePiece) : number {
        this.leftField[position[0]][position[1]] = Piece;
        return 0;
    }

    private placePieceRight (position : number[], Piece : GamePiece) : number {
        this.rightField[position[0]][position[1]] = Piece;
        return 0;
    }
    
    public placePiece (isLeft : boolean, Piece : GamePiece, position : number[]) : number {
        if (position.length !== 2) {
            return -1;
        }

        if (!position.every(num => ((num >= 0) && (num < 8)))) {
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

        let count_empty : number = 0;
        let position_string : string = '';

        for (let i = 0; i < board.length; i++) {
            for (let j = 0; j < board[i].length; j++) {
                if (board[i][j].color === Color.NONE) {
                    count_empty++;
                }
                else {
                    if (count_empty > 0) {
                        position_string = position_string.concat(count_empty.toString());
                    }

                    switch (board[i][j].type) {
                        case Piece.BISHOP:
                            if (board[i][j].color === Color.BLACK) {
                                position_string = position_string.concat('b');
                            }
                            else {
                                position_string = position_string.concat('B');
                            }
                            break;
                        
                        case Piece.KING:
                            if (board[i][j].color === Color.BLACK) {
                                position_string = position_string.concat('k');
                            }
                            else {
                                position_string = position_string.concat('K');
                            }
                            break;
                        
                        case Piece.KNIGHT:
                            if (board[i][j].color === Color.BLACK) {
                                position_string = position_string.concat('n');
                            }
                            else {
                                position_string = position_string.concat('N');
                            }
                            break;
                        
                        case Piece.PAWN:
                            if (board[i][j].color === Color.BLACK) {
                                position_string = position_string.concat('p');
                            }
                            else {
                                position_string = position_string.concat('P');
                            }
                            break;
                        
                        case Piece.QUEEN:
                            if (board[i][j].color === Color.BLACK) {
                                position_string = position_string.concat('q');
                            }
                            else {
                                position_string = position_string.concat('Q');
                            }
                            break;
                        
                        case Piece.ROCK:
                            if (board[i][j].color === Color.BLACK) {
                                position_string = position_string.concat('r');
                            }
                            else {
                                position_string = position_string.concat('R');
                            }
                            break;
                    }
                    count_empty = 0;
                }
            } 
            
            if (count_empty !== 0) {
                position_string = position_string.concat(count_empty.toString());
                count_empty = 0;
            }

            position_string = position_string.concat('\\');
        }
        
        return position_string; 
    }

    private checkIfTitled(str : string) : boolean {
        const regex = /[A-Z]/;
        return regex.test(str);
    }

    public generateBoardSetUp(stateString : string, isLeft : boolean) : number {
        let rowCount = 0;
        let colCount = 0;

        let board : GamePiece[][];

        if (isLeft) {
            board  = this.getBoard(true);
        }
        else {
            board  = this.getBoard(false);
        }

        const lowercase = stateString.toLowerCase();

        let EMPTY_CELL : GamePiece = {
            type : Piece.EMPTY,
            color : Color.NONE
        }

        for (let i = 0; i < 8 ; i++) {
            board[i] = new Array(8);
        }
        
        for (let i = 0; i < stateString.length; i++) {
            if (stateString[i] === '\\') {
                rowCount++;
                colCount = 0;
                continue;
            }    

            if (isNaN(Number(stateString[i]))) {
                let typeOfPiece : Piece;

                switch (lowercase[i]) {
                    case 'b':
                        typeOfPiece = Piece.BISHOP;
                        break;
                    case 'p':
                        typeOfPiece = Piece.PAWN;
                        break;
                    case 'r':
                        typeOfPiece = Piece.ROCK;
                        break;
                    case 'k':
                        typeOfPiece = Piece.KING;
                        break;
                    case 'n':
                        typeOfPiece = Piece.KNIGHT;
                        break;
                    default:
                        typeOfPiece = Piece.QUEEN;
                        break;
                }

                board[rowCount][colCount] = { 
                    type : typeOfPiece, 
                    color : this.checkIfTitled(stateString[i]) ? Color.WHITE : Color.BLACK 
                };
            }
            else {
                for (let count = 0; count < Number(stateString[i]); count++) {
                    board[rowCount][colCount + count] = EMPTY_CELL;
                }

                colCount = Number(stateString[i]) - 1;
            }

            colCount++;
        }

        return 0;
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
