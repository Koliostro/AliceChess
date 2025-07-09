import { RealPiece } from "../code/ts/piece"
import { GamePiece, Color, Piece } from "../code/ts/types"

const html_state = 
            '<div class="boardPlace">' +
            '    <div class="Board leftBoard"></div>' +
            '    <div class="Board rightBoard"></div>' +
            '</div>'

describe("Testing getter methods", ()=> {
    test("Testing getting a piece name", () => {
        document.body.innerHTML = html_state;

        const PieceName : GamePiece = {
            type : Piece.ROCK,
            color : Color.WHITE
        }

        const REALPIECE = new RealPiece(PieceName, [0,0]);
        const result = REALPIECE.getPieceName();

        expect(result).toBe(PieceName);
    });

    test("Testing visual placment of piece at left board", () => {
        document.body.innerHTML = 
    '<div class="boardPlace">' +
    '<div class="Board leftBoard">' +
        '<div class="cell cellWhite" id="0,0,L"></div>' +
        '<div class="cell cellBlack" id="1,0,L"></div>' +
        '<div class="cell cellWhite" id="2,0,L"></div>' +
        '<div class="cell cellBlack" id="3,0,L"></div>' +
        '<div class="cell cellWhite" id="4,0,L"></div>' +
        '<div class="cell cellBlack" id="5,0,L"></div>' +
        '<div class="cell cellWhite" id="6,0,L"></div>' +
        '<div class="cell cellBlack" id="7,0,L"></div>' +
        '<div class="cell cellBlack" id="0,1,L"></div>' +
        '<div class="cell cellWhite" id="1,1,L"></div>' +
        '<div class="cell cellBlack" id="2,1,L"></div>' +
        '<div class="cell cellWhite" id="3,1,L"></div>' +
        '<div class="cell cellBlack" id="4,1,L"></div>' +
        '<div class="cell cellWhite" id="5,1,L"></div>' +
        '<div class="cell cellBlack" id="6,1,L"></div>' +
        '<div class="cell cellWhite" id="7,1,L"></div>' +
        '<div class="cell cellWhite" id="0,2,L"></div>' +
        '<div class="cell cellBlack" id="1,2,L"></div>' +
        '<div class="cell cellWhite" id="2,2,L"></div>' +
        '<div class="cell cellBlack" id="3,2,L"></div>' +
        '<div class="cell cellWhite" id="4,2,L"></div>' +
        '<div class="cell cellBlack" id="5,2,L"></div>' +
        '<div class="cell cellWhite" id="6,2,L"></div>' +
        '<div class="cell cellBlack" id="7,2,L"></div>' +
        '<div class="cell cellBlack" id="0,3,L"></div>' +
        '<div class="cell cellWhite" id="1,3,L"></div>' +
        '<div class="cell cellBlack" id="2,3,L"></div>' +
        '<div class="cell cellWhite" id="3,3,L"></div>' +
        '<div class="cell cellBlack" id="4,3,L"></div>' +
        '<div class="cell cellWhite" id="5,3,L"></div>' +
        '<div class="cell cellBlack" id="6,3,L"></div>' +
        '<div class="cell cellWhite" id="7,3,L"></div>' +
        '<div class="cell cellWhite" id="0,4,L"></div>' +
        '<div class="cell cellBlack" id="1,4,L"></div>' +
        '<div class="cell cellWhite" id="2,4,L"></div>' +
        '<div class="cell cellBlack" id="3,4,L"></div>' +
        '<div class="cell cellWhite" id="4,4,L"></div>' +
        '<div class="cell cellBlack" id="5,4,L"></div>' +
        '<div class="cell cellWhite" id="6,4,L"></div>' +
        '<div class="cell cellBlack" id="7,4,L"></div>' +
        '<div class="cell cellBlack" id="0,5,L"></div>' +
        '<div class="cell cellWhite" id="1,5,L"></div>' +
        '<div class="cell cellBlack" id="2,5,L"></div>' +
        '<div class="cell cellWhite" id="3,5,L"></div>' +
        '<div class="cell cellBlack" id="4,5,L"></div>' +
        '<div class="cell cellWhite" id="5,5,L"></div>' +
        '<div class="cell cellBlack" id="6,5,L"></div>' +
        '<div class="cell cellWhite" id="7,5,L"></div>' +
        '<div class="cell cellWhite" id="0,6,L"></div>' +
        '<div class="cell cellBlack" id="1,6,L"></div>' +
        '<div class="cell cellWhite" id="2,6,L"></div>' +
        '<div class="cell cellBlack" id="3,6,L"></div>' +
        '<div class="cell cellWhite" id="4,6,L"></div>' +
        '<div class="cell cellBlack" id="5,6,L"></div>' +
        '<div class="cell cellWhite" id="6,6,L"></div>' +
        '<div class="cell cellBlack" id="7,6,L"></div>' +
        '<div class="cell cellBlack" id="0,7,L"></div>' +
        '<div class="cell cellWhite" id="1,7,L"></div>' +
        '<div class="cell cellBlack" id="2,7,L"></div>' +
        '<div class="cell cellWhite" id="3,7,L"></div>' +
        '<div class="cell cellBlack" id="4,7,L"></div>' +
        '<div class="cell cellWhite" id="5,7,L"></div>' +
        '<div class="cell cellBlack" id="6,7,L"></div>' +
        '<div class="cell cellWhite" id="7,7,L"></div>' +
    '</div>' +
    '</div>'
        
        const needed_result =     
        '<div class="cell cellWhite" id="0,0,L">' +
            '<div class="piece white_bishop"></div>' +
        '</div>' +
        '<div class="cell cellBlack" id="1,0,L"></div>' +
        '<div class="cell cellWhite" id="2,0,L"></div>' +
        '<div class="cell cellBlack" id="3,0,L"></div>' +
        '<div class="cell cellWhite" id="4,0,L"></div>' +
        '<div class="cell cellBlack" id="5,0,L"></div>' +
        '<div class="cell cellWhite" id="6,0,L"></div>' +
        '<div class="cell cellBlack" id="7,0,L"></div>' +
        '<div class="cell cellBlack" id="0,1,L"></div>' +
        '<div class="cell cellWhite" id="1,1,L"></div>' +
        '<div class="cell cellBlack" id="2,1,L"></div>' +
        '<div class="cell cellWhite" id="3,1,L"></div>' +
        '<div class="cell cellBlack" id="4,1,L"></div>' +
        '<div class="cell cellWhite" id="5,1,L"></div>' +
        '<div class="cell cellBlack" id="6,1,L"></div>' +
        '<div class="cell cellWhite" id="7,1,L"></div>' +
        '<div class="cell cellWhite" id="0,2,L"></div>' +
        '<div class="cell cellBlack" id="1,2,L"></div>' +
        '<div class="cell cellWhite" id="2,2,L"></div>' +
        '<div class="cell cellBlack" id="3,2,L"></div>' +
        '<div class="cell cellWhite" id="4,2,L"></div>' +
        '<div class="cell cellBlack" id="5,2,L"></div>' +
        '<div class="cell cellWhite" id="6,2,L"></div>' +
        '<div class="cell cellBlack" id="7,2,L"></div>' +
        '<div class="cell cellBlack" id="0,3,L"></div>' +
        '<div class="cell cellWhite" id="1,3,L"></div>' +
        '<div class="cell cellBlack" id="2,3,L"></div>' +
        '<div class="cell cellWhite" id="3,3,L"></div>' +
        '<div class="cell cellBlack" id="4,3,L"></div>' +
        '<div class="cell cellWhite" id="5,3,L"></div>' +
        '<div class="cell cellBlack" id="6,3,L"></div>' +
        '<div class="cell cellWhite" id="7,3,L"></div>' +
        '<div class="cell cellWhite" id="0,4,L"></div>' +
        '<div class="cell cellBlack" id="1,4,L"></div>' +
        '<div class="cell cellWhite" id="2,4,L"></div>' +
        '<div class="cell cellBlack" id="3,4,L"></div>' +
        '<div class="cell cellWhite" id="4,4,L"></div>' +
        '<div class="cell cellBlack" id="5,4,L"></div>' +
        '<div class="cell cellWhite" id="6,4,L"></div>' +
        '<div class="cell cellBlack" id="7,4,L"></div>' +
        '<div class="cell cellBlack" id="0,5,L"></div>' +
        '<div class="cell cellWhite" id="1,5,L"></div>' +
        '<div class="cell cellBlack" id="2,5,L"></div>' +
        '<div class="cell cellWhite" id="3,5,L"></div>' +
        '<div class="cell cellBlack" id="4,5,L"></div>' +
        '<div class="cell cellWhite" id="5,5,L"></div>' +
        '<div class="cell cellBlack" id="6,5,L"></div>' +
        '<div class="cell cellWhite" id="7,5,L"></div>' +
        '<div class="cell cellWhite" id="0,6,L"></div>' +
        '<div class="cell cellBlack" id="1,6,L"></div>' +
        '<div class="cell cellWhite" id="2,6,L"></div>' +
        '<div class="cell cellBlack" id="3,6,L"></div>' +
        '<div class="cell cellWhite" id="4,6,L"></div>' +
        '<div class="cell cellBlack" id="5,6,L"></div>' +
        '<div class="cell cellWhite" id="6,6,L"></div>' +
        '<div class="cell cellBlack" id="7,6,L"></div>' +
        '<div class="cell cellBlack" id="0,7,L"></div>' +
        '<div class="cell cellWhite" id="1,7,L"></div>' +
        '<div class="cell cellBlack" id="2,7,L"></div>' +
        '<div class="cell cellWhite" id="3,7,L"></div>' +
        '<div class="cell cellBlack" id="4,7,L"></div>' +
        '<div class="cell cellWhite" id="5,7,L"></div>' +
        '<div class="cell cellBlack" id="6,7,L"></div>' +
        '<div class="cell cellWhite" id="7,7,L"></div>'

        const PieceName : GamePiece = {
            type : Piece.BISHOP,
            color : Color.WHITE
        }

        const REALPIECE = new RealPiece(PieceName, [0,0]);

        REALPIECE.createPiece([0,0], true);

        const result = document.querySelector(".leftBoard");

        expect(result?.innerHTML).toBe(needed_result);
    });

    test("Testing visual placment of piece at right board", () => {
        document.body.innerHTML = 
    '<div class="boardPlace">' +
    '<div class="Board rightBoard">' +
        '<div class="cell cellWhite" id="0,0,R"></div>' +
        '<div class="cell cellBlack" id="1,0,R"></div>' +
        '<div class="cell cellWhite" id="2,0,R"></div>' +
        '<div class="cell cellBlack" id="3,0,R"></div>' +
        '<div class="cell cellWhite" id="4,0,R"></div>' +
        '<div class="cell cellBlack" id="5,0,R"></div>' +
        '<div class="cell cellWhite" id="6,0,R"></div>' +
        '<div class="cell cellBlack" id="7,0,R"></div>' +
        '<div class="cell cellBlack" id="0,1,R"></div>' +
        '<div class="cell cellWhite" id="1,1,R"></div>' +
        '<div class="cell cellBlack" id="2,1,R"></div>' +
        '<div class="cell cellWhite" id="3,1,R"></div>' +
        '<div class="cell cellBlack" id="4,1,R"></div>' +
        '<div class="cell cellWhite" id="5,1,R"></div>' +
        '<div class="cell cellBlack" id="6,1,R"></div>' +
        '<div class="cell cellWhite" id="7,1,R"></div>' +
        '<div class="cell cellWhite" id="0,2,R"></div>' +
        '<div class="cell cellBlack" id="1,2,R"></div>' +
        '<div class="cell cellWhite" id="2,2,R"></div>' +
        '<div class="cell cellBlack" id="3,2,R"></div>' +
        '<div class="cell cellWhite" id="4,2,R"></div>' +
        '<div class="cell cellBlack" id="5,2,R"></div>' +
        '<div class="cell cellWhite" id="6,2,R"></div>' +
        '<div class="cell cellBlack" id="7,2,R"></div>' +
        '<div class="cell cellBlack" id="0,3,R"></div>' +
        '<div class="cell cellWhite" id="1,3,R"></div>' +
        '<div class="cell cellBlack" id="2,3,R"></div>' +
        '<div class="cell cellWhite" id="3,3,R"></div>' +
        '<div class="cell cellBlack" id="4,3,R"></div>' +
        '<div class="cell cellWhite" id="5,3,R"></div>' +
        '<div class="cell cellBlack" id="6,3,R"></div>' +
        '<div class="cell cellWhite" id="7,3,R"></div>' +
        '<div class="cell cellWhite" id="0,4,R"></div>' +
        '<div class="cell cellBlack" id="1,4,R"></div>' +
        '<div class="cell cellWhite" id="2,4,R"></div>' +
        '<div class="cell cellBlack" id="3,4,R"></div>' +
        '<div class="cell cellWhite" id="4,4,R"></div>' +
        '<div class="cell cellBlack" id="5,4,R"></div>' +
        '<div class="cell cellWhite" id="6,4,R"></div>' +
        '<div class="cell cellBlack" id="7,4,R"></div>' +
        '<div class="cell cellBlack" id="0,5,R"></div>' +
        '<div class="cell cellWhite" id="1,5,R"></div>' +
        '<div class="cell cellBlack" id="2,5,R"></div>' +
        '<div class="cell cellWhite" id="3,5,R"></div>' +
        '<div class="cell cellBlack" id="4,5,R"></div>' +
        '<div class="cell cellWhite" id="5,5,R"></div>' +
        '<div class="cell cellBlack" id="6,5,R"></div>' +
        '<div class="cell cellWhite" id="7,5,R"></div>' +
        '<div class="cell cellWhite" id="0,6,R"></div>' +
        '<div class="cell cellBlack" id="1,6,R"></div>' +
        '<div class="cell cellWhite" id="2,6,R"></div>' +
        '<div class="cell cellBlack" id="3,6,R"></div>' +
        '<div class="cell cellWhite" id="4,6,R"></div>' +
        '<div class="cell cellBlack" id="5,6,R"></div>' +
        '<div class="cell cellWhite" id="6,6,R"></div>' +
        '<div class="cell cellBlack" id="7,6,R"></div>' +
        '<div class="cell cellBlack" id="0,7,R"></div>' +
        '<div class="cell cellWhite" id="1,7,R"></div>' +
        '<div class="cell cellBlack" id="2,7,R"></div>' +
        '<div class="cell cellWhite" id="3,7,R"></div>' +
        '<div class="cell cellBlack" id="4,7,R"></div>' +
        '<div class="cell cellWhite" id="5,7,R"></div>' +
        '<div class="cell cellBlack" id="6,7,R"></div>' +
        '<div class="cell cellWhite" id="7,7,R"></div>' +
    '</div>' +
    '</div>'
        
        const needed_result =     
        '<div class="cell cellWhite" id="0,0,R">' +
            '<div class="piece white_bishop"></div>' +
        '</div>' +
        '<div class="cell cellBlack" id="1,0,R"></div>' +
        '<div class="cell cellWhite" id="2,0,R"></div>' +
        '<div class="cell cellBlack" id="3,0,R"></div>' +
        '<div class="cell cellWhite" id="4,0,R"></div>' +
        '<div class="cell cellBlack" id="5,0,R"></div>' +
        '<div class="cell cellWhite" id="6,0,R"></div>' +
        '<div class="cell cellBlack" id="7,0,R"></div>' +
        '<div class="cell cellBlack" id="0,1,R"></div>' +
        '<div class="cell cellWhite" id="1,1,R"></div>' +
        '<div class="cell cellBlack" id="2,1,R"></div>' +
        '<div class="cell cellWhite" id="3,1,R"></div>' +
        '<div class="cell cellBlack" id="4,1,R"></div>' +
        '<div class="cell cellWhite" id="5,1,R"></div>' +
        '<div class="cell cellBlack" id="6,1,R"></div>' +
        '<div class="cell cellWhite" id="7,1,R"></div>' +
        '<div class="cell cellWhite" id="0,2,R"></div>' +
        '<div class="cell cellBlack" id="1,2,R"></div>' +
        '<div class="cell cellWhite" id="2,2,R"></div>' +
        '<div class="cell cellBlack" id="3,2,R"></div>' +
        '<div class="cell cellWhite" id="4,2,R"></div>' +
        '<div class="cell cellBlack" id="5,2,R"></div>' +
        '<div class="cell cellWhite" id="6,2,R"></div>' +
        '<div class="cell cellBlack" id="7,2,R"></div>' +
        '<div class="cell cellBlack" id="0,3,R"></div>' +
        '<div class="cell cellWhite" id="1,3,R"></div>' +
        '<div class="cell cellBlack" id="2,3,R"></div>' +
        '<div class="cell cellWhite" id="3,3,R"></div>' +
        '<div class="cell cellBlack" id="4,3,R"></div>' +
        '<div class="cell cellWhite" id="5,3,R"></div>' +
        '<div class="cell cellBlack" id="6,3,R"></div>' +
        '<div class="cell cellWhite" id="7,3,R"></div>' +
        '<div class="cell cellWhite" id="0,4,R"></div>' +
        '<div class="cell cellBlack" id="1,4,R"></div>' +
        '<div class="cell cellWhite" id="2,4,R"></div>' +
        '<div class="cell cellBlack" id="3,4,R"></div>' +
        '<div class="cell cellWhite" id="4,4,R"></div>' +
        '<div class="cell cellBlack" id="5,4,R"></div>' +
        '<div class="cell cellWhite" id="6,4,R"></div>' +
        '<div class="cell cellBlack" id="7,4,R"></div>' +
        '<div class="cell cellBlack" id="0,5,R"></div>' +
        '<div class="cell cellWhite" id="1,5,R"></div>' +
        '<div class="cell cellBlack" id="2,5,R"></div>' +
        '<div class="cell cellWhite" id="3,5,R"></div>' +
        '<div class="cell cellBlack" id="4,5,R"></div>' +
        '<div class="cell cellWhite" id="5,5,R"></div>' +
        '<div class="cell cellBlack" id="6,5,R"></div>' +
        '<div class="cell cellWhite" id="7,5,R"></div>' +
        '<div class="cell cellWhite" id="0,6,R"></div>' +
        '<div class="cell cellBlack" id="1,6,R"></div>' +
        '<div class="cell cellWhite" id="2,6,R"></div>' +
        '<div class="cell cellBlack" id="3,6,R"></div>' +
        '<div class="cell cellWhite" id="4,6,R"></div>' +
        '<div class="cell cellBlack" id="5,6,R"></div>' +
        '<div class="cell cellWhite" id="6,6,R"></div>' +
        '<div class="cell cellBlack" id="7,6,R"></div>' +
        '<div class="cell cellBlack" id="0,7,R"></div>' +
        '<div class="cell cellWhite" id="1,7,R"></div>' +
        '<div class="cell cellBlack" id="2,7,R"></div>' +
        '<div class="cell cellWhite" id="3,7,R"></div>' +
        '<div class="cell cellBlack" id="4,7,R"></div>' +
        '<div class="cell cellWhite" id="5,7,R"></div>' +
        '<div class="cell cellBlack" id="6,7,R"></div>' +
        '<div class="cell cellWhite" id="7,7,R"></div>'

        const PieceName : GamePiece = {
            type : Piece.BISHOP,
            color : Color.WHITE
        }

        const REALPIECE = new RealPiece(PieceName, [0,0]);

        REALPIECE.createPiece([0,0], false);

        const result = document.querySelector(".rightBoard");

        expect(result?.innerHTML).toBe(needed_result);
    });
    
    test("Testing visual placment if amount of coordinates are not 2", () => {
        document.body.innerHTML = 
    '<div class="boardPlace">' +
    '<div class="Board rightBoard">' +
    '</div>' +
    '</div>'
        
        const PieceName : GamePiece = {
            type : Piece.BISHOP,
            color : Color.WHITE
        }

        const REALPIECE = new RealPiece(PieceName, [0,0]);

        const result = REALPIECE.createPiece([0], false);

        expect(result).toBe(-1);
    });
    
    test("Testing visual placment if coordinates are not in range between 0 and 7", () => {
        document.body.innerHTML = 
    '<div class="boardPlace">' +
    '<div class="Board rightBoard">' +
    '</div>' +
    '</div>'
        
        const PieceName : GamePiece = {
            type : Piece.BISHOP,
            color : Color.WHITE
        }

        const REALPIECE = new RealPiece(PieceName, [0,0]);

        const result = REALPIECE.createPiece([-1,9], false);

        expect(result).toBe(-1);
    });
    
    test("Testing visual placment of piece of all types at right board", () => {
        document.body.innerHTML = 
    '<div class="boardPlace">' +
    '<div class="Board rightBoard">' +
        '<div class="cell cellWhite" id="0,0,R"></div>' +
        '<div class="cell cellBlack" id="1,0,R"></div>' +
        '<div class="cell cellWhite" id="2,0,R"></div>' +
        '<div class="cell cellBlack" id="3,0,R"></div>' +
        '<div class="cell cellWhite" id="4,0,R"></div>' +
        '<div class="cell cellBlack" id="5,0,R"></div>' +
        '<div class="cell cellWhite" id="6,0,R"></div>' +
        '<div class="cell cellBlack" id="7,0,R"></div>' +
        '<div class="cell cellBlack" id="0,1,R"></div>' +
        '<div class="cell cellWhite" id="1,1,R"></div>' +
        '<div class="cell cellBlack" id="2,1,R"></div>' +
        '<div class="cell cellWhite" id="3,1,R"></div>' +
        '<div class="cell cellBlack" id="4,1,R"></div>' +
        '<div class="cell cellWhite" id="5,1,R"></div>' +
        '<div class="cell cellBlack" id="6,1,R"></div>' +
        '<div class="cell cellWhite" id="7,1,R"></div>' +
        '<div class="cell cellWhite" id="0,2,R"></div>' +
        '<div class="cell cellBlack" id="1,2,R"></div>' +
        '<div class="cell cellWhite" id="2,2,R"></div>' +
        '<div class="cell cellBlack" id="3,2,R"></div>' +
        '<div class="cell cellWhite" id="4,2,R"></div>' +
        '<div class="cell cellBlack" id="5,2,R"></div>' +
        '<div class="cell cellWhite" id="6,2,R"></div>' +
        '<div class="cell cellBlack" id="7,2,R"></div>' +
        '<div class="cell cellBlack" id="0,3,R"></div>' +
        '<div class="cell cellWhite" id="1,3,R"></div>' +
        '<div class="cell cellBlack" id="2,3,R"></div>' +
        '<div class="cell cellWhite" id="3,3,R"></div>' +
        '<div class="cell cellBlack" id="4,3,R"></div>' +
        '<div class="cell cellWhite" id="5,3,R"></div>' +
        '<div class="cell cellBlack" id="6,3,R"></div>' +
        '<div class="cell cellWhite" id="7,3,R"></div>' +
        '<div class="cell cellWhite" id="0,4,R"></div>' +
        '<div class="cell cellBlack" id="1,4,R"></div>' +
        '<div class="cell cellWhite" id="2,4,R"></div>' +
        '<div class="cell cellBlack" id="3,4,R"></div>' +
        '<div class="cell cellWhite" id="4,4,R"></div>' +
        '<div class="cell cellBlack" id="5,4,R"></div>' +
        '<div class="cell cellWhite" id="6,4,R"></div>' +
        '<div class="cell cellBlack" id="7,4,R"></div>' +
        '<div class="cell cellBlack" id="0,5,R"></div>' +
        '<div class="cell cellWhite" id="1,5,R"></div>' +
        '<div class="cell cellBlack" id="2,5,R"></div>' +
        '<div class="cell cellWhite" id="3,5,R"></div>' +
        '<div class="cell cellBlack" id="4,5,R"></div>' +
        '<div class="cell cellWhite" id="5,5,R"></div>' +
        '<div class="cell cellBlack" id="6,5,R"></div>' +
        '<div class="cell cellWhite" id="7,5,R"></div>' +
        '<div class="cell cellWhite" id="0,6,R"></div>' +
        '<div class="cell cellBlack" id="1,6,R"></div>' +
        '<div class="cell cellWhite" id="2,6,R"></div>' +
        '<div class="cell cellBlack" id="3,6,R"></div>' +
        '<div class="cell cellWhite" id="4,6,R"></div>' +
        '<div class="cell cellBlack" id="5,6,R"></div>' +
        '<div class="cell cellWhite" id="6,6,R"></div>' +
        '<div class="cell cellBlack" id="7,6,R"></div>' +
        '<div class="cell cellBlack" id="0,7,R"></div>' +
        '<div class="cell cellWhite" id="1,7,R"></div>' +
        '<div class="cell cellBlack" id="2,7,R"></div>' +
        '<div class="cell cellWhite" id="3,7,R"></div>' +
        '<div class="cell cellBlack" id="4,7,R"></div>' +
        '<div class="cell cellWhite" id="5,7,R"></div>' +
        '<div class="cell cellBlack" id="6,7,R"></div>' +
        '<div class="cell cellWhite" id="7,7,R"></div>' +
    '</div>' +
    '</div>'
        
        const needed_result =     
        '<div class="cell cellWhite" id="0,0,R">' +
            '<div class="piece white_bishop"></div>' +
        '</div>' +
        '<div class="cell cellBlack" id="1,0,R">' +
            '<div class="piece white_pawn"></div>' +
        '</div>' +
        '<div class="cell cellWhite" id="2,0,R">' + 
            '<div class="piece white_rock"></div>' +
        '</div>' +
        '<div class="cell cellBlack" id="3,0,R">' +
            '<div class="piece white_king"></div>' +
        '</div>' +
        '<div class="cell cellWhite" id="4,0,R">' +
            '<div class="piece white_knight"></div>' +
        '</div>' +
        '<div class="cell cellBlack" id="5,0,R">' + 
            '<div class="piece white_queen"></div>' +
        '</div>' +
        '<div class="cell cellWhite" id="6,0,R"></div>' +
        '<div class="cell cellBlack" id="7,0,R"></div>' +
        '<div class="cell cellBlack" id="0,1,R">' + 
            '<div class="piece black_bishop"></div>' +
        '</div>' +
        '<div class="cell cellWhite" id="1,1,R">' +
            '<div class="piece black_pawn"></div>' +
        '</div>' +
        '<div class="cell cellBlack" id="2,1,R">' +
            '<div class="piece black_rock"></div>' +
        '</div>' +
        '<div class="cell cellWhite" id="3,1,R">' +
            '<div class="piece black_king"></div>' +
        '</div>' +
        '<div class="cell cellBlack" id="4,1,R">' +
            '<div class="piece black_knight"></div>' +
        '</div>' +
        '<div class="cell cellWhite" id="5,1,R">' +
            '<div class="piece black_queen"></div>' +
        '</div>' +
        '<div class="cell cellBlack" id="6,1,R"></div>' +
        '<div class="cell cellWhite" id="7,1,R"></div>' +
        '<div class="cell cellWhite" id="0,2,R"></div>' +
        '<div class="cell cellBlack" id="1,2,R"></div>' +
        '<div class="cell cellWhite" id="2,2,R"></div>' +
        '<div class="cell cellBlack" id="3,2,R"></div>' +
        '<div class="cell cellWhite" id="4,2,R"></div>' +
        '<div class="cell cellBlack" id="5,2,R"></div>' +
        '<div class="cell cellWhite" id="6,2,R"></div>' +
        '<div class="cell cellBlack" id="7,2,R"></div>' +
        '<div class="cell cellBlack" id="0,3,R"></div>' +
        '<div class="cell cellWhite" id="1,3,R"></div>' +
        '<div class="cell cellBlack" id="2,3,R"></div>' +
        '<div class="cell cellWhite" id="3,3,R"></div>' +
        '<div class="cell cellBlack" id="4,3,R"></div>' +
        '<div class="cell cellWhite" id="5,3,R"></div>' +
        '<div class="cell cellBlack" id="6,3,R"></div>' +
        '<div class="cell cellWhite" id="7,3,R"></div>' +
        '<div class="cell cellWhite" id="0,4,R"></div>' +
        '<div class="cell cellBlack" id="1,4,R"></div>' +
        '<div class="cell cellWhite" id="2,4,R"></div>' +
        '<div class="cell cellBlack" id="3,4,R"></div>' +
        '<div class="cell cellWhite" id="4,4,R"></div>' +
        '<div class="cell cellBlack" id="5,4,R"></div>' +
        '<div class="cell cellWhite" id="6,4,R"></div>' +
        '<div class="cell cellBlack" id="7,4,R"></div>' +
        '<div class="cell cellBlack" id="0,5,R"></div>' +
        '<div class="cell cellWhite" id="1,5,R"></div>' +
        '<div class="cell cellBlack" id="2,5,R"></div>' +
        '<div class="cell cellWhite" id="3,5,R"></div>' +
        '<div class="cell cellBlack" id="4,5,R"></div>' +
        '<div class="cell cellWhite" id="5,5,R"></div>' +
        '<div class="cell cellBlack" id="6,5,R"></div>' +
        '<div class="cell cellWhite" id="7,5,R"></div>' +
        '<div class="cell cellWhite" id="0,6,R"></div>' +
        '<div class="cell cellBlack" id="1,6,R"></div>' +
        '<div class="cell cellWhite" id="2,6,R"></div>' +
        '<div class="cell cellBlack" id="3,6,R"></div>' +
        '<div class="cell cellWhite" id="4,6,R"></div>' +
        '<div class="cell cellBlack" id="5,6,R"></div>' +
        '<div class="cell cellWhite" id="6,6,R"></div>' +
        '<div class="cell cellBlack" id="7,6,R"></div>' +
        '<div class="cell cellBlack" id="0,7,R"></div>' +
        '<div class="cell cellWhite" id="1,7,R"></div>' +
        '<div class="cell cellBlack" id="2,7,R"></div>' +
        '<div class="cell cellWhite" id="3,7,R"></div>' +
        '<div class="cell cellBlack" id="4,7,R"></div>' +
        '<div class="cell cellWhite" id="5,7,R"></div>' +
        '<div class="cell cellBlack" id="6,7,R"></div>' +
        '<div class="cell cellWhite" id="7,7,R"></div>'

        const PieceName0 : GamePiece = { type : Piece.BISHOP, color : Color.WHITE }
        const PieceName1 : GamePiece = { type : Piece.PAWN, color : Color.WHITE }
        const PieceName2 : GamePiece = { type : Piece.ROCK, color : Color.WHITE }
        const PieceName3 : GamePiece = { type : Piece.KING, color : Color.WHITE }
        const PieceName4 : GamePiece = { type : Piece.KNIGHT, color : Color.WHITE }
        const PieceName5 : GamePiece = { type : Piece.QUEEN, color : Color.WHITE }
        
        const PieceName6 : GamePiece = { type : Piece.BISHOP, color : Color.BLACK }
        const PieceName7 : GamePiece = { type : Piece.PAWN, color : Color.BLACK }
        const PieceName8 : GamePiece = { type : Piece.ROCK, color : Color.BLACK }
        const PieceName9 : GamePiece = { type : Piece.KING, color : Color.BLACK }
        const PieceName10 : GamePiece = { type : Piece.KNIGHT, color : Color.BLACK }
        const PieceName11 : GamePiece = { type : Piece.QUEEN, color : Color.BLACK }

        const REALPIECE0 = new RealPiece(PieceName0, [0,0]);
        const REALPIECE1 = new RealPiece(PieceName1, [0,0]);
        const REALPIECE2 = new RealPiece(PieceName2, [0,0]);
        const REALPIECE3 = new RealPiece(PieceName3, [0,0]);
        const REALPIECE4 = new RealPiece(PieceName4, [0,0]);
        const REALPIECE5 = new RealPiece(PieceName5, [0,0]);

        const REALPIECE6 = new RealPiece(PieceName6, [0,0]);
        const REALPIECE7 = new RealPiece(PieceName7, [0,0]);
        const REALPIECE8 = new RealPiece(PieceName8, [0,0]);
        const REALPIECE9 = new RealPiece(PieceName9, [0,0]);
        const REALPIECE10 = new RealPiece(PieceName10, [0,0]);
        const REALPIECE11 = new RealPiece(PieceName11, [0,0]);
        
        REALPIECE0.createPiece([0,0], false);
        REALPIECE1.createPiece([0,1], false);
        REALPIECE2.createPiece([0,2], false);
        REALPIECE3.createPiece([0,3], false);
        REALPIECE4.createPiece([0,4], false);
        REALPIECE5.createPiece([0,5], false);
        
        REALPIECE6.createPiece([1,0], false);
        REALPIECE7.createPiece([1,1], false);
        REALPIECE8.createPiece([1,2], false);
        REALPIECE9.createPiece([1,3], false);
        REALPIECE10.createPiece([1,4], false);
        REALPIECE11.createPiece([1,5], false);

        const result = document.querySelector(".rightBoard");

        expect(result?.innerHTML).toBe(needed_result);
    });
});
