import { Chess }  from '../code/ts/chess';
import {GamePiece, Piece, Color} from '../code/ts/types';

const html_state = 
            '<div class="boardPlace">' +
            '    <div class="Board leftBoard"></div>' +
            '    <div class="Board rightBoard"></div>' +
            '</div>'

const EMPTY_CELL : GamePiece = {
    type : Piece.EMPTY,
    color : Color.NONE 
}

const BISHOP : GamePiece = {
    type : Piece.BISHOP,
    color : Color.BLACK
}

const TEST_ARRAY : GamePiece[][] = [
    [EMPTY_CELL,EMPTY_CELL,EMPTY_CELL,EMPTY_CELL,EMPTY_CELL,EMPTY_CELL,EMPTY_CELL,EMPTY_CELL],
    [EMPTY_CELL,EMPTY_CELL,EMPTY_CELL,EMPTY_CELL,EMPTY_CELL,EMPTY_CELL,EMPTY_CELL,EMPTY_CELL],
    [EMPTY_CELL,EMPTY_CELL,EMPTY_CELL,EMPTY_CELL,EMPTY_CELL,EMPTY_CELL,EMPTY_CELL,EMPTY_CELL],
    [EMPTY_CELL,EMPTY_CELL,EMPTY_CELL,EMPTY_CELL,EMPTY_CELL,EMPTY_CELL,EMPTY_CELL,EMPTY_CELL],
    [EMPTY_CELL,EMPTY_CELL,EMPTY_CELL,EMPTY_CELL,EMPTY_CELL,EMPTY_CELL,EMPTY_CELL,EMPTY_CELL],
    [EMPTY_CELL,EMPTY_CELL,EMPTY_CELL,EMPTY_CELL,EMPTY_CELL,EMPTY_CELL,EMPTY_CELL,EMPTY_CELL],
    [EMPTY_CELL,EMPTY_CELL,EMPTY_CELL,EMPTY_CELL,EMPTY_CELL,EMPTY_CELL,EMPTY_CELL,EMPTY_CELL],
    [EMPTY_CELL,EMPTY_CELL,EMPTY_CELL,EMPTY_CELL,EMPTY_CELL,EMPTY_CELL,EMPTY_CELL,EMPTY_CELL]
]

describe("Testing logic with field code", () => {
    test('fill an array with empty cells', () => {

        document.body.innerHTML = html_state;

        const TEST_EMPTY_ARRAY = TEST_ARRAY;

        const CHESS = new Chess();
        const result = CHESS.setUpEmptyBoards();

        expect(result).toStrictEqual(TEST_EMPTY_ARRAY);
    });
});
    
describe("Testing piece placment", () => {

   let TEST_ARRAY_CHANGED : GamePiece[][];
   
   beforeEach(() => {
        TEST_ARRAY_CHANGED = [
            [EMPTY_CELL,EMPTY_CELL,EMPTY_CELL,EMPTY_CELL,EMPTY_CELL,EMPTY_CELL,EMPTY_CELL,EMPTY_CELL],
            [EMPTY_CELL,EMPTY_CELL,EMPTY_CELL,EMPTY_CELL,EMPTY_CELL,EMPTY_CELL,EMPTY_CELL,EMPTY_CELL],
            [EMPTY_CELL,EMPTY_CELL,EMPTY_CELL,EMPTY_CELL,EMPTY_CELL,EMPTY_CELL,EMPTY_CELL,EMPTY_CELL],
            [EMPTY_CELL,EMPTY_CELL,EMPTY_CELL,EMPTY_CELL,EMPTY_CELL,EMPTY_CELL,EMPTY_CELL,EMPTY_CELL],
            [EMPTY_CELL,EMPTY_CELL,EMPTY_CELL,EMPTY_CELL,EMPTY_CELL,EMPTY_CELL,EMPTY_CELL,EMPTY_CELL],
            [EMPTY_CELL,EMPTY_CELL,EMPTY_CELL,EMPTY_CELL,EMPTY_CELL,EMPTY_CELL,EMPTY_CELL,EMPTY_CELL],
            [EMPTY_CELL,EMPTY_CELL,EMPTY_CELL,EMPTY_CELL,EMPTY_CELL,EMPTY_CELL,EMPTY_CELL,EMPTY_CELL],
            [EMPTY_CELL,EMPTY_CELL,EMPTY_CELL,EMPTY_CELL,EMPTY_CELL,EMPTY_CELL,EMPTY_CELL,EMPTY_CELL]
        ]
   }); 
// Check succesfull placing of piece
    test('Place a Bishop to [0,0] at left board', () => {
        document.body.innerHTML = html_state;

        TEST_ARRAY_CHANGED[0][0] = BISHOP;

        const CHESS = new Chess();
        CHESS.setUpEmptyBoards();
        CHESS.fillLeftBoard(TEST_ARRAY_CHANGED);
        
        CHESS.placePiece(true, BISHOP, [0,0]);

        expect(CHESS.getBoard(true)).toStrictEqual(TEST_ARRAY_CHANGED);
    });

// Check failure to place Piece in wrong place    
    test('Place a Bishop to [-1,0] at left board', () => {
        document.body.innerHTML = html_state;

        const CHESS = new Chess();
        CHESS.setUpEmptyBoards();
        CHESS.fillLeftBoard(TEST_ARRAY);
        
        expect(CHESS.placePiece(true, BISHOP, [-1,0])).toBe(-1);
    });
    
   // Check failure to set piece with only one coordinate 
    test('Place a Bishop to [0] at left board', () => {
        document.body.innerHTML = html_state;

        const CHESS = new Chess();
        CHESS.setUpEmptyBoards();
        CHESS.fillLeftBoard(TEST_ARRAY);

        expect(CHESS.placePiece(true, BISHOP, [0])).toBe(-1);
    });
});

describe("Check notation generation", () => {
   let TEST_ARRAY : GamePiece[][]; 
    
   beforeEach(() => {
        TEST_ARRAY = [
            [EMPTY_CELL,EMPTY_CELL,EMPTY_CELL,EMPTY_CELL,EMPTY_CELL,EMPTY_CELL,EMPTY_CELL,EMPTY_CELL],
            [EMPTY_CELL,EMPTY_CELL,EMPTY_CELL,EMPTY_CELL,EMPTY_CELL,EMPTY_CELL,EMPTY_CELL,EMPTY_CELL],
            [EMPTY_CELL,EMPTY_CELL,EMPTY_CELL,EMPTY_CELL,EMPTY_CELL,EMPTY_CELL,EMPTY_CELL,EMPTY_CELL],
            [EMPTY_CELL,EMPTY_CELL,EMPTY_CELL,EMPTY_CELL,EMPTY_CELL,EMPTY_CELL,EMPTY_CELL,EMPTY_CELL],
            [EMPTY_CELL,EMPTY_CELL,EMPTY_CELL,EMPTY_CELL,EMPTY_CELL,EMPTY_CELL,EMPTY_CELL,EMPTY_CELL],
            [EMPTY_CELL,EMPTY_CELL,EMPTY_CELL,EMPTY_CELL,EMPTY_CELL,EMPTY_CELL,EMPTY_CELL,EMPTY_CELL],
            [EMPTY_CELL,EMPTY_CELL,EMPTY_CELL,EMPTY_CELL,EMPTY_CELL,EMPTY_CELL,EMPTY_CELL,EMPTY_CELL],
            [EMPTY_CELL,EMPTY_CELL,EMPTY_CELL,EMPTY_CELL,EMPTY_CELL,EMPTY_CELL,EMPTY_CELL,EMPTY_CELL]
        ]
    }); 

    test('Generate position from empty stateString', () => {
        document.body.innerHTML = html_state;

        const CHESS = new Chess();
        CHESS.setUpEmptyBoards();
        CHESS.fillLeftBoard(TEST_ARRAY);
        CHESS.generateBoardSetUp("8\\8\\8\\8\\8\\8\\8\\8\\", true);

        expect(CHESS.generateNotation(true)).toBe("8\\8\\8\\8\\8\\8\\8\\8\\");
    });
    
    test('Generate position from stateString with black bishop at first cell', () => {

        document.body.innerHTML = html_state;

        const CHESS = new Chess();
        CHESS.setUpEmptyBoards();
        CHESS.fillLeftBoard(TEST_ARRAY);
        CHESS.generateBoardSetUp("b7\\8\\8\\8\\8\\8\\8\\8\\", true);
        
        expect(CHESS.generateNotation(true)).toBe("b7\\8\\8\\8\\8\\8\\8\\8\\");
    });
    
    test('Generate position from stateString with black bishop at last cell', () => {

        document.body.innerHTML = html_state;

        const CHESS = new Chess();
        CHESS.setUpEmptyBoards();
        CHESS.fillLeftBoard(TEST_ARRAY);
        CHESS.generateBoardSetUp("8\\8\\8\\8\\8\\8\\8\\7b\\", true);
        
        expect(CHESS.generateNotation(true)).toBe("8\\8\\8\\8\\8\\8\\8\\7b\\");
    });
    
    test('Generate empty notation', () => {

        document.body.innerHTML = html_state;

        const CHESS = new Chess();
        CHESS.setUpEmptyBoards();
        CHESS.fillLeftBoard(TEST_ARRAY);

        expect(CHESS.generateNotation(true)).toBe("8\\8\\8\\8\\8\\8\\8\\8\\");
    });

    test('Generate notation with black bishop at first cell', () => {

        document.body.innerHTML = html_state;

        const CHESS = new Chess();
        CHESS.setUpEmptyBoards();
        CHESS.fillLeftBoard(TEST_ARRAY);
        CHESS.placePiece(true, BISHOP, [0,0]);
        
        expect(CHESS.generateNotation(true)).toBe("b7\\8\\8\\8\\8\\8\\8\\8\\");
    });

    test('Generate notation with black bishop at last cell', () => {

        document.body.innerHTML = html_state;

        const CHESS = new Chess();
        CHESS.setUpEmptyBoards();
        CHESS.fillLeftBoard(TEST_ARRAY);
        CHESS.placePiece(true, BISHOP, [7,7]);
        
        expect(CHESS.generateNotation(true)).toBe("8\\8\\8\\8\\8\\8\\8\\7b\\");
    });
});
