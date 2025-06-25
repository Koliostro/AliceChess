export const enum Piece {
    EMPTY,
    PAWN,
    ROCK,
    KING,
    KNIGHT,
    BISHOP,
    QUEEN
};

export const enum Color {
    BLACK,
    WHITE,
    NONE
}

export interface GamePiece {
    type : Piece,
    color : Color
}
