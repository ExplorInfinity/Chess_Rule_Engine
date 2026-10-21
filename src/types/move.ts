import type {PieceColor, PieceName, PieceNameCode, PieceLike} from "./piece.js";

interface Position {
    x: number;
    y: number;
}

interface MoveBoardContext {
    boardSize: number;
    positionMap: Array<Array<PieceLike | null>>;
    getAtPos(pos: Position): PieceLike | null;
    copyBoard(): MoveBoardContext;
    isInBounds(pos: Position): boolean;
    findPiece(color: PieceColor, name: PieceName): Position | null;
    getAllPieces(): PieceLike[];
}

interface MoveGameContext {
    board: MoveBoardContext;
    lastMoveRecord: MoveRecord | null;
    evaluateAndBacktrack<T>(moveQuery: MoveQuery<LegalPosition>, fn: (game: MoveGameContext) => T): T | null;
}

interface MoveExecutionContext extends MoveGameContext {
    addMove(moveRecord: MoveRecord, moveQuery: MoveQuery<Position>): void;
    addCapture(moveRecord: MoveRecord, from: Position): void;
    addPromotion(moveRecord: MoveRecord, to: Position, promotionColor: PieceColor, promotionName: PieceNameCode | null): void;
}

type MoveConditionFunction = (game: MoveGameContext, pos: Position) => boolean;
type OnMove = (game: MoveExecutionContext, moveQuery: MoveQuery<Position>, moveRecord: MoveRecord) => void;

interface MoveChange {
    type: "move";
    piece: PieceLike;
    from: Position;
    to: Position;
}

interface PromotionChange {
    type: "promotion";
    piece: PieceLike;
    to: Position;
}

interface CaptureChange {
    type: "capture";
    piece: PieceLike;
    from: Position;
}

type BoardChange = MoveChange | PromotionChange | CaptureChange;

interface MoveRecord {
    moves: MoveChange[];
    captures: CaptureChange[];
    promotions: PromotionChange[];
}

interface LegalPosition extends Position {
    onMove?: OnMove;
}

interface MoveVec2 {
    dx: number;
    dy: number;
}

interface MoveQuery<T extends Position> {
    from: T;
    to: T;
    promoteTo?: PieceNameCode;
}

interface Move {
    vec: MoveVec2;
    isSliding: boolean;
    canAttack: boolean;
    condition?: MoveConditionFunction;
    onMove?: OnMove;
}

interface LegalMoveRemark {
    result: "Legal Move";
    executed: true;
}

interface InvalidMoveRemark {
    result: "Invalid Move";
    remark?: string;
    executed: false;
}

interface IllegalMoveRemark {
    result: "Illegal Move";
    remark?: string;
    executed: false;
}

interface InvalidTurnRemark {
    result: "Invalid Turn";
    remark?: `Wait for ${PieceColor}'s turn!`;
    executed: false;
}

type MoveRemark = LegalMoveRemark | InvalidMoveRemark | IllegalMoveRemark | InvalidTurnRemark;

interface ValidMove {
    valid: false;
}

interface InvalidMove {
    valid: true;
    move: LegalPosition;
}

type IsValidMove = ValidMove | InvalidMove;

export type { Position, LegalPosition, MoveVec2, MoveConditionFunction, OnMove, Move, MoveQuery, MoveRecord, MoveChange, PromotionChange, CaptureChange, BoardChange, MoveRemark, ValidMove, InvalidMove, IsValidMove, MoveGameContext, MoveExecutionContext };
