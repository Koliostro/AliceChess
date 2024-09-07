import { ArrayBoards, CheckSystem, picePos } from "./main.js"
import { Cell, Board } from './field.js'
import { isValiedPlace } from "./drag-n-drop.js"

export class Chess {
    public isBlackTurn: boolean
    public isChechireChess: boolean
    public currentMove: string

    static allBlackPiece: Piece[]
    static allWhitePiece: Piece[]

    constructor(isBlackTurn: boolean = false, isChechireChess: boolean = false, currentMove: string = 'w') {
        this.isBlackTurn = isBlackTurn;
        this.isChechireChess = isChechireChess
        this.currentMove = currentMove
        Chess.allBlackPiece = []
        Chess.allWhitePiece = []
    }

    static isMate() : boolean {
        if (CheckSystem.IsBlackAttacked !== null) {
            Game.UpdateAllPieces()
            if (CheckSystem.IsBlackAttacked) {
                let allMoves = 0
                Chess.allBlackPiece.forEach(element => {
                    if (element.numberPossibleMoves !== 0) {
                        allMoves += 1
                    }
                });
                if (allMoves > 0) {
                    return false
                }
                return true
            }
            else {
                let allMoves = 0
                Chess.allWhitePiece.forEach(element => {
                    if (element.numberPossibleMoves !== 0) {
                        allMoves += 1
                    }
                });
                if (allMoves > 0) {
                    return false
                }
                return true
            }
        }
        return false
    }

    UpdateAllPieces(): void {
        Chess.allBlackPiece = []
        Chess.allWhitePiece = []
        for (let x = 0; x < 8; x++) {
            for (let y = 0; y < 8; y++) {
                if (ArrayBoards.L[x][y].length > 0) {
                    if (ArrayBoards.L[x][y][0].id.charAt(0) === 'w') {
                        let piece = ArrayBoards.L[x][y][0]
                        piece.lightAllPossibleMove(true)
                        Chess.allWhitePiece.push(piece)
                    }
                    if (ArrayBoards.L[x][y][0].id.charAt(0) === 'b') {
                        let piece = ArrayBoards.L[x][y][0]
                        piece.lightAllPossibleMove(true)
                        Chess.allBlackPiece.push(piece)
                    }
                }
                if (ArrayBoards.R[x][y].length > 0) {
                    if (ArrayBoards.R[x][y][0].id.charAt(0) === 'w') {
                        let piece = ArrayBoards.R[x][y][0]
                        piece.lightAllPossibleMove(true)
                        Chess.allWhitePiece.push(piece)
                    }
                    if (ArrayBoards.R[x][y][0].id.charAt(0) === 'b') {
                        let piece = ArrayBoards.R[x][y][0]
                        piece.lightAllPossibleMove(true)
                        Chess.allBlackPiece.push(piece)
                    }
                }
            }
        }
    }
}

const Game = new Chess()
export class Piece extends Chess {
    public isLeft : boolean
    public id: string;
    public position: number[] // x first, y second
    public isBlack: boolean;
    public numberPossibleMoves: number

    protected constructor(id: string, position: number[], isLeft : boolean) {
        super()
        this.id = id;
        this.position = position
        this.isBlack = id.charAt(0) === 'b' ? true : false;
        this.numberPossibleMoves = 0
        this.isLeft = isLeft
    }

    static resetCheck(): void {
        CheckSystem.AttackingPiece = null
        CheckSystem.AttackingPiecePos = null
        CheckSystem.IsBlackAttacked = null
    }

    protected isPinned(isLeft: boolean): boolean {
        if (this.isBlack) {
            if (CheckSystem.BKingPos.side === isLeft) {
                if (Cell.isUnderAttack(this.position, this.isBlack, isLeft)) {
                    if (Cell.isUnderDioganalAttack(this.position, this.isBlack, isLeft)) {
                        let pos = this.position
                        let dx = pos[0] > CheckSystem.BKingPos.pos[0] ? -1 : 1;
                        let dy = pos[1] > CheckSystem.BKingPos.pos[1] ? -1 : 1;
                        while (pos[0] !== CheckSystem.BKingPos.pos[0] && pos[1] !== CheckSystem.BKingPos.pos[1]) {
                            if (ArrayBoards.L[pos[0]][pos[1]].length !== 0) {
                                return false
                            }
                            pos[0] += dx;
                            pos[1] += dy;
                        }
                        return true;
                    }
                    if (Cell.isUnderLineAttack(this.position, this.isBlack, isLeft)) {
                        let pos = this.position
                        if (pos[0] === CheckSystem.BKingPos.pos[0]) {
                            let delta = pos[0] > CheckSystem.BKingPos.pos[0] ? -1 : 1;
                            while (pos[1] !== CheckSystem.BKingPos.pos[1]) {
                                if (ArrayBoards.L[pos[0]][pos[1]].length !== 0) {
                                    return false;
                                }
                                pos[0] += delta;
                            }
                            return true;
                        }
                        if (pos[1] === CheckSystem.BKingPos.pos[1]) {
                            let delta = pos[1] > CheckSystem.BKingPos.pos[1] ? -1 : 1;
                            while (pos[1] !== CheckSystem.BKingPos.pos[1]) {
                                if (ArrayBoards.L[pos[0]][pos[1]].length !== 0) {
                                    return false;
                                }
                                pos[1] += delta;
                            }
                            return true;
                        }
                    }
                }
            }
            return false;
        }
        if (!this.isBlack) {
            if (CheckSystem.WKingPos.side === isLeft) {
                if (Cell.isUnderAttack(this.position, this.isBlack, isLeft)) {
                    if (Cell.isUnderDioganalAttack(this.position, this.isBlack, isLeft)) {
                        let pos = this.position
                        let dx = pos[0] > CheckSystem.WKingPos.pos[0] ? -1 : 1;
                        let dy = pos[1] > CheckSystem.WKingPos.pos[1] ? -1 : 1;
                        while (pos[0] !== CheckSystem.WKingPos.pos[0] && pos[1] !== CheckSystem.WKingPos.pos[1]) {
                            if (ArrayBoards.L[pos[0]][pos[1]].length !== 0) {
                                return false
                            }
                            pos[0] += dx;
                            pos[1] += dy;
                        }
                        return true;
                    }
                    if (Cell.isUnderLineAttack(this.position, this.isBlack, isLeft)) {
                        let pos = this.position
                        if (pos[0] === CheckSystem.WKingPos.pos[0]) {
                            let delta = pos[0] > CheckSystem.WKingPos.pos[0] ? -1 : 1;
                            while (pos[1] !== CheckSystem.WKingPos.pos[1]) {
                                if (ArrayBoards.L[pos[0]][pos[1]].length !== 0) {
                                    return false;
                                }
                                pos[0] += delta;
                            }
                            return true;
                        }
                        if (pos[1] === CheckSystem.WKingPos.pos[1]) {
                            let delta = pos[1] > CheckSystem.WKingPos.pos[1] ? -1 : 1;
                            while (pos[1] !== CheckSystem.WKingPos.pos[1]) {
                                if (ArrayBoards.L[pos[0]][pos[1]].length !== 0) {
                                    return false;
                                }
                                pos[1] += delta;
                            }
                            return true;
                        }
                    }
                }
            }
            return false;
        }
        return false
    }

    static move(e: Event, startPosition: number[], endPosition: number[], startSide: string, movedPiece: HTMLElement) {
        const target = e.target as HTMLInputElement

        const oppositeSide = target.id.charAt(4) === 'L' ? 'R' : 'L'
        Game.currentMove = Game.currentMove === 'w' ? 'b' : 'w'

        // Get opposite cell from clicked
        const oppositCell = document.getElementById(`${endPosition[0]},${endPosition[1]},${oppositeSide}`)

        if (startSide === 'L') {
            Piece.resetCheck()
            // Save piece`s class in variable  
            const piece = ArrayBoards.L[startPosition[1]][startPosition[0]];

            // Add selected piece to selected cell as child element
            oppositCell?.append(movedPiece);

            // remove piece (eating)
            if (target.classList.contains(`lighttedCell_eat`)) {
                target.firstChild?.remove();
                ArrayBoards.L[endPosition[1]][endPosition[0]] = [];
            }

            // Move piece in array to selected cell
            ArrayBoards.R[endPosition[1]][endPosition[0]] = piece;

            // Clear starting squere
            ArrayBoards.L[startPosition[1]][startPosition[0]] = [];

            // Change coordinates for class
            piece[0].position = endPosition;
            piece[0].isLeft = false;

            // special flag for casteling realization
            if (piece[0].id.charAt(2) === 'k' || piece[0].id.charAt(2) === 'r') {
                if ("isMoved" in piece[0]) {
                    piece[0].isMoved = true;
                }
            }

            if (piece[0].id.charAt(2) === 'k') {
                if (piece[0].id.charAt(0) === 'b') {
                    CheckSystem.BKingPos.pos = piece[0].position
                    CheckSystem.BKingPos.side = piece[0].isLeft
                }
                else {
                    CheckSystem.WKingPos.pos = piece[0].position
                    CheckSystem.WKingPos.side = piece[0].isLeft
                }
                Piece.resetCheck()
            }

            if (piece[0].id.charAt(2) !== 'k') {
                if (piece[0].isBlack) {
                    if (CheckSystem.WKingPos.side === piece[0].isLeft) {
                        if (piece[0].id.charAt(2) !== 'p') {
                            if (piece[0].isVailedMove(piece[0].position, CheckSystem.WKingPos.pos)) {
                                CheckSystem.AttackingPiecePos = { pos: piece[0].position, side: piece[0].isLeft }
                                CheckSystem.IsBlackAttacked = false
                                CheckSystem.AttackingPiece = piece[0].id.charAt(2)
                            }
                        }
                        else {
                            if ("isVailedEating" in piece[0]) {
                                if (piece[0].isVailedEating(piece[0].position, CheckSystem.WKingPos.pos)) {
                                    CheckSystem.AttackingPiecePos = { pos: piece[0].position, side: piece[0].isLeft }
                                    CheckSystem.IsBlackAttacked = false
                                    CheckSystem.AttackingPiece = piece[0].id.charAt(2)
                                }
                            }
                        }
                    }
                }
                else {
                    if (CheckSystem.BKingPos.side === piece[0].isLeft) {
                        if (piece[0].id.charAt(2) !== 'p') {
                            if (piece[0].isVailedMove(piece[0].position, CheckSystem.BKingPos.pos)) {
                                CheckSystem.AttackingPiecePos = { pos: piece[0].position, side: piece[0].isLeft }
                                CheckSystem.IsBlackAttacked = true
                                CheckSystem.AttackingPiece = piece[0].id.charAt(2)
                            }
                        }
                        else {
                            if ("isVailedEating" in piece[0]) {
                                if (piece[0].isVailedEating(piece[0].position, CheckSystem.BKingPos.pos)) {
                                    CheckSystem.AttackingPiecePos = { pos: piece[0].position, side: piece[0].isLeft }
                                    CheckSystem.IsBlackAttacked = true
                                    CheckSystem.AttackingPiece = piece[0].id.charAt(2)
                                }
                            }
                        }
                    }
                }
            }

            if ("bishop" in piece[0] && "rock" in piece[0]) {
                if (piece[0].id.charAt(2) === 'q') {
                    piece[0].bishop.isLeft = false;
                    piece[0].rock.isLeft = false;
                }
            }

            Board.Clear();
        }
        else {
            Piece.resetCheck()
            // Save piece`s class in variable  
            const piece = ArrayBoards.R[startPosition[1]][startPosition[0]];

            // Add selected piece to selected cell as child element
            oppositCell?.append(movedPiece);

            // remove piece (eating)
            if (target.classList.contains(`lighttedCell_eat`)) {
                target.firstChild?.remove();
                ArrayBoards.R[endPosition[1]][endPosition[0]] = [];
            }

            // Move piece in array to selected cell
            ArrayBoards.L[endPosition[1]][endPosition[0]] = piece;

            // Clear starting squere
            ArrayBoards.R[startPosition[1]][startPosition[0]] = [];

            // Change coordinates for class
            piece[0].position = endPosition;
            piece[0].isLeft = true;

            // special flag for casteling realization
            if ((piece[0].id.charAt(2) === 'k') || piece[0].id.charAt(2) === 'r') {
                if ('isMoved' in piece[0]) {
                    piece[0].isMoved = true;
                }
            }

            if ('rock' in piece[0] && 'bishop' in piece[0]) {
                if (piece[0].id.charAt(2) === 'q') {
                    piece[0].bishop.isLeft = true;
                    piece[0].rock.isLeft = true;
                }
            }

            if (piece[0].id.charAt(2) === 'k') {
                if (piece[0].id.charAt(0) === 'b') {
                    CheckSystem.BKingPos.pos = piece[0].position
                    CheckSystem.BKingPos.side = piece[0].isLeft
                }
                else {
                    CheckSystem.WKingPos.pos = piece[0].position
                    CheckSystem.WKingPos.side = piece[0].isLeft
                }
                Piece.resetCheck()
            }

            if (piece[0].id.charAt(2) !== 'k') {
                if (piece[0].isBlack) {
                    if (CheckSystem.WKingPos.side === piece[0].isLeft) {
                        if (piece[0].id.charAt(2) !== 'p') {
                            if (piece[0].isVailedMove(piece[0].position, CheckSystem.WKingPos.pos)) {
                                CheckSystem.AttackingPiecePos = { pos: piece[0].position, side: piece[0].isLeft }
                                CheckSystem.IsBlackAttacked = false
                                CheckSystem.AttackingPiece = piece[0].id.charAt(2)
                            }
                        }
                        else {
                            if ('isVailedEating' in piece[0]) {
                                if (piece[0].isVailedEating(piece[0].position, CheckSystem.WKingPos.pos)) {
                                    CheckSystem.AttackingPiecePos = { pos: piece[0].position, side: piece[0].isLeft }
                                    CheckSystem.IsBlackAttacked = false
                                    CheckSystem.AttackingPiece = piece[0].id.charAt(2)
                                }
                            }
                        }
                    }
                }
                else {
                    if (CheckSystem.BKingPos.side === piece[0].isLeft) {
                        if (piece[0].id.charAt(2) !== 'p') {
                            if (piece[0].isVailedMove(piece[0].position, CheckSystem.BKingPos.pos)) {
                                CheckSystem.AttackingPiecePos = { pos: piece[0].position, side: piece[0].isLeft }
                                CheckSystem.IsBlackAttacked = true
                                CheckSystem.AttackingPiece = piece[0].id.charAt(2)
                            }
                        }
                        else {
                            if ('isVailedEating' in piece[0]) {
                                if (piece[0].isVailedEating(piece[0].position, CheckSystem.BKingPos.pos)) {
                                    CheckSystem.AttackingPiecePos = { pos: piece[0].position, side: piece[0].isLeft }
                                    CheckSystem.IsBlackAttacked = true
                                    CheckSystem.AttackingPiece = piece[0].id.charAt(2)
                                }
                            }
                        }
                    }
                }
            }

            Board.Clear();
        }
        Game.UpdateAllPieces()
    }

    static movment(e: Event): void {
        if (Chess.isMate()){
            return
        }

        // on which HTML element user click
        const target = e.target as HTMLInputElement

        // make an array of 2 coordinates for position of click
        const clickPosition = [Number(target.id.charAt(0)), Number(target.id.charAt(2))]

        // Importing HTML element of starting cell
        const startCell = document.querySelector(`.selectedCell`) as HTMLElement

        // Calculate start position
        const startPosition: number[] = [Number(startCell.id.charAt(0)), Number(startCell.id.charAt(2))]

        // Take HTML element of piece from starting cell
        const movedPiece = startCell?.firstChild as HTMLElement

        // get starting cell
        const startSide = startCell?.id.charAt(4)

        if (target.classList.contains(`lighttedCell_casteling`)) {
            Piece.move(e, startPosition, clickPosition, startSide, movedPiece)
            if (movedPiece.id.charAt(0) === 'w') {
                if (clickPosition[0] === 2) {
                    const movedRock = document.getElementById(`${0},${clickPosition[1]},${startSide}`)?.firstChild as HTMLElement
                    Piece.move(e, [0, clickPosition[1]], [3, clickPosition[1]], startSide, movedRock)
                }
                else if (clickPosition[0] === 6) {
                    const movedRock = document.getElementById(`${7},${clickPosition[1]},${startSide}`)?.firstChild as HTMLElement
                    Piece.move(e, [7, clickPosition[1]], [5, clickPosition[1]], startSide, movedRock)
                }
            }
            else {
                if (clickPosition[0] === 5) {
                    const movedRock = document.getElementById(`${7},${clickPosition[1]},${startSide}`)?.firstChild as HTMLElement
                    Piece.move(e, [7, clickPosition[1]], [4, clickPosition[1]], startSide, movedRock)
                }
                else if (clickPosition[0] === 1) {
                    const movedRock = document.getElementById(`${0},${clickPosition[1]},${startSide}`)?.firstChild as HTMLElement
                    Piece.move(e, [0, clickPosition[1]], [2, clickPosition[1]], startSide, movedRock)
                }
            }
        }
        else {
            Piece.move(e, startPosition, clickPosition, startSide, movedPiece)
        }
    }

    protected createPiece(pieceName: string, isLeft: boolean): void {
        const side = isLeft === true ? 'L' : 'R';

        const placment: HTMLElement | null = document.getElementById(`${this.position[0]},${this.position[1]},${side}`)

        let piece: HTMLElement = document.createElement('div');
        piece.className = `piece ${pieceName}`
        piece.id = this.id
        piece.draggable = true

        piece.addEventListener('click', (<EventListener>this.movementOfPieces));
        piece.addEventListener('dragstart', (<EventListener>this.movementOfPieces))

        placment?.append(piece)
    }

    movementOfPieces(event: Event & { target: HTMLElement }): void {
        if (event.target.id.charAt(0) !== Game.currentMove) {
            return
        }

        const positionStart: number[] = [Number(event.target.parentElement?.id.charAt(2)), Number(event.target.parentElement?.id.charAt(0))]
        const side = event.target.parentElement?.id.charAt(4);

        Board.Clear();

        if (side === 'L') {
            let selected = ArrayBoards.L[positionStart[0]][positionStart[1]];
            if (!event.target.parentElement?.classList.contains(`selectedCell`)) {
                selected[0].lightAllPossibleMove()
            }
            else {
                Board.Clear();
            }
        }

        else if (side === 'R') {
            let selected = ArrayBoards.R[positionStart[0]][positionStart[1]];

            if (!event.target.parentElement?.classList.contains(`selectedCell`)) {
                selected[0].lightAllPossibleMove()
            }
            else {
                Board.Clear();
            }
        }
    }
}
export class King extends Piece {
    public isMoved: boolean;

    constructor(id: string, position: number[], isLeft: boolean, isMoved: boolean = false) {
        super(id, position, isLeft)
        this.isMoved = isMoved
    }

    create(): void { // color = black/white
        const color = this.id.charAt(0) === 'b' ? 'black' : 'white'
        super.createPiece(`${color}_king`, this.isLeft)
    }

    isVailedMove(positionStart: number[], positionEnd: number[]): boolean {
        if ((Math.abs(positionEnd[0] - positionStart[0]) <= 1 && (Math.abs(positionStart[1] - positionEnd[1]) <= 1))) {
            if (!Cell.isUnderAttack(positionEnd, !this.isBlack, this.isLeft) && !Cell.isUnderAttack(positionEnd, !this.isBlack, !this.isLeft)) {
                return true
            }
        }
        return false
    }

    isVailedCasteling(positionStart: number[], positionEnd: number[], isLeft: boolean, isBlack: boolean): boolean {
        if (!isBlack) {
            if (!this.isMoved && (positionEnd[0] === 2 || positionEnd[0] === 6)) {
                if (positionStart[1] === positionEnd[1]) {
                    if (positionEnd[0] === 2 && !Cell.isEmpty([0, positionStart[1]], isLeft)) {
                        if ((Cell.isEmpty([1, positionStart[1]], isLeft) && Cell.isEmpty([2, positionStart[1]], isLeft) && Cell.isEmpty([3, positionStart[1]], isLeft)) && Cell.isEmpty([2, positionStart[1]], !isLeft) && Cell.isEmpty([3, positionStart[1]], !isLeft)) {
                            if (!Cell.isUnderAttack([1, positionStart[1]], !isBlack, isLeft) && !Cell.isUnderAttack([2, positionStart[1]], !isBlack, isLeft) && !Cell.isUnderAttack([3, positionStart[1]], !isBlack, isLeft) && !Cell.isUnderAttack([2, positionStart[1]], !isBlack, !isLeft)) {
                                return true
                            }
                        }
                    }
                    if (positionEnd[0] === 6 && !Cell.isEmpty([7, positionStart[1]], isLeft)) {
                        if ((Cell.isEmpty([5, positionStart[1]], isLeft) && Cell.isEmpty([6, positionStart[1]], isLeft)) && (Cell.isEmpty([5, positionStart[1]], !isLeft) && Cell.isEmpty([6, positionStart[1]], !isLeft))) {
                            if (!Cell.isUnderAttack([5, positionStart[1]], !isBlack, isLeft) && !Cell.isUnderAttack([6, positionStart[1]], !isBlack, isLeft) && !Cell.isUnderAttack([6, positionStart[1]], !isBlack, !isLeft)) {
                                return true
                            }
                        }
                    }
                }
            }
        }
        else {
            if (!this.isMoved && (positionEnd[0] === 1 || positionEnd[0] === 5)) {
                if (positionStart[1] === positionEnd[1]) {
                    if (positionEnd[0] === 5 && !Cell.isEmpty([7, positionStart[1]], isLeft)) {
                        if ((Cell.isEmpty([4, positionStart[1]], isLeft) && Cell.isEmpty([5, positionStart[1]], isLeft) && Cell.isEmpty([6, positionStart[1]], isLeft)) && (Cell.isEmpty([4, positionStart[1]], !isLeft) && Cell.isEmpty([5, positionStart[1]], !isLeft))) {
                            if (!Cell.isUnderAttack([4, positionStart[1]], !isBlack, isLeft) && !Cell.isUnderAttack([5, positionStart[1]], !isBlack, isLeft) && !Cell.isUnderAttack([6, positionStart[1]], !isBlack, isLeft) && !Cell.isUnderAttack([5, positionStart[1]], !isBlack, !isLeft)) {
                                return true
                            }
                        }
                    }
                    if (positionEnd[0] === 1 && !Cell.isEmpty([0, positionStart[1]], isLeft)) {
                        if ((Cell.isEmpty([1, positionStart[1]], isLeft) && Cell.isEmpty([2, positionStart[1]], isLeft)) && (Cell.isEmpty([1, positionStart[1]], !isLeft) && Cell.isEmpty([2, positionStart[1]], !isLeft))) {
                            if (!Cell.isUnderAttack([1, positionStart[1]], !isBlack, isLeft) && !Cell.isUnderAttack([2, positionStart[1]], !isBlack, isLeft) && !Cell.isUnderAttack([1, positionStart[1]], !isBlack, !isLeft)) {
                                return true
                            }
                        }
                    }
                }
            }
        }
        return false
    }

    lightAllPossibleMove(isSecretly: boolean = false): void {
        this.numberPossibleMoves = 0;
        Cell.lightStartCell(this.position, this.isLeft, isSecretly)
        for (let i = 0; i < 8; i++) {
            for (let j = 0; j < 8; j++) {
                if (this.isVailedCasteling(this.position, [i, j], this.isLeft, this.isBlack)) {
                    Cell.lightMovableCell([i, j], this.isLeft, isSecretly)
                    Cell.lightCastelingCell([i, j], this.isLeft, isSecretly)
                    this.numberPossibleMoves += 1
                }
                if (this.isVailedMove(this.position, [i, j])) {
                    if ((ArrayBoards.L[j][i].length === 0) && (ArrayBoards.R[j][i].length === 0)) {
                        if (i !== this.position[0] || j !== this.position[1]) {
                            Cell.lightMovableCell([i, j], this.isLeft, isSecretly)
                            this.numberPossibleMoves += 1
                        }
                    }
                    if (this.position[0] !== i || this.position[1] !== j) {
                        if (this.isLeft === true) {
                            if (ArrayBoards.L[j][i].length !== 0 && ArrayBoards.R[j][i].length === 0 && ArrayBoards.L[j][i][0].isBlack !== this.isBlack) {
                                Cell.lightEatableCell([i, j], this.isLeft, isSecretly)
                                this.numberPossibleMoves += 1
                            }
                        }
                        else {
                            if (ArrayBoards.R[j][i].length !== 0 && ArrayBoards.L[j][i].length === 0 && ArrayBoards.R[j][i][0].isBlack !== this.isBlack) {
                                Cell.lightEatableCell([i, j], this.isLeft, isSecretly)
                                this.numberPossibleMoves += 1
                            }
                        }
                    }
                }
            }
        }
    }
}
export class Bishop extends Piece {

    constructor(id: string, position: number[], isLeft: boolean) {
        super(id, position, isLeft)
    }

    create(): void { // color = black/white
        const color = this.id.charAt(0) === 'b' ? 'black' : 'white'
        super.createPiece(`${color}_bishop`, this.isLeft)
    }

    isVailedMove(positionStart: number[], positionEnd: number[]): boolean {
        if (Math.abs(positionStart[0] - positionEnd[0]) !== Math.abs(positionStart[1] - positionEnd[1])) {
            return false
        }

        // -----------[Pinned check]--------------
        if (super.isPinned(this.isLeft)) {
            return false
        }
        // ---------------------------------------

        const xOffset = positionEnd[0] > positionStart[0] ? 1 : -1;
        const yOffset = positionEnd[1] > positionStart[1] ? 1 : -1;

        let xPos = positionStart[0] + xOffset
        let yPos = positionStart[1] + yOffset

        while (xPos !== positionEnd[0] && yPos !== positionEnd[1]) {

            if (this.isLeft === true) {
                if (ArrayBoards.L[yPos][xPos].length !== 0) {
                    return false
                }
            }

            if (this.isLeft === false) {
                if (ArrayBoards.R[yPos][xPos].length !== 0) {
                    return false
                }
            }

            xPos += xOffset
            yPos += yOffset

        }

        return true;
    }

    lightAllPossibleMove(isSecretly: boolean = false): void {
        Cell.lightStartCell(this.position, this.isLeft, isSecretly)
        this.numberPossibleMoves = 0
        // --------------------------------------------------------------------------------------
        // check is our king under attack
        if (this.isBlack && CheckSystem.IsBlackAttacked && CheckSystem.AttackingPiecePos != null) {
            // if we're on a same side only legal move it to eat attacking piece or block their way
            // Save king position of our team
            let kingUnderAttack = this.isBlack ? CheckSystem.BKingPos.pos : CheckSystem.WKingPos.pos
            switch (CheckSystem.AttackingPiece) {
                // Check is it movment by straight line
                case 'r' || 'q':
                    // Check is king and piece on same or not board
                    if ((CheckSystem.IsBlackAttacked === this.isBlack) && (CheckSystem.AttackingPiecePos.side !== this.isLeft)) {
                        if (CheckSystem.AttackingPiecePos.pos[0] === kingUnderAttack[0]) {
                            let start = CheckSystem.AttackingPiecePos.pos[1] < kingUnderAttack[1] ? CheckSystem.AttackingPiecePos.pos[1] : kingUnderAttack[1]

                            let end = CheckSystem.AttackingPiecePos.pos[1] < kingUnderAttack[1] ? kingUnderAttack[1] : CheckSystem.AttackingPiecePos.pos[1]

                            for (let Y_i = start; Y_i < end; Y_i++) {
                                if (this.isVailedMove(this.position, [CheckSystem.AttackingPiecePos.pos[0], Y_i])) {
                                    Cell.lightMovableCell([CheckSystem.AttackingPiecePos.pos[0], Y_i], this.isLeft, isSecretly)
                                    this.numberPossibleMoves += 1
                                }
                            }
                            return
                        }
                        if (CheckSystem.AttackingPiecePos.pos[1] === kingUnderAttack[1]) {
                            let start = CheckSystem.AttackingPiecePos.pos[0] < kingUnderAttack[0] ? CheckSystem.AttackingPiecePos.pos[0] : kingUnderAttack[0]

                            let end = CheckSystem.AttackingPiecePos.pos[0] < kingUnderAttack[0] ? kingUnderAttack[0] : CheckSystem.AttackingPiecePos.pos[0]

                            for (let X_i = start; X_i < end; X_i++) {
                                if (this.isVailedMove(this.position, [CheckSystem.AttackingPiecePos.pos[0], X_i])) {
                                    Cell.lightMovableCell([CheckSystem.AttackingPiecePos.pos[0], X_i], this.isLeft, isSecretly)
                                    this.numberPossibleMoves += 1
                                }
                            }
                            return
                        }
                    }
                    // Separtly check is this piece can eat attacker
                    if (this.isVailedMove(this.position, CheckSystem.AttackingPiecePos.pos)) {
                        Cell.lightMovableCell(CheckSystem.AttackingPiecePos.pos, this.isLeft, isSecretly)
                        Cell.lightEatableCell(CheckSystem.AttackingPiecePos.pos, this.isLeft, isSecretly)
                        this.numberPossibleMoves += 1
                    }
                    break;
                case 'b' || 'q':
                    // Check is king and piece on same or not board
                    if ((CheckSystem.IsBlackAttacked === this.isBlack) && (CheckSystem.AttackingPiecePos.side !== this.isLeft)) {
                        let start = CheckSystem.AttackingPiecePos.pos < kingUnderAttack ? CheckSystem.AttackingPiecePos.pos : kingUnderAttack

                        let end = CheckSystem.AttackingPiecePos.pos < kingUnderAttack ? kingUnderAttack : CheckSystem.AttackingPiecePos.pos

                        for (let X_i = start[0]; X_i < end[0]; X_i++) {
                            for (let Y_i = start[1]; Y_i < end[1]; Y_i++) {
                                if (this.isVailedMove(this.position, [X_i, Y_i])) {
                                    Cell.lightMovableCell([X_i, Y_i], this.isLeft, isSecretly)
                                    this.numberPossibleMoves += 1
                                }
                            }
                            return
                        }
                    }
                    // Separtly check is this piece can eat attacker
                    if (this.isVailedMove(this.position, CheckSystem.AttackingPiecePos.pos)) {
                        Cell.lightMovableCell(CheckSystem.AttackingPiecePos.pos, this.isLeft, isSecretly)
                        Cell.lightEatableCell(CheckSystem.AttackingPiecePos.pos, this.isLeft, isSecretly)
                        this.numberPossibleMoves += 1
                    }
                    break;

                default:
                    if (CheckSystem.AttackingPiecePos.side === this.isLeft) {
                        if (this.isVailedMove(this.position, CheckSystem.AttackingPiecePos.pos)) {
                            Cell.lightMovableCell(CheckSystem.AttackingPiecePos.pos, this.isLeft, isSecretly)
                            Cell.lightEatableCell(CheckSystem.AttackingPiecePos.pos, this.isLeft, isSecretly)
                            this.numberPossibleMoves += 1
                        }
                    }
                    break;

            }
            return
        }
        // -------------------------------------------------------------------------------------------------------
        for (let i = 0; i < 8; i++) {
            for (let j = 0; j < 8; j++) {
                try {
                    if (this.isVailedMove(this.position, [i, j])) {
                        if ((ArrayBoards.L[j][i].length === 0) && (ArrayBoards.R[j][i].length === 0)) {
                            if (i !== this.position[0] || j !== this.position[1]) {
                                Cell.lightMovableCell([i, j], this.isLeft, isSecretly)
                                this.numberPossibleMoves += 1
                            }
                        }
                        if (this.position[0] !== i || this.position[1] !== j) {
                            if (this.isLeft === true) {
                                if (ArrayBoards.L[j][i].length !== 0 && ArrayBoards.R[j][i].length === 0 && ArrayBoards.L[j][i][0].isBlack !== this.isBlack) {
                                    Cell.lightEatableCell([i, j], this.isLeft, isSecretly)
                                    this.numberPossibleMoves += 1
                                }
                            }
                            else {
                                if (ArrayBoards.R[j][i].length !== 0 && ArrayBoards.L[j][i].length === 0 && ArrayBoards.R[j][i][0].isBlack !== this.isBlack) {
                                    Cell.lightEatableCell([i, j], this.isLeft, isSecretly)
                                    this.numberPossibleMoves += 1
                                }
                            }
                        }
                    }
                } catch (TypeError) {

                }
            }
        }
    }
}
export class Rock extends Piece {
    public isMoved: boolean;

    constructor(id: string, position: number[], isLeft: boolean, isMoved: boolean = false) {
        super(id, position, isLeft)
        this.isMoved = isMoved
    }

    create(): void { // color = black/white
        const color = this.id.charAt(0) === 'b' ? 'black' : 'white'
        super.createPiece(`${color}_rock`, this.isLeft)
    }

    isVailedMove(positionStart: number[], positionEnd: number[]): boolean {
        if (positionStart[0] !== positionEnd[0] && positionStart[1] !== positionEnd[1]) {
            return false;
        }

        // -----------[Pinned check]--------------
        if (super.isPinned(this.isLeft)) {
            return false
        }
        // ---------------------------------------

        if (positionStart[0] === positionEnd[0]) {
            const yOffset = positionEnd[1] > positionStart[1] ? 1 : -1;
            let yPos = positionStart[1] + yOffset;
            while (yPos !== positionEnd[1]) {
                if (this.isLeft) {
                    if (ArrayBoards.L[yPos][positionStart[0]].length !== 0) {
                        return false
                    }
                }
                else {
                    if (ArrayBoards.R[yPos][positionStart[0]].length !== 0) {
                        return false
                    }
                }
                yPos += yOffset
            }
        }

        else if (positionStart[1] === positionEnd[1]) {
            const xOffset = positionEnd[0] > positionStart[0] ? 1 : -1;
            let xPos = positionStart[0] + xOffset;
            while (xPos !== positionEnd[0]) {
                if (this.isLeft) {
                    if (ArrayBoards.L[positionStart[1]][xPos].length !== 0) {
                        return false
                    }
                }
                else {
                    if (ArrayBoards.R[positionStart[1]][xPos].length !== 0) {
                        return false
                    }
                }
                xPos += xOffset
            }
        }
        return true

    }

    lightAllPossibleMove(isSecretly: boolean = false): void {
        Cell.lightStartCell(this.position, this.isLeft, isSecretly)
        this.numberPossibleMoves = 0
        // --------------------------------------------------------------------------------------
        // check is our king under attack
        if (this.isBlack && CheckSystem.IsBlackAttacked && CheckSystem.AttackingPiecePos != null) {
            // if we're on a same side only legal move it to eat attacking piece or block their way
            // Save king position of our team
            let kingUnderAttack = this.isBlack ? CheckSystem.BKingPos.pos : CheckSystem.WKingPos.pos
            switch (CheckSystem.AttackingPiece) {
                // Check is it movment by straight line
                case 'r' || 'q':
                    // Check is king and piece on same or not board
                    if ((CheckSystem.IsBlackAttacked === this.isBlack) && (CheckSystem.AttackingPiecePos.side !== this.isLeft)) {
                        if (CheckSystem.AttackingPiecePos.pos[0] === kingUnderAttack[0]) {
                            let start = CheckSystem.AttackingPiecePos.pos[1] < kingUnderAttack[1] ? CheckSystem.AttackingPiecePos.pos[1] : kingUnderAttack[1]

                            let end = CheckSystem.AttackingPiecePos.pos[1] < kingUnderAttack[1] ? kingUnderAttack[1] : CheckSystem.AttackingPiecePos.pos[1]

                            for (let Y_i = start; Y_i < end; Y_i++) {
                                if (this.isVailedMove(this.position, [CheckSystem.AttackingPiecePos.pos[0], Y_i])) {
                                    Cell.lightMovableCell([CheckSystem.AttackingPiecePos.pos[0], Y_i], this.isLeft, isSecretly)
                                    this.numberPossibleMoves += 1
                                }
                            }
                            return
                        }
                        if (CheckSystem.AttackingPiecePos.pos[1] === kingUnderAttack[1]) {
                            let start = CheckSystem.AttackingPiecePos.pos[0] < kingUnderAttack[0] ? CheckSystem.AttackingPiecePos.pos[0] : kingUnderAttack[0]

                            let end = CheckSystem.AttackingPiecePos.pos[0] < kingUnderAttack[0] ? kingUnderAttack[0] : CheckSystem.AttackingPiecePos.pos[0]

                            for (let X_i = start; X_i < end; X_i++) {
                                if (this.isVailedMove(this.position, [CheckSystem.AttackingPiecePos.pos[0], X_i])) {
                                    Cell.lightMovableCell([CheckSystem.AttackingPiecePos.pos[0], X_i], this.isLeft, isSecretly)
                                    this.numberPossibleMoves += 1
                                }
                            }
                            return
                        }
                    }
                    // Separtly check is this piece can eat attacker
                    if (this.isVailedMove(this.position, CheckSystem.AttackingPiecePos.pos)) {
                        Cell.lightMovableCell(CheckSystem.AttackingPiecePos.pos, this.isLeft, isSecretly)
                        Cell.lightEatableCell(CheckSystem.AttackingPiecePos.pos, this.isLeft, isSecretly)
                        this.numberPossibleMoves += 1
                    }
                    break;
                case 'b' || 'q':
                    // Check is king and piece on same or not board
                    if ((CheckSystem.IsBlackAttacked === this.isBlack) && (CheckSystem.AttackingPiecePos.side !== this.isLeft)) {
                        let start = CheckSystem.AttackingPiecePos.pos < kingUnderAttack ? CheckSystem.AttackingPiecePos.pos : kingUnderAttack

                        let end = CheckSystem.AttackingPiecePos.pos < kingUnderAttack ? kingUnderAttack : CheckSystem.AttackingPiecePos.pos

                        for (let X_i = start[0]; X_i < end[0]; X_i++) {
                            for (let Y_i = start[1]; Y_i < end[1]; Y_i++) {
                                if (this.isVailedMove(this.position, [X_i, Y_i])) {
                                    Cell.lightMovableCell([X_i, Y_i], this.isLeft, isSecretly)
                                    this.numberPossibleMoves += 1
                                }
                            }
                            return
                        }
                    }
                    // Separtly check is this piece can eat attacker
                    if (this.isVailedMove(this.position, CheckSystem.AttackingPiecePos.pos)) {
                        Cell.lightMovableCell(CheckSystem.AttackingPiecePos.pos, this.isLeft, isSecretly)
                        Cell.lightEatableCell(CheckSystem.AttackingPiecePos.pos, this.isLeft, isSecretly)
                        this.numberPossibleMoves += 1
                    }
                    break;

                default:
                    if (CheckSystem.AttackingPiecePos.side === this.isLeft) {
                        if (this.isVailedMove(this.position, CheckSystem.AttackingPiecePos.pos)) {
                            Cell.lightMovableCell(CheckSystem.AttackingPiecePos.pos, this.isLeft, isSecretly)
                            Cell.lightEatableCell(CheckSystem.AttackingPiecePos.pos, this.isLeft, isSecretly)
                            this.numberPossibleMoves += 1
                        }
                    }
                    break;

            }
            return
        }
        // -------------------------------------------------------------------------------------------------------
        for (let i = 0; i < 8; i++) {
            for (let j = 0; j < 8; j++) {
                try {
                    if (this.isVailedMove(this.position, [i, j])) {
                        if ((ArrayBoards.L[j][i].length === 0) && (ArrayBoards.R[j][i].length === 0)) {
                            if (i !== this.position[0] || j !== this.position[1]) {
                                Cell.lightMovableCell([i, j], this.isLeft, isSecretly)
                                this.numberPossibleMoves += 1
                            }
                        }
                        if (this.position[0] !== i || this.position[1] !== j) {
                            if (this.isLeft) {
                                if (ArrayBoards.L[j][i].length !== 0 && ArrayBoards.R[j][i].length === 0 && ArrayBoards.L[j][i][0].isBlack !== this.isBlack) {
                                    Cell.lightEatableCell([i, j], this.isLeft, isSecretly)
                                    this.numberPossibleMoves += 1
                                }
                            }
                            else {
                                if (ArrayBoards.R[j][i].length !== 0 && ArrayBoards.L[j][i].length === 0 && ArrayBoards.R[j][i][0].isBlack !== this.isBlack) {
                                    Cell.lightEatableCell([i, j], this.isLeft, isSecretly)
                                    this.numberPossibleMoves += 1
                                }
                            }
                        }
                    }
                } catch (TypeError) { }
            }
        }
    }
}
export class Queen extends Piece {
    public bishop: Bishop
    public rock: Rock

    constructor(id: string, position: number[], isLeft: boolean) {
        super(id, position, isLeft)
        this.bishop = new Bishop(id, position, isLeft)
        this.rock = new Rock(id, position, isLeft, true)
    }

    create(): void { // color = black/white
        const color = this.id.charAt(0) === 'b' ? 'black' : 'white'
        super.createPiece(`${color}_queen`, this.isLeft)
    }

    isVailedMove(positionStart: number[], positionEnd: number[]): boolean {
        // -----------[Pinned check]--------------
        if (super.isPinned(this.isLeft)) {
            return false
        }
        // ---------------------------------------

        if (this.bishop.isVailedMove(positionStart, positionEnd) || (this.rock.isVailedMove(positionStart, positionEnd))) {
            return true;
        }
        return false
    }

    lightAllPossibleMove(isSecretly: boolean = false): void {
        Cell.lightStartCell(this.position, this.isLeft, isSecretly)
        this.numberPossibleMoves = 0
        // --------------------------------------------------------------------------------------
        // check is our king under attack
        if (this.isBlack && CheckSystem.IsBlackAttacked && CheckSystem.AttackingPiecePos != null) {
            // if we're on a same side only legal move it to eat attacking piece or block their way
            // Save king position of our team
            let kingUnderAttack = this.isBlack ? CheckSystem.BKingPos.pos : CheckSystem.WKingPos.pos
            switch (CheckSystem.AttackingPiece) {
                // Check is it movment by straight line
                case 'r' || 'q':
                    // Check is king and piece on same or not board
                    if ((CheckSystem.IsBlackAttacked === this.isBlack) && (CheckSystem.AttackingPiecePos.side !== this.isLeft)) {
                        if (CheckSystem.AttackingPiecePos.pos[0] === kingUnderAttack[0]) {
                            let start = CheckSystem.AttackingPiecePos.pos[1] < kingUnderAttack[1] ? CheckSystem.AttackingPiecePos.pos[1] : kingUnderAttack[1]

                            let end = CheckSystem.AttackingPiecePos.pos[1] < kingUnderAttack[1] ? kingUnderAttack[1] : CheckSystem.AttackingPiecePos.pos[1]

                            for (let Y_i = start; Y_i < end; Y_i++) {
                                if (this.isVailedMove(this.position, [CheckSystem.AttackingPiecePos.pos[0], Y_i])) {
                                    Cell.lightMovableCell([CheckSystem.AttackingPiecePos.pos[0], Y_i], this.isLeft, isSecretly)
                                    this.numberPossibleMoves += 1
                                }
                            }
                            return
                        }
                        if (CheckSystem.AttackingPiecePos.pos[1] === kingUnderAttack[1]) {
                            let start = CheckSystem.AttackingPiecePos.pos[0] < kingUnderAttack[0] ? CheckSystem.AttackingPiecePos.pos[0] : kingUnderAttack[0]

                            let end = CheckSystem.AttackingPiecePos.pos[0] < kingUnderAttack[0] ? kingUnderAttack[0] : CheckSystem.AttackingPiecePos.pos[0]

                            for (let X_i = start; X_i < end; X_i++) {
                                if (this.isVailedMove(this.position, [CheckSystem.AttackingPiecePos.pos[0], X_i])) {
                                    Cell.lightMovableCell([CheckSystem.AttackingPiecePos.pos[0], X_i], this.isLeft, isSecretly)
                                    this.numberPossibleMoves += 1
                                }
                            }
                            return
                        }
                    }
                    // Separtly check is this piece can eat attacker
                    if (this.isVailedMove(this.position, CheckSystem.AttackingPiecePos.pos)) {
                        Cell.lightMovableCell(CheckSystem.AttackingPiecePos.pos, this.isLeft, isSecretly)
                        Cell.lightEatableCell(CheckSystem.AttackingPiecePos.pos, this.isLeft, isSecretly)
                        this.numberPossibleMoves += 1
                    }
                    break;
                case 'b' || 'q':
                    // Check is king and piece on same or not board
                    if ((CheckSystem.IsBlackAttacked === this.isBlack) && (CheckSystem.AttackingPiecePos.side !== this.isLeft)) {
                        let start = CheckSystem.AttackingPiecePos.pos < kingUnderAttack ? CheckSystem.AttackingPiecePos.pos : kingUnderAttack

                        let end = CheckSystem.AttackingPiecePos.pos < kingUnderAttack ? kingUnderAttack : CheckSystem.AttackingPiecePos.pos

                        for (let X_i = start[0]; X_i < end[0]; X_i++) {
                            for (let Y_i = start[1]; Y_i < end[1]; Y_i++) {
                                if (this.isVailedMove(this.position, [X_i, Y_i])) {
                                    Cell.lightMovableCell([X_i, Y_i], this.isLeft, isSecretly)
                                    this.numberPossibleMoves += 1
                                }
                            }
                            return
                        }
                    }
                    // Separtly check is this piece can eat attacker
                    if (this.isVailedMove(this.position, CheckSystem.AttackingPiecePos.pos)) {
                        Cell.lightMovableCell(CheckSystem.AttackingPiecePos.pos, this.isLeft, isSecretly)
                        Cell.lightEatableCell(CheckSystem.AttackingPiecePos.pos, this.isLeft, isSecretly)
                        this.numberPossibleMoves += 1
                    }
                    break;

                default:
                    if (CheckSystem.AttackingPiecePos.side === this.isLeft) {
                        if (this.isVailedMove(this.position, CheckSystem.AttackingPiecePos.pos)) {
                            Cell.lightMovableCell(CheckSystem.AttackingPiecePos.pos, this.isLeft, isSecretly)
                            Cell.lightEatableCell(CheckSystem.AttackingPiecePos.pos, this.isLeft, isSecretly)
                            this.numberPossibleMoves += 1
                        }
                    }
                    break;

            }
            return
        }
        // -------------------------------------------------------------------------------------------------------
        for (let i = 0; i < 8; i++) {
            for (let j = 0; j < 8; j++) {
                try {
                    if (this.isVailedMove(this.position, [i, j])) {
                        if ((ArrayBoards.L[j][i].length === 0) && (ArrayBoards.R[j][i].length === 0)) {
                            if (i !== this.position[0] || j !== this.position[1]) {
                                Cell.lightMovableCell([i, j], this.isLeft, isSecretly)
                                this.numberPossibleMoves += 1
                            }
                        }
                        if (this.position[0] !== i || this.position[1] !== j) {
                            if (this.isLeft === true) {
                                if (ArrayBoards.L[j][i].length !== 0 && ArrayBoards.R[j][i].length === 0 && ArrayBoards.L[j][i][0].isBlack !== this.isBlack) {
                                    Cell.lightEatableCell([i, j], this.isLeft, isSecretly)
                                    this.numberPossibleMoves += 1
                                }
                            }
                            else {
                                if (ArrayBoards.R[j][i].length !== 0 && ArrayBoards.L[j][i].length === 0 && ArrayBoards.R[j][i][0].isBlack !== this.isBlack) {
                                    Cell.lightEatableCell([i, j], this.isLeft, isSecretly)
                                    this.numberPossibleMoves += 1
                                }
                            }
                        }
                    }
                } catch (TypeError) {

                }
            }
        }
    }
}
export class Knight extends Piece {
    constructor(id: string, position: number[], isLeft: boolean) {
        super(id, position, isLeft)
        this.isLeft = isLeft
    }

    create(): void { // color = black/white
        const color = this.id.charAt(0) === 'b' ? 'black' : 'white'
        super.createPiece(`${color}_knight`, this.isLeft)
    }

    isVailedMove(positionStart: number[], positionEnd: number[]): boolean {
        // -----------[Pinned check]--------------
        if (super.isPinned(this.isLeft)) {
            return false
        }
        // ---------------------------------------

        if ((Math.abs(positionEnd[0] - positionStart[0]) === 1 && Math.abs(positionEnd[1] - positionStart[1]) === 2) || (Math.abs(positionEnd[0] - positionStart[0]) === 2 && Math.abs(positionEnd[1] - positionStart[1]) === 1)) {
            return true;
        }

        return false;
    }

    lightAllPossibleMove(isSecretly: boolean = false): void {
        Cell.lightStartCell(this.position, this.isLeft, isSecretly)
        this.numberPossibleMoves = 0
        // --------------------------------------------------------------------------------------
        // check is our king under attack
        if (this.isBlack && CheckSystem.IsBlackAttacked && CheckSystem.AttackingPiecePos != null) {
            // if we're on a same side only legal move it to eat attacking piece or block their way
            // Save king position of our team
            let kingUnderAttack = this.isBlack ? CheckSystem.BKingPos.pos : CheckSystem.WKingPos.pos
            switch (CheckSystem.AttackingPiece) {
                // Check is it movment by straight line
                case 'r' || 'q':
                    // Check is king and piece on same or not board
                    if ((CheckSystem.IsBlackAttacked === this.isBlack) && (CheckSystem.AttackingPiecePos.side !== this.isLeft)) {
                        if (CheckSystem.AttackingPiecePos.pos[0] === kingUnderAttack[0]) {
                            let start = CheckSystem.AttackingPiecePos.pos[1] < kingUnderAttack[1] ? CheckSystem.AttackingPiecePos.pos[1] : kingUnderAttack[1]

                            let end = CheckSystem.AttackingPiecePos.pos[1] < kingUnderAttack[1] ? kingUnderAttack[1] : CheckSystem.AttackingPiecePos.pos[1]

                            for (let Y_i = start; Y_i < end; Y_i++) {
                                if (this.isVailedMove(this.position, [CheckSystem.AttackingPiecePos.pos[0], Y_i])) {
                                    Cell.lightMovableCell([CheckSystem.AttackingPiecePos.pos[0], Y_i], this.isLeft, isSecretly)
                                    this.numberPossibleMoves += 1
                                }
                            }
                            return
                        }
                        if (CheckSystem.AttackingPiecePos.pos[1] === kingUnderAttack[1]) {
                            let start = CheckSystem.AttackingPiecePos.pos[0] < kingUnderAttack[0] ? CheckSystem.AttackingPiecePos.pos[0] : kingUnderAttack[0]

                            let end = CheckSystem.AttackingPiecePos.pos[0] < kingUnderAttack[0] ? kingUnderAttack[0] : CheckSystem.AttackingPiecePos.pos[0]

                            for (let X_i = start; X_i < end; X_i++) {
                                if (this.isVailedMove(this.position, [CheckSystem.AttackingPiecePos.pos[0], X_i])) {
                                    Cell.lightMovableCell([CheckSystem.AttackingPiecePos.pos[0], X_i], this.isLeft, isSecretly)
                                    this.numberPossibleMoves += 1
                                }
                            }
                            return
                        }
                    }
                    // Separtly check is this piece can eat attacker
                    if (this.isVailedMove(this.position, CheckSystem.AttackingPiecePos.pos)) {
                        Cell.lightMovableCell(CheckSystem.AttackingPiecePos.pos, this.isLeft, isSecretly)
                        Cell.lightEatableCell(CheckSystem.AttackingPiecePos.pos, this.isLeft, isSecretly)
                        this.numberPossibleMoves += 1
                    }
                    break;
                case 'b' || 'q':
                    // Check is king and piece on same or not board
                    if ((CheckSystem.IsBlackAttacked === this.isBlack) && (CheckSystem.AttackingPiecePos.side !== this.isLeft)) {
                        let start = CheckSystem.AttackingPiecePos.pos < kingUnderAttack ? CheckSystem.AttackingPiecePos.pos : kingUnderAttack

                        let end = CheckSystem.AttackingPiecePos.pos < kingUnderAttack ? kingUnderAttack : CheckSystem.AttackingPiecePos.pos

                        for (let X_i = start[0]; X_i < end[0]; X_i++) {
                            for (let Y_i = start[1]; Y_i < end[1]; Y_i++) {
                                if (this.isVailedMove(this.position, [X_i, Y_i])) {
                                    Cell.lightMovableCell([X_i, Y_i], this.isLeft, isSecretly)
                                    this.numberPossibleMoves += 1
                                }
                            }
                            return
                        }
                    }
                    // Separtly check is this piece can eat attacker
                    if (this.isVailedMove(this.position, CheckSystem.AttackingPiecePos.pos)) {
                        Cell.lightMovableCell(CheckSystem.AttackingPiecePos.pos, this.isLeft, isSecretly)
                        Cell.lightEatableCell(CheckSystem.AttackingPiecePos.pos, this.isLeft, isSecretly)
                        this.numberPossibleMoves += 1
                    }
                    break;

                default:
                    if (CheckSystem.AttackingPiecePos.side === this.isLeft) {
                        if (this.isVailedMove(this.position, CheckSystem.AttackingPiecePos.pos)) {
                            Cell.lightMovableCell(CheckSystem.AttackingPiecePos.pos, this.isLeft, isSecretly)
                            Cell.lightEatableCell(CheckSystem.AttackingPiecePos.pos, this.isLeft, isSecretly)
                            this.numberPossibleMoves += 1
                        }
                    }
                    break;

            }
            return
        }
        // -------------------------------------------------------------------------------------------------------
        for (let i = 0; i < 8; i++) {
            for (let j = 0; j < 8; j++) {
                try {
                    if (this.isVailedMove(this.position, [i, j])) {
                        if ((ArrayBoards.L[j][i].length === 0) && (ArrayBoards.R[j][i].length === 0)) {
                            if (i !== this.position[0] || j !== this.position[1]) {
                                Cell.lightMovableCell([i, j], this.isLeft)
                            }
                        }
                        if (this.position[0] !== i || this.position[1] !== j) {
                            if (this.isLeft === true) {
                                if (ArrayBoards.L[j][i].length !== 0 && ArrayBoards.R[j][i].length === 0 && ArrayBoards.L[j][i][0].isBlack !== this.isBlack) {
                                    Cell.lightEatableCell([i, j], this.isLeft, isSecretly)
                                    this.numberPossibleMoves += 1
                                }
                            }
                            else {
                                if (ArrayBoards.R[j][i].length !== 0 && ArrayBoards.L[j][i].length === 0 && ArrayBoards.R[j][i][0].isBlack !== this.isBlack) {
                                    Cell.lightEatableCell([i, j], this.isLeft, isSecretly)
                                    this.numberPossibleMoves += 1
                                }
                            }
                        }
                    }
                } catch (TypeError) {

                }
            }
        }
    }
}
export class Pawn extends Piece {

    constructor(id: string, position: number[], isLeft: boolean) {
        super(id, position, isLeft)
    }

    create(): void { // color = black/white
        const color = this.id.charAt(0) === 'b' ? 'black' : 'white'
        super.createPiece(`${color}_pawn`, this.isLeft)
    }

    isVailedMove(positionStart: number[], positionEnd: number[]): boolean {
        // -----------[Pinned check]--------------
        if (super.isPinned(this.isLeft)) {
            return false
        }
        // ---------------------------------------

        if (this.isLeft) {
            if (!this.isBlack) {
                if (positionStart[1] === 6) {
                    if (ArrayBoards.L[positionStart[1] - 1][positionStart[0]].length === 0) {
                        if ((positionEnd[0] === positionStart[0]) && (positionEnd[1] - positionStart[1] === -2)) {
                            return true
                        }
                    }
                }
                if ((positionEnd[0] === positionStart[0]) && (positionEnd[1] - positionStart[1] === -1)) {
                    return true
                }
            }
            else {
                if (positionStart[1] === 1) {
                    if (ArrayBoards.L[positionStart[1] + 1][positionStart[0]].length === 0) {
                        if ((positionEnd[0] === positionStart[0]) && (positionEnd[1] - positionStart[1] === 2)) {
                            return true
                        }
                    }
                }
                if ((positionEnd[0] === positionStart[0]) && (positionEnd[1] - positionStart[1] === 1)) {
                    return true
                }
            }
        }
        else {
            if (!this.isBlack) {
                if (positionStart[1] === 6) {
                    if (ArrayBoards.L[positionStart[1] - 1][positionStart[0]].length === 0) {
                        if ((positionEnd[0] === positionStart[0]) && (positionEnd[1] - positionStart[1] === -2)) {
                            return true
                        }
                    }
                }
                if ((positionEnd[0] === positionStart[0]) && (positionEnd[1] - positionStart[1] === -1)) {
                    return true
                }
            }
            else {
                if (positionStart[1] === 1) {
                    if (ArrayBoards.L[positionStart[1] + 1][positionStart[0]].length === 0) {
                        if ((positionEnd[0] === positionStart[0]) && (positionEnd[1] - positionStart[1] === 2)) {
                            return true
                        }
                    }
                }
                if ((positionEnd[0] === positionStart[0]) && (positionEnd[1] - positionStart[1] === 1)) {
                    return true
                }
            }
        }

        return false
    }

    isVailedEating(positionStart: number[], positionEnd: number[]): boolean {
        if (!this.isBlack) {
            if ((positionEnd[0] - positionStart[0] === 1 || positionEnd[0] - positionStart[0] === -1) && (positionEnd[1] - positionStart[1] === -1)) {
                return true
            }
        }
        else {
            if ((positionEnd[0] - positionStart[0] === 1 || positionEnd[0] - positionStart[0] === -1) && (positionEnd[1] - positionStart[1] === 1)) {
                return true
            }
        }
        return false
    }

    lightAllPossibleMove(isSecretly: boolean = false): void {
        Cell.lightStartCell(this.position, this.isLeft, isSecretly)
        this.numberPossibleMoves = 0
        // --------------------------------------------------------------------------------------
        // check is our king under attack
        if (this.isBlack && CheckSystem.IsBlackAttacked && CheckSystem.AttackingPiecePos != null) {
            // if we're on a same side only legal move it to eat attacking piece or block their way
            // Save king position of our team
            let kingUnderAttack = this.isBlack ? CheckSystem.BKingPos.pos : CheckSystem.WKingPos.pos
            switch (CheckSystem.AttackingPiece) {
                // Check is it movment by straight line
                case 'r' || 'q':
                    // Check is king and piece on same or not board
                    if ((CheckSystem.IsBlackAttacked === this.isBlack) && (CheckSystem.AttackingPiecePos.side !== this.isLeft)) {
                        if (CheckSystem.AttackingPiecePos.pos[0] === kingUnderAttack[0]) {
                            let start = CheckSystem.AttackingPiecePos.pos[1] < kingUnderAttack[1] ? CheckSystem.AttackingPiecePos.pos[1] : kingUnderAttack[1]

                            let end = CheckSystem.AttackingPiecePos.pos[1] < kingUnderAttack[1] ? kingUnderAttack[1] : CheckSystem.AttackingPiecePos.pos[1]

                            for (let Y_i = start; Y_i < end; Y_i++) {
                                if (this.isVailedMove(this.position, [CheckSystem.AttackingPiecePos.pos[0], Y_i])) {
                                    Cell.lightMovableCell([CheckSystem.AttackingPiecePos.pos[0], Y_i], this.isLeft, isSecretly)
                                    this.numberPossibleMoves += 1
                                }
                            }
                            return
                        }
                        if (CheckSystem.AttackingPiecePos.pos[1] === kingUnderAttack[1]) {
                            let start = CheckSystem.AttackingPiecePos.pos[0] < kingUnderAttack[0] ? CheckSystem.AttackingPiecePos.pos[0] : kingUnderAttack[0]

                            let end = CheckSystem.AttackingPiecePos.pos[0] < kingUnderAttack[0] ? kingUnderAttack[0] : CheckSystem.AttackingPiecePos.pos[0]

                            for (let X_i = start; X_i < end; X_i++) {
                                if (this.isVailedMove(this.position, [CheckSystem.AttackingPiecePos.pos[0], X_i])) {
                                    Cell.lightMovableCell([CheckSystem.AttackingPiecePos.pos[0], X_i], this.isLeft, isSecretly)
                                    this.numberPossibleMoves += 1
                                }
                            }
                            return
                        }
                    }
                    // Separtly check is this piece can eat attacker
                    if (this.isVailedMove(this.position, CheckSystem.AttackingPiecePos.pos)) {
                        Cell.lightMovableCell(CheckSystem.AttackingPiecePos.pos, this.isLeft, isSecretly)
                        Cell.lightEatableCell(CheckSystem.AttackingPiecePos.pos, this.isLeft, isSecretly)
                        this.numberPossibleMoves += 1
                    }
                    break;
                case 'b' || 'q':
                    // Check is king and piece on same or not board
                    if ((CheckSystem.IsBlackAttacked === this.isBlack) && (CheckSystem.AttackingPiecePos.side !== this.isLeft)) {
                        let start = CheckSystem.AttackingPiecePos.pos < kingUnderAttack ? CheckSystem.AttackingPiecePos.pos : kingUnderAttack

                        let end = CheckSystem.AttackingPiecePos.pos < kingUnderAttack ? kingUnderAttack : CheckSystem.AttackingPiecePos.pos

                        for (let X_i = start[0]; X_i < end[0]; X_i++) {
                            for (let Y_i = start[1]; Y_i < end[1]; Y_i++) {
                                if (this.isVailedMove(this.position, [X_i, Y_i])) {
                                    Cell.lightMovableCell([X_i, Y_i], this.isLeft, isSecretly)
                                    this.numberPossibleMoves += 1
                                }
                            }
                            return
                        }
                    }
                    // Separtly check is this piece can eat attacker
                    if (this.isVailedMove(this.position, CheckSystem.AttackingPiecePos.pos)) {
                        Cell.lightMovableCell(CheckSystem.AttackingPiecePos.pos, this.isLeft, isSecretly)
                        Cell.lightEatableCell(CheckSystem.AttackingPiecePos.pos, this.isLeft, isSecretly)
                        this.numberPossibleMoves += 1
                    }
                    break;

                default:
                    if (CheckSystem.AttackingPiecePos.side === this.isLeft) {
                        if (this.isVailedEating(this.position, CheckSystem.AttackingPiecePos.pos)) {
                            Cell.lightMovableCell(CheckSystem.AttackingPiecePos.pos, this.isLeft, isSecretly)
                            Cell.lightEatableCell(CheckSystem.AttackingPiecePos.pos, this.isLeft, isSecretly)
                            this.numberPossibleMoves += 1
                        }
                    }
                    break;

            }
            return
        }
        // -------------------------------------------------------------------------------------------------------
        for (let i = 0; i < 8; i++) {
            for (let j = 0; j < 8; j++) {
                if ((ArrayBoards.L[j][i].length === 0) && (ArrayBoards.R[j][i].length === 0)) {
                    if (this.isVailedMove(this.position, [i, j])) {
                        if (i !== this.position[0] || j !== this.position[1]) {
                            Cell.lightMovableCell([i, j], this.isLeft, isSecretly)
                            this.numberPossibleMoves += 1
                        }
                    }
                }
                if (i === this.position[0] && j === this.position[1]) {
                    Cell.lightStartCell(this.position, this.isLeft, isSecretly)
                }
                if (this.isVailedEating(this.position, [i, j])) {
                    if (this.isLeft && ArrayBoards.R[j][i].length === 0 && ArrayBoards.L[j][i].length !== 0 && ArrayBoards.L[j][i][0].isBlack !== this.isBlack) {
                        Cell.lightEatableCell([i, j], this.isLeft, isSecretly)
                        this.numberPossibleMoves += 1
                    }
                    else if (!this.isLeft && ArrayBoards.L[j][i].length === 0 && ArrayBoards.R[j][i].length !== 0 && ArrayBoards.R[j][i][0].isBlack !== this.isBlack) {
                        Cell.lightEatableCell([i, j], this.isLeft, isSecretly)
                        this.numberPossibleMoves += 1
                    }
                }
            }
        }
    }
}
