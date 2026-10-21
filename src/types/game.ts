import {GameResult} from "../constants/index.js";
import type {GameStatus, CastleType} from "../constants/index.js";

interface GameOutcome {
    status: GameStatus;
    result: GameResult;
}

interface GameSpecialRights {
    castlingRights: Record<CastleType, boolean>;
    enPassantFile: number | null
}

export type { GameOutcome, GameSpecialRights };