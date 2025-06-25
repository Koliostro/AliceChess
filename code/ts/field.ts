const leftBoardHTML: HTMLElement | null = document.querySelector(`.leftBoard`);
const rightBoardHTML: HTMLElement | null = document.querySelector(`.rightBoard`);

export class Board {
    public fieldGeneration(): void {
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

        SelectedCell?.forEach(cell => cell.classList.remove(`selectedCell`))
    }
}

export class Cell {
    public isBlack : boolean
    public isLeft : boolean

    constructor(isLeft: boolean, isBlack: boolean) {
        this.isBlack = isBlack
        this.isLeft = isLeft
    }

    createCell(x: number, y: number): HTMLElement {
        let side: string = this.isLeft === true ? 'L' : 'R';
        let color: string = this.isBlack === true ? 'cellBlack' : 'cellWhite';
        let div: HTMLElement = document.createElement('div');
        div.className = `cell ${color}`
        div.id = `${x},${y},${side}`
        return div
    }

    static lightCastelingCell(position: number[], isLeft: boolean, isSecretly : boolean = false) : boolean {
        const side = isLeft === true ? 'L' : 'R'
        const selectedCell: HTMLElement | null = document.getElementById(`${position[0]},${position[1]},${side}`)
        
        if (isSecretly) {
            return false
        }
        
        selectedCell?.classList.add(`lighttedCell`, `lighttedCell_casteling`)

        return true
    }

    static lightMovableCell(position: number[], isLeft: boolean , isSecretly : boolean = false) : boolean {
        const side = isLeft === true ? 'L' : 'R'
        const selectedCell: HTMLElement | null = document.getElementById(`${position[0]},${position[1]},${side}`)

        if (isSecretly) {
            return false
        }

        selectedCell?.classList.add(`lighttedCell`)

        return true
    }

    static lightStartCell(position: number[], isLeft: boolean, isSecretly : boolean = false) : boolean {
        const side = isLeft === true ? 'L' : 'R'
        const selectedCell: HTMLElement | null = document.getElementById(`${position[0]},${position[1]},${side}`)

        if (isSecretly) {
            return false
        }

        selectedCell?.classList.add(`selectedCell`)

        return true
    }

    static lightEatableCell(position: number[], isLeft: boolean, isSecretly : boolean = false) : boolean {
        const side = isLeft === true ? 'L' : 'R'
        const selectedCell: HTMLElement | null = document.getElementById(`${position[0]},${position[1]},${side}`)

        if (isSecretly) {
            return false
        }

        selectedCell?.classList.add(`lighttedCell`, `lighttedCell_eat`)
        
        return true
    }
}
