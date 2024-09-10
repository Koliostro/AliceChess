import { ArrayBoards } from './index.js';
import { Chess, Piece } from './piece.js'

const leftBoardHTML: HTMLElement | null = document.querySelector(`.leftBoard`);
const rightBoardHTML: HTMLElement | null = document.querySelector(`.rightBoard`);
export class Board extends Chess{
    public isLeft: boolean;

    constructor(isLeft: boolean = true) {
        super()
        this.isLeft = isLeft;
    }

    fieldGeneration(): void {

        const WhiteCell = new Cell(true, false)
        const BlackCell = new Cell(true, true)

        const WhiteCellRight = new Cell(false, false)
        const BlackCellRight = new Cell(false, true)

        for (let i = 0; i < 8; i++) {
            for (let j = 0; j < 8; j++) {
                if (i % 2 === 0) {
                    if (j % 2 === 0) {
                        leftBoardHTML?.append(WhiteCell.createCell(j, i))
                        rightBoardHTML?.append(WhiteCellRight.createCell(j, i))
                    }
                    else {
                        leftBoardHTML?.append(BlackCell.createCell(j, i))
                        rightBoardHTML?.append(BlackCellRight.createCell(j, i))
                    }
                }
                else {
                    if (j % 2 !== 0) {
                        leftBoardHTML?.append(WhiteCell.createCell(j, i))
                        rightBoardHTML?.append(WhiteCellRight.createCell(j, i))
                    }
                    else {
                        leftBoardHTML?.append(BlackCell.createCell(j, i))
                        rightBoardHTML?.append(BlackCellRight.createCell(j, i))
                    }
                }
            }
        }
    }

    static Clear(): void {
        const allLightedCells = document.querySelectorAll(`.lighttedCell`)

        const SelectedCell = document.querySelectorAll(`.selectedCell`);

        allLightedCells.forEach(cell => cell.classList.remove(`lighttedCell`, `lighttedCell_eat`))

        allLightedCells.forEach(cell => cell.removeEventListener('click', (<EventListener>Piece.movment)))

        SelectedCell?.forEach(cell => cell.classList.remove(`selectedCell`))
    }
}

export class Cell extends Board {
    public isBlack: boolean

    constructor(isLeft: boolean, isBlack: boolean) {
        super(isLeft)
        this.isBlack = isBlack
    }

    createCell(x: number, y: number): HTMLElement {
        let side: string = this.isLeft === true ? 'L' : 'R';
        let color: string = this.isBlack === true ? 'cellBlack' : 'cellWhite';
        let div: HTMLElement = document.createElement('div');
        div.className = `cell ${color}`
        div.id = `${x},${y},${side}`
        return div
    }

    static isUnderDioganalAttack(position: number[], isBlack: boolean, isLeft: boolean): boolean {
        function isVailedMove(positionEnd: number[]): boolean {
            if (Math.abs(position[0] - positionEnd[0]) !== Math.abs(position[1] - positionEnd[1])) {
                return false
            }

            const xOffset = positionEnd[0] > position[0] ? 1 : -1;
            const yOffset = positionEnd[1] > position[1] ? 1 : -1;

            let xPos = position[0] + xOffset
            let yPos = position[1] + yOffset

            while (xPos !== positionEnd[0] && yPos !== positionEnd[1]) {

                try {
                    if (isLeft) {
                        if (ArrayBoards.L[yPos][xPos].length !== 0) {
                            return false
                        }
                    }

                    if (!isLeft) {
                        if (ArrayBoards.R[yPos][xPos].length !== 0) {
                            return false
                        }
                    }
                } catch (TypeError) {
                    return false
                }

                xPos += xOffset
                yPos += yOffset

            }

            return true;
        }

        for (let i = 0; i < 8; i++) {
            for (let j = 0; j < 8; j++) {
                if (isVailedMove([i, j])) {
                    if (isLeft && ArrayBoards.L[j][i].length !== 0) {
                        if (ArrayBoards.L[j][i][0].id.charAt(2) === 'b' || ArrayBoards.L[j][i][0].id.charAt(2) === 'q') {
                            if (ArrayBoards.L[j][i][0].isBlack === isBlack) {
                                return true
                            }
                        }
                    }
                    if (!isLeft && ArrayBoards.R[j][i].length !== 0) {
                        if (ArrayBoards.R[j][i][0].id.charAt(2) === 'b' || ArrayBoards.R[j][i][0].id.charAt(2) === 'q') {
                            if (ArrayBoards.R[j][i][0].isBlack === isBlack) {
                                return true
                            }
                        }
                    }
                }
            }
        }
        return false
    }

    static isUnderLineAttack(position: number[], isBlack: boolean, isLeft: boolean): boolean {
        function isVailedMove(positionEnd: number[]) {
            if (position[0] !== positionEnd[0] && position[1] !== positionEnd[1]) {
                return false;
            }

            if (position[0] === positionEnd[0]) {
                const yOffset = positionEnd[1] > position[1] ? 1 : -1;
                let yPos = position[1] + yOffset;
                while (yPos !== positionEnd[1]) {
                    try {
                        if (isLeft) {
                            if (ArrayBoards.L[yPos][position[0]].length !== 0) {
                                return false
                            }
                        }
                        else {
                            if (ArrayBoards.R[yPos][position[0]].length !== 0) {
                                return false
                            }
                        }
                    } catch (TypeError) {return false}
                    yPos += yOffset
                }
            }

            else if (position[1] === positionEnd[1]) {
                const xOffset = positionEnd[0] > position[0] ? 1 : -1;
                let xPos = position[0] + xOffset;
                while (xPos !== positionEnd[0]) {
                    try {
                        if (isLeft) {
                            if (ArrayBoards.L[position[1]][xPos].length !== 0) {
                                return false
                            }
                        }
                        else {
                            if (ArrayBoards.R[position[1]][xPos].length !== 0) {
                                return false
                            }
                        }
                    } catch (TypeError) {return false}
                    xPos += xOffset
                }
            }
            return true
        }

        for (let i = 0; i < 8; i++) {
            for (let j = 0; j < 8; j++) {
                if (isVailedMove([i, j])) {
                    if (isLeft && ArrayBoards.L[j][i].length !== 0) {
                        if (ArrayBoards.L[j][i][0].id.charAt(2) === 'r' || ArrayBoards.L[j][i][0].id.charAt(2) === 'q') {
                            if (ArrayBoards.L[j][i][0].isBlack === isBlack) {
                                return true
                            }
                        }
                    }
                    if (!isLeft && ArrayBoards.R[j][i].length !== 0) {
                        if (ArrayBoards.R[j][i][0].id.charAt(2) === 'r' || ArrayBoards.R[j][i][0].id.charAt(2) === 'q') {
                            if (ArrayBoards.R[j][i][0].isBlack === isBlack) {
                                return true
                            }
                        }
                    }
                }
            }
        }
        return false
    }

    static isUnderKnightAttack(position: number[], isBlack: boolean, isLeft: boolean): boolean {
        function isVailedMove(positionEnd: number[]): boolean {
            if ((Math.abs(positionEnd[0] - position[0]) === 1 && Math.abs(positionEnd[1] - position[1]) === 2) || (Math.abs(positionEnd[0] - position[0]) === 2 && Math.abs(positionEnd[1] - position[1]) === 1)) {
                return true;
            }
            return false;
        }
        for (let i = 0; i < 8; i++) {
            for (let j = 0; j < 8; j++) {
                if (isVailedMove([i, j])) {
                    if (isLeft && ArrayBoards.L[j][i].length !== 0) {
                        if (ArrayBoards.L[j][i][0].id.charAt(2) === 'n') {
                            if (ArrayBoards.L[j][i][0].isBlack === isBlack) {
                                return true
                            }
                        }
                    }
                    if (!isLeft && ArrayBoards.R[j][i].length !== 0) {
                        if (ArrayBoards.R[j][i][0].id.charAt(2) === 'n') {
                            if (ArrayBoards.R[j][i][0].isBlack === isBlack) {
                                return true
                            }
                        }
                    }
                }
            }
        }
        return false
    }

    static isUnderPawnAttack(position: number[], isBlack: boolean, isLeft: boolean) {
        function isVailedEating(positionEnd: number[]): boolean {
            if (!isBlack) {
                if ((positionEnd[0] - position[0] === 1 || positionEnd[0] - position[0] === -1) && (positionEnd[1] - position[1] === -1)) {
                    return true
                }
            }
            else {
                if ((positionEnd[0] - position[0] === 1 || positionEnd[0] - position[0] === -1) && (positionEnd[1] - position[1] === 1)) {
                    return true
                }
            }
            return false
        }
        for (let i = 0; i < 8; i++) {
            for (let j = 0; j < 8; j++) {
                if (isVailedEating([i, j])) {
                    if (isLeft && ArrayBoards.L[j][i].length !== 0) {
                        if (ArrayBoards.L[j][i][0].id.charAt(2) === 'p') {
                            if (ArrayBoards.L[j][i][0].isBlack === isBlack) {
                                return true
                            }
                        }
                    }
                    if (!isLeft && ArrayBoards.R[j][i].length !== 0) {
                        if (ArrayBoards.R[j][i][0].id.charAt(2) === 'p') {
                            if (ArrayBoards.R[j][i][0].isBlack === isBlack) {
                                return true
                            }
                        }
                    }
                }
            }
        }
    }

    static isUnderKingAttack(position: number[], isBlack: boolean, isLeft: boolean): boolean {
        function isVailedMove(positionEnd: number[]): boolean {
            if ((Math.abs(positionEnd[0] - position[0]) <= 1 && (Math.abs(position[1] - positionEnd[1]) <= 1))) {
                return true
            }
            return false
        }
        for (let i = 0; i < 8; i++) {
            for (let j = 0; j < 8; j++) {
                if (isVailedMove([i, j])) {
                    if (isLeft && ArrayBoards.L[j][i].length !== 0) {
                        if (ArrayBoards.L[j][i][0].id.charAt(2) === 'k') {
                            if (ArrayBoards.L[j][i][0].isBlack === isBlack) {
                                return true
                            }
                        }
                    }
                    if (!isLeft && ArrayBoards.R[j][i].length !== 0) {
                        if (ArrayBoards.R[j][i][0].id.charAt(2) === 'k') {
                            if (ArrayBoards.R[j][i][0].isBlack === isBlack) {
                                return true
                            }
                        }
                    }
                }
            }
        }
        return false
    }

    static isUnderAttack(position: number[], isBlack: boolean, isLeft: boolean): boolean {
        if (this.isUnderLineAttack(position, isBlack, isLeft) || this.isUnderDioganalAttack(position, isBlack, isLeft) || this.isUnderKnightAttack(position, isBlack, isLeft) || this.isUnderPawnAttack(position, isBlack, isLeft) || this.isUnderKingAttack(position, isBlack, isLeft)) {
            return true
        }
        return false
    }

    static isEmpty(position: number[], isLeft: boolean): boolean {
        if (isLeft) {
            if (ArrayBoards.L[position[1]][position[0]].length !== 0) {
                return false
            }
            else {
                return true;
            }
        }
        else {
            if (ArrayBoards.R[position[1]][position[0]].length !== 0) {
                return false
            }
            else {
                return true;
            }
        }
    }

    static lightCastelingCell(position: number[], isLeft: boolean, isSecretly : boolean = false) {
        const side = isLeft === true ? 'L' : 'R'
        const selectedCell: HTMLElement | null = document.getElementById(`${position[0]},${position[1]},${side}`)
        
        if (isSecretly) {
            return
        }
        
        selectedCell?.classList.add(`lighttedCell`, `lighttedCell_casteling`)
        selectedCell?.addEventListener('click', (<EventListener>Piece.movment))
    }

    static lightMovableCell(position: number[], isLeft: boolean , isSecretly : boolean = false) {
        const side = isLeft === true ? 'L' : 'R'
        const selectedCell: HTMLElement | null = document.getElementById(`${position[0]},${position[1]},${side}`)

        if (isSecretly) {
            return
        }

        selectedCell?.classList.add(`lighttedCell`)
        selectedCell?.addEventListener('click', (<EventListener>Piece.movment))
    }

    static lightStartCell(position: number[], isLeft: boolean, isSecretly : boolean = false) {
        const side = isLeft === true ? 'L' : 'R'
        const selectedCell: HTMLElement | null = document.getElementById(`${position[0]},${position[1]},${side}`)

        if (isSecretly) {
            return
        }

        if (selectedCell !== null) {
            selectedCell.classList.add(`selectedCell`)
        }
    }

    static lightEatableCell(position: number[], isLeft: boolean, isSecretly : boolean = false) {
        const side = isLeft === true ? 'L' : 'R'
        const selectedCell: HTMLElement | null = document.getElementById(`${position[0]},${position[1]},${side}`)

        if (isSecretly) {
            return
        }

        selectedCell?.classList.add(`lighttedCell`, `lighttedCell_eat`)
        selectedCell?.addEventListener('click', (<EventListener>Piece.movment))
    }
}