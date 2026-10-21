import {Piece} from "./piece.js";
import type {Move} from "../types/move.js";
import type {PieceColor} from "../types/piece.js";

const RookMoves: Move[] = [
    { vec: { dx:  0, dy:  1 }, isSliding: true, canAttack: true },
    { vec: { dx:  0, dy: -1 }, isSliding: true, canAttack: true },
    { vec: { dx:  1, dy:  0 }, isSliding: true, canAttack: true },
    { vec: { dx: -1, dy:  0 }, isSliding: true, canAttack: true }
];

class Rook extends Piece
{
    static readonly moves = RookMoves;

    constructor(color: PieceColor)
    {
        super(color, "rook");
    }

    public getMoves(): readonly Move[]
    {
        return Rook.moves;
    }
}

export { Rook };
