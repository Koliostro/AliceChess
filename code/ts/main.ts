import { Board, Cell } from "./field.js";
import { Bishop, King, Knight, Pawn, Queen, Rock } from "./piece.js";

const VisualBoard = new Board(true)

VisualBoard.fieldGeneration();  

let BK = new King('b_k_0', [3,0], false, false)
BK.create()

let BQ = new Queen('b_q_0', [3,1], true)
BQ.create()

let BN0 = new Knight('b_n_0', [1,3], true)
BN0.create()

let WP0 = new Pawn('w_p_0', [1,6], true)
WP0.create()

let BR0 = new Rock('b_r_0', [0,0], false, false)
BR0.create()

let BR1 = new Rock('b_r_1', [7,0], false, false)
BR1.create()

let BB0 = new Bishop('b_b_0', [0,6], false)
BB0.create()

let WR0 = new Rock('w_r_0', [2,3], false, false)
WR0.create()

export let ArrayBoards : any = {
    'L' : [
        [[],[],[],[],[],[],[],[]],
        [[],[],[],[BQ],[],[],[],[]],
        [[],[],[],[],[],[],[],[]],
        [[],[BN0],[],[],[],[],[],[]],
        [[],[],[],[],[],[],[],[]],
        [[],[],[],[],[],[],[],[]],
        [[],[WP0],[],[],[],[],[],[]],
        [[],[],[],[],[],[],[],[]]
    ],
    'R' : [
        [[BR0],[],[],[BK],[],[],[],[BR1]],
        [[],[],[],[],[],[],[],[]],
        [[],[],[],[],[],[],[],[]],
        [[],[],[WR0],[],[],[],[],[]],
        [[],[],[],[],[],[],[],[]],
        [[],[],[],[],[],[],[],[]],
        [[BB0],[],[],[],[],[],[],[]],
        [[],[],[],[],[],[],[],[]]
    ]
}