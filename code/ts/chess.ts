import { Board } from "./field"
import {RealPiece} from "./piece";
import { Color, GamePiece, Piece } from "./types";

export class Chess {
    private isGameEnd : boolean;
    private leftField : GamePiece[][] = []
    private rightField : GamePiece[][] = []
    private boardObject : Board | null = null
    
    private allWhitePieces : RealPiece[] = [];
    private allBlackPieces : RealPiece[] = [];

    /**
     * @param [isGameEnd=false] - Flag that signals if game has ended. By
     * default it set to false
     * @param [isBlackTurn=false] - Flag that signals which turn is it. By
     * default it is white's turn
     */
    constructor(isGameEnd : boolean = false) {
        this.isGameEnd = isGameEnd
    }

    /**
     * Remove all pieces from board so new pieces can be created.
     */
    public clearBoards() {
        this.allBlackPieces.forEach((value) => {
            value.destructor()                            
        })
        this.allWhitePieces.forEach((value) => {
            value.destructor()                            
        })

        this.allBlackPieces = []
        this.allWhitePieces = []

        this.rightField = []
        this.leftField = []
    }

    // TODO:
    //      Need to check is this working, 'cause i still can confuse x and y
    //      and next i need to set way to filter moves in case of check. 
    // NOTE:
    //      I've rewrite it a little and now it can check any square. So I can
    //      use it in king's movement to not let him step under check.
    
   /**
    * Check is cell is under attack
    * @param {number[]} Position - position of checking cell
    * @param {boolean} isLeft - determent which of two boards are used
    * @param {boolean} isWhiteTurn - Flag that change who used as enemy
    * @returns {boolean} boolean
    */ 
    public isUnderCheck(Position : number[], isLeft : boolean, isWhiteTurn : boolean) : [boolean, RealPiece | null, number[][] | null] {
        /**
         *  1) Get position of king 
         *  2) get all enemy pieces
         *  3) iterate over all pieces and skip thouse that not on the same 
         *     board as king
         *  4) If at least some of possible cells are king's position, king are
         *     under check.
         */

        let EnemyPieces : RealPiece[]

        if (isWhiteTurn) {
            EnemyPieces = this.allBlackPieces
        }
        else {
            EnemyPieces = this.allWhitePieces 
        }
        
        for (let i = 0; i < EnemyPieces.length; i++) {
            let curPiece = EnemyPieces[i]

            if (curPiece.getSide() !== isLeft) continue;
            if (curPiece.getPieceName().type === Piece.KING) continue; 

            let allMoves = curPiece.generateAllMoves(this.getBoard(isLeft), this.getBoard(!isLeft), true)

            if (allMoves.length < 1) continue;
            
            for (let j = 0; j < allMoves.length; j++) {
                if (allMoves[j].length === 0) break;
                if (allMoves[j][0] !== Position[0]) continue;
                if (allMoves[j][1] !== Position[1]) continue;
                return [true, curPiece, allMoves]
            }

        }
        return [false, null, null]
    }

    /**
     * Iterate over all boards and create visual pieces at board
     * @param isBlackTurn - select which turn to flip board
     * @returns void
     */
    public visualCreationOfPieces(isBlackTurn : boolean) {
        const leftboard = this.getBoard(true);
        const rightboard = this.getBoard(false);
        for (let i = 0; i < 8; i++) {
            for (let j = 0; j < 8; j++) {
                // Need check and DON'T run createPiece on damn empty cell!!!!
                if (leftboard[j][i].type !== Piece.EMPTY) {
                    this.createPiece(leftboard[j][i], [i,j], true, isBlackTurn); 
                }
                
                if (rightboard[j][i].type !== Piece.EMPTY) {
                    this.createPiece(rightboard[j][i], [i,j], false, isBlackTurn); 
                } 
            }
        }
    }
    
    /**
     * Method to get all black pieces
     * @returns array of Piece class object
     */
    public getAllBlackPieces() {
        return this.allBlackPieces;
    }
    
    /**
     * Method to get all white pieces
     * @returns array of Piece class object
     */
    public getAllWhitePieces() {
        return this.allWhitePieces;
    }

    /**
     * Get cell from given position.
     * @param Pos - Coordinates of cell in form [x,y]
     * @param isLeft - Flag to determen side.
     * @returns Either null if cell is empty or RealPiece object located at
     * given place
     */
    public getPieceFromPos(Pos : number[], isLeft : boolean) : RealPiece | null {
        let board : GamePiece[][];

        if (isLeft) {
            board = this.leftField;
        }
        else {
            board = this.rightField;
        }

        const selectedPiece = board[Pos[1]][Pos[0]];
        let finded;
        const Piece_color = selectedPiece.color;
        const Piece_type = selectedPiece.type;

        switch (Piece_color) {
            case Color.BLACK:
                 finded =  this.allBlackPieces.find(
                    piece => ( piece.getPieceName().type === Piece_type))

                 if (finded === undefined) {
                    finded = null;
                 }

                 return finded;
            case Color.WHITE:
                 finded = this.allWhitePieces.find(
                    piece => ( piece.getPieceName().type === Piece_type))

                 if (finded === undefined) {
                    finded = null;
                 }

                 return finded;
            case Color.NONE:
                return null;
        }
    }

    /**
     * Method are provide way to create piece from piece's description. It
     * should be used only to display state of logic board. 
     * @param Piece - Piece's description i.e type and color 
     * @param position - Array of 2 integers between 0 and 7 incusivly. For
     * position representation
     * @param isLeft - Logical flag to represent on which board piece are
     * placed 
     */
    public createPiece(Piece : GamePiece, position : number[], isLeft : boolean, isBlackTurn : boolean) {
        let new_Piece : RealPiece = new RealPiece(Piece, position, isLeft, this.leftField, this.rightField, this)
        let result = new_Piece.createPiece(position, isLeft, isBlackTurn);
        
        if (result !== -1) {
            if (Piece.color === Color.WHITE ) {
                this.allWhitePieces.push(new_Piece);
            }
            if (Piece.color === Color.BLACK) {
                this.allBlackPieces.push(new_Piece);
            }
        }
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
    
    /**
     * Method for placing pieces onto logical board. 
     * @param Piece - GamePiece object for piece description i.e type and color
     * @param position - Array of 2 integers between 0 and 7 incusivly to
     * determen position of piece
     * @param isLeft - Flag to determen side of piece placment
     * @returns Either 0 at succes or -1 at error
     */

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

    /**
     * Method to get current state of logical board
     * @param isLeft - Flag that determen which board should be returned
     * @returns 2d array with current state of selected board
     */
    public getBoard(isLeft : boolean) : GamePiece[][] {
        if (isLeft) {
            return this.leftField;
        }
        else {
            return this.rightField;
        }
    }

    /**
     * Set board with selected state [2d array], now deprecated in favor of FEH
     * @param isLeft - select for which board state are
     * @param state - 2d array that describe new state
     */
    public setBoard(isLeft : boolean, state : GamePiece[][]) : void {
        if (isLeft) {
           for (let y = this.leftField.length; y < 8; y++) {
                for (let x = this.leftField[0].length; x < 8; x++) {
                    this.leftField[y][x] = state[y][x];
                }
           } 
        }
        else {
           for (let y = this.rightField.length; y < 8; y++) {
                for (let x = this.rightField[0].length; x < 8; x++) {
                    this.rightField[y][x] = state[y][x];
                }
           } 
        }
    }

    /**
     * Method to create Board object for future usage
     */
    private prepeareBoard() : void {
        this.boardObject = new Board()
    }

    /**
     * Method to assigne board state to left board
     * @param state - 2d array of GamePiece object that describe state at board
     */
    public fillLeftBoard(state : GamePiece[][]) : void {
        this.leftField = state; 
    }
    
    /**
     * Method to assigne board state to right board
     * @param state - 2d array of GamePiece object that describe state at board
     */
    public fillRightBoard(state : GamePiece[][]) : void {
        this.rightField = state; 
    }
    
    /**
     * Method to generate FEN notation from current position at logical board
     * @param isLeft - Flag that determen state of which board are we intrested
     * @returns string of FEN notation
     */
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

            position_string = position_string.concat('/');
        }

        let prepeareString = position_string.slice(0, position_string.length - 1); 

        return prepeareString
    }

    private checkIfTitled(str : string) : boolean {
        const regex = /[A-Z]/;
        return regex.test(str);
    }

    /**
     * Generate game state from feh notation
     * @param isLeft - select to shich board this state are
     * @param isInvers - flag that determen do we need to invers board
     * @param stateString - string with feh notation (NOTE: I use obly part of it)
     */
    public generateBoardSetUp(stateString : string, isLeft : boolean, isInvers : boolean) : number {
        let rowCount = 0;
        let colCount = 0;
        let countPieces = 0;
        
        let board = this.getBoard(isLeft)

        let EMPTY_CELL : GamePiece = {
            type : Piece.EMPTY,
            color : Color.NONE
        }

        for (let i = 0; i < 8 ; i++) {
            board[i] = new Array(8);
       }

        stateString = stateString.substring(0, stateString.indexOf(" "))

        if (isInvers) {
            console.log(`Original array = ${stateString}`)
            console.log(`Reversed array = ${stateString.split("/").reverse().join("/")}`)
            stateString = stateString.split("/").reverse().join("/")
        }
        
        const lowercase = stateString.toLowerCase();

        const size = stateString.length
        for (let i = 0; i < size; i++) {

            // Move to new line
            if (stateString[i] === '/') {
                rowCount++;
                colCount = 0;
                countPieces = 0;
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

                let isTilted = this.checkIfTitled(stateString[i]) 
                let color = isTilted ? Color.WHITE : Color.BLACK

                board[rowCount][colCount] = { 
                    type : typeOfPiece, 
                    color : color
                };

                colCount++;
                countPieces++;
            }
            else {
                const AmountEmpty = Number(stateString[i])

                for (let count = 0; count < AmountEmpty; count++) {
                    board[rowCount][colCount + count] = EMPTY_CELL;
                }

                colCount = AmountEmpty + colCount
            }
        }

        // DONE: Fixing board setup generation. 
        // DONE: Fix statestring generation

        return 0;
    }
    
    /**
     * Method to creating board and handling if board are already created
     */
    public createBoard() : void {
        if (this.boardObject !== null) {
            this.boardObject.fieldGeneration();
        }

        else {
            this.prepeareBoard();
            this.createBoard();
        }
    }

    /**
     * Method to generate board filled with empty cells
     * @returns 2d array of empty cells
     */
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
