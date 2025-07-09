import {GamePiece, Color, Piece, ROCK_VECTOR, BISHOP_VECTOR, QUEEN_VECTOR} from "./types";

export class RealPiece {
    private PieceName : GamePiece;
    private Position : number[];

    /**
     * Constructor for creating visual representation of Piece
     * @param PieceName - GamePiece object that fully describe piece
     */
    constructor(PieceName : GamePiece, Pos : number[]) {
        this.PieceName = PieceName;
        this.Position = Pos;
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
        case Piece.ROCK:
            if (PlayingPiece.color === Color.BLACK) {
                return "black_rock";
            }
            if (PlayingPiece.color === Color.WHITE) {
                return "white_rock";
            }
        case Piece.KING:
            if (PlayingPiece.color === Color.BLACK) {
                return "black_king";
            }
            if (PlayingPiece.color === Color.WHITE) {
                return "white_king";
            }
        case Piece.KNIGHT:
            if (PlayingPiece.color === Color.BLACK) {
                return "black_knight";
            }
            if (PlayingPiece.color === Color.WHITE) {
                return "white_knight";
            }
        case Piece.BISHOP:
            if (PlayingPiece.color === Color.BLACK) {
                return "black_bishop";
            }
            if (PlayingPiece.color === Color.WHITE) {
                return "white_bishop";
            }
        case Piece.QUEEN:
            if (PlayingPiece.color === Color.BLACK) {
                return "black_queen";
            }
            if (PlayingPiece.color === Color.WHITE) {
                return "white_queen";
            }
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
        let visual_piece : HTMLElement = document.createElement('div');

        visual_piece.classList.add("piece");
        visual_piece.classList.add(this.getStyleFromPieceType(this.PieceName));

        const visual_position = document.getElementById(`${position[1]},${position[0]},L`);
        
        visual_position?.appendChild(visual_piece);
        
        return 0;
    }
    
    /* Creating and adding div decorated as piece to selected cell */
    private createPieceRight(position : number[]) : number {
        let visual_piece : HTMLElement = document.createElement('div');
        visual_piece.classList.add("piece");
        visual_piece.classList.add(this.getStyleFromPieceType(this.PieceName));
        
        const visual_position = document.getElementById(`${position[1]},${position[0]},R`);
        
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
            return this.createPieceRight(position);
        }
    }

    /*
     * TODO:
     *      Need to create methods for generating moves for pieces.
     *      First of all it is method to generate list of all possible moves.
     *      It should remove cells behind other pieces if it is a sliding piece.
     *
     *      And last we need to display all finded cells. 
     */

    private generateMovesFromVectors(vectors : number[][]) : number[] {
        let result : number[] = []; 


        // Iterate over all vectors
        for (let index = 0; index < vectors.length; index++) {
            console.log(vectors[index]);
        }

        return result;
    }

    public generateAllMoves() : number[] {
        switch (this.PieceName.type) {
            case Piece.PAWN:
                // TODO: Need to create pawn movment
            case Piece.ROCK:
                return this.generateMovesFromVectors(ROCK_VECTOR);
            case Piece.KING:
                // TODO: Need to create King movment check
            case Piece.KNIGHT:
                // TODO: Need to create Knight movment check
            case Piece.BISHOP:
                return this.generateMovesFromVectors(BISHOP_VECTOR);
            case Piece.QUEEN:
                return this.generateMovesFromVectors(QUEEN_VECTOR);
            case Piece.EMPTY:
                return [-1];
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
