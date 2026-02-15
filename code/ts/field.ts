import { cellStates } from "./types";

export class Board {

    private leftBoardHTML: HTMLElement | null = document.querySelector(`.leftBoard`);
    private rightBoardHTML: HTMLElement | null = document.querySelector(`.rightBoard`);

    /**
     * Select a cell from posotion
     * @param Position Array of 2 integers that represent board 
     * @param isLeft Determine which side is used
     * @returns null if unsucces or HTMLElement on succes
     */
    static getCellbyPosition(Position : number[], isLeft : boolean) : null | HTMLElement {
        if (Position.length !== 2) {
            return null
        }

        const side = isLeft === true ? 'L' : 'R'

        const cell = document.getElementById(`${Position[0]},${Position[1]},${side}`)

        return cell;
    }

    static lightupCell(cell : HTMLElement, state : cellStates) : number {

        switch (state) {
            case cellStates.idle:
                cell.classList.remove('lighttedCell')
                cell.classList.remove('lighttedCell_eat')
                break;
            case cellStates.moveble:
                cell.classList.add('lighttedCell')
                break;
            case cellStates.underAttack:
                cell.classList.add('lighttedCell')
                cell.classList.add('lighttedCell_eat')
                break;
        }

        return 0;
    }

    /**
     * Create a cell with selected color (black / white)
     * @param x Position X
     * @param y Position Y
     * @param isLeft Define wo which of boards are added cell
     * @param isBlack Define color of cell
     * @returns HTMLElement
     */
    public createCell(x: number, y: number, isLeft : boolean, isBlack : boolean): HTMLElement {
        let side: string = isLeft === true ? 'L' : 'R';
        let color: string = isBlack === true ? 'cellBlack' : 'cellWhite';
        let div: HTMLElement = document.createElement('div');
        div.className = `cell ${color}`
        div.id = `${x},${y},${side}`
        return div
    }

    /**
     * Generation of visual representation of playing board
     */
    public fieldGeneration(): void {
        for (let i = 0; i < 8; i++) {
            for (let j = 0; j < 8; j++) {
                if (i % 2 === 0) {
                    if (j % 2 === 0) {
                        this.leftBoardHTML?.append(this.createCell(j, i, true, false))
                        this.rightBoardHTML?.append(this.createCell(j, i, false, false))
                    }
                    else {
                        this.leftBoardHTML?.append(this.createCell(j, i, true, true))
                        this.rightBoardHTML?.append(this.createCell(j, i, false, true))
                    }
                }
                else {
                    if (j % 2 !== 0) {
                        this.leftBoardHTML?.append(this.createCell(j, i, true, false))
                        this.rightBoardHTML?.append(this.createCell(j, i, false, false))
                    }
                    else {
                        this.leftBoardHTML?.append(this.createCell(j, i, true, true))
                        this.rightBoardHTML?.append(this.createCell(j, i, false, true))
                    }
                }
            }
        }
    }
}
