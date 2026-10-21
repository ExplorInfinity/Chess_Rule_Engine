import type {PieceColor, PieceName, PieceLike} from "../types/piece.js";

function checkPieceColorAndName(piece: PieceLike | null, color: PieceColor, name: PieceName): boolean
{
    return (piece !== null && piece.color === color && piece.name === name);
}

function checkPieceName<T extends PieceName>(piece: PieceLike | null, name: T): piece is PieceLike & { name: T }
{
    return (piece !== null && piece.name === name);
}

export { checkPieceColorAndName, checkPieceName };
