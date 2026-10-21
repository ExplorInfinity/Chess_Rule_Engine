import type {GameStatus, GameResult} from "../constants/game.js";
import type {CastleType} from "../constants/castleType.js";
import type {PiecePositionMap} from "./board.js";
import type {Position, LegalPosition, MoveQuery, MoveRecord} from "./move.js";
import type {PieceColor, PieceName, PieceLike} from "./piece.js";

interface GameBoardContext {
    readonly boardSize: number;
    readonly positionMap: PiecePositionMap;
    getAtPos(pos: Position): PieceLike | null;
    copyBoard(): GameBoardContext;
    isInBounds(pos: Position): boolean;
    findPiece(color: PieceColor, name: PieceName): Position | null;
    getAllPieces(): PieceLike[];
}

interface GameContext {
    readonly board: GameBoardContext;
    readonly currentTurnColor: PieceColor;
    readonly moveHistory: readonly MoveRecord[];
    readonly lastMoveRecord: Readonly<MoveRecord> | null;
    readonly lastPawnMoveOrCaptureIndex: number;
    readonly specialRights: Readonly<GameSpecialRights>;
    readonly zobristUpdater: {
        checkThreeFoldRepetition(game: GameContext): boolean;
    };
    evaluateAndBacktrack<T>(moveQuery: MoveQuery<LegalPosition>, fn: (game: GameContext) => T): T | null;
    evaluateAt<T>(moveHistoryIndexes: number[], evaluate: (game: GameContext) => T): T[];
    isSamePosition(board: GameBoardContext, turnColor: PieceColor, specialRights: GameSpecialRights): boolean;
    updateSpecialRights(): void;
}

interface GameOutcome {
    status: GameStatus;
    result: GameResult;
}

interface GameSpecialRights {
    castlingRights: Record<CastleType, boolean>;
    enPassantFile: number | null
}

export type { GameOutcome, GameSpecialRights, GameContext, GameBoardContext };
