import { Board } from "./field.js";
import { Bishop, King, Knight, Pawn, Queen, Rock} from "./piece.js";
import { decodePiece, encode } from "./web.js";

const VisualBoard = new Board()

VisualBoard.fieldGeneration();  

let BK : Piece = new King('b_k_0', [0,0], true)
BK.create()

let WK : Piece = new King('w_k_0', [7,7], false)
WK.create()

let WR0 : Piece = new Rock('w_r_0', [0,4], true)
WR0.create()

let BB0 : Piece = new Bishop('b_b_0', [0,1], true)
BB0.create()

let WB0 : Piece = new Bishop('w_b_0', [2,0], false)
WB0.create()

export let ArrayBoards : GameArray = {
    'L' : [
        [[BK],[],[],[],[],[],[],[]],
        [[BB0],[],[],[],[],[],[],[]],
        [[],[],[],[],[],[],[],[]],
        [[],[],[],[],[],[],[],[]],
        [[WR0],[],[],[],[],[],[],[]],
        [[],[],[],[],[],[],[],[]],
        [[],[],[],[],[],[],[],[]],
        [[],[],[],[],[],[],[],[]]
    ],
    'R' : [
        [[],[],[WB0],[],[],[],[],[]],
        [[],[],[],[],[],[],[],[]],
        [[],[],[],[],[],[],[],[]],
        [[],[],[],[],[],[],[],[]],
        [[],[],[],[],[],[],[],[]],
        [[],[],[],[],[],[],[],[]],
        [[],[],[],[],[],[],[],[]],
        [[],[],[],[],[],[],[],[WK]]
    ]
}


export type picePos = {
    pos : number[];
    side : boolean;
}

export type Piece = (Pawn | Rock | Bishop | Knight | King | Queen )

interface GameArray {
    'L' : Piece[][][]
    'R' : Piece[][][]
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
