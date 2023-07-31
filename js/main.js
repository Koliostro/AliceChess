const leftBoard = document.querySelector('.leftBoard')
const rightBoard = document.querySelector('.rightBoard')

function createDiv(className, idName, draggable = false) {
    let div = document.createElement('div');
    div.className = className
    div.id = idName
    div.draggable = draggable
    return div
}

let firstField = generationFieldList();
let secondField = generationFieldList();

function generationFieldList() {
    let field = []
    for (let i = 0; i < 8; i++) {
        field.push(['']);
        for (let j = 0; j < 7; j++) {
            field[i].push('');
        }
    }
    return field
}

// i and j it is a adress of cell in two dimensionla array last symbol it adress of board (l)eft or (r)ight
for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
        if (i%2 === 0) {
            if (j%2 === 0) {
                leftBoard.appendChild(createDiv('cell cellWhite', [i,j,'l']))
                rightBoard.appendChild(createDiv('cell cellWhite', [i,j,'r']))
            }
            else {
                leftBoard.appendChild(createDiv('cell cellBlack', [i,j,'l']))
                rightBoard.appendChild(createDiv('cell cellBlack', [i,j,'r']))
            }
        }
        else {
            if (j%2 !== 0) {
                leftBoard.appendChild(createDiv('cell cellWhite', [i,j,'l']))
                rightBoard.appendChild(createDiv('cell cellWhite', [i,j,'r']))
            }
            else {
                leftBoard.appendChild(createDiv('cell cellBlack', [i,j,'l']))
                rightBoard.appendChild(createDiv('cell cellBlack', [i,j,'r']))
            }
        }
    }
}