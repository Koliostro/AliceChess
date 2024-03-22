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

let BB0 = new Bishop('b_b_0', [1,5], true)
BB0.create()

let WB0 = new Bishop('w_b_0', [2,0], false)
WB0.create()

export let ArrayBoards : any = {
    'L' : [
        [[BK],[],[],[],[],[],[],[]],
        [[],[],[],[],[],[],[],[]],
        [[],[],[],[],[],[],[],[]],
        [[],[],[],[],[],[],[],[]],
        [[],[],[],[],[],[],[],[]],
        [[],[BB0],[],[],[],[],[],[]],
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

interface CheckLibrary {
    BKingPos : number[]
    BKingBoard : boolean
    WKingPos : number[]
    WKingBoard : boolean
    AttackingPiecePos : number[] | null
    IsLeftAttackingPieceSide : boolean | null
    IsBlackAttacked : boolean | null
    AttackingPiece : string | null
}

export let CheckSystem : CheckLibrary = {
    BKingPos : BK.position,
    BKingBoard : BK.isLeft,
    WKingPos : WK.position,
    WKingBoard : WK.isLeft,
    AttackingPiecePos : null,
    IsLeftAttackingPieceSide : null,
    IsBlackAttacked : null,
    AttackingPiece : null
}