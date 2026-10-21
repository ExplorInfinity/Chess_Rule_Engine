import type {PieceLayoutCode, PieceLike} from "./piece.js";
import type {MoveChange, PromotionChange, CaptureChange, BoardChange, MoveRecord} from "./move.js";
type BoardStringLayout = Array<Array<PieceLayoutCode | null>>;

type PiecePositionMap = Array<Array<PieceLike | null>>;

export type { PiecePositionMap, BoardStringLayout, MoveChange, PromotionChange, CaptureChange, BoardChange, MoveRecord };
