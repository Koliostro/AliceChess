
export class Board {

    private leftBoardHTML: HTMLElement | null = document.querySelector(`.leftBoard`);
    private rightBoardHTML: HTMLElement | null = document.querySelector(`.rightBoard`);

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
