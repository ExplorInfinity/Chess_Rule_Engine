import { Piece } from "./piece.js";
const QueenMoves = [
    { vec: { dx: 0, dy: 1 }, isSliding: true, canAttack: true },
    { vec: { dx: 0, dy: -1 }, isSliding: true, canAttack: true },
    { vec: { dx: 1, dy: 0 }, isSliding: true, canAttack: true },
    { vec: { dx: -1, dy: 0 }, isSliding: true, canAttack: true },
    { vec: { dx: 1, dy: 1 }, isSliding: true, canAttack: true },
    { vec: { dx: -1, dy: 1 }, isSliding: true, canAttack: true },
    { vec: { dx: -1, dy: -1 }, isSliding: true, canAttack: true },
    { vec: { dx: 1, dy: -1 }, isSliding: true, canAttack: true }
];
class Queen extends Piece {
    static moves = QueenMoves;
    constructor(color) {
        super(color, "queen");
    }
    getMoves() {
        return Queen.moves;
    }
}
export { Queen };
