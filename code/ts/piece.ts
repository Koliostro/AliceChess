import {GamePiece, Color, Piece, ROCK_VECTOR, BISHOP_VECTOR, QUEEN_VECTOR, TurnDone } from "./types";
import { Board } from "./field";
import { cellStates } from "./types";
import {WAITING, WEB} from "./web";

export class RealPiece {
    private PieceName : GamePiece;
    private Position : number[];
	private isLeft : boolean;
    private BoardLeft : GamePiece[][];
    private BoardRight : GamePiece[][];
    private HTMLPiece : HTMLElement | null = null;
    private areaListener : AbortController = new AbortController;

    /**
     * Constructor for creating visual representation of Piece
     * @param PieceName - GamePiece object that fully describe piece
     */
    constructor(PieceName : GamePiece, Pos : number[], 
                isLeft : boolean, leftBoard : GamePiece[][],
                rightBoard : GamePiece[][]) {
        this.PieceName = PieceName;
        this.Position = Pos;
		this.isLeft = isLeft;

        this.BoardLeft = leftBoard;
        this.BoardRight = rightBoard;
    }

    public destructor() {
        this.areaListener.abort()
        this.HTMLPiece?.remove()
    }

    private removeAllPossibleMoves() {
        let BoardCell, BoardCell_left : HTMLElement | null;
        for (let y = 0; y < 8; y++) {
            for (let x = 0; x < 8; x++) {
                BoardCell = Board.getCellbyPosition([x,y], this.isLeft);
                BoardCell_left = Board.getCellbyPosition([x,y], !this.isLeft);

                if (BoardCell !== null) {
                    Board.lightupCell(BoardCell, cellStates.idle);
                }
                if (BoardCell_left !== null) {
                    Board.lightupCell(BoardCell_left, cellStates.idle);
                }
            }
        }
    }

    /**
     * Show all possible moves for selected piece
     * @returns nothing
     */
    private highlightAllpossibleMoves() : void {
        console.log(WAITING);
        if (WAITING) {
            return;
        }

        let BoardCell : HTMLElement | null;
        let isEating : boolean = false;

        this.removeAllPossibleMoves();

        let moves : number[][];
        let board, opposite_board : GamePiece[][];

        if (this.isLeft) {
            moves = this.generateAllMoves(this.BoardLeft);
            board = this.BoardLeft
            opposite_board = this.BoardRight;
        }
        else {
            moves = this.generateAllMoves(this.BoardRight);
            board = this.BoardRight;
            opposite_board = this.BoardLeft
        }

        for (let index = 0; index < moves.length; index++) {
            let currentMove = moves[index];
            BoardCell = Board.getCellbyPosition(currentMove, this.isLeft);

            if (BoardCell === null) {
                continue
            }

            // NOTES: Piece can't move to position if this cell is occupied on another
            //        board.
            if (opposite_board[currentMove[1]][currentMove[0]].type !== Piece.EMPTY) {
                continue
            }
            //NOTES: This logic aren't working with pawn. For them wa generate another
            //       list os possitions for attack
            if (this.PieceName.type !== Piece.PAWN) {
                // NOTES: I guess that in move generation we are get [y,x],
                //        so for the rest of system we should revers this.
                if (board[currentMove[1]][currentMove[0]].type !== Piece.EMPTY) {
                    Board.lightupCell(BoardCell, cellStates.underAttack);
                    isEating = true;
                }
            }
            else {
                // TODO: Create generation of attack for PAWNs.
            }

            Board.lightupCell(BoardCell, cellStates.moveble);
            BoardCell.addEventListener("click", () => { 
                this.movement(moves[index], isEating) 
            }, {signal : this.areaListener.signal} )
        }
    }

    private movement(endPos : number[], isEating : boolean) {
        if (WAITING) {
            return
        }

        const EMPTY_CELL = {
            type : Piece.EMPTY,
            color : Color.NONE 
        }
        let board : GamePiece[][];
        let opposite : GamePiece[][];

        if (this.isLeft) {
            board = this.BoardLeft;
            opposite = this.BoardRight;
        }
        else {
            board = this.BoardRight;
            opposite = this.BoardLeft;
        }
        
        if (this.HTMLPiece !== null) {
            this.HTMLPiece.remove();

            let endCell = Board.getCellbyPosition(endPos, !this.isLeft)
            let endCellOwnBoard = Board.getCellbyPosition(endPos, this.isLeft)
            if (isEating && endCellOwnBoard !== null) {
                let enemyPiece = endCellOwnBoard.firstChild
                
                // NOTES: enemyPiece is never null in this circumstances.
                enemyPiece?.remove();

                // TODO: Need create system that update and remove pieces that are
                //       was eaten, so the system for mate can be accurate. But 
                //       this should be done when we'll create multiplayer.
                board[endPos[1]][endPos[0]] = EMPTY_CELL;
            }
            if (endCell !== null) {
                endCell.appendChild(this.HTMLPiece);
            }
        }
        this.removeAllPossibleMoves();
        // NOTES: This little line are my savier! 
        //        Because it can remove all eventListeners at once!
        this.areaListener.abort();
        
        this.areaListener = new AbortController;

        opposite[endPos[1]][endPos[0]] = this.PieceName;
        board[this.Position[1]][this.Position[0]] = EMPTY_CELL;
        this.Position = endPos;
        this.isLeft = !this.isLeft;

        window.dispatchEvent(TurnDone)
    }

	public getSide() : boolean {
		return this.isLeft;
	}

	public getPos() : number[] {
		return this.Position;
	}

    private getStyleFromPieceType(PlayingPiece : GamePiece): string {
       switch (PlayingPiece.type) {
        case Piece.PAWN:
            if (PlayingPiece.color === Color.BLACK) {
                return "black_pawn";
            }
            if (PlayingPiece.color === Color.WHITE) {
                return "white_pawn";
            }
			break
        case Piece.ROCK:
            if (PlayingPiece.color === Color.BLACK) {
                return "black_rock";
            }
            if (PlayingPiece.color === Color.WHITE) {
                return "white_rock";
            }
			break
        case Piece.KING:
            if (PlayingPiece.color === Color.BLACK) {
                return "black_king";
            }
            if (PlayingPiece.color === Color.WHITE) {
                return "white_king";
            }
			break
        case Piece.KNIGHT:
            if (PlayingPiece.color === Color.BLACK) {
                return "black_knight";
            }
            if (PlayingPiece.color === Color.WHITE) {
                return "white_knight";
            }
			break
        case Piece.BISHOP:
            if (PlayingPiece.color === Color.BLACK) {
                return "black_bishop";
            }
            if (PlayingPiece.color === Color.WHITE) {
                return "white_bishop";
            }
			break
        case Piece.QUEEN:
        if (PlayingPiece.color === Color.BLACK) {
                return "black_queen";
            }
            if (PlayingPiece.color === Color.WHITE) {
                return "white_queen";
            }
			break
       }
       return "";
    }

    /**
     * Getter for name of piece
     * @returns GamePiece
     */
    public getPieceName() {
        return this.PieceName;
    }
    
    /* For coordinates: number at index 0 is x 
     *                  number at index 1 are y*/
    private createPieceLeft(position : number[]) : number {
        const visual_piece : HTMLElement = document.createElement('div');

        visual_piece.classList.add("piece");
        visual_piece.classList.add(this.getStyleFromPieceType(this.PieceName));

        const visual_position = document.getElementById(`${position[0]},${position[1]},L`);
        
        if (visual_position === null) {
            return -1;
        }
        visual_position.appendChild(visual_piece);
        visual_piece.addEventListener("click", () => {
            this.highlightAllpossibleMoves() 
        })

        this.HTMLPiece = visual_piece;

        return 0;
    }
    
    /* Creating and adding div decorated as piece to selected cell */
    private createPieceRight(position : number[]) : number {
        const visual_piece : HTMLElement = document.createElement('div');
        visual_piece.classList.add("piece");
        visual_piece.classList.add(this.getStyleFromPieceType(this.PieceName));
        
        const visual_position = document.getElementById(`${position[0]},${position[1]},R`);
        
        if (visual_position === null) {
            return -1;
        }
        visual_position.appendChild(visual_piece);
        visual_piece.addEventListener("click", () => {
            this.highlightAllpossibleMoves() 
        })

        this.HTMLPiece = visual_piece;

        return 0;
    }

    /**
     * Create visual placment of figure depends on state of logic board
     * @param {number[]} position  - position for placment of new piece ([y,x])
     * @param {boolean} isLeft - flag to toggle placment on left or right board
     * @returns {number} At end return 0 if succes or -1 if error occure
     */
    public createPiece(position : number[], isLeft : boolean) : number {
        if (position.length !== 2) {
            return -1;
        }
        
        if (!position.every(num => ((num >= 0) && (num < 8)))) {
            return -1;
        }

        if (isLeft) {
            return this.createPieceLeft(position);
        }
        else {
            return  this.createPieceRight(position);
        }
    }

    private checkIfOnBoard(coord : number) : boolean {
        if (coord < 8 && coord > -1 ) {
            return true;
        }
        
        return false;
    }
    
    /*
     * Here we check if cell is empty or not.
     */
   private checkColide(Position : number[], board : GamePiece[][]) : boolean {
       const x = Position[0];
       const y = Position[1];
       
       if (board[y][x].color !== Color.NONE) {
           return true
       }

       return false;
   } 

   /**
    * Generation all moves using vectors.
    * Only needed for sliding pieces. 
    *
    * Maybe later should add litle changes but for now it's ok
    */
   private generateMovesFromVectors(vectors : number[][], board : GamePiece[][]) : number[][] {
       const result : number[][] = []; 
       let calculated : number[] = [];
       let isEnd : boolean = false; 
       const opposite_color = this.PieceName.color === Color.BLACK ? Color.WHITE : Color.BLACK


       // Iterate over all vectors
       for (let index = 0; index < vectors.length; index++) {

           // We copy position for future calculation and don't mess with real position
           calculated = [];
           this.Position.map(item => (calculated.push(item)));

           const x_temp = calculated[0] += vectors[index][0];
           const y_temp = calculated[1] += vectors[index][1];

           isEnd = false;

           if (this.checkIfOnBoard(calculated[0]) && this.checkIfOnBoard(calculated[1])) {
               if (this.checkColide(calculated, board)) {
                   if (board[y_temp][x_temp].color === opposite_color) {
                       result.push([]);
                       calculated.map(item => (result[result.length - 1].push(item)));
                       isEnd = true;
                   }
                   else {
                       isEnd = true;
                   }
               }
           }
           else {
                isEnd = true;
           }

           while (!isEnd) {

               // We add an empty place for new pair.
               // Then we put x and y coord at the end of array
               // This isn't readable at all. Maybe I should to rewrite it later

               result.push([]);
               calculated.map(item => (result[result.length - 1].push(item)));

               const x_temp = calculated[0] += vectors[index][0];
               const y_temp = calculated[1] += vectors[index][1];

               // Exit the loop if any of coord are invalid
               if (!this.checkIfOnBoard(calculated[0]) || !this.checkIfOnBoard(calculated[1])) {
                   break
               }

               // Check colide
               if (this.checkColide(calculated, board)) {
                   if (board[y_temp][x_temp].color === opposite_color) {
                       result.push([]);
                       calculated.map(item => (result[result.length - 1].push(item)));
                       isEnd = true;
                   }
                   else {
                       isEnd = true;
                   }
               }
           }
       }

       return result;
   }

    /*
     * Generate movment for Pieces that can be calculated via equasion
     */ 

    private generatePawnMoves(board : GamePiece[][]): number[][] {
        /* TODO: It should be chenged when i'll create a multiplayer because
        * player's pieces will be always at the bottom, so right equation for
        * them is [x_movable, y_start + 1]. But for now it should be :
                * [x_movable, y_start +- 1]*/
        let all_moves = [];
        if (this.PieceName.color == Color.WHITE) {
            let x_temp = this.Position[0];
            let y_temp = this.Position[1] - 1;

            if (board[x_temp][y_temp].color !== Color.NONE) {
                all_moves.push([]);
                return all_moves;
            } 

            all_moves.push([x_temp, y_temp]);
            return all_moves;
        }
        if (this.PieceName.color === Color.BLACK) {
            let x_temp = this.Position[0];
            let y_temp = this.Position[1] + 1;

            if (board[x_temp][y_temp].color !== Color.NONE) {
                all_moves.push([]);
                return all_moves;
            } 

            all_moves.push([x_temp, y_temp]);
            return all_moves;
        }
        // Return error if color is NONE. But it shouldn't happend
        return [[-1, -1]] 
    }

    private generateKingMoves(board : GamePiece[][]): number[][] {
        let all_moves = [];

        // Here we generate all moves by iterating over all cell and check if there needed move.
        // Theese must be true:
        // 1) | x_end - x_start | <= 1
        // 2) | y_end - y_start | <= 1

        for (let y_temp = 0; y_temp < 8; y_temp++) {
            for (let x_temp = 0; x_temp < 8; x_temp++) {
                if (x_temp === this.Position[0] && y_temp === this.Position[1]) {
                    continue
                }
                if (Math.abs(x_temp - this.Position[0]) <= 1 && Math.abs(y_temp - this.Position[1]) <= 1) {
                    if (board[y_temp][x_temp].color === this.getPieceName().color) {
                        continue
                    }
                    all_moves.push([x_temp, y_temp])
                }
            }
        }

        return all_moves;
    }

    private generateKnightMoves(board : GamePiece[][]) : number[][] {
        let all_moves : number[][] = [];

        // Here we geberate all moves for knight via iterating
        // Either of theese conditions must be true:
        // 1) | x_end - x_start | = 1
        //    | y_end - y_start | = 2
        // 2) | x_end - x_start | = 2
        //    | y_end - y_start | = 1

        for (let y_temp = 0; y_temp < 8 ; y_temp++) {
            for (let x_temp = 0; x_temp < 8; x_temp++) {
                if (board[y_temp][x_temp].color === this.getPieceName().color) {
                    continue
                }
                if (Math.abs(x_temp - this.Position[0]) === 1 && Math.abs(y_temp - this.Position[1]) === 2) {
                    all_moves.push([x_temp, y_temp])
                }
                if (Math.abs(x_temp - this.Position[0]) === 2 && Math.abs(y_temp - this.Position[1]) === 1) {
                    all_moves.push([x_temp, y_temp])
                }
            }
        }
        
        return all_moves;
    }

    /**
     * Generate all possible moves for any selected piece. After that function we need to check further for possibility to move
     * @param isLeft selector for wich board we working
     * @param GameState game object for getting needed information about game
     * @returns Array of positions that are theoreticaly avaible for movment
     */
    public generateAllMoves(board : GamePiece[][]) : number[][] {
        switch (this.PieceName.type) {
            case Piece.PAWN:
                return this.generatePawnMoves(board);
            case Piece.ROCK:
                return this.generateMovesFromVectors(ROCK_VECTOR, board);
            case Piece.KING:
                // TODO Casteling position for King
                let moves = this.generateKingMoves(board);
                return moves;
            case Piece.KNIGHT:
                return this.generateKnightMoves(board)
            case Piece.BISHOP:
                return this.generateMovesFromVectors(BISHOP_VECTOR, board);
            case Piece.QUEEN:
                return this.generateMovesFromVectors(QUEEN_VECTOR, board);
            // This varian SHOULD never be happend.
			default:
				return [[]];
        }
    }
}
