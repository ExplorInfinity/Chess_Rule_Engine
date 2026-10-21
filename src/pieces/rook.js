import { Piece } from "./piece.js";
const RookMoves = [
    { vec: { dx: 0, dy: 1 }, isSliding: true, canAttack: true },
    { vec: { dx: 0, dy: -1 }, isSliding: true, canAttack: true },
    { vec: { dx: 1, dy: 0 }, isSliding: true, canAttack: true },
    { vec: { dx: -1, dy: 0 }, isSliding: true, canAttack: true }
];
class Rook extends Piece {
    static moves = RookMoves;
    constructor(color) {
        super(color, "rook");
    }
    getMoves() {
        return Rook.moves;
    }
}
export { Rook };
