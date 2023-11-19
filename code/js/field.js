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
import { Piece } from './piece.js';
var leftBoardHTML = document.querySelector(".leftBoard");
var rightBoardHTML = document.querySelector(".rightBoard");
var Board = /** @class */ (function () {
    function Board(isLeft) {
        this.isLeft = isLeft;
    }
    Board.prototype.fieldGeneration = function () {
        var WhiteCell = new Cell(true, false);
        var BlackCell = new Cell(true, true);
        var WhiteCellRight = new Cell(false, false);
        var BlackCellRight = new Cell(false, true);
        for (var i = 0; i < 8; i++) {
            for (var j = 0; j < 8; j++) {
                if (i % 2 === 0) {
                    if (j % 2 === 0) {
                        leftBoardHTML === null || leftBoardHTML === void 0 ? void 0 : leftBoardHTML.append(WhiteCell.createCell(j, i));
                        rightBoardHTML === null || rightBoardHTML === void 0 ? void 0 : rightBoardHTML.append(WhiteCellRight.createCell(j, i));
                    }
                    else {
                        leftBoardHTML === null || leftBoardHTML === void 0 ? void 0 : leftBoardHTML.append(BlackCell.createCell(j, i));
                        rightBoardHTML === null || rightBoardHTML === void 0 ? void 0 : rightBoardHTML.append(BlackCellRight.createCell(j, i));
                    }
                }
                else {
                    if (j % 2 !== 0) {
                        leftBoardHTML === null || leftBoardHTML === void 0 ? void 0 : leftBoardHTML.append(WhiteCell.createCell(j, i));
                        rightBoardHTML === null || rightBoardHTML === void 0 ? void 0 : rightBoardHTML.append(WhiteCellRight.createCell(j, i));
                    }
                    else {
                        leftBoardHTML === null || leftBoardHTML === void 0 ? void 0 : leftBoardHTML.append(BlackCell.createCell(j, i));
                        rightBoardHTML === null || rightBoardHTML === void 0 ? void 0 : rightBoardHTML.append(BlackCellRight.createCell(j, i));
                    }
                }
            }
        }
    };
    Board.Clear = function () {
        var allLightedCells = document.querySelectorAll(".lighttedCell");
        var SelectedCell = document.querySelectorAll(".selectedCell");
        allLightedCells.forEach(function (cell) { return cell.classList.remove("lighttedCell", "lighttedCell_eat"); });
        allLightedCells.forEach(function (cell) { return cell.removeEventListener('click', Piece.move); });
        SelectedCell === null || SelectedCell === void 0 ? void 0 : SelectedCell.forEach(function (cell) { return cell.classList.remove("selectedCell"); });
    };
    return Board;
}());
export { Board };
var Cell = /** @class */ (function (_super) {
    __extends(Cell, _super);
    function Cell(isLeft, isBlack) {
        var _this = _super.call(this, isLeft) || this;
        _this.isBlack = isBlack;
        return _this;
    }
    Cell.prototype.createCell = function (x, y) {
        var side = this.isLeft === true ? 'L' : 'R';
        var color = this.isBlack === true ? 'cellBlack' : 'cellWhite';
        var div = document.createElement('div');
        div.className = "cell ".concat(color);
        div.id = "".concat(x, ",").concat(y, ",").concat(side);
        return div;
    };
    Cell.lightMovableCell = function (position, isLeft) {
        var side = isLeft === true ? 'L' : 'R';
        var selectedCell = document.getElementById("".concat(position[0], ",").concat(position[1], ",").concat(side));
        selectedCell === null || selectedCell === void 0 ? void 0 : selectedCell.classList.add("lighttedCell");
        selectedCell === null || selectedCell === void 0 ? void 0 : selectedCell.addEventListener('click', Piece.move);
    };
    Cell.lightStartCell = function (position, isLeft) {
        var side = isLeft === true ? 'L' : 'R';
        var selectedCell = document.getElementById("".concat(position[0], ",").concat(position[1], ",").concat(side));
        selectedCell === null || selectedCell === void 0 ? void 0 : selectedCell.classList.add("selectedCell");
    };
    Cell.lightEatableCell = function (position, isLeft) {
        var side = isLeft === true ? 'L' : 'R';
        var selectedCell = document.getElementById("".concat(position[0], ",").concat(position[1], ",").concat(side));
        selectedCell === null || selectedCell === void 0 ? void 0 : selectedCell.classList.add("lighttedCell", "lighttedCell_eat");
        selectedCell === null || selectedCell === void 0 ? void 0 : selectedCell.addEventListener('click', Piece.move);
    };
    return Cell;
}(Board));
export { Cell };
