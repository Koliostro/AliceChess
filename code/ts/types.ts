/**
 * Enumeration for states of cell
 */

export const enum cellStates {
    idle,
    unberAttack,
    moveble
}

/**
 * Emuneration for determing which piece are presented here. Need to mention
 * that empty cells have type Piece.EMPTY
 */
export const enum Piece {
    EMPTY,
    PAWN,
    ROCK,
    KING,
    KNIGHT,
    BISHOP,
    QUEEN
};

/**
 * Enumeration to determing color of piece. Need to mention that empty cells
 * are described as Color.NONE
 */
export const enum Color {
    BLACK,
    WHITE,
    NONE
}

export interface GamePiece {
    type : Piece,
    color : Color
}

export const ROCK_VECTOR = [
    [ 0, 1],
    [ 1, 0],
    [ 0,-1],
    [-1, 0]
]

export const BISHOP_VECTOR = [
    [ 1, 1],
    [-1,-1],
    [ 1,-1],
    [-1, 1]
]
export const QUEEN_VECTOR = [
    [ 0, 1],
    [ 1, 0],
    [ 0,-1],
    [-1, 0],
    [ 1, 1],
    [-1,-1],
    [ 1,-1],
    [-1, 1]
]
