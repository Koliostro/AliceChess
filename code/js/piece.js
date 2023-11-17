var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import { ArrayBoards } from "./main.js";
import { Cell, Board } from './field.js';
var Piece = /** @class */ (function () {
    function Piece(id, position) {
        this.id = id;
        this.position = position;
        this.isBlack = id.charAt(0) === 'b' ? true : false;
    }
    Piece.lightEatableCells = function (e) {
        // Piece can eat piece only on same board and if this cell on second board is possibly to move
    };
    Piece.move = function (e) {
        // on which HTML element user click
        var target = e.target;
        var oppositeSide = target.id.charAt(4) === 'L' ? 'R' : 'L';
        // make an array of 2 coordinates for position of click
        var clickPosition = [Number(target.id.charAt(0)), Number(target.id.charAt(2))];
        // Get opposite cell from clicked
        var oppositCell = document.getElementById("".concat(clickPosition[0], ",").concat(clickPosition[1], ",").concat(oppositeSide));
        // Importing HTML element of starting cell
        var startCell = document.querySelector(".selectedCell");
        // Calculate start position
        var startPosition = [Number(startCell.id.charAt(0)), Number(startCell.id.charAt(2))];
        // Take HTML element of piece from starting cell
        var movedPiece = startCell === null || startCell === void 0 ? void 0 : startCell.firstChild;
        // get starting cell
        var startSide = startCell === null || startCell === void 0 ? void 0 : startCell.id.charAt(4);
        if (startSide === 'L') {
            // Save piece`s class in variable  
            var piece = ArrayBoards.L[startPosition[1]][startPosition[0]];
            // Add selected piece to selected cell as child element
            oppositCell === null || oppositCell === void 0 ? void 0 : oppositCell.append(movedPiece);
            // Move piece in array to selected cell
            ArrayBoards.R[clickPosition[1]][clickPosition[0]] = piece;
            // Clear starting squere
            ArrayBoards.L[startPosition[1]][startPosition[0]] = [];
            // Change coordinates for class
            piece[0].position = clickPosition;
            piece[0].isLeft = false;
            // special flag for casteling realization
            if ((piece[0].id.charAt(2) === 'k') || piece[0].id.charAt(2) === 'r') {
                piece[0].isMoved = true;
            }
            if (piece[0].id.charAt(2) === 'q') {
                piece[0].bishop.isLeft = false;
                piece[0].rock.isLeft = false;
            }
            Board.Clear();
        }
        else {
            // Save piece`s class in variable  
            var piece = ArrayBoards.R[startPosition[1]][startPosition[0]];
            // Add selected piece to selected cell as child element
            oppositCell === null || oppositCell === void 0 ? void 0 : oppositCell.append(movedPiece);
            // Move piece in array to selected cell
            ArrayBoards.L[clickPosition[1]][clickPosition[0]] = piece;
            // Clear starting squere
            ArrayBoards.R[startPosition[1]][startPosition[0]] = [];
            // Change coordinates for class
            piece[0].position = clickPosition;
            piece[0].isLeft = true;
            // special flag for casteling realization
            if ((piece[0].id.charAt(2) === 'k') || piece[0].id.charAt(2) === 'r') {
                piece[0].isMoved = true;
            }
            if (piece[0].id.charAt(2) === 'q') {
                piece[0].bishop.isLeft = true;
                piece[0].rock.isLeft = true;
            }
            Board.Clear();
        }
    };
    Piece.prototype.createPiece = function (pieceName, isLeft) {
        var side = isLeft === true ? 'L' : 'R';
        var placment = document.getElementById("".concat(this.position[0], ",").concat(this.position[1], ",").concat(side));
        var piece = document.createElement('div');
        piece.className = "piece ".concat(pieceName);
        piece.id = this.id;
        piece.addEventListener('click', this.movementOfPieces);
        placment === null || placment === void 0 ? void 0 : placment.append(piece);
    };
    Piece.prototype.movementOfPieces = function (event) {
        var _a, _b, _c, _d, _e;
        var positionStart = [Number((_a = event.target.parentElement) === null || _a === void 0 ? void 0 : _a.id.charAt(2)), Number((_b = event.target.parentElement) === null || _b === void 0 ? void 0 : _b.id.charAt(0))];
        var side = (_c = event.target.parentElement) === null || _c === void 0 ? void 0 : _c.id.charAt(4);
        Board.Clear();
        if (side === 'L') {
            var selected = ArrayBoards.L[positionStart[0]][positionStart[1]];
            if (!((_d = event.target.parentElement) === null || _d === void 0 ? void 0 : _d.classList.contains("selectedCell"))) {
                selected[0].lightAllPossibleMove();
            }
            else {
                Board.Clear();
            }
        }
        else if (side === 'R') {
            var selected = ArrayBoards.R[positionStart[0]][positionStart[1]];
            if (!((_e = event.target.parentElement) === null || _e === void 0 ? void 0 : _e.classList.contains("selectedCell"))) {
                selected[0].lightAllPossibleMove();
            }
            else {
                Board.Clear();
            }
        }
    };
    return Piece;
}());
export { Piece };
var King = /** @class */ (function (_super) {
    __extends(King, _super);
    function King(id, position, isLeft, isMoved) {
        var _this = _super.call(this, id, position) || this;
        _this.isLeft = isLeft;
        _this.isMoved = isMoved;
        return _this;
    }
    King.prototype.create = function () {
        var color = this.id.charAt(0) === 'b' ? 'black' : 'white';
        _super.prototype.createPiece.call(this, "".concat(color, "_king"), this.isLeft);
    };
    King.prototype.isVailedMove = function (positionStart, positionEnd) {
        if ((Math.abs(positionEnd[0] - positionStart[0]) <= 1 && (Math.abs(positionStart[1] - positionEnd[1]) <= 1))) {
            return true;
        }
        return false;
    };
    King.prototype.lightAllPossibleMove = function () {
        for (var i = 0; i < 8; i++) {
            for (var j = 0; j < 8; j++) {
                if ((ArrayBoards.L[j][i].length === 0) && (ArrayBoards.R[j][i].length === 0)) {
                    if (this.isVailedMove(this.position, [i, j])) {
                        if (i !== this.position[0] || j !== this.position[1]) {
                            Cell.lightMovableCell([i, j], this.isLeft);
                        }
                        Cell.lightStartCell(this.position, this.isLeft);
                    }
                }
            }
        }
    };
    return King;
}(Piece));
export { King };
var Bishop = /** @class */ (function (_super) {
    __extends(Bishop, _super);
    function Bishop(id, position, isLeft) {
        var _this = _super.call(this, id, position) || this;
        _this.isLeft = isLeft;
        return _this;
    }
    Bishop.prototype.create = function () {
        var color = this.id.charAt(0) === 'b' ? 'black' : 'white';
        _super.prototype.createPiece.call(this, "".concat(color, "_bishop"), this.isLeft);
    };
    Bishop.prototype.isVailedMove = function (positionStart, positionEnd) {
        if (Math.abs(positionStart[0] - positionEnd[0]) !== Math.abs(positionStart[1] - positionEnd[1])) {
            return false;
        }
        var xOffset = positionEnd[0] > positionStart[0] ? 1 : -1;
        var yOffset = positionEnd[1] > positionStart[1] ? 1 : -1;
        var xPos = positionStart[0] + xOffset;
        var yPos = positionStart[1] + yOffset;
        while (xPos !== positionEnd[0] && yPos !== positionEnd[1]) {
            if (this.isLeft === true) {
                if (ArrayBoards.L[yPos][xPos].length !== 0) {
                    return false;
                }
            }
            if (this.isLeft === false) {
                if (ArrayBoards.R[yPos][xPos].length !== 0) {
                    return false;
                }
            }
            xPos += xOffset;
            yPos += yOffset;
        }
        return true;
    };
    Bishop.prototype.lightAllPossibleMove = function () {
        for (var i = 0; i < 8; i++) {
            for (var j = 0; j < 8; j++) {
                if ((ArrayBoards.L[j][i].length === 0) && (ArrayBoards.R[j][i].length === 0)) {
                    if (this.isVailedMove(this.position, [i, j])) {
                        if (i !== this.position[0] || j !== this.position[1]) {
                            Cell.lightMovableCell([i, j], this.isLeft);
                        }
                        Cell.lightStartCell(this.position, this.isLeft);
                    }
                }
            }
        }
    };
    return Bishop;
}(Piece));
export { Bishop };
var Rock = /** @class */ (function (_super) {
    __extends(Rock, _super);
    function Rock(id, position, isLeft, isMoved) {
        var _this = _super.call(this, id, position) || this;
        _this.isLeft = isLeft;
        _this.isMoved = isMoved;
        return _this;
    }
    Rock.prototype.create = function () {
        var color = this.id.charAt(0) === 'b' ? 'black' : 'white';
        _super.prototype.createPiece.call(this, "".concat(color, "_rock"), this.isLeft);
    };
    Rock.prototype.isVailedMove = function (positionStart, positionEnd) {
        if (positionStart[0] !== positionEnd[0] && positionStart[1] !== positionEnd[1]) {
            return false;
        }
        if (this.isLeft === true) {
            if (positionStart[0] === positionEnd[0]) {
                var yOffset = positionEnd[1] > positionStart[1] ? 1 : -1;
                var yPos = positionStart[1] + yOffset;
                while (yPos !== positionEnd[1]) {
                    if (ArrayBoards.L[yPos][positionStart[0]].length !== 0) {
                        return false;
                    }
                    yPos += yOffset;
                }
            }
            if (positionStart[1] === positionEnd[1]) {
                var xOffset = positionEnd[0] > positionStart[0] ? 1 : -1;
                var xPos = positionStart[0] + xOffset;
                while (xPos !== positionEnd[0]) {
                    if (ArrayBoards.L[positionStart[1]][xPos].length !== 0) {
                        return false;
                    }
                    xPos += xOffset;
                }
            }
        }
        if (this.isLeft === false) {
            if (positionStart[0] === positionEnd[0]) {
                var yOffset = positionEnd[1] > positionStart[1] ? 1 : -1;
                var yPos = positionStart[1] + yOffset;
                while (yPos !== positionEnd[1]) {
                    if (ArrayBoards.R[yPos][positionStart[0]].length !== 0) {
                        return false;
                    }
                    yPos += yOffset;
                }
            }
            if (positionStart[1] === positionEnd[1]) {
                var xOffset = positionEnd[0] > positionStart[0] ? 1 : -1;
                var xPos = positionStart[0] + xOffset;
                while (xPos !== positionEnd[0]) {
                    if (ArrayBoards.R[positionStart[1]][xPos].length !== 0) {
                        return false;
                    }
                    xPos += xOffset;
                }
            }
        }
        return true;
    };
    Rock.prototype.lightAllPossibleMove = function () {
        for (var i = 0; i < 8; i++) {
            for (var j = 0; j < 8; j++) {
                if ((ArrayBoards.L[j][i].length === 0) && (ArrayBoards.R[j][i].length === 0)) {
                    if (this.isVailedMove(this.position, [i, j])) {
                        if (i !== this.position[0] || j !== this.position[1]) {
                            Cell.lightMovableCell([i, j], this.isLeft);
                        }
                        Cell.lightStartCell(this.position, this.isLeft);
                    }
                }
            }
        }
    };
    return Rock;
}(Piece));
export { Rock };
var Queen = /** @class */ (function (_super) {
    __extends(Queen, _super);
    function Queen(id, position, isLeft) {
        var _this = _super.call(this, id, position) || this;
        _this.isLeft = isLeft;
        _this.bishop = new Bishop(id, position, isLeft);
        _this.rock = new Rock(id, position, isLeft, true);
        return _this;
    }
    Queen.prototype.create = function () {
        var color = this.id.charAt(0) === 'b' ? 'black' : 'white';
        _super.prototype.createPiece.call(this, "".concat(color, "_queen"), this.isLeft);
    };
    Queen.prototype.isVailedMove = function (positionStart, positionEnd) {
        if (this.bishop.isVailedMove(positionStart, positionEnd) || (this.rock.isVailedMove(positionStart, positionEnd))) {
            return true;
        }
        return false;
    };
    Queen.prototype.lightAllPossibleMove = function () {
        for (var i = 0; i < 8; i++) {
            for (var j = 0; j < 8; j++) {
                if ((ArrayBoards.L[j][i].length === 0) && (ArrayBoards.R[j][i].length === 0)) {
                    if (this.isVailedMove(this.position, [i, j])) {
                        if (i !== this.position[0] || j !== this.position[1]) {
                            Cell.lightMovableCell([i, j], this.isLeft);
                        }
                        Cell.lightStartCell(this.position, this.isLeft);
                    }
                }
            }
        }
    };
    return Queen;
}(Piece));
export { Queen };
var Knight = /** @class */ (function (_super) {
    __extends(Knight, _super);
    function Knight(id, position, isLeft) {
        var _this = _super.call(this, id, position) || this;
        _this.isLeft = isLeft;
        return _this;
    }
    Knight.prototype.create = function () {
        var color = this.id.charAt(0) === 'b' ? 'black' : 'white';
        _super.prototype.createPiece.call(this, "".concat(color, "_knight"), this.isLeft);
    };
    Knight.prototype.isVailedMove = function (positionStart, positionEnd) {
        if ((Math.abs(positionEnd[0] - positionStart[0]) === 1 && Math.abs(positionEnd[1] - positionStart[1]) === 2) || (Math.abs(positionEnd[0] - positionStart[0]) === 2 && Math.abs(positionEnd[1] - positionStart[1]) === 1)) {
            return true;
        }
        return false;
    };
    Knight.prototype.lightAllPossibleMove = function () {
        for (var i = 0; i < 8; i++) {
            for (var j = 0; j < 8; j++) {
                if ((ArrayBoards.L[j][i].length === 0) && (ArrayBoards.R[j][i].length === 0)) {
                    if (this.isVailedMove(this.position, [i, j])) {
                        if (i !== this.position[0] || j !== this.position[1]) {
                            Cell.lightMovableCell([i, j], this.isLeft);
                        }
                        Cell.lightStartCell(this.position, this.isLeft);
                    }
                }
            }
        }
    };
    return Knight;
}(Piece));
export { Knight };
