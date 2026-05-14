import {GamePiece, Color, Piece, ROCK_VECTOR, BISHOP_VECTOR, QUEEN_VECTOR, TurnDone, PAWN_ATTACK_VECTOR } from "./types";
import { Board } from "./field";
import { cellStates } from "./types";
import { WAITING } from "./web";
import {Chess} from "./chess";

export class RealPiece {
    private PieceName : GamePiece;
    private Position : number[];
	private isLeft : boolean;
    private BoardLeft : GamePiece[][];
    private BoardRight : GamePiece[][];
    private HTMLPiece : HTMLElement | null = null;
    private areaListener : AbortController = new AbortController;

    private GAME : Chess    

    /**
     * Constructor for creating visual representation of Piece
     * @param PieceName - GamePiece object that fully describe piece
     */
    constructor(PieceName : GamePiece, Pos : number[], 
                isLeft : boolean, leftBoard : GamePiece[][],
                rightBoard : GamePiece[][],
                GAME : Chess) {
        this.PieceName = PieceName;
        this.Position = Pos;
		this.isLeft = isLeft;

        this.BoardLeft = leftBoard;
        this.BoardRight = rightBoard;

        this.GAME = GAME
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
        if (WAITING) return;

        let BoardCell : HTMLElement | null;
        let isEating : boolean = false;

        this.removeAllPossibleMoves();

        let moves : number[][];
        let board, opposite_board : GamePiece[][];

        if (this.isLeft) {
            opposite_board = this.BoardRight;
            board = this.BoardLeft
            moves = this.generateAllMoves(board, opposite_board);
        }
        else {
            opposite_board = this.BoardLeft
            board = this.BoardRight;
            moves = this.generateAllMoves(board, opposite_board);
        }

        for (let index = 0; index < moves.length; index++) {
            let currentMove = moves[index];
            BoardCell = Board.getCellbyPosition(currentMove, this.isLeft);

            if (BoardCell === null) continue

            // NOTES: Piece can't move to position if this cell is occupied on
            // another board.
            // NOTES: This logic aren't working with pawn. For them wa generate
            // another list os possitions for attack
            
            if (this.PieceName.type !== Piece.PAWN) {
                // NOTES: I guess that in move generation we are get [y,x],
                //        so for the rest of system we should revers this.
                let currentCell = board[currentMove[1]][currentMove[0]]
                let oppositCell = opposite_board[currentMove[1]][currentMove[0]]

                if (currentCell.color === this.getPieceName().color) continue
                if (currentCell.type !== Piece.EMPTY) {
                    if (oppositCell.type === Piece.EMPTY) {
                        Board.lightupCell(BoardCell, cellStates.underAttack);
                        isEating = true;
                    }
                }
            }
            else {
                const vector = PAWN_ATTACK_VECTOR;

                for (let index = 0; index < PAWN_ATTACK_VECTOR.length; index++) {
                    let y = this.Position[0] + vector[index][0]
                    let x = this.Position[1] + vector[index][1]

                    let attackCell = Board.getCellbyPosition([y,x], this.isLeft)

                    if (attackCell === null) continue
                    if (opposite_board[x][y].type !== Piece.EMPTY) continue 
                    if (board[x][y].type === Piece.EMPTY) continue
                    if (board[x][y].color !== this.PieceName.color) {
                        Board.lightupCell(attackCell, cellStates.underAttack)
                        isEating = true
                        Board.lightupCell(attackCell, cellStates.moveble);
                        attackCell.addEventListener("click", () => { 
                            this.movement([y,x], isEating) 
                        }, {signal : this.areaListener.signal} )
                    }
                }
            }

            Board.lightupCell(BoardCell, cellStates.moveble);
            BoardCell.addEventListener("click", () => { 
                this.movement(moves[index], isEating) 
            }, {signal : this.areaListener.signal} )
        }
    }

    private movement(endPos : number[], isEating : boolean) {
        if (WAITING) return;

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

                // DONE: Need create system that update and remove pieces that 
                //       are was eaten, so the system for mate can be accurate.
                //       But this should be done when we'll create multiplayer.
                // NOTE: I think now it works fine, because we recreate game 
                //       after every turn.
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
    private createPieceLeft(position : number[], isBlackTurn: boolean) : number {
        const visual_piece : HTMLElement = document.createElement('div');

        visual_piece.classList.add("piece");
        visual_piece.classList.add(this.getStyleFromPieceType(this.PieceName));

        const visual_position = document.getElementById(`${position[0]},${position[1]},L`);
        
        if (visual_position === null) {
            return -1;
        }
        visual_position.appendChild(visual_piece);
        if (isBlackTurn) {
            if (this.PieceName.color === Color.BLACK) {
                visual_piece.addEventListener("click", () => {
                    this.highlightAllpossibleMoves() 
                })
            }
        }
        else {
            if (this.PieceName.color !== Color.BLACK) {
                visual_piece.addEventListener("click", () => {
                    this.highlightAllpossibleMoves() 
                })
            }
        }

        this.HTMLPiece = visual_piece;

        return 0;
    }
    
    /* Creating and adding div decorated as piece to selected cell */
    private createPieceRight(position : number[], isBlackTurn : boolean) : number {
        const visual_piece : HTMLElement = document.createElement('div');
        visual_piece.classList.add("piece");
        visual_piece.classList.add(this.getStyleFromPieceType(this.PieceName));
        
        const visual_position = document.getElementById(`${position[0]},${position[1]},R`);
        
        if (visual_position === null) {
            return -1;
        }
        visual_position.appendChild(visual_piece);

        if (isBlackTurn) {
            if (this.PieceName.color === Color.BLACK) {
                visual_piece.addEventListener("click", () => {
                    this.highlightAllpossibleMoves() 
                })
            }
        }
        else {
            if (this.PieceName.color !== Color.BLACK) {
                visual_piece.addEventListener("click", () => {
                    this.highlightAllpossibleMoves() 
                })
            }
        }

        this.HTMLPiece = visual_piece;

        return 0;
    }

    /**
     * Create visual placment of figure depends on state of logic board
     * @param {number[]} position  - position for placment of new piece ([y,x])
     * @param {boolean} isLeft - flag to toggle placment on left or right board
     * @returns {number} At end return 0 if succes or -1 if error occure
     */
    public createPiece(position : number[], isLeft : boolean, isBlackTurn : boolean) : number {
        if (position.length !== 2) {
            return -1;
        }
        
        if (!position.every(num => ((num >= 0) && (num < 8)))) {
            return -1;
        }

        if (isLeft) {
            return this.createPieceLeft(position, isBlackTurn);
        }
        else {
            return  this.createPieceRight(position, isBlackTurn);
        }
    }

    private checkIfOnBoard(coord : number) : boolean {
        if (coord < 8 && coord > -1 ) {
            return true;
        }
        
        return false;
    }

   /**
    * Generation all moves using vectors.
    * Only needed for sliding pieces. 
    *
    * Maybe later should add litle changes but for now it's ok
    */
    private generateMovesFromVectors(vectors : number[][], board : GamePiece[][], opposBoard : GamePiece[][]) : number[][] {
        const result : number[][] = []; 
        let selfPos : number[] = this.Position
        let isEnd : boolean = false; 
        const selfColor = this.PieceName.color
        let x_temp : number
        let y_temp : number

        // Iterate over all vectors
        for (let index = 0; index < vectors.length; index++) {
            x_temp = selfPos[0] + vectors[index][0];
            y_temp = selfPos[1] + vectors[index][1];

            isEnd = false;

            if (!this.checkIfOnBoard(x_temp) || !this.checkIfOnBoard(y_temp)) {
                continue
            }

            if(board[y_temp][x_temp].type !== Piece.EMPTY) {
                if(board[y_temp][x_temp].color !== selfColor) {
                    if(opposBoard[y_temp][x_temp].type === Piece.EMPTY) {
                        result.push([]);
                        result[result.length - 1].push(x_temp)
                        result[result.length - 1].push(y_temp)
                        isEnd = true
                    }
                }
                else {
                    isEnd = true
                }
            }
            else {
                if(opposBoard[y_temp][x_temp].type === Piece.EMPTY) {
                    result.push([]);
                    result[result.length - 1].push(x_temp)
                    result[result.length - 1].push(y_temp)
                }
            }

            while (!isEnd) {

                // We add an empty place for new pair.  Then we put x and y
                // coord at the end of array This isn't readable at all. Maybe I
                // should to rewrite it later

                x_temp += vectors[index][0];
                y_temp += vectors[index][1];

                // Exit the loop if any of coord are invalid
                if (!this.checkIfOnBoard(x_temp) || !this.checkIfOnBoard(y_temp)) {
                    break
                }

                if(board[y_temp][x_temp].type !== Piece.EMPTY) {
                    if(board[y_temp][x_temp].color !== selfColor) {
                        if(opposBoard[y_temp][x_temp].type === Piece.EMPTY) {
                            result.push([]);
                            result[result.length - 1].push(x_temp)
                            result[result.length - 1].push(y_temp)
                            isEnd = true
                        }
                    }
                    else {
                        isEnd = true
                    }
                }
                else {
                    if(opposBoard[y_temp][x_temp].type === Piece.EMPTY) {
                        result.push([]);
                        result[result.length - 1].push(x_temp)
                        result[result.length - 1].push(y_temp)
                    }
                }
            }
        }
        return result
    }

    /*
     * Generate movment for Pieces that can be calculated via equasion
     */ 

    private generatePawnMoves(board : GamePiece[][], opposBoard : GamePiece[][]): number[][] {
        let all_moves : number[][] = [];
        let x_temp = this.Position[0];
        let y_temp = this.Position[1] - 1;

        if (board[y_temp][x_temp].type !== Piece.EMPTY) {
            all_moves.push([]);
            return all_moves;
        } 

        if (opposBoard[y_temp][x_temp].type === Piece.EMPTY) {
            all_moves.push([x_temp, y_temp]);
        }

        if (this.Position[1] === 6) {
            y_temp -= 1

            if (board[y_temp][x_temp].type !== Piece.EMPTY) {
                return all_moves;
            } 
            if (opposBoard[y_temp][x_temp].type === Piece.EMPTY) {
                all_moves.push([x_temp, y_temp]);
            }
        }

        return all_moves;
    }

    private generateKingMoves(board : GamePiece[][],
                              oposBoard : GamePiece[][]): number[][] {
        let all_moves = [];

        // Here we generate all moves by iterating over all cell and check if there needed move.
        // Theese must be true:
        // 1) | x_end - x_start | <= 1
        // 2) | y_end - y_start | <= 1

        const selfColor = this.getPieceName().color
        for (let y = 0; y < 8; y++) {
            for (let x = 0; x < 8; x++) {
                if (x === this.Position[0] && y === this.Position[1]) {
                    continue
                }
                if (Math.abs(x - this.Position[0]) <= 1 && Math.abs(y - this.Position[1]) <= 1) {
                    if (board[y][x].color === selfColor) continue;

                    let isWhiteTurn :boolean 
                    if (selfColor === Color.WHITE) {
                        isWhiteTurn = true
                    }
                    else {
                        isWhiteTurn = false
                    }

                    if (oposBoard[y][x].type !== Piece.EMPTY) continue;

                    let isAttacked = this.GAME.isUnderCheck([x, y], this.isLeft, isWhiteTurn)

                    if (!isAttacked[0]) {
                        all_moves.push([x, y])
                    }
                }
            }
        }

        return all_moves;
    }

    private generateKnightMoves(board : GamePiece[][],
                                oposBoard : GamePiece[][]) : number[][] {
        let all_moves : number[][] = [];

        // Here we geberate all moves for knight via iterating
        // Either of theese conditions must be true:
        // 1) | x_end - x_start | = 1
        //    | y_end - y_start | = 2
        // 2) | x_end - x_start | = 2
        //    | y_end - y_start | = 1

        const selfColor = this.getPieceName().color
        for (let y = 0; y < 8 ; y++) {
            for (let x = 0; x < 8; x++) {
                if (board[y][x].color === selfColor) continue;
                if (oposBoard[y][x].type !== Piece.EMPTY) continue;

                if (Math.abs(x - this.Position[0]) === 1 && Math.abs(y - this.Position[1]) === 2) {
                    all_moves.push([x, y])
                }
                if (Math.abs(x - this.Position[0]) === 2 && Math.abs(y - this.Position[1]) === 1) {
                    all_moves.push([x, y])
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
    public generateAllMoves(board : GamePiece[][], oppositeBoard : GamePiece[][], noCheck : boolean = false) : number[][] {
        let ownPieces : RealPiece[]
        let isWhiteTurn : boolean
        if (this.getPieceName().color === Color.WHITE) {
            ownPieces = this.GAME.getAllWhitePieces()
            isWhiteTurn = true
        } else {
            ownPieces = this.GAME.getAllBlackPieces()
            isWhiteTurn = false
        }

        let moves;
        switch (this.PieceName.type) {
            case Piece.PAWN:
                moves = this.generatePawnMoves(board, oppositeBoard);
                break;
            case Piece.ROCK:
                moves = this.generateMovesFromVectors(ROCK_VECTOR, board, oppositeBoard);
                break;
            case Piece.KING:
                moves = this.generateKingMoves(board, oppositeBoard);
                break;
            case Piece.KNIGHT:
                moves = this.generateKnightMoves(board, oppositeBoard)
                break;
            case Piece.BISHOP:
                moves = this.generateMovesFromVectors(BISHOP_VECTOR, board, oppositeBoard);
                break;
            case Piece.QUEEN:
                moves = this.generateMovesFromVectors(QUEEN_VECTOR, board, oppositeBoard);
                break;
            // This varian SHOULD never be happend.
            default:
                console.log("Default piece type :", this.PieceName.type);
                moves = [[]];
                break;
        }

        if (noCheck) return moves;
        
        let ownKing : RealPiece | null = null;
        for (let i = 0; i < ownPieces.length; i++) {
            if (ownPieces[i].getPieceName().type !== Piece.KING) continue;
            ownKing = ownPieces[i]
        }
        
        if (ownKing === null) return moves;

        const ownPos = ownKing.Position;
        const ownSide = ownKing.getSide();

        let [isAttacked, attacker] = this.GAME.isUnderCheck(ownPos, ownSide, isWhiteTurn)

        if (isAttacked) {
            if (attacker === null) return moves;

            let isSliding : boolean = false;

            switch (attacker.PieceName.type) {
                case Piece.ROCK:
                case Piece.BISHOP:
                case Piece.QUEEN:
                    isSliding = true
                    break;
                default:
                    isSliding = false
                    break;
            }
            
            // TODO: Need to create a mate check. 

            let filtered : number[][] = [];
            let attackerPos : number[] = attacker.getPos();

            if (isSliding) {
                let vec = [ownPos[1] - attackerPos[1], ownPos[0] - attackerPos[0]]
                let temp_vec = [vec[0], vec[1]]
                
                for (let i = 0; i < vec.length; i++) {
                    if (vec[i] === 0) vec[i] = 0;
                    if (vec[i] < 0) {
                        if (vec[i] < -1) {
                            vec[i] = -1
                        }
                    } 
                    else {
                        if (vec[i] > 1) {
                            vec[i] = 1
                        }
                    }
                }

                let maxIter = 0;
                for (let j = 0; j < temp_vec.length; j++) {
                    if (temp_vec[j] === 0) continue;
                    maxIter = Math.abs(temp_vec[j])
                }

                let allowedMoves : number[][] = [];
                let tempPos = ownPos;
                for (let j = 1; j < maxIter; j++) {
                    allowedMoves.push([])
                    allowedMoves[j-1][0] = tempPos[0] += vec[0] 
                    allowedMoves[j-1][1] = tempPos[1] += vec[1] 
                }

                let curMov : number[]
                for (let i = 0; i < moves.length; i++) {
                    curMov = moves[i] 

                    if (attackerPos[0] === curMov[0]) {
                        if (attackerPos[1] === curMov[1]) {
                            filtered.push(attackerPos)
                        } 
                    }
                    
                    for (let j = 0; j < allowedMoves.length; j++) {
                        if (curMov[0] !== allowedMoves[i][0]) continue;
                        if (curMov[1] !== allowedMoves[i][1]) continue;
                        filtered.push(curMov) 
                        break;
                    }
                }
            } else {
                let curMov : number[]
                for (let i = 0; i < moves.length; i++) {
                    curMov = moves[i] 

                    if (attackerPos[0] === curMov[0]) {
                        if (attackerPos[1] === curMov[1]) {
                            filtered.push(attackerPos)
                        } 
                    } 
                }
            }
                
            return filtered 
        }


        return moves
    }
}
