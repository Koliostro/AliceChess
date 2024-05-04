import { Piece } from "./piece.js"

export function isValiedPlace(e:MouseEvent) {
    let elem = document.elementFromPoint(e.x, e.y)

    if (elem === null) {
        return
    }

    if (elem.classList.contains(`lighttedCell`)) {
        // if (e.type === 'dragover') {
            Piece.movment(e as Event)
        // }
    }
}