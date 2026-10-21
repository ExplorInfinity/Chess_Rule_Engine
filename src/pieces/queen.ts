import {Piece} from "./piece.js";
import type {Move} from "../types/index.js";
import type {PieceColor} from "../types/piece.js";

const QueenMoves: Move[] = [
    { vec: { dx:  0, dy:  1 }, isSliding: true, canAttack: true },
    { vec: { dx:  0, dy: -1 }, isSliding: true, canAttack: true },
    { vec: { dx:  1, dy:  0 }, isSliding: true, canAttack: true },
    { vec: { dx: -1, dy:  0 }, isSliding: true, canAttack: true },
    { vec: { dx:  1, dy:  1 }, isSliding: true, canAttack: true },
    { vec: { dx: -1, dy:  1 }, isSliding: true, canAttack: true },
    { vec: { dx: -1, dy: -1 }, isSliding: true, canAttack: true },
    { vec: { dx:  1, dy: -1 }, isSliding: true, canAttack: true }
];

class Queen extends Piece
{
    static readonly moves = QueenMoves;

    constructor(color: PieceColor)
    {
        super(color, "queen");
    }

    public getMoves(): readonly Move[]
    {
        return Queen.moves;
    }
}

export { Queen };