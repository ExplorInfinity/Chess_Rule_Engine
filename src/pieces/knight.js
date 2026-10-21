import { Piece } from "./piece.js";
const KnightMoves = [
    { vec: { dx: 1, dy: 2 }, isSliding: false, canAttack: true },
    { vec: { dx: -1, dy: 2 }, isSliding: false, canAttack: true },
    { vec: { dx: 1, dy: -2 }, isSliding: false, canAttack: true },
    { vec: { dx: -1, dy: -2 }, isSliding: false, canAttack: true },
    { vec: { dx: 2, dy: 1 }, isSliding: false, canAttack: true },
    { vec: { dx: -2, dy: 1 }, isSliding: false, canAttack: true },
    { vec: { dx: 2, dy: -1 }, isSliding: false, canAttack: true },
    { vec: { dx: -2, dy: -1 }, isSliding: false, canAttack: true }
];
class Knight extends Piece {
    static moves = KnightMoves;
    constructor(color) {
        super(color, "knight");
    }
    getMoves() {
        return Knight.moves;
    }
}
export { Knight };
