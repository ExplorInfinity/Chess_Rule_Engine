type PieceColor = "white" | "black";
type PieceName = "pawn" | "knight" | "bishop" | "rook" | "queen" | "king";

type PieceColorCode = "w" | "b";
type PieceNameCode = "P" | "N" | "B" | "R" | "Q" | "K";
type PieceLayoutCode = `${PieceColorCode}${PieceNameCode}`;

// Structural piece types keep the low-level board/type modules independent
// from the runtime Piece class and its concrete implementations.
interface PieceLike {
    readonly color: PieceColor;
    readonly name: PieceName;
    movesPlayed: number;
    readonly isMoved: boolean;
    getMoves(): readonly PieceMove[];
}

interface PieceMove {
    vec: { dx: number; dy: number };
    isSliding: boolean;
    canAttack: boolean;
    condition?: (...args: any[]) => boolean;
    onMove?: (...args: any[]) => void;
}

export type { PieceColor, PieceName, PieceColorCode, PieceNameCode, PieceLayoutCode, PieceLike, PieceMove };
