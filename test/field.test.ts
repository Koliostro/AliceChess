import {Board} from "../code/ts/field"

describe("Checking work of board class", () => {
    test("Checking generation of two boards", () => {
        document.body.innerHTML = 
            '<!DOCTYPE html>' +
            '<div class="boardPlace">' +
            '    <div class="Board leftBoard"></div>' +
            '    <div class="Board rightBoard"></div>' +
            '</div>'

        const BOARD = new Board();
        BOARD.fieldGeneration();
        
        const element = document.querySelector(".leftBoard");

        expect(element?.innerHTML).toBe('<div class="cell cellWhite" id="0,0,L"></div><div class="cell cellBlack" id="1,0,L"></div><div class="cell cellWhite" id="2,0,L"></div><div class="cell cellBlack" id="3,0,L"></div><div class="cell cellWhite" id="4,0,L"></div><div class="cell cellBlack" id="5,0,L"></div><div class="cell cellWhite" id="6,0,L"></div><div class="cell cellBlack" id="7,0,L"></div><div class="cell cellBlack" id="0,1,L"></div><div class="cell cellWhite" id="1,1,L"></div><div class="cell cellBlack" id="2,1,L"></div><div class="cell cellWhite" id="3,1,L"></div><div class="cell cellBlack" id="4,1,L"></div><div class="cell cellWhite" id="5,1,L"></div><div class="cell cellBlack" id="6,1,L"></div><div class="cell cellWhite" id="7,1,L"></div><div class="cell cellWhite" id="0,2,L"></div><div class="cell cellBlack" id="1,2,L"></div><div class="cell cellWhite" id="2,2,L"></div><div class="cell cellBlack" id="3,2,L"></div><div class="cell cellWhite" id="4,2,L"></div><div class="cell cellBlack" id="5,2,L"></div><div class="cell cellWhite" id="6,2,L"></div><div class="cell cellBlack" id="7,2,L"></div><div class="cell cellBlack" id="0,3,L"></div><div class="cell cellWhite" id="1,3,L"></div><div class="cell cellBlack" id="2,3,L"></div><div class="cell cellWhite" id="3,3,L"></div><div class="cell cellBlack" id="4,3,L"></div><div class="cell cellWhite" id="5,3,L"></div><div class="cell cellBlack" id="6,3,L"></div><div class="cell cellWhite" id="7,3,L"></div><div class="cell cellWhite" id="0,4,L"></div><div class="cell cellBlack" id="1,4,L"></div><div class="cell cellWhite" id="2,4,L"></div><div class="cell cellBlack" id="3,4,L"></div><div class="cell cellWhite" id="4,4,L"></div><div class="cell cellBlack" id="5,4,L"></div><div class="cell cellWhite" id="6,4,L"></div><div class="cell cellBlack" id="7,4,L"></div><div class="cell cellBlack" id="0,5,L"></div><div class="cell cellWhite" id="1,5,L"></div><div class="cell cellBlack" id="2,5,L"></div><div class="cell cellWhite" id="3,5,L"></div><div class="cell cellBlack" id="4,5,L"></div><div class="cell cellWhite" id="5,5,L"></div><div class="cell cellBlack" id="6,5,L"></div><div class="cell cellWhite" id="7,5,L"></div><div class="cell cellWhite" id="0,6,L"></div><div class="cell cellBlack" id="1,6,L"></div><div class="cell cellWhite" id="2,6,L"></div><div class="cell cellBlack" id="3,6,L"></div><div class="cell cellWhite" id="4,6,L"></div><div class="cell cellBlack" id="5,6,L"></div><div class="cell cellWhite" id="6,6,L"></div><div class="cell cellBlack" id="7,6,L"></div><div class="cell cellBlack" id="0,7,L"></div><div class="cell cellWhite" id="1,7,L"></div><div class="cell cellBlack" id="2,7,L"></div><div class="cell cellWhite" id="3,7,L"></div><div class="cell cellBlack" id="4,7,L"></div><div class="cell cellWhite" id="5,7,L"></div><div class="cell cellBlack" id="6,7,L"></div><div class="cell cellWhite" id="7,7,L"></div>');
    });
});
