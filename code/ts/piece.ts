import {Chess} from "./chess";
import {GamePiece, Color, Piece, ROCK_VECTOR, BISHOP_VECTOR, QUEEN_VECTOR } from "./types";

export class RealPiece {
    private PieceName : GamePiece;
    private Position : number[];
	private isLeft : boolean;

    /**
     * Constructor for creating visual representation of Piece
     * @param PieceName - GamePiece object that fully describe piece
     */
    constructor(PieceName : GamePiece, Pos : number[], isLeft : boolean) {
        this.PieceName = PieceName;
        this.Position = Pos;
		this.isLeft = isLeft;
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
        
        visual_position?.appendChild(visual_piece);
		
        
        return 0;
    }
    
    /* Creating and adding div decorated as piece to selected cell */
    private createPieceRight(position : number[]) : number {
        const visual_piece : HTMLElement = document.createElement('div');
        visual_piece.classList.add("piece");
        visual_piece.classList.add(this.getStyleFromPieceType(this.PieceName));
        
        const visual_position = document.getElementById(`${position[0]},${position[1]},R`);
        
        visual_position?.appendChild(visual_piece);
        
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
                return this.generateKingMoves(board);
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


//    movementOfPieces(event: Event & { target: HTMLElement }): void {
//        if (event.target.id.charAt(0) !== Game.currentMove) {
//            return
//        }
//
//        const positionStart: number[] = [Number(event.target.parentElement?.id.charAt(2)), Number(event.target.parentElement?.id.charAt(0))]
//        const side = event.target.parentElement?.id.charAt(4);
//
//        Board.Clear();
//
//        if (side === 'L') {
//            let selected = ArrayBoards.L[positionStart[0]][positionStart[1]];
//            if (!event.target.parentElement?.classList.contains(`selectedCell`)) {
//                selected[0].lightAllPossibleMove()
//            }
//            else {
//                Board.Clear();
//            }
//        }
//
//        else if (side === 'R') {
//            let selected = ArrayBoards.R[positionStart[0]][positionStart[1]];
//
//            if (!event.target.parentElement?.classList.contains(`selectedCell`)) {
//                selected[0].lightAllPossibleMove()
//            }
//            else {
//                Board.Clear();
//            }
//        }
//    }
//}
//export class King extends Piece {
//    public isMoved: boolean;
//
//    constructor(id: string, position: number[], isLeft: boolean, isMoved: boolean = false) {
//        super(id, position, isLeft)
//        this.isMoved = isMoved
//    }
//
//    create(): void { // color = black/white
//        const color = this.id.charAt(0) === 'b' ? 'black' : 'white'
//        super.createPiece(`${color}_king`, this.isLeft)
//    }
//
//    isVailedMove(positionStart: number[], positionEnd: number[]): boolean {
//        if ((Math.abs(positionEnd[0] - positionStart[0]) <= 1 && (Math.abs(positionStart[1] - positionEnd[1]) <= 1))) {
//            if (!Cell.isUnderAttack(positionEnd, !this.isBlack, this.isLeft) && !Cell.isUnderAttack(positionEnd, !this.isBlack, !this.isLeft)) {
//                return true
//            }
//        }
//        return false
//    }
//
//    isVailedCasteling(positionStart: number[], positionEnd: number[], isLeft: boolean, isBlack: boolean): boolean {
//        if (!isBlack) {
//            if (!this.isMoved && (positionEnd[0] === 2 || positionEnd[0] === 6)) {
//                if (positionStart[1] === positionEnd[1]) {
//                    if (positionEnd[0] === 2 && !Cell.isEmpty([0, positionStart[1]], isLeft)) {
//                        if ((Cell.isEmpty([1, positionStart[1]], isLeft) && Cell.isEmpty([2, positionStart[1]], isLeft) && Cell.isEmpty([3, positionStart[1]], isLeft)) && Cell.isEmpty([2, positionStart[1]], !isLeft) && Cell.isEmpty([3, positionStart[1]], !isLeft)) {
//                            if (!Cell.isUnderAttack([1, positionStart[1]], !isBlack, isLeft) && !Cell.isUnderAttack([2, positionStart[1]], !isBlack, isLeft) && !Cell.isUnderAttack([3, positionStart[1]], !isBlack, isLeft) && !Cell.isUnderAttack([2, positionStart[1]], !isBlack, !isLeft)) {
//                                return true
//                            }
//                        }
//                    }
//                    if (positionEnd[0] === 6 && !Cell.isEmpty([7, positionStart[1]], isLeft)) {
//                        if ((Cell.isEmpty([5, positionStart[1]], isLeft) && Cell.isEmpty([6, positionStart[1]], isLeft)) && (Cell.isEmpty([5, positionStart[1]], !isLeft) && Cell.isEmpty([6, positionStart[1]], !isLeft))) {
//                            if (!Cell.isUnderAttack([5, positionStart[1]], !isBlack, isLeft) && !Cell.isUnderAttack([6, positionStart[1]], !isBlack, isLeft) && !Cell.isUnderAttack([6, positionStart[1]], !isBlack, !isLeft)) {
//                                return true
//                            }
//                        }
//                    }
//                }
//            }
//        }
//        else {
//            if (!this.isMoved && (positionEnd[0] === 1 || positionEnd[0] === 5)) {
//                if (positionStart[1] === positionEnd[1]) {
//                    if (positionEnd[0] === 5 && !Cell.isEmpty([7, positionStart[1]], isLeft)) {
//                        if ((Cell.isEmpty([4, positionStart[1]], isLeft) && Cell.isEmpty([5, positionStart[1]], isLeft) && Cell.isEmpty([6, positionStart[1]], isLeft)) && (Cell.isEmpty([4, positionStart[1]], !isLeft) && Cell.isEmpty([5, positionStart[1]], !isLeft))) {
//                            if (!Cell.isUnderAttack([4, positionStart[1]], !isBlack, isLeft) && !Cell.isUnderAttack([5, positionStart[1]], !isBlack, isLeft) && !Cell.isUnderAttack([6, positionStart[1]], !isBlack, isLeft) && !Cell.isUnderAttack([5, positionStart[1]], !isBlack, !isLeft)) {
//                                return true
//                            }
//                        }
//                    }
//                    if (positionEnd[0] === 1 && !Cell.isEmpty([0, positionStart[1]], isLeft)) {
//                        if ((Cell.isEmpty([1, positionStart[1]], isLeft) && Cell.isEmpty([2, positionStart[1]], isLeft)) && (Cell.isEmpty([1, positionStart[1]], !isLeft) && Cell.isEmpty([2, positionStart[1]], !isLeft))) {
//                            if (!Cell.isUnderAttack([1, positionStart[1]], !isBlack, isLeft) && !Cell.isUnderAttack([2, positionStart[1]], !isBlack, isLeft) && !Cell.isUnderAttack([1, positionStart[1]], !isBlack, !isLeft)) {
//                                return true
//                            }
//                        }
//                    }
//                }
//            }
//        }
//        return false
//    }
//
//    lightAllPossibleMove(isSecretly: boolean = false): void {
//        this.numberPossibleMoves = 0;
//        Cell.lightStartCell(this.position, this.isLeft, isSecretly)
//        for (let i = 0; i < 8; i++) {
//            for (let j = 0; j < 8; j++) {
//                if (this.isVailedCasteling(this.position, [i, j], this.isLeft, this.isBlack)) {
//                    Cell.lightMovableCell([i, j], this.isLeft, isSecretly)
//                    Cell.lightCastelingCell([i, j], this.isLeft, isSecretly)
//                    this.numberPossibleMoves += 1
//                }
//                if (this.isVailedMove(this.position, [i, j])) {
//                    if ((ArrayBoards.L[j][i].length === 0) && (ArrayBoards.R[j][i].length === 0)) {
//                        if (i !== this.position[0] || j !== this.position[1]) {
//                            Cell.lightMovableCell([i, j], this.isLeft, isSecretly)
//                            this.numberPossibleMoves += 1
//                        }
//                    }
//                    if (this.position[0] !== i || this.position[1] !== j) {
//                        if (this.isLeft === true) {
//                            if (ArrayBoards.L[j][i].length !== 0 && ArrayBoards.R[j][i].length === 0 && ArrayBoards.L[j][i][0].isBlack !== this.isBlack) {
//                                Cell.lightEatableCell([i, j], this.isLeft, isSecretly)
//                                this.numberPossibleMoves += 1
//                            }
//                        }
//                        else {
//                            if (ArrayBoards.R[j][i].length !== 0 && ArrayBoards.L[j][i].length === 0 && ArrayBoards.R[j][i][0].isBlack !== this.isBlack) {
//                                Cell.lightEatableCell([i, j], this.isLeft, isSecretly)
//                                this.numberPossibleMoves += 1
//                            }
//                        }
//                    }
//                }
//            }
//        }
//    }
//}
//export class Bishop extends Piece {
//
//    constructor(id: string, position: number[], isLeft: boolean) {
//        super(id, position, isLeft)
//    }
//
//    create(): void { // color = black/white
//        const color = this.id.charAt(0) === 'b' ? 'black' : 'white'
//        super.createPiece(`${color}_bishop`, this.isLeft)
//    }
//
//    isVailedMove(positionStart: number[], positionEnd: number[]): boolean {
//        if (Math.abs(positionStart[0] - positionEnd[0]) !== Math.abs(positionStart[1] - positionEnd[1])) {
//            return false
//        }
//
//        // -----------[Pinned check]--------------
//        if (super.isPinned(this.isLeft)) {
//            return false
//        }
//        // ---------------------------------------
//
//        const xOffset = positionEnd[0] > positionStart[0] ? 1 : -1;
//        const yOffset = positionEnd[1] > positionStart[1] ? 1 : -1;
//
//        let xPos = positionStart[0] + xOffset
//        let yPos = positionStart[1] + yOffset
//
//        while (xPos !== positionEnd[0] && yPos !== positionEnd[1]) {
//
//            if (this.isLeft === true) {
//                if (ArrayBoards.L[yPos][xPos].length !== 0) {
//                    return false
//                }
//            }
//
//            if (this.isLeft === false) {
//                if (ArrayBoards.R[yPos][xPos].length !== 0) {
//                    return false
//                }
//            }
//
//            xPos += xOffset
//            yPos += yOffset
//
//        }
//
//        return true;
//    }
//
//    lightAllPossibleMove(isSecretly: boolean = false): void {
//        Cell.lightStartCell(this.position, this.isLeft, isSecretly)
//        this.numberPossibleMoves = 0
//        // --------------------------------------------------------------------------------------
//        // check is our king under attack
//        if (this.isBlack && CheckSystem.IsBlackAttacked && CheckSystem.AttackingPiecePos != null) {
//            // if we're on a same side only legal move it to eat attacking piece or block their way
//            // Save king position of our team
//            let kingUnderAttack = this.isBlack ? CheckSystem.BKingPos.pos : CheckSystem.WKingPos.pos
//            switch (CheckSystem.AttackingPiece) {
//                // Check is it movment by straight line
//                case 'r' || 'q':
//                    // Check is king and piece on same or not board
//                    if ((CheckSystem.IsBlackAttacked === this.isBlack) && (CheckSystem.AttackingPiecePos.side !== this.isLeft)) {
//                        if (CheckSystem.AttackingPiecePos.pos[0] === kingUnderAttack[0]) {
//                            let start = CheckSystem.AttackingPiecePos.pos[1] < kingUnderAttack[1] ? CheckSystem.AttackingPiecePos.pos[1] : kingUnderAttack[1]
//
//                            let end = CheckSystem.AttackingPiecePos.pos[1] < kingUnderAttack[1] ? kingUnderAttack[1] : CheckSystem.AttackingPiecePos.pos[1]
//
//                            for (let Y_i = start; Y_i < end; Y_i++) {
//                                if (this.isVailedMove(this.position, [CheckSystem.AttackingPiecePos.pos[0], Y_i])) {
//                                    Cell.lightMovableCell([CheckSystem.AttackingPiecePos.pos[0], Y_i], this.isLeft, isSecretly)
//                                    this.numberPossibleMoves += 1
//                                }
//                            }
//                            return
//                        }
//                        if (CheckSystem.AttackingPiecePos.pos[1] === kingUnderAttack[1]) {
//                            let start = CheckSystem.AttackingPiecePos.pos[0] < kingUnderAttack[0] ? CheckSystem.AttackingPiecePos.pos[0] : kingUnderAttack[0]
//
//                            let end = CheckSystem.AttackingPiecePos.pos[0] < kingUnderAttack[0] ? kingUnderAttack[0] : CheckSystem.AttackingPiecePos.pos[0]
//
//                            for (let X_i = start; X_i < end; X_i++) {
//                                if (this.isVailedMove(this.position, [CheckSystem.AttackingPiecePos.pos[0], X_i])) {
//                                    Cell.lightMovableCell([CheckSystem.AttackingPiecePos.pos[0], X_i], this.isLeft, isSecretly)
//                                    this.numberPossibleMoves += 1
//                                }
//                            }
//                            return
//                        }
//                    }
//                    // Separtly check is this piece can eat attacker
//                    if (this.isVailedMove(this.position, CheckSystem.AttackingPiecePos.pos)) {
//                        Cell.lightMovableCell(CheckSystem.AttackingPiecePos.pos, this.isLeft, isSecretly)
//                        Cell.lightEatableCell(CheckSystem.AttackingPiecePos.pos, this.isLeft, isSecretly)
//                        this.numberPossibleMoves += 1
//                    }
//                    break;
//                case 'b' || 'q':
//                    // Check is king and piece on same or not board
//                    if ((CheckSystem.IsBlackAttacked === this.isBlack) && (CheckSystem.AttackingPiecePos.side !== this.isLeft)) {
//                        let start = CheckSystem.AttackingPiecePos.pos < kingUnderAttack ? CheckSystem.AttackingPiecePos.pos : kingUnderAttack
//
//                        let end = CheckSystem.AttackingPiecePos.pos < kingUnderAttack ? kingUnderAttack : CheckSystem.AttackingPiecePos.pos
//
//                        for (let X_i = start[0]; X_i < end[0]; X_i++) {
//                            for (let Y_i = start[1]; Y_i < end[1]; Y_i++) {
//                                if (this.isVailedMove(this.position, [X_i, Y_i])) {
//                                    Cell.lightMovableCell([X_i, Y_i], this.isLeft, isSecretly)
//                                    this.numberPossibleMoves += 1
//                                }
//                            }
//                            return
//                        }
//                    }
//                    // Separtly check is this piece can eat attacker
//                    if (this.isVailedMove(this.position, CheckSystem.AttackingPiecePos.pos)) {
//                        Cell.lightMovableCell(CheckSystem.AttackingPiecePos.pos, this.isLeft, isSecretly)
//                        Cell.lightEatableCell(CheckSystem.AttackingPiecePos.pos, this.isLeft, isSecretly)
//                        this.numberPossibleMoves += 1
//                    }
//                    break;
//
//                default:
//                    if (CheckSystem.AttackingPiecePos.side === this.isLeft) {
//                        if (this.isVailedMove(this.position, CheckSystem.AttackingPiecePos.pos)) {
//                            Cell.lightMovableCell(CheckSystem.AttackingPiecePos.pos, this.isLeft, isSecretly)
//                            Cell.lightEatableCell(CheckSystem.AttackingPiecePos.pos, this.isLeft, isSecretly)
//                            this.numberPossibleMoves += 1
//                        }
//                    }
//                    break;
//
//            }
//            return
//        }
//        // -------------------------------------------------------------------------------------------------------
//        for (let i = 0; i < 8; i++) {
//            for (let j = 0; j < 8; j++) {
//                try {
//                    if (this.isVailedMove(this.position, [i, j])) {
//                        if ((ArrayBoards.L[j][i].length === 0) && (ArrayBoards.R[j][i].length === 0)) {
//                            if (i !== this.position[0] || j !== this.position[1]) {
//                                Cell.lightMovableCell([i, j], this.isLeft, isSecretly)
//                                this.numberPossibleMoves += 1
//                            }
//                        }
//                        if (this.position[0] !== i || this.position[1] !== j) {
//                            if (this.isLeft === true) {
//                                if (ArrayBoards.L[j][i].length !== 0 && ArrayBoards.R[j][i].length === 0 && ArrayBoards.L[j][i][0].isBlack !== this.isBlack) {
//                                    Cell.lightEatableCell([i, j], this.isLeft, isSecretly)
//                                    this.numberPossibleMoves += 1
//                                }
//                            }
//                            else {
//                                if (ArrayBoards.R[j][i].length !== 0 && ArrayBoards.L[j][i].length === 0 && ArrayBoards.R[j][i][0].isBlack !== this.isBlack) {
//                                    Cell.lightEatableCell([i, j], this.isLeft, isSecretly)
//                                    this.numberPossibleMoves += 1
//                                }
//                            }
//                        }
//                    }
//                } catch (TypeError) {
//
//                }
//            }
//        }
//    }
//}
//export class Rock extends Piece {
//    public isMoved: boolean;
//
//    constructor(id: string, position: number[], isLeft: boolean, isMoved: boolean = false) {
//        super(id, position, isLeft)
//        this.isMoved = isMoved
//    }
//
//    create(): void { // color = black/white
//        const color = this.id.charAt(0) === 'b' ? 'black' : 'white'
//        super.createPiece(`${color}_rock`, this.isLeft)
//    }
//
//    isVailedMove(positionStart: number[], positionEnd: number[]): boolean {
//        if (positionStart[0] !== positionEnd[0] && positionStart[1] !== positionEnd[1]) {
//            return false;
//        }
//
//        // -----------[Pinned check]--------------
//        if (super.isPinned(this.isLeft)) {
//            return false
//        }
//        // ---------------------------------------
//
//        if (positionStart[0] === positionEnd[0]) {
//            const yOffset = positionEnd[1] > positionStart[1] ? 1 : -1;
//            let yPos = positionStart[1] + yOffset;
//            while (yPos !== positionEnd[1]) {
//                if (this.isLeft) {
//                    if (ArrayBoards.L[yPos][positionStart[0]].length !== 0) {
//                        return false
//                    }
//                }
//                else {
//                    if (ArrayBoards.R[yPos][positionStart[0]].length !== 0) {
//                        return false
//                    }
//                }
//                yPos += yOffset
//            }
//        }
//
//        else if (positionStart[1] === positionEnd[1]) {
//            const xOffset = positionEnd[0] > positionStart[0] ? 1 : -1;
//            let xPos = positionStart[0] + xOffset;
//            while (xPos !== positionEnd[0]) {
//                if (this.isLeft) {
//                    if (ArrayBoards.L[positionStart[1]][xPos].length !== 0) {
//                        return false
//                    }
//                }
//                else {
//                    if (ArrayBoards.R[positionStart[1]][xPos].length !== 0) {
//                        return false
//                    }
//                }
//                xPos += xOffset
//            }
//        }
//        return true
//
//    }
//
//    lightAllPossibleMove(isSecretly: boolean = false): void {
//        Cell.lightStartCell(this.position, this.isLeft, isSecretly)
//        this.numberPossibleMoves = 0
//        // --------------------------------------------------------------------------------------
//        // check is our king under attack
//        if (this.isBlack && CheckSystem.IsBlackAttacked && CheckSystem.AttackingPiecePos != null) {
//            // if we're on a same side only legal move it to eat attacking piece or block their way
//            // Save king position of our team
//            let kingUnderAttack = this.isBlack ? CheckSystem.BKingPos.pos : CheckSystem.WKingPos.pos
//            switch (CheckSystem.AttackingPiece) {
//                // Check is it movment by straight line
//                case 'r' || 'q':
//                    // Check is king and piece on same or not board
//                    if ((CheckSystem.IsBlackAttacked === this.isBlack) && (CheckSystem.AttackingPiecePos.side !== this.isLeft)) {
//                        if (CheckSystem.AttackingPiecePos.pos[0] === kingUnderAttack[0]) {
//                            let start = CheckSystem.AttackingPiecePos.pos[1] < kingUnderAttack[1] ? CheckSystem.AttackingPiecePos.pos[1] : kingUnderAttack[1]
//
//                            let end = CheckSystem.AttackingPiecePos.pos[1] < kingUnderAttack[1] ? kingUnderAttack[1] : CheckSystem.AttackingPiecePos.pos[1]
//
//                            for (let Y_i = start; Y_i < end; Y_i++) {
//                                if (this.isVailedMove(this.position, [CheckSystem.AttackingPiecePos.pos[0], Y_i])) {
//                                    Cell.lightMovableCell([CheckSystem.AttackingPiecePos.pos[0], Y_i], this.isLeft, isSecretly)
//                                    this.numberPossibleMoves += 1
//                                }
//                            }
//                            return
//                        }
//                        if (CheckSystem.AttackingPiecePos.pos[1] === kingUnderAttack[1]) {
//                            let start = CheckSystem.AttackingPiecePos.pos[0] < kingUnderAttack[0] ? CheckSystem.AttackingPiecePos.pos[0] : kingUnderAttack[0]
//
//                            let end = CheckSystem.AttackingPiecePos.pos[0] < kingUnderAttack[0] ? kingUnderAttack[0] : CheckSystem.AttackingPiecePos.pos[0]
//
//                            for (let X_i = start; X_i < end; X_i++) {
//                                if (this.isVailedMove(this.position, [CheckSystem.AttackingPiecePos.pos[0], X_i])) {
//                                    Cell.lightMovableCell([CheckSystem.AttackingPiecePos.pos[0], X_i], this.isLeft, isSecretly)
//                                    this.numberPossibleMoves += 1
//                                }
//                            }
//                            return
//                        }
//                    }
//                    // Separtly check is this piece can eat attacker
//                    if (this.isVailedMove(this.position, CheckSystem.AttackingPiecePos.pos)) {
//                        Cell.lightMovableCell(CheckSystem.AttackingPiecePos.pos, this.isLeft, isSecretly)
//                        Cell.lightEatableCell(CheckSystem.AttackingPiecePos.pos, this.isLeft, isSecretly)
//                        this.numberPossibleMoves += 1
//                    }
//                    break;
//                case 'b' || 'q':
//                    // Check is king and piece on same or not board
//                    if ((CheckSystem.IsBlackAttacked === this.isBlack) && (CheckSystem.AttackingPiecePos.side !== this.isLeft)) {
//                        let start = CheckSystem.AttackingPiecePos.pos < kingUnderAttack ? CheckSystem.AttackingPiecePos.pos : kingUnderAttack
//
//                        let end = CheckSystem.AttackingPiecePos.pos < kingUnderAttack ? kingUnderAttack : CheckSystem.AttackingPiecePos.pos
//
//                        for (let X_i = start[0]; X_i < end[0]; X_i++) {
//                            for (let Y_i = start[1]; Y_i < end[1]; Y_i++) {
//                                if (this.isVailedMove(this.position, [X_i, Y_i])) {
//                                    Cell.lightMovableCell([X_i, Y_i], this.isLeft, isSecretly)
//                                    this.numberPossibleMoves += 1
//                                }
//                            }
//                            return
//                        }
//                    }
//                    // Separtly check is this piece can eat attacker
//                    if (this.isVailedMove(this.position, CheckSystem.AttackingPiecePos.pos)) {
//                        Cell.lightMovableCell(CheckSystem.AttackingPiecePos.pos, this.isLeft, isSecretly)
//                        Cell.lightEatableCell(CheckSystem.AttackingPiecePos.pos, this.isLeft, isSecretly)
//                        this.numberPossibleMoves += 1
//                    }
//                    break;
//
//                default:
//                    if (CheckSystem.AttackingPiecePos.side === this.isLeft) {
//                        if (this.isVailedMove(this.position, CheckSystem.AttackingPiecePos.pos)) {
//                            Cell.lightMovableCell(CheckSystem.AttackingPiecePos.pos, this.isLeft, isSecretly)
//                            Cell.lightEatableCell(CheckSystem.AttackingPiecePos.pos, this.isLeft, isSecretly)
//                            this.numberPossibleMoves += 1
//                        }
//                    }
//                    break;
//
//            }
//            return
//        }
//        // -------------------------------------------------------------------------------------------------------
//        for (let i = 0; i < 8; i++) {
//            for (let j = 0; j < 8; j++) {
//                try {
//                    if (this.isVailedMove(this.position, [i, j])) {
//                        if ((ArrayBoards.L[j][i].length === 0) && (ArrayBoards.R[j][i].length === 0)) {
//                            if (i !== this.position[0] || j !== this.position[1]) {
//                                Cell.lightMovableCell([i, j], this.isLeft, isSecretly)
//                                this.numberPossibleMoves += 1
//                            }
//                        }
//                        if (this.position[0] !== i || this.position[1] !== j) {
//                            if (this.isLeft) {
//                                if (ArrayBoards.L[j][i].length !== 0 && ArrayBoards.R[j][i].length === 0 && ArrayBoards.L[j][i][0].isBlack !== this.isBlack) {
//                                    Cell.lightEatableCell([i, j], this.isLeft, isSecretly)
//                                    this.numberPossibleMoves += 1
//                                }
//                            }
//                            else {
//                                if (ArrayBoards.R[j][i].length !== 0 && ArrayBoards.L[j][i].length === 0 && ArrayBoards.R[j][i][0].isBlack !== this.isBlack) {
//                                    Cell.lightEatableCell([i, j], this.isLeft, isSecretly)
//                                    this.numberPossibleMoves += 1
//                                }
//                            }
//                        }
//                    }
//                } catch (TypeError) { }
//            }
//        }
//    }
//}
//export class Queen extends Piece {
//    public bishop: Bishop
//    public rock: Rock
//
//    constructor(id: string, position: number[], isLeft: boolean) {
//        super(id, position, isLeft)
//        this.bishop = new Bishop(id, position, isLeft)
//        this.rock = new Rock(id, position, isLeft, true)
//    }
//
//    create(): void { // color = black/white
//        const color = this.id.charAt(0) === 'b' ? 'black' : 'white'
//        super.createPiece(`${color}_queen`, this.isLeft)
//    }
//
//    isVailedMove(positionStart: number[], positionEnd: number[]): boolean {
//        // -----------[Pinned check]--------------
//        if (super.isPinned(this.isLeft)) {
//            return false
//        }
//        // ---------------------------------------
//
//        if (this.bishop.isVailedMove(positionStart, positionEnd) || (this.rock.isVailedMove(positionStart, positionEnd))) {
//            return true;
//        }
//        return false
//    }
//
//    lightAllPossibleMove(isSecretly: boolean = false): void {
//        Cell.lightStartCell(this.position, this.isLeft, isSecretly)
//        this.numberPossibleMoves = 0
//        // --------------------------------------------------------------------------------------
//        // check is our king under attack
//        if (this.isBlack && CheckSystem.IsBlackAttacked && CheckSystem.AttackingPiecePos != null) {
//            // if we're on a same side only legal move it to eat attacking piece or block their way
//            // Save king position of our team
//            let kingUnderAttack = this.isBlack ? CheckSystem.BKingPos.pos : CheckSystem.WKingPos.pos
//            switch (CheckSystem.AttackingPiece) {
//                // Check is it movment by straight line
//                case 'r' || 'q':
//                    // Check is king and piece on same or not board
//                    if ((CheckSystem.IsBlackAttacked === this.isBlack) && (CheckSystem.AttackingPiecePos.side !== this.isLeft)) {
//                        if (CheckSystem.AttackingPiecePos.pos[0] === kingUnderAttack[0]) {
//                            let start = CheckSystem.AttackingPiecePos.pos[1] < kingUnderAttack[1] ? CheckSystem.AttackingPiecePos.pos[1] : kingUnderAttack[1]
//
//                            let end = CheckSystem.AttackingPiecePos.pos[1] < kingUnderAttack[1] ? kingUnderAttack[1] : CheckSystem.AttackingPiecePos.pos[1]
//
//                            for (let Y_i = start; Y_i < end; Y_i++) {
//                                if (this.isVailedMove(this.position, [CheckSystem.AttackingPiecePos.pos[0], Y_i])) {
//                                    Cell.lightMovableCell([CheckSystem.AttackingPiecePos.pos[0], Y_i], this.isLeft, isSecretly)
//                                    this.numberPossibleMoves += 1
//                                }
//                            }
//                            return
//                        }
//                        if (CheckSystem.AttackingPiecePos.pos[1] === kingUnderAttack[1]) {
//                            let start = CheckSystem.AttackingPiecePos.pos[0] < kingUnderAttack[0] ? CheckSystem.AttackingPiecePos.pos[0] : kingUnderAttack[0]
//
//                            let end = CheckSystem.AttackingPiecePos.pos[0] < kingUnderAttack[0] ? kingUnderAttack[0] : CheckSystem.AttackingPiecePos.pos[0]
//
//                            for (let X_i = start; X_i < end; X_i++) {
//                                if (this.isVailedMove(this.position, [CheckSystem.AttackingPiecePos.pos[0], X_i])) {
//                                    Cell.lightMovableCell([CheckSystem.AttackingPiecePos.pos[0], X_i], this.isLeft, isSecretly)
//                                    this.numberPossibleMoves += 1
//                                }
//                            }
//                            return
//                        }
//                    }
//                    // Separtly check is this piece can eat attacker
//                    if (this.isVailedMove(this.position, CheckSystem.AttackingPiecePos.pos)) {
//                        Cell.lightMovableCell(CheckSystem.AttackingPiecePos.pos, this.isLeft, isSecretly)
//                        Cell.lightEatableCell(CheckSystem.AttackingPiecePos.pos, this.isLeft, isSecretly)
//                        this.numberPossibleMoves += 1
//                    }
//                    break;
//                case 'b' || 'q':
//                    // Check is king and piece on same or not board
//                    if ((CheckSystem.IsBlackAttacked === this.isBlack) && (CheckSystem.AttackingPiecePos.side !== this.isLeft)) {
//                        let start = CheckSystem.AttackingPiecePos.pos < kingUnderAttack ? CheckSystem.AttackingPiecePos.pos : kingUnderAttack
//
//                        let end = CheckSystem.AttackingPiecePos.pos < kingUnderAttack ? kingUnderAttack : CheckSystem.AttackingPiecePos.pos
//
//                        for (let X_i = start[0]; X_i < end[0]; X_i++) {
//                            for (let Y_i = start[1]; Y_i < end[1]; Y_i++) {
//                                if (this.isVailedMove(this.position, [X_i, Y_i])) {
//                                    Cell.lightMovableCell([X_i, Y_i], this.isLeft, isSecretly)
//                                    this.numberPossibleMoves += 1
//                                }
//                            }
//                            return
//                        }
//                    }
//                    // Separtly check is this piece can eat attacker
//                    if (this.isVailedMove(this.position, CheckSystem.AttackingPiecePos.pos)) {
//                        Cell.lightMovableCell(CheckSystem.AttackingPiecePos.pos, this.isLeft, isSecretly)
//                        Cell.lightEatableCell(CheckSystem.AttackingPiecePos.pos, this.isLeft, isSecretly)
//                        this.numberPossibleMoves += 1
//                    }
//                    break;
//
//                default:
//                    if (CheckSystem.AttackingPiecePos.side === this.isLeft) {
//                        if (this.isVailedMove(this.position, CheckSystem.AttackingPiecePos.pos)) {
//                            Cell.lightMovableCell(CheckSystem.AttackingPiecePos.pos, this.isLeft, isSecretly)
//                            Cell.lightEatableCell(CheckSystem.AttackingPiecePos.pos, this.isLeft, isSecretly)
//                            this.numberPossibleMoves += 1
//                        }
//                    }
//                    break;
//
//            }
//            return
//        }
//        // -------------------------------------------------------------------------------------------------------
//        for (let i = 0; i < 8; i++) {
//            for (let j = 0; j < 8; j++) {
//                try {
//                    if (this.isVailedMove(this.position, [i, j])) {
//                        if ((ArrayBoards.L[j][i].length === 0) && (ArrayBoards.R[j][i].length === 0)) {
//                            if (i !== this.position[0] || j !== this.position[1]) {
//                                Cell.lightMovableCell([i, j], this.isLeft, isSecretly)
//                                this.numberPossibleMoves += 1
//                            }
//                        }
//                        if (this.position[0] !== i || this.position[1] !== j) {
//                            if (this.isLeft === true) {
//                                if (ArrayBoards.L[j][i].length !== 0 && ArrayBoards.R[j][i].length === 0 && ArrayBoards.L[j][i][0].isBlack !== this.isBlack) {
//                                    Cell.lightEatableCell([i, j], this.isLeft, isSecretly)
//                                    this.numberPossibleMoves += 1
//                                }
//                            }
//                            else {
//                                if (ArrayBoards.R[j][i].length !== 0 && ArrayBoards.L[j][i].length === 0 && ArrayBoards.R[j][i][0].isBlack !== this.isBlack) {
//                                    Cell.lightEatableCell([i, j], this.isLeft, isSecretly)
//                                    this.numberPossibleMoves += 1
//                                }
//                            }
//                        }
//                    }
//                } catch (TypeError) {
//
//                }
//            }
//        }
//    }
//}
//export class Knight extends Piece {
//    constructor(id: string, position: number[], isLeft: boolean) {
//        super(id, position, isLeft)
//        this.isLeft = isLeft
//    }
//
//    create(): void { // color = black/white
//        const color = this.id.charAt(0) === 'b' ? 'black' : 'white'
//        super.createPiece(`${color}_knight`, this.isLeft)
//    }
//
//    isVailedMove(positionStart: number[], positionEnd: number[]): boolean {
//        // -----------[Pinned check]--------------
//        if (super.isPinned(this.isLeft)) {
//            return false
//        }
//        // ---------------------------------------
//
//        if ((Math.abs(positionEnd[0] - positionStart[0]) === 1 && Math.abs(positionEnd[1] - positionStart[1]) === 2) || (Math.abs(positionEnd[0] - positionStart[0]) === 2 && Math.abs(positionEnd[1] - positionStart[1]) === 1)) {
//            return true;
//        }
//
//        return false;
//    }
//
//    lightAllPossibleMove(isSecretly: boolean = false): void {
//        Cell.lightStartCell(this.position, this.isLeft, isSecretly)
//        this.numberPossibleMoves = 0
//        // --------------------------------------------------------------------------------------
//        // check is our king under attack
//        if (this.isBlack && CheckSystem.IsBlackAttacked && CheckSystem.AttackingPiecePos != null) {
//            // if we're on a same side only legal move it to eat attacking piece or block their way
//            // Save king position of our team
//            let kingUnderAttack = this.isBlack ? CheckSystem.BKingPos.pos : CheckSystem.WKingPos.pos
//            switch (CheckSystem.AttackingPiece) {
//                // Check is it movment by straight line
//                case 'r' || 'q':
//                    // Check is king and piece on same or not board
//                    if ((CheckSystem.IsBlackAttacked === this.isBlack) && (CheckSystem.AttackingPiecePos.side !== this.isLeft)) {
//                        if (CheckSystem.AttackingPiecePos.pos[0] === kingUnderAttack[0]) {
//                            let start = CheckSystem.AttackingPiecePos.pos[1] < kingUnderAttack[1] ? CheckSystem.AttackingPiecePos.pos[1] : kingUnderAttack[1]
//
//                            let end = CheckSystem.AttackingPiecePos.pos[1] < kingUnderAttack[1] ? kingUnderAttack[1] : CheckSystem.AttackingPiecePos.pos[1]
//
//                            for (let Y_i = start; Y_i < end; Y_i++) {
//                                if (this.isVailedMove(this.position, [CheckSystem.AttackingPiecePos.pos[0], Y_i])) {
//                                    Cell.lightMovableCell([CheckSystem.AttackingPiecePos.pos[0], Y_i], this.isLeft, isSecretly)
//                                    this.numberPossibleMoves += 1
//                                }
//                            }
//                            return
//                        }
//                        if (CheckSystem.AttackingPiecePos.pos[1] === kingUnderAttack[1]) {
//                            let start = CheckSystem.AttackingPiecePos.pos[0] < kingUnderAttack[0] ? CheckSystem.AttackingPiecePos.pos[0] : kingUnderAttack[0]
//
//                            let end = CheckSystem.AttackingPiecePos.pos[0] < kingUnderAttack[0] ? kingUnderAttack[0] : CheckSystem.AttackingPiecePos.pos[0]
//
//                            for (let X_i = start; X_i < end; X_i++) {
//                                if (this.isVailedMove(this.position, [CheckSystem.AttackingPiecePos.pos[0], X_i])) {
//                                    Cell.lightMovableCell([CheckSystem.AttackingPiecePos.pos[0], X_i], this.isLeft, isSecretly)
//                                    this.numberPossibleMoves += 1
//                                }
//                            }
//                            return
//                        }
//                    }
//                    // Separtly check is this piece can eat attacker
//                    if (this.isVailedMove(this.position, CheckSystem.AttackingPiecePos.pos)) {
//                        Cell.lightMovableCell(CheckSystem.AttackingPiecePos.pos, this.isLeft, isSecretly)
//                        Cell.lightEatableCell(CheckSystem.AttackingPiecePos.pos, this.isLeft, isSecretly)
//                        this.numberPossibleMoves += 1
//                    }
//                    break;
//                case 'b' || 'q':
//                    // Check is king and piece on same or not board
//                    if ((CheckSystem.IsBlackAttacked === this.isBlack) && (CheckSystem.AttackingPiecePos.side !== this.isLeft)) {
//                        let start = CheckSystem.AttackingPiecePos.pos < kingUnderAttack ? CheckSystem.AttackingPiecePos.pos : kingUnderAttack
//
//                        let end = CheckSystem.AttackingPiecePos.pos < kingUnderAttack ? kingUnderAttack : CheckSystem.AttackingPiecePos.pos
//
//                        for (let X_i = start[0]; X_i < end[0]; X_i++) {
//                            for (let Y_i = start[1]; Y_i < end[1]; Y_i++) {
//                                if (this.isVailedMove(this.position, [X_i, Y_i])) {
//                                    Cell.lightMovableCell([X_i, Y_i], this.isLeft, isSecretly)
//                                    this.numberPossibleMoves += 1
//                                }
//                            }
//                            return
//                        }
//                    }
//                    // Separtly check is this piece can eat attacker
//                    if (this.isVailedMove(this.position, CheckSystem.AttackingPiecePos.pos)) {
//                        Cell.lightMovableCell(CheckSystem.AttackingPiecePos.pos, this.isLeft, isSecretly)
//                        Cell.lightEatableCell(CheckSystem.AttackingPiecePos.pos, this.isLeft, isSecretly)
//                        this.numberPossibleMoves += 1
//                    }
//                    break;
//
//                default:
//                    if (CheckSystem.AttackingPiecePos.side === this.isLeft) {
//                        if (this.isVailedMove(this.position, CheckSystem.AttackingPiecePos.pos)) {
//                            Cell.lightMovableCell(CheckSystem.AttackingPiecePos.pos, this.isLeft, isSecretly)
//                            Cell.lightEatableCell(CheckSystem.AttackingPiecePos.pos, this.isLeft, isSecretly)
//                            this.numberPossibleMoves += 1
//                        }
//                    }
//                    break;
//
//            }
//            return
//        }
//        // -------------------------------------------------------------------------------------------------------
//        for (let i = 0; i < 8; i++) {
//            for (let j = 0; j < 8; j++) {
//                try {
//                    if (this.isVailedMove(this.position, [i, j])) {
//                        if ((ArrayBoards.L[j][i].length === 0) && (ArrayBoards.R[j][i].length === 0)) {
//                            if (i !== this.position[0] || j !== this.position[1]) {
//                                Cell.lightMovableCell([i, j], this.isLeft)
//                            }
//                        }
//                        if (this.position[0] !== i || this.position[1] !== j) {
//                            if (this.isLeft === true) {
//                                if (ArrayBoards.L[j][i].length !== 0 && ArrayBoards.R[j][i].length === 0 && ArrayBoards.L[j][i][0].isBlack !== this.isBlack) {
//                                    Cell.lightEatableCell([i, j], this.isLeft, isSecretly)
//                                    this.numberPossibleMoves += 1
//                                }
//                            }
//                            else {
//                                if (ArrayBoards.R[j][i].length !== 0 && ArrayBoards.L[j][i].length === 0 && ArrayBoards.R[j][i][0].isBlack !== this.isBlack) {
//                                    Cell.lightEatableCell([i, j], this.isLeft, isSecretly)
//                                    this.numberPossibleMoves += 1
//                                }
//                            }
//                        }
//                    }
//                } catch (TypeError) {
//
//                }
//            }
//        }
//    }
//}
//export class Pawn extends Piece {
//
//    constructor(id: string, position: number[], isLeft: boolean) {
//        super(id, position, isLeft)
//    }
//
//    create(): void { // color = black/white
//        const color = this.id.charAt(0) === 'b' ? 'black' : 'white'
//        super.createPiece(`${color}_pawn`, this.isLeft)
//    }
//
//    isVailedMove(positionStart: number[], positionEnd: number[]): boolean {
//        // -----------[Pinned check]--------------
//        if (super.isPinned(this.isLeft)) {
//            return false
//        }
//        // ---------------------------------------
//
//        if (this.isLeft) {
//            if (!this.isBlack) {
//                if (positionStart[1] === 6) {
//                    if (ArrayBoards.L[positionStart[1] - 1][positionStart[0]].length === 0) {
//                        if ((positionEnd[0] === positionStart[0]) && (positionEnd[1] - positionStart[1] === -2)) {
//                            return true
//                        }
//                    }
//                }
//                if ((positionEnd[0] === positionStart[0]) && (positionEnd[1] - positionStart[1] === -1)) {
//                    return true
//                }
//            }
//            else {
//                if (positionStart[1] === 1) {
//                    if (ArrayBoards.L[positionStart[1] + 1][positionStart[0]].length === 0) {
//                        if ((positionEnd[0] === positionStart[0]) && (positionEnd[1] - positionStart[1] === 2)) {
//                            return true
//                        }
//                    }
//                }
//                if ((positionEnd[0] === positionStart[0]) && (positionEnd[1] - positionStart[1] === 1)) {
//                    return true
//                }
//            }
//        }
//        else {
//            if (!this.isBlack) {
//                if (positionStart[1] === 6) {
//                    if (ArrayBoards.L[positionStart[1] - 1][positionStart[0]].length === 0) {
//                        if ((positionEnd[0] === positionStart[0]) && (positionEnd[1] - positionStart[1] === -2)) {
//                            return true
//                        }
//                    }
//                }
//                if ((positionEnd[0] === positionStart[0]) && (positionEnd[1] - positionStart[1] === -1)) {
//                    return true
//                }
//            }
//            else {
//                if (positionStart[1] === 1) {
//                    if (ArrayBoards.L[positionStart[1] + 1][positionStart[0]].length === 0) {
//                        if ((positionEnd[0] === positionStart[0]) && (positionEnd[1] - positionStart[1] === 2)) {
//                            return true
//                        }
//                    }
//                }
//                if ((positionEnd[0] === positionStart[0]) && (positionEnd[1] - positionStart[1] === 1)) {
//                    return true
//                }
//            }
//        }
//
//        return false
//    }
//
//    isVailedEating(positionStart: number[], positionEnd: number[]): boolean {
//        if (!this.isBlack) {
//            if ((positionEnd[0] - positionStart[0] === 1 || positionEnd[0] - positionStart[0] === -1) && (positionEnd[1] - positionStart[1] === -1)) {
//                return true
//            }
//        }
//        else {
//            if ((positionEnd[0] - positionStart[0] === 1 || positionEnd[0] - positionStart[0] === -1) && (positionEnd[1] - positionStart[1] === 1)) {
//                return true
//            }
//        }
//        return false
//    }
//
//    lightAllPossibleMove(isSecretly: boolean = false): void {
//        Cell.lightStartCell(this.position, this.isLeft, isSecretly)
//        this.numberPossibleMoves = 0
//        // --------------------------------------------------------------------------------------
//        // check is our king under attack
//        if (this.isBlack && CheckSystem.IsBlackAttacked && CheckSystem.AttackingPiecePos != null) {
//            // if we're on a same side only legal move it to eat attacking piece or block their way
//            // Save king position of our team
//            let kingUnderAttack = this.isBlack ? CheckSystem.BKingPos.pos : CheckSystem.WKingPos.pos
//            switch (CheckSystem.AttackingPiece) {
//                // Check is it movment by straight line
//                case 'r' || 'q':
//                    // Check is king and piece on same or not board
//                    if ((CheckSystem.IsBlackAttacked === this.isBlack) && (CheckSystem.AttackingPiecePos.side !== this.isLeft)) {
//                        if (CheckSystem.AttackingPiecePos.pos[0] === kingUnderAttack[0]) {
//                            let start = CheckSystem.AttackingPiecePos.pos[1] < kingUnderAttack[1] ? CheckSystem.AttackingPiecePos.pos[1] : kingUnderAttack[1]
//
//                            let end = CheckSystem.AttackingPiecePos.pos[1] < kingUnderAttack[1] ? kingUnderAttack[1] : CheckSystem.AttackingPiecePos.pos[1]
//
//                            for (let Y_i = start; Y_i < end; Y_i++) {
//                                if (this.isVailedMove(this.position, [CheckSystem.AttackingPiecePos.pos[0], Y_i])) {
//                                    Cell.lightMovableCell([CheckSystem.AttackingPiecePos.pos[0], Y_i], this.isLeft, isSecretly)
//                                    this.numberPossibleMoves += 1
//                                }
//                            }
//                            return
//                        }
//                        if (CheckSystem.AttackingPiecePos.pos[1] === kingUnderAttack[1]) {
//                            let start = CheckSystem.AttackingPiecePos.pos[0] < kingUnderAttack[0] ? CheckSystem.AttackingPiecePos.pos[0] : kingUnderAttack[0]
//
//                            let end = CheckSystem.AttackingPiecePos.pos[0] < kingUnderAttack[0] ? kingUnderAttack[0] : CheckSystem.AttackingPiecePos.pos[0]
//
//                            for (let X_i = start; X_i < end; X_i++) {
//                                if (this.isVailedMove(this.position, [CheckSystem.AttackingPiecePos.pos[0], X_i])) {
//                                    Cell.lightMovableCell([CheckSystem.AttackingPiecePos.pos[0], X_i], this.isLeft, isSecretly)
//                                    this.numberPossibleMoves += 1
//                                }
//                            }
//                            return
//                        }
//                    }
//                    // Separtly check is this piece can eat attacker
//                    if (this.isVailedMove(this.position, CheckSystem.AttackingPiecePos.pos)) {
//                        Cell.lightMovableCell(CheckSystem.AttackingPiecePos.pos, this.isLeft, isSecretly)
//                        Cell.lightEatableCell(CheckSystem.AttackingPiecePos.pos, this.isLeft, isSecretly)
//                        this.numberPossibleMoves += 1
//                    }
//                    break;
//                case 'b' || 'q':
//                    // Check is king and piece on same or not board
//                    if ((CheckSystem.IsBlackAttacked === this.isBlack) && (CheckSystem.AttackingPiecePos.side !== this.isLeft)) {
//                        let start = CheckSystem.AttackingPiecePos.pos < kingUnderAttack ? CheckSystem.AttackingPiecePos.pos : kingUnderAttack
//
//                        let end = CheckSystem.AttackingPiecePos.pos < kingUnderAttack ? kingUnderAttack : CheckSystem.AttackingPiecePos.pos
//
//                        for (let X_i = start[0]; X_i < end[0]; X_i++) {
//                            for (let Y_i = start[1]; Y_i < end[1]; Y_i++) {
//                                if (this.isVailedMove(this.position, [X_i, Y_i])) {
//                                    Cell.lightMovableCell([X_i, Y_i], this.isLeft, isSecretly)
//                                    this.numberPossibleMoves += 1
//                                }
//                            }
//                            return
//                        }
//                    }
//                    // Separtly check is this piece can eat attacker
//                    if (this.isVailedMove(this.position, CheckSystem.AttackingPiecePos.pos)) {
//                        Cell.lightMovableCell(CheckSystem.AttackingPiecePos.pos, this.isLeft, isSecretly)
//                        Cell.lightEatableCell(CheckSystem.AttackingPiecePos.pos, this.isLeft, isSecretly)
//                        this.numberPossibleMoves += 1
//                    }
//                    break;
//
//                default:
//                    if (CheckSystem.AttackingPiecePos.side === this.isLeft) {
//                        if (this.isVailedEating(this.position, CheckSystem.AttackingPiecePos.pos)) {
//                            Cell.lightMovableCell(CheckSystem.AttackingPiecePos.pos, this.isLeft, isSecretly)
//                            Cell.lightEatableCell(CheckSystem.AttackingPiecePos.pos, this.isLeft, isSecretly)
//                            this.numberPossibleMoves += 1
//                        }
//                    }
//                    break;
//
//            }
//            return
//        }
//        // -------------------------------------------------------------------------------------------------------
//        for (let i = 0; i < 8; i++) {
//            for (let j = 0; j < 8; j++) {
//                if ((ArrayBoards.L[j][i].length === 0) && (ArrayBoards.R[j][i].length === 0)) {
//                    if (this.isVailedMove(this.position, [i, j])) {
//                        if (i !== this.position[0] || j !== this.position[1]) {
//                            Cell.lightMovableCell([i, j], this.isLeft, isSecretly)
//                            this.numberPossibleMoves += 1
//                        }
//                    }
//                }
//                if (i === this.position[0] && j === this.position[1]) {
//                    Cell.lightStartCell(this.position, this.isLeft, isSecretly)
//                }
//                if (this.isVailedEating(this.position, [i, j])) {
//                    if (this.isLeft && ArrayBoards.R[j][i].length === 0 && ArrayBoards.L[j][i].length !== 0 && ArrayBoards.L[j][i][0].isBlack !== this.isBlack) {
//                        Cell.lightEatableCell([i, j], this.isLeft, isSecretly)
//                        this.numberPossibleMoves += 1
//                    }
//                    else if (!this.isLeft && ArrayBoards.L[j][i].length === 0 && ArrayBoards.R[j][i].length !== 0 && ArrayBoards.R[j][i][0].isBlack !== this.isBlack) {
//                        Cell.lightEatableCell([i, j], this.isLeft, isSecretly)
//                        this.numberPossibleMoves += 1
//                    }
//                }
//            }
//        }
//    }
//}
