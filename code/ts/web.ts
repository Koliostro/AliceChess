import { Piece } from "./main.js"
import { Chess } from "./piece.js"

function dec2bin(dec: number): string {
    if (dec >= 0) {
        let bin = dec.toString(2)
        let out = ""
        for (let i = 0; i < 16 - bin.length; i++) {
            out += "0"
        }
        return out + bin
    }
    else {
        let bin = ~dec.toString(2)
        let out = ""
        for (let i = 0; i < 16 - ~dec.toString(2).length; i++) {
            out += "0"
        }
        return out + bin
    }
}

/*

record structure:

xxxyyynnntttstmm

X - bits for x
Y - bits for y
N - bits for number of piece
T - bits for piece type
S - Side of peiece
T - Team of piece
M - Is mate bits

*/

function piecetype(piece: Piece): string {
    switch (piece.id.charAt(2)) {
        case 'p':
            return "0b010"
        case 'r':
            return "0b011"
        case 'n':
            return "0b100"
        case 'b':
            return "0b101"
        case 'q':
            return "0b110"
        case 'k':
            return "0b111"

        default:
            return "0b000"
    }
}

export function encode(encodePiece: Piece): string {
    let out = 0

    out ^= encodePiece.position[0] << 13
    out ^= encodePiece.position[1] << 10
    out ^= Number(piecetype(encodePiece)) << 7
    out ^= Number(encodePiece.id.charAt(4)) << 4
    out ^= encodePiece.isLeft ? 8 : 0
    out ^= encodePiece.isBlack ? 4 : 0
    out ^= Chess.isMate() ? 3 : 0

    return JSON.stringify(dec2bin(out))
}

export type InfoPiece = {
    position: number[],
    type: number,
    num: number,
    isLeft: boolean,
    isBlack: boolean,
    isMate: boolean
}

export function decodePiece(info: string): any {
    const largeMask = 57344
    const smallMakr = 64

    let position = ["", ""]
    let type = ""
    let num = ""
    let isLeft = ""
    let isBlack = ""
    let isMate = ""

    for (let j = 0; j < 3; j++) {
        position[0] += info[j]
    }
    for (let j = 3; j < 6; j++) {
        position[1] += info[j]
    }
    for (let j = 6; j < 9; j++) {
        type += info[j]
    }
    for (let j = 9; j < 12; j++) {
        num += info[j]
    }
    isLeft = info[12]
    isBlack = info[13]

    for (let j = 14; j < 16; j++) {
        isMate += info[j]
    }

    switch (type) {
        case "111":
            type = 'k'
            break;
        case "110":
            type = 'q'
            break;
        case "101":
            type = 'b'
            break;
        case "100":
            type = 'n'
            break;
        case "011":
            type = 'r'
            break;
        case "010":
            type = 'p'
            break;

        default:
            break;
    }

    return [[Number(position[0]), Number(position[1])], type, Number(num), isLeft, isBlack, isMate]
    
}
