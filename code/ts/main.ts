import { Board, Cell } from "./field.js";
import { Bishop, King, Knight, Pawn, Queen, Rock} from "./piece.js";

const VisualBoard = new Board()

VisualBoard.fieldGeneration();  

let BK = new King('b_k', [0,0], true)
BK.create()

let WK = new King('w_k', [7,7], false)
WK.create()

let WR0 = new Rock('w_r_0', [0,4], false)
WR0.create()

let BB0 = new Bishop('b_b_0', [1,1], true)
BB0.create()

let WB0 = new Bishop('w_b_0', [2,0], false)
WB0.create()

export let ArrayBoards : any = {
    'L' : [
        [[BK],[],[],[],[],[],[],[]],
        [[],[BB0],[],[],[],[],[],[]],
        [[],[],[],[],[],[],[],[]],
        [[],[],[],[],[],[],[],[]],
        [[],[],[],[],[],[],[],[]],
        [[],[],[],[],[],[],[],[]],
        [[],[],[],[],[],[],[],[]],
        [[],[],[],[],[],[],[],[]]
    ],
    'R' : [
        [[],[],[WB0],[],[],[],[],[]],
        [[],[],[],[],[],[],[],[]],
        [[],[],[],[],[],[],[],[]],
        [[],[],[],[],[],[],[],[]],
        [[WR0],[],[],[],[],[],[],[]],
        [[],[],[],[],[],[],[],[]],
        [[],[],[],[],[],[],[],[]],
        [[],[],[],[],[],[],[],[WK]]
    ]
}

console.log(ArrayBoards)

export type picePos = {
    pos : number[];
    side : boolean;
}

interface CheckLibrary {
    BKingPos : picePos
    WKingPos : picePos
    AttackingPiecePos : picePos | null
    AttackingPiece : string | null
    IsBlackAttacked : boolean | null
}

export let CheckSystem : CheckLibrary = {
    BKingPos : {pos:BK.position, side:BK.isLeft}, 
    WKingPos : {pos:WK.position, side:WK.isLeft},
    AttackingPiecePos : null,
    AttackingPiece : null,
    IsBlackAttacked : null,
}