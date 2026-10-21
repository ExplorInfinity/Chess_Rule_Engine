import type {PieceLayoutCode} from "./piece.js";
import type {Position} from "./move.js";
import type {SoftFixedArrayGrid} from "./util.js";
import {BOARD_SIZE} from "../game.js";
import {Piece} from "../pieces/index.js";

type BoardStringLayout = SoftFixedArrayGrid<(PieceLayoutCode | null), typeof BOARD_SIZE>;

type PiecePositionMap = SoftFixedArrayGrid<(Piece | null), typeof BOARD_SIZE>;

interface MoveChange {
    type: "move";
    piece: Piece;
    from: Position;
    to: Position;
}

interface PromotionChange {
    type: "promotion";
    piece: Piece;
    to: Position;
}

interface CaptureChange {
    type: "capture";
    piece: Piece;
    from: Position;
}

type BoardChange = MoveChange | PromotionChange | CaptureChange;

export type { PiecePositionMap, BoardStringLayout, MoveChange, PromotionChange, CaptureChange, BoardChange };