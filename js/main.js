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

// generation of visual fields
for (let i = 0; i < 64; i++) {
    if (((Math.floor(i/8))%2 === 0) !== (i%2 === 0)) {
        leftBoard.appendChild(createDiv('cell', 'cellWhite'))
        rightBoard.appendChild(createDiv('cell', 'cellWhite'))
    }
    else {
        leftBoard.appendChild(createDiv('cell', 'cellBlack'))
        rightBoard.appendChild(createDiv('cell', 'cellBlack'))
    }
}