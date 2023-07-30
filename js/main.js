const leftBoard = document.querySelector('.leftBoard')
const rightBoard = document.querySelector('.rightBoard')

function createDiv(className, idName) {
    let div = document.createElement('div');
    div.className = className
    div.id = idName
    return div
}

for (let i = 0; i < 64; i++) {
    if ((Math.floor(i/8))%2 === 0) {
        if (i%2 === 0) {
            leftBoard.appendChild(createDiv('cell', 'cellWhite'))
            rightBoard.appendChild(createDiv('cell', 'cellWhite'))
        }
        else {
            leftBoard.appendChild(createDiv('cell', 'cellBlack'))
            rightBoard.appendChild(createDiv('cell', 'cellBlack'))
        }
    }
    else {
        if (i%2 === 0) {
            leftBoard.appendChild(createDiv('cell', 'cellBlack'))
            rightBoard.appendChild(createDiv('cell', 'cellBlack'))
        }
        else {
            leftBoard.appendChild(createDiv('cell', 'cellWhite'))
            rightBoard.appendChild(createDiv('cell', 'cellWhite'))
        }
    }
}