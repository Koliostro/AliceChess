import { Chess }  from '../code/ts/chess';
import {RealPiece} from '../code/ts/piece';
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

    test("Testing getter for all black pieces", () => {

        document.body.innerHTML = html_state;

        const CHESS = new Chess();
        CHESS.createBoard();
        CHESS.generateBoardSetUp("b7\\8\\8\\8\\8\\8\\8\\8\\", true);

        CHESS.createPiece(BISHOP, [0,0], true);
        const result = CHESS.getAllBlackPieces();

        const black_bishop : GamePiece = {
            type : Piece.BISHOP,
            color : Color.BLACK 
        }

        const TEST_PIECE = new RealPiece(black_bishop, [0,0]);

        expect(result).toStrictEqual([TEST_PIECE]);

    });
    
    test("Testing getter for all white pieces", () => {

        document.body.innerHTML = html_state;

        const CHESS = new Chess();
        CHESS.createBoard();
        CHESS.generateBoardSetUp("b7\\8\\8\\8\\8\\8\\8\\8\\", true);

        const white_bishop : GamePiece = {
            type : Piece.BISHOP,
            color : Color.WHITE 
        }
        
        CHESS.createPiece(white_bishop, [0,0], true);
        const result = CHESS.getAllWhitePieces();

        const TEST_PIECE = new RealPiece(white_bishop, [0,0]);

        expect(result).toStrictEqual([TEST_PIECE]);

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

describe("Testing generation of all moves for pieces", () => {

    describe("Check movement generation for rock", () => {
        test("Generation moves on empty board", () => {

            const expected_moves = [
                [4, 4],
                [4, 5],
                [4, 6],
                [4, 7],
                [5, 3],
                [6, 3],
                [7, 3],
                [4, 2],
                [4, 1],
                [4, 0],
                [3, 3],
                [2, 3],
                [1, 3],
                [0, 3]
            ];

            document.body.innerHTML = html_state;

            const CHESS = new Chess();
            CHESS.createBoard();
            CHESS.generateBoardSetUp("8\\8\\8\\4R3\\8\\8\\8\\8\\", true);

            const leftboard = CHESS.getBoard(true);

            for (let i = 0; i < 8; i++) {
                for (let j = 0; j < 8; j++) {
                    CHESS.createPiece(leftboard[j][i], [i,j], true);
                }
            }

            const piece = CHESS.getPieceFromPos([4,3], true);
            const result = piece?.generateAllMoves(true, CHESS);
            expect(result).toStrictEqual(expected_moves);
        });
    });

    describe("Ceck movement generation for bishop", () => {
        test("Check movement generation for Bishop when enemie's pieces are not in touch", () => {

            const expected_moves = [
                [5, 4],
                [6, 5],
                [7, 6],
                [3, 2],
                [2, 1],
                [5, 2],
                [6, 1],
                [7, 0],
                [3, 4],
                [2, 5],
                [1, 6],
                [0, 7]
            ];

            document.body.innerHTML = html_state;

            const CHESS = new Chess();
            CHESS.createBoard();
            CHESS.generateBoardSetUp("8\\2r6\\8\\4B3\\8\\8\\8\\8\\", true);

            const leftboard = CHESS.getBoard(true);

            for (let i = 0; i < 8; i++) {
                for (let j = 0; j < 8; j++) {
                    CHESS.createPiece(leftboard[j][i], [i,j], true);
                }
            }

            const piece = CHESS.getPieceFromPos([4,3], true);
            const result = piece?.generateAllMoves(true, CHESS);
            expect(result).toStrictEqual(expected_moves);
        });
        
        test("Check movement generation for Bishop in empty field", () => {

            const expected_moves = [
                [5, 4],
                [6, 5],
                [7, 6],
                [3, 2],
                [2, 1],
                [1, 0],
                [5, 2],
                [6, 1],
                [7, 0],
                [3, 4],
                [2, 5],
                [1, 6],
                [0, 7]
            ];

            document.body.innerHTML = html_state;

            const CHESS = new Chess();
            CHESS.createBoard();
            CHESS.generateBoardSetUp("8\\8\\8\\4B3\\8\\8\\8\\8\\", true);

            const leftboard = CHESS.getBoard(true);

            for (let i = 0; i < 8; i++) {
                for (let j = 0; j < 8; j++) {
                    CHESS.createPiece(leftboard[j][i], [i,j], true);
                }
            }

            const piece = CHESS.getPieceFromPos([4,3], true);
            const result = piece?.generateAllMoves(true, CHESS);
            expect(result).toStrictEqual(expected_moves);
        });

        test("Check movement generation for Bishop with in touch with enemy piece", () => {

            const expected_moves = [
                [5, 4],
                [3, 2],
                [2, 1],
                [1, 0],
                [5, 2],
                [6, 1],
                [7, 0],
                [3, 4],
                [2, 5],
                [1, 6],
                [0, 7],
            ];

            document.body.innerHTML = html_state;

            const CHESS = new Chess();
            CHESS.createBoard();
            CHESS.generateBoardSetUp("8\\8\\8\\4B3\\5r3\\8\\8\\8\\", true);

            const leftboard = CHESS.getBoard(true);

            for (let i = 0; i < 8; i++) {
                for (let j = 0; j < 8; j++) {
                    CHESS.createPiece(leftboard[j][i], [i,j], true);
                }
            }

            const piece = CHESS.getPieceFromPos([4,3], true);
            const result = piece?.generateAllMoves(true, CHESS);
            expect(result).toStrictEqual(expected_moves);
        });

        test("Check movement generation for Bishop with ally piece in touch", () => {

            const expected_moves = [
                [3, 1],
                [2, 0],
                [5, 1],
                [6, 0],
                [3, 3],
                [2, 4],
                [1, 5],
                [0, 6]
            ];

            document.body.innerHTML = html_state;

            const CHESS = new Chess();
            CHESS.createBoard();
            CHESS.generateBoardSetUp("8\\8\\4B3\\5R3\\8\\8\\8\\8\\", true);

            const leftboard = CHESS.getBoard(true);

            for (let i = 0; i < 8; i++) {
                for (let j = 0; j < 8; j++) {
                    CHESS.createPiece(leftboard[j][i], [i,j], true);
                }
            }

            const piece = CHESS.getPieceFromPos([4,2], true);
            const result = piece?.generateAllMoves(true, CHESS);
            expect(result).toStrictEqual(expected_moves);
        });
    });
});
