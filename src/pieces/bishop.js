import { Piece } from "./piece.js";
const BishopMoves = [
    { vec: { dx: 1, dy: 1 }, isSliding: true, canAttack: true },
    { vec: { dx: -1, dy: 1 }, isSliding: true, canAttack: true },
    { vec: { dx: -1, dy: -1 }, isSliding: true, canAttack: true },
    { vec: { dx: 1, dy: -1 }, isSliding: true, canAttack: true }
];
class Bishop extends Piece {
    static moves = BishopMoves;
    constructor(color) {
        super(color, "bishop");
    }
    getMoves() {
        return Bishop.moves;
    }
}
export { Bishop };
