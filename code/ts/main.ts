import { Chess } from "./chess";
import { Board } from "./field";
import { cellStates } from "./types";

const GAME = new Chess();

// Generate a visual board for game
GAME.createBoard();

GAME.generateBoardSetUp("8\\8\\8\\8\\8\\8\\8\\8\\", true);
const leftboard = GAME.getBoard(true);

GAME.generateBoardSetUp("8\\8\\8\\4P3\\4r3\\8\\8\\8\\", false);
const rightboard = GAME.getBoard(false);

for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
        GAME.createPiece(leftboard[j][i], [i,j], true); 
        GAME.createPiece(rightboard[j][i], [i,j], false); 
    }
}

// Generate notation for current setup
const selectedPiece = GAME.getPieceFromPos([4,3], false);

if (selectedPiece !== null) {
	const side = selectedPiece.getSide();
    const board = GAME.getBoard(side);
	const possibleCells = selectedPiece.generateAllMoves(board)

	if (selectedPiece.getPos() !== undefined) {
		for (let i = 0; i < possibleCells.length; i++) {
			const HTML_cell = Board.getCellbyPosition(possibleCells[i], side)

			if (HTML_cell !== null) {
				Board.lightupCell(HTML_cell, cellStates.moveble)            
			}
		}
	}
}
