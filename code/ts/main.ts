import { Chess } from "./chess";
import {WEB, WAITING} from "./web";

const GAME = new Chess();

let MPHandler = new WEB(GAME)

// Generate a visual board for game
GAME.createBoard();

console.log("FIRST :", WAITING);

// TODO: Make lock presistent white between refresh.
