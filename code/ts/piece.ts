import {Chess} from "./chess";
import {GamePiece} from "./types";

export class Piece {
    private PieceName : GamePiece;
    private GAME_SESSION : Chess;

    constructor(PieceName : GamePiece, GAME_SESSION : Chess) {
        this.PieceName = PieceName;
        this.GAME_SESSION = GAME_SESSION;
    }

    public createPiece(position : number[], isLeft : boolean) : void {
        if (isLeft) {
            
        }
        else {

        }
    }
}


//export class Chess {
//    public isBlackTurn: boolean
//    public isChechireChess: boolean
//    public currentMove: string
//
//    static allBlackPiece: Piece[]
//    static allWhitePiece: Piece[]
//
//    constructor(isBlackTurn: boolean = false, isChechireChess: boolean = false, currentMove: string = 'w') {
//        this.isBlackTurn = isBlackTurn;
//        this.isChechireChess = isChechireChess
//        this.currentMove = currentMove
//        Chess.allBlackPiece = []
//        Chess.allWhitePiece = []
//    }
//
//    static isMate() : boolean {
//        if (CheckSystem.IsBlackAttacked !== null) {
//            Game.UpdateAllPieces()
//            if (CheckSystem.IsBlackAttacked) {
//                let allMoves = 0
//                Chess.allBlackPiece.forEach(element => {
//                    if (element.numberPossibleMoves !== 0) {
//                        allMoves += 1
//                    }
//                });
//                if (allMoves > 0) {
//                    return false
//                }
//                return true
//            }
//            else {
//                let allMoves = 0
//                Chess.allWhitePiece.forEach(element => {
//                    if (element.numberPossibleMoves !== 0) {
//                        allMoves += 1
//                    }
//                });
//                if (allMoves > 0) {
//                    return false
//                }
//                return true
//            }
//        }
//        return false
//    }
//
//    UpdateAllPieces(): void {
//        Chess.allBlackPiece = []
//        Chess.allWhitePiece = []
//        for (let x = 0; x < 8; x++) {
//            for (let y = 0; y < 8; y++) {
//                if (ArrayBoards.L[x][y].length > 0) {
//                    if (ArrayBoards.L[x][y][0].id.charAt(0) === 'w') {
//                        let piece = ArrayBoards.L[x][y][0]
//                        piece.lightAllPossibleMove(true)
//                        Chess.allWhitePiece.push(piece)
//                    }
//                    if (ArrayBoards.L[x][y][0].id.charAt(0) === 'b') {
//                        let piece = ArrayBoards.L[x][y][0]
//                        piece.lightAllPossibleMove(true)
//                        Chess.allBlackPiece.push(piece)
//                    }
//                }
//                if (ArrayBoards.R[x][y].length > 0) {
//                    if (ArrayBoards.R[x][y][0].id.charAt(0) === 'w') {
//                        let piece = ArrayBoards.R[x][y][0]
//                        piece.lightAllPossibleMove(true)
//                        Chess.allWhitePiece.push(piece)
//                    }
//                    if (ArrayBoards.R[x][y][0].id.charAt(0) === 'b') {
//                        let piece = ArrayBoards.R[x][y][0]
//                        piece.lightAllPossibleMove(true)
//                        Chess.allBlackPiece.push(piece)
//                    }
//                }
//            }
//        }
//    }
//}
//
//const Game = new Chess()
//export class Piece extends Chess {
//    public isLeft : boolean
//    public id: string;
//    public position: number[] // x first, y second
//    public isBlack: boolean;
//    public numberPossibleMoves: number
//
//    protected constructor(id: string, position: number[], isLeft : boolean) {
//        super()
//        this.id = id;
//        this.position = position
//        this.isBlack = id.charAt(0) === 'b' ? true : false;
//        this.numberPossibleMoves = 0
//        this.isLeft = isLeft
//    }
//
//    static resetCheck(): void {
//        CheckSystem.AttackingPiece = null
//        CheckSystem.AttackingPiecePos = null
//        CheckSystem.IsBlackAttacked = null
//    }
//
//    protected isPinned(isLeft: boolean): boolean {
//        if (this.isBlack) {
//            if (CheckSystem.BKingPos.side === isLeft) {
//                if (Cell.isUnderAttack(this.position, this.isBlack, isLeft)) {
//                    if (Cell.isUnderDioganalAttack(this.position, this.isBlack, isLeft)) {
//                        let pos = this.position
//                        let dx = pos[0] > CheckSystem.BKingPos.pos[0] ? -1 : 1;
//                        let dy = pos[1] > CheckSystem.BKingPos.pos[1] ? -1 : 1;
//                        while (pos[0] !== CheckSystem.BKingPos.pos[0] && pos[1] !== CheckSystem.BKingPos.pos[1]) {
//                            if (ArrayBoards.L[pos[0]][pos[1]].length !== 0) {
//                                return false
//                            }
//                            pos[0] += dx;
//                            pos[1] += dy;
//                        }
//                        return true;
//                    }
//                    if (Cell.isUnderLineAttack(this.position, this.isBlack, isLeft)) {
//                        let pos = this.position
//                        if (pos[0] === CheckSystem.BKingPos.pos[0]) {
//                            let delta = pos[0] > CheckSystem.BKingPos.pos[0] ? -1 : 1;
//                            while (pos[1] !== CheckSystem.BKingPos.pos[1]) {
//                                if (ArrayBoards.L[pos[0]][pos[1]].length !== 0) {
//                                    return false;
//                                }
//                                pos[0] += delta;
//                            }
//                            return true;
//                        }
//                        if (pos[1] === CheckSystem.BKingPos.pos[1]) {
//                            let delta = pos[1] > CheckSystem.BKingPos.pos[1] ? -1 : 1;
//                            while (pos[1] !== CheckSystem.BKingPos.pos[1]) {
//                                if (ArrayBoards.L[pos[0]][pos[1]].length !== 0) {
//                                    return false;
//                                }
//                                pos[1] += delta;
//                            }
//                            return true;
//                        }
//                    }
//                }
//            }
//            return false;
//        }
//        if (!this.isBlack) {
//            if (CheckSystem.WKingPos.side === isLeft) {
//                if (Cell.isUnderAttack(this.position, this.isBlack, isLeft)) {
//                    if (Cell.isUnderDioganalAttack(this.position, this.isBlack, isLeft)) {
//                        let pos = this.position
//                        let dx = pos[0] > CheckSystem.WKingPos.pos[0] ? -1 : 1;
//                        let dy = pos[1] > CheckSystem.WKingPos.pos[1] ? -1 : 1;
//                        while (pos[0] !== CheckSystem.WKingPos.pos[0] && pos[1] !== CheckSystem.WKingPos.pos[1]) {
//                            if (ArrayBoards.L[pos[0]][pos[1]].length !== 0) {
//                                return false
//                            }
//                            pos[0] += dx;
//                            pos[1] += dy;
//                        }
//                        return true;
//                    }
//                    if (Cell.isUnderLineAttack(this.position, this.isBlack, isLeft)) {
//                        let pos = this.position
//                        if (pos[0] === CheckSystem.WKingPos.pos[0]) {
//                            let delta = pos[0] > CheckSystem.WKingPos.pos[0] ? -1 : 1;
//                            while (pos[1] !== CheckSystem.WKingPos.pos[1]) {
//                                if (ArrayBoards.L[pos[0]][pos[1]].length !== 0) {
//                                    return false;
//                                }
//                                pos[0] += delta;
//                            }
//                            return true;
//                        }
//                        if (pos[1] === CheckSystem.WKingPos.pos[1]) {
//                            let delta = pos[1] > CheckSystem.WKingPos.pos[1] ? -1 : 1;
//                            while (pos[1] !== CheckSystem.WKingPos.pos[1]) {
//                                if (ArrayBoards.L[pos[0]][pos[1]].length !== 0) {
//                                    return false;
//                                }
//                                pos[1] += delta;
//                            }
//                            return true;
//                        }
//                    }
//                }
//            }
//            return false;
//        }
//        return false
//    }
//
//    static recreate(pos : number[], isLeft : boolean) {
//        if (isLeft) {
//            ArrayBoards.L[pos[1]][pos[0]][0].create()
//        }
//        else {
//            ArrayBoards.R[pos[1]][pos[0]][0].create()
//        }
//    }
//
//    static remove(pos : number[], side : string) {
//        const toRemove = document.getElementById(`${pos[0]},${pos[1]},${side}`)?.firstChild
//        
//        if (toRemove != null) {
//            toRemove.remove()
//        }
//    }
//
//    
//
//    static findNearest(pos : number[], isLeft : boolean) {
//        
//        interface nearestRock {
//            distance : null | number;
//            x_pos : null | number
//        }
//
//        if (isLeft) {
//            if (ArrayBoards.L[pos[1]][0][0].id.charAt(2) == 'r') {
//                let countRock = 0
//                let rock_0_dist : nearestRock = {
//                   distance : null,
//                   x_pos : null
//                } 
//
//                let rock_1_dist : nearestRock = {
//                   distance : null,
//                   x_pos : null 
//                } 
//
//                const rock_0 = ArrayBoards.L[pos[1]][0][0] as Rock
//                if (!rock_0.isMoved) {
//
//                    countRock++
//                    rock_0_dist.distance = Math.abs(7 - pos[0])
//                    rock_0_dist.x_pos = 7
//                }               
//                const rock_1 = ArrayBoards.L[pos[1]][7][0] as Rock
//                if (!rock_1.isMoved) {
//
//                    countRock++
//                    rock_1_dist.distance = Math.abs(0 - pos[0])
//                    rock_1_dist.x_pos = 0
//                }               
//
//                if (countRock > 0) {
//                    if (countRock == 2) {
//                        if (rock_0_dist.distance != null && rock_1_dist.distance != null) {
//                            if (rock_0_dist.distance > rock_1_dist.distance) {
//                                return rock_1_dist
//                            }
//                            else {
//                                return rock_0_dist
//                            }
//                        }
//                    }
//                    else {
//                        if (rock_0_dist.distance != null) {
//                            return rock_0_dist
//                        }
//                        else {
//                            return rock_1_dist
//                        }
//                    }
//                }
//            }
//        }
//        else {
//            if (ArrayBoards.R[pos[1]][0][0].id.charAt(2) == 'r') {
//                let countRock = 0
//                let rock_0_dist : nearestRock = {
//                   distance : null,
//                   x_pos : null
//                } 
//
//                let rock_1_dist : nearestRock = {
//                   distance : null,
//                   x_pos : null 
//                } 
//
//                const rock_0 = ArrayBoards.R[pos[1]][0][0] as Rock
//                if (!rock_0.isMoved) {
//
//                    countRock++
//                    rock_0_dist.distance = Math.abs(7 - pos[0])
//                    rock_0_dist.x_pos = 7
//                }               
//                const rock_1 = ArrayBoards.R[pos[1]][7][0] as Rock
//                if (!rock_1.isMoved) {
//
//                    countRock++
//                    rock_1_dist.distance = Math.abs(0 - pos[0])
//                    rock_1_dist.x_pos = 0
//                }               
//
//                if (countRock > 0) {
//                    if (countRock == 2) {
//                        if (rock_0_dist.distance != null && rock_1_dist.distance != null) {
//                            if (rock_0_dist.distance > rock_1_dist.distance) {
//                                return rock_1_dist
//                            }
//                            else {
//                                return rock_0_dist
//                            }
//                        }
//                    }
//                    else {
//                        if (rock_0_dist.distance != null) {
//                            return rock_0_dist
//                        }
//                        else {
//                            return rock_1_dist
//                        }
//                    }
//                }
//            }
//        }
//    }
//
//    static move(positionOnBoard : number[], startPosition : number[], startSide : string, flag :string = 'NONE') {
//        Game.currentMove = Game.currentMove === 'w' ? 'b' : 'w'
//        
//            /*
//         * System to validate movment.
//         *
//         * First of all we need to figure out what is needed for 
//         * function to work properly.
//         *
//         * 1) State of board
//         * 2) Selected figure.
//         *
//         * All of this is can be getted.
//         *
//         * State of board is just 2d array from main
//         *
//         * Selected wigure is can be simply position of it
//         * on board!
//         *
//         * Hint (1):
//         *   Positions are swapped.
//         *   [0] : y 
//         *   [1] : x 
//         *
//         *   Don't ask why
//         *
//         */
//
//        if (startSide == "L") {
//            if (flag == 'NONE') {
//                // Update position of figure. 
//                //
//                // Base of movment is done. Next need to create rocking and it is all. 
//                //
//                // I am proud of muself
//                ArrayBoards.L[startPosition[1]][startPosition[0]][0].position = positionOnBoard
//
//                ArrayBoards.R[positionOnBoard[1]][positionOnBoard[0]] = ArrayBoards.L[startPosition[1]][startPosition[0]]
//                ArrayBoards.R[positionOnBoard[1]][positionOnBoard[0]][0].isLeft = false
//                ArrayBoards.L[startPosition[1]][startPosition[0]] = []
//
//                console.log(ArrayBoards)
//
//                this.remove(startPosition, "L")
//                this.recreate(positionOnBoard, false)
//            }
//            
//            if (flag == 'CASTLING') {
//                console.log('CASTLING')
//
//                // Return the nearest rock.
//                //
//                // TODO:
//                //  * Create castling 
//                //  * Create checking for castling 
//                //
//                // Today we have all info for castling
//                console.log(this.findNearest(positionOnBoard, true))
//
//                if (Game.currentMove == 'b') {
//                    console.log('w')
//                }
//                else {
//                    console.log('b')
//                }
//            }
//        }
//        else {
//
//        }
//
//
//        Board.Clear();
//        Game.UpdateAllPieces() //Recreate array of pieces for check system
//    }
//
//    static movment(e: Event): void {
//        if (Chess.isMate()){
//            return
//        }
//
//        // on which HTML element user click
//        const target = e.target as HTMLInputElement
//
//        // make an array of 2 coordinates for position of click
//        const clickPosition = [Number(target.id.charAt(0)), Number(target.id.charAt(2))]
//
//        // Importing HTML element of starting cell
//        const startCell = document.querySelector(`.selectedCell`) as HTMLElement
//
//        // Calculate start position
//        const startPosition: number[] = [Number(startCell.id.charAt(0)), Number(startCell.id.charAt(2))]
//
//        // get starting cell
//        const startSide = startCell?.id.charAt(4)
//
//        if (target.classList.contains('lighttedCell_casteling')) {
//            Piece.move(clickPosition, startPosition, startSide, 'CASTLING')
//        }
//        else {
//            Piece.move(clickPosition, startPosition, startSide)
//        }
//    }
//
//    protected createPiece(pieceName: string, isLeft: boolean): void {
//        const side = isLeft === true ? 'L' : 'R';
//
//        const placment: HTMLElement | null = document.getElementById(`${this.position[0]},${this.position[1]},${side}`)
//
//        let piece: HTMLElement = document.createElement('div');
//        piece.className = `piece ${pieceName}`
//        piece.id = this.id
//        piece.draggable = true
//
//        piece.addEventListener('click', (<EventListener>this.movementOfPieces));
//        piece.addEventListener('dragstart', (<EventListener>this.movementOfPieces))
//
//        placment?.append(piece)
//    }
//
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
