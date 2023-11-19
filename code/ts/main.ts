import { Board } from "./field.js";
import { Bishop, King, Knight, Pawn, Queen, Rock } from "./piece.js";

const VisualBoard = new Board(true)

VisualBoard.fieldGeneration();  

let BK = new King('b_k_0', [3,4], true, false)
BK.create()

let WB0 = new Bishop('w_b_0', [0,0], true)
WB0.create()

let BR0 = new Rock('b_r_0', [2,3], true, false)
BR0.create()

let BQ = new Queen('b_q_0', [3,1], true)
BQ.create()

let BN0 = new Knight('b_n_0', [1,3], true)
BN0.create()

let BP0 = new Pawn('b_p_0', [1,6], true)
BP0.create()

let WP0 = new Pawn('w_p_0', [1,1], true)
WP0.create()

export let ArrayBoards : any = {
    'L' : [
        [[WB0],[],[],[],[],[],[],[]],
        [[],[WP0],[],[BQ],[],[],[],[]],
        [[],[],[],[],[],[],[],[]],
        [[],[BN0],[BR0],[],[],[],[],[]],
        [[],[],[],[BK],[],[],[],[]],
        [[],[],[],[],[],[],[],[]],
        [[],[BP0],[],[],[],[],[],[]],
        [[],[],[],[],[],[],[],[]]
    ],
    'R' : [
        [[],[],[],[],[],[],[],[]],
        [[],[],[],[],[],[],[],[]],
        [[],[],[],[],[],[],[],[]],
        [[],[],[],[],[],[],[],[]],
        [[],[],[],[],[],[],[],[]],
        [[],[],[],[],[],[],[],[]],
        [[],[],[],[],[],[],[],[]],
        [[],[],[],[],[],[],[],[]]
    ]
}