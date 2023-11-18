import { ArrayBoards } from "./main.js"
import { Cell, Board } from './field.js'

export class Piece {
    public id: string;
    public position: number[] // x first, y second
    public isBlack: boolean;

    protected constructor(id: string, position: number[]) {
        this.id = id;
        this.position = position
        this.isBlack = id.charAt(0) === 'b' ? true : false;
    }

    static lightEatableCells(e: Event): void {
        // Piece can eat piece only on same board and if this cell on second board is possibly to move
    }

    static move(e: Event): void {
        // on which HTML element user click
        const target = e.target as HTMLInputElement

        const oppositeSide = target.id.charAt(4) === 'L' ? 'R' : 'L'

        // make an array of 2 coordinates for position of click
        const clickPosition = [Number(target.id.charAt(0)), Number(target.id.charAt(2))]

        // Get opposite cell from clicked
        const oppositCell = document.getElementById(`${clickPosition[0]},${clickPosition[1]},${oppositeSide}`)

        // Importing HTML element of starting cell
        const startCell = document.querySelector(`.selectedCell`) as HTMLElement

        // Calculate start position
        const startPosition: number[] = [Number(startCell.id.charAt(0)), Number(startCell.id.charAt(2))]

        // Take HTML element of piece from starting cell
        const movedPiece = startCell?.firstChild as HTMLElement

        // get starting cell
        const startSide = startCell?.id.charAt(4)

        if (startSide === 'L') {
            // Save piece`s class in variable  
            const piece = ArrayBoards.L[startPosition[1]][startPosition[0]]

            // Add selected piece to selected cell as child element
            oppositCell?.append(movedPiece)

            // Move piece in array to selected cell
            ArrayBoards.R[clickPosition[1]][clickPosition[0]] = piece

            // Clear starting squere
            ArrayBoards.L[startPosition[1]][startPosition[0]] = []

            // Change coordinates for class
            piece[0].position = clickPosition
            piece[0].isLeft = false

            // special flag for casteling realization
            if ((piece[0].id.charAt(2) === 'k') || piece[0].id.charAt(2) === 'r') {
                piece[0].isMoved = true
            }

            if (piece[0].id.charAt(2) === 'q') {
                piece[0].bishop.isLeft = false
                piece[0].rock.isLeft = false
            }

            Board.Clear()
        }
        else {
            // Save piece`s class in variable  
            const piece = ArrayBoards.R[startPosition[1]][startPosition[0]]

            // Add selected piece to selected cell as child element
            oppositCell?.append(movedPiece)

            // Move piece in array to selected cell
            ArrayBoards.L[clickPosition[1]][clickPosition[0]] = piece

            // Clear starting squere
            ArrayBoards.R[startPosition[1]][startPosition[0]] = []

            // Change coordinates for class
            piece[0].position = clickPosition
            piece[0].isLeft = true

            // special flag for casteling realization
            if ((piece[0].id.charAt(2) === 'k') || piece[0].id.charAt(2) === 'r') {
                piece[0].isMoved = true
            }

            if (piece[0].id.charAt(2) === 'q') {
                piece[0].bishop.isLeft = true
                piece[0].rock.isLeft = true
            }

            Board.Clear()
        }
    }

    protected createPiece(pieceName: string, isLeft: boolean): void {
        const side = isLeft === true ? 'L' : 'R';

        const placment: HTMLElement | null = document.getElementById(`${this.position[0]},${this.position[1]},${side}`)

        let piece: HTMLElement = document.createElement('div');
        piece.className = `piece ${pieceName}`
        piece.id = this.id

        piece.addEventListener('click', (<EventListener>this.movementOfPieces));

        placment?.append(piece)
    }

    movementOfPieces(event: Event & { target: HTMLElement }): void {
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
    public isLeft: boolean
    private isMoved: boolean;

    constructor(id: string, position: number[], isLeft: boolean, isMoved: boolean) {
        super(id, position)
        this.isLeft = isLeft
        this.isMoved = isMoved
    }

    create(): void { // color = black/white
        const color = this.id.charAt(0) === 'b' ? 'black' : 'white'
        super.createPiece(`${color}_king`, this.isLeft)
    }

    isVailedMove(positionStart: number[], positionEnd: number[]): boolean {
        if ((Math.abs(positionEnd[0] - positionStart[0]) <= 1 && (Math.abs(positionStart[1] - positionEnd[1]) <= 1))) {
            return true
        }
        return false
    }

    lightAllPossibleMove(): void {
        for (let i = 0; i < 8; i++) {
            for (let j = 0; j < 8; j++) {
                if ((ArrayBoards.L[j][i].length === 0) && (ArrayBoards.R[j][i].length === 0)) {
                    if (this.isVailedMove(this.position, [i, j])) {
                        if (i !== this.position[0] || j !== this.position[1]) {
                            Cell.lightMovableCell([i, j], this.isLeft)
                        }
                        Cell.lightStartCell(this.position, this.isLeft)
                    }
                }
            }
        }
    }
}
export class Bishop extends Piece {
    public isLeft: boolean

    constructor(id: string, position: number[], isLeft: boolean) {
        super(id, position)
        this.isLeft = isLeft
    }

    create(): void { // color = black/white
        const color = this.id.charAt(0) === 'b' ? 'black' : 'white'
        super.createPiece(`${color}_bishop`, this.isLeft)
    }

    isVailedMove(positionStart: number[], positionEnd: number[]): boolean {
        if (Math.abs(positionStart[0] - positionEnd[0]) !== Math.abs(positionStart[1] - positionEnd[1])) {
            return false
        }

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

    lightAllPossibleMove(): void {
        for (let i = 0; i < 8; i++) {
            for (let j = 0; j < 8; j++) {
                if ((ArrayBoards.L[j][i].length === 0) && (ArrayBoards.R[j][i].length === 0)) {
                    if (this.isVailedMove(this.position, [i, j])) {
                        if (i !== this.position[0] || j !== this.position[1]) {
                            Cell.lightMovableCell([i, j], this.isLeft)
                        }
                        Cell.lightStartCell(this.position, this.isLeft)
                    }
                }
            }
        }
    }
}
export class Rock extends Piece {
    public isLeft: boolean
    private isMoved: boolean;

    constructor(id: string, position: number[], isLeft: boolean, isMoved: boolean) {
        super(id, position)
        this.isLeft = isLeft
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

        if (this.isLeft === true) {
            if (positionStart[0] === positionEnd[0]) {
                const yOffset = positionEnd[1] > positionStart[1] ? 1 : -1;
                let yPos = positionStart[1] + yOffset;
                while (yPos !== positionEnd[1]) {
                    if (ArrayBoards.L[yPos][positionStart[0]].length !== 0) {
                        return false
                    }
                    yPos += yOffset
                }
            }

            if (positionStart[1] === positionEnd[1]) {
                const xOffset = positionEnd[0] > positionStart[0] ? 1 : -1;
                let xPos = positionStart[0] + xOffset;
                while (xPos !== positionEnd[0]) {
                    if (ArrayBoards.L[positionStart[1]][xPos].length !== 0) {
                        return false
                    }
                    xPos += xOffset
                }
            }
        }

        if (this.isLeft === false) {
            if (positionStart[0] === positionEnd[0]) {
                const yOffset = positionEnd[1] > positionStart[1] ? 1 : -1;
                let yPos = positionStart[1] + yOffset;
                while (yPos !== positionEnd[1]) {
                    if (ArrayBoards.R[yPos][positionStart[0]].length !== 0) {
                        return false
                    }
                    yPos += yOffset
                }
            }

            if (positionStart[1] === positionEnd[1]) {
                const xOffset = positionEnd[0] > positionStart[0] ? 1 : -1;
                let xPos = positionStart[0] + xOffset;
                while (xPos !== positionEnd[0]) {
                    if (ArrayBoards.R[positionStart[1]][xPos].length !== 0) {
                        return false
                    }
                    xPos += xOffset
                }
            }
        }

        return true
    }

    lightAllPossibleMove(): void {
        for (let i = 0; i < 8; i++) {
            for (let j = 0; j < 8; j++) {
                if ((ArrayBoards.L[j][i].length === 0) && (ArrayBoards.R[j][i].length === 0)) {
                    if (this.isVailedMove(this.position, [i, j])) {
                        if (i !== this.position[0] || j !== this.position[1]) {
                            Cell.lightMovableCell([i, j], this.isLeft)
                        }
                        Cell.lightStartCell(this.position, this.isLeft)
                    }
                }
            }
        }
    }
}
export class Queen extends Piece {
    public isLeft: boolean
    private bishop: Bishop
    private rock: Rock

    constructor(id: string, position: number[], isLeft: boolean) {
        super(id, position)
        this.isLeft = isLeft
        this.bishop = new Bishop(id, position, isLeft)
        this.rock = new Rock(id, position, isLeft, true)
    }

    create(): void { // color = black/white
        const color = this.id.charAt(0) === 'b' ? 'black' : 'white'
        super.createPiece(`${color}_queen`, this.isLeft)
    }

    isVailedMove(positionStart: number[], positionEnd: number[]): boolean {
        if (this.bishop.isVailedMove(positionStart, positionEnd) || (this.rock.isVailedMove(positionStart, positionEnd))) {
            return true;
        }
        return false
    }

    lightAllPossibleMove(): void {
        for (let i = 0; i < 8; i++) {
            for (let j = 0; j < 8; j++) {
                if ((ArrayBoards.L[j][i].length === 0) && (ArrayBoards.R[j][i].length === 0)) {
                    if (this.isVailedMove(this.position, [i, j])) {
                        if (i !== this.position[0] || j !== this.position[1]) {
                            Cell.lightMovableCell([i, j], this.isLeft)
                        }
                        Cell.lightStartCell(this.position, this.isLeft)
                    }
                }
            }
        }
    }
}
export class Knight extends Piece {
    public isLeft: boolean

    constructor(id: string, position: number[], isLeft: boolean) {
        super(id, position)
        this.isLeft = isLeft
    }

    create(): void { // color = black/white
        const color = this.id.charAt(0) === 'b' ? 'black' : 'white'
        super.createPiece(`${color}_knight`, this.isLeft)
    }

    isVailedMove(positionStart: number[], positionEnd: number[]): boolean {
        if ((Math.abs(positionEnd[0] - positionStart[0]) === 1 && Math.abs(positionEnd[1] - positionStart[1]) === 2) || (Math.abs(positionEnd[0] - positionStart[0]) === 2 && Math.abs(positionEnd[1] - positionStart[1]) === 1)) {
            return true;
        }

        return false;
    }

    lightAllPossibleMove(): void {
        for (let i = 0; i < 8; i++) {
            for (let j = 0; j < 8; j++) {
                if ((ArrayBoards.L[j][i].length === 0) && (ArrayBoards.R[j][i].length === 0)) {
                    if (this.isVailedMove(this.position, [i, j])) {
                        if (i !== this.position[0] || j !== this.position[1]) {
                            Cell.lightMovableCell([i, j], this.isLeft)
                        }
                        Cell.lightStartCell(this.position, this.isLeft)
                    }
                }
            }
        }
    }
}
export class Pawn extends Piece {
    public isLeft: boolean

    constructor(id: string, position: number[], isLeft: boolean) {
        super(id, position)
        this.isLeft = isLeft
    }

    create(): void { // color = black/white
        const color = this.id.charAt(0) === 'b' ? 'black' : 'white'
        super.createPiece(`${color}_pawn`, this.isLeft)
    }

    isVailedMove(positionStart: number[], positionEnd: number[]): boolean {
        if (this.isBlack) {
            if(positionStart[1] === 6) {
                if ((positionEnd[0] === positionStart[0]) && (positionEnd[1] - positionStart[1] === -2) || (positionEnd[0] === positionStart[0]) && (positionEnd[1] - positionStart[1] === -1)) {
                    return true;
                }
            }
            else {
                if((positionEnd[0] === positionStart[0]) && (positionEnd[1] - positionStart[1] === -1)) {
                    return true
                }
            }
        }
        else {
            if(positionStart[1] === 1) {
                if ((positionEnd[0] === positionStart[0]) && (positionEnd[1] - positionStart[1] === 2) || (positionEnd[0] === positionStart[0]) && (positionEnd[1] - positionStart[1] === 1)) {
                    return true;
                }
            }
            else {
                if((positionEnd[0] === positionStart[0]) && (positionEnd[1] - positionStart[1] === 1)) {
                    return true
                }
            }
        }
        return false
    }

    lightAllPossibleMove(): void {
        for (let i = 0; i < 8; i++) {
            for (let j = 0; j < 8; j++) {
                if ((ArrayBoards.L[j][i].length === 0) && (ArrayBoards.R[j][i].length === 0)) {
                    if (this.isVailedMove(this.position, [i, j])) {
                        if (i !== this.position[0] || j !== this.position[1]) {
                            Cell.lightMovableCell([i, j], this.isLeft)
                        }
                        Cell.lightStartCell(this.position, this.isLeft)
                    }
                }
            }
        }
    }
}