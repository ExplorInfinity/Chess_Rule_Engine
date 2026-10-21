import { Piece } from "./piece.js";
import { ChessRuleSet } from "../chessRuleSet.js";
import { checkPieceName } from "../utils/piece.js";
const ShortCastleCondition = (game, pos) => {
    const { board } = game;
    const king = board.getAtPos(pos);
    const rook = board.positionMap[pos.y][board.boardSize - 1];
    if (!checkPieceName(king, "king") || king.isMoved ||
        !checkPieceName(rook, "rook") || rook.isMoved ||
        rook.color !== king.color ||
        ChessRuleSet.isKingInCheck(game, king.color) ||
        !ChessRuleSet.canSeeEachOther(game, pos, { x: board.boardSize - 1, y: pos.y })) {
        return false;
    }
    for (let dx = 1; dx <= 2; ++dx) {
        const isKingInCheck = game.evaluateAndBacktrack({ from: pos, to: { x: pos.x + dx, y: pos.y } }, (game) => ChessRuleSet.isKingInCheck(game, king.color));
        if (isKingInCheck)
            return false;
    }
    return true;
};
const LongCastleCondition = (game, pos) => {
    const { board } = game;
    const king = board.getAtPos(pos);
    const rook = board.positionMap[pos.y][0];
    if (!checkPieceName(king, "king") || king.isMoved ||
        !checkPieceName(rook, "rook") || rook.isMoved ||
        rook.color !== king.color ||
        ChessRuleSet.isKingInCheck(game, king.color) ||
        !ChessRuleSet.canSeeEachOther(game, pos, { x: board.boardSize - 1, y: pos.y })) {
        return false;
    }
    for (let dx = -1; dx >= -2; --dx) {
        const isKingInCheck = game.evaluateAndBacktrack({ from: pos, to: { x: pos.x + dx, y: pos.y } }, (game) => ChessRuleSet.isKingInCheck(game, king.color));
        if (isKingInCheck)
            return false;
    }
    return true;
};
const OnShortCastle = (game, moveQuery, moveRecord) => {
    const { from: startKingPos, to: endKingPos } = moveQuery;
    game.addMove(moveRecord, {
        from: { x: game.board.boardSize - 1, y: startKingPos.y },
        to: { x: endKingPos.x - 1, y: endKingPos.y }
    });
};
const OnLongCastle = (game, moveQuery, moveRecord) => {
    const { from: startKingPos, to: endKingPos } = moveQuery;
    game.addMove(moveRecord, {
        from: { x: 0, y: startKingPos.y },
        to: { x: endKingPos.x + 1, y: endKingPos.y }
    });
};
const KingMoves = [
    { vec: { dx: 0, dy: 1 }, isSliding: false, canAttack: true },
    { vec: { dx: 0, dy: -1 }, isSliding: false, canAttack: true },
    { vec: { dx: 1, dy: 0 }, isSliding: false, canAttack: true },
    { vec: { dx: -1, dy: 0 }, isSliding: false, canAttack: true },
    { vec: { dx: 1, dy: 1 }, isSliding: false, canAttack: true },
    { vec: { dx: -1, dy: 1 }, isSliding: false, canAttack: true },
    { vec: { dx: -1, dy: -1 }, isSliding: false, canAttack: true },
    { vec: { dx: 1, dy: -1 }, isSliding: false, canAttack: true },
    { vec: { dx: 2, dy: 0 }, isSliding: false, canAttack: false, condition: ShortCastleCondition, onMove: OnShortCastle }, // Short Castle
    { vec: { dx: -2, dy: 0 }, isSliding: false, canAttack: false, condition: LongCastleCondition, onMove: OnLongCastle }, // Long Castle
];
class King extends Piece {
    static moves = KingMoves;
    constructor(color) {
        super(color, "king");
    }
    getMoves() {
        return King.moves;
    }
    static canCastle(king, rook) {
        return (!king.isMoved && !rook.isMoved && king.color === rook.color);
    }
    static canShortCastle(game, pos) {
        const { board } = game;
        const king = board.getAtPos(pos);
        const rook = board.positionMap[pos.y][board.boardSize - 1];
        return (checkPieceName(king, "king") && checkPieceName(rook, "rook") && King.canCastle(king, rook));
    }
    static canLongCastle(game, pos) {
        const { board } = game;
        const king = board.getAtPos(pos);
        const rook = board.positionMap[pos.y][0];
        return (checkPieceName(king, "king") && checkPieceName(rook, "rook") && King.canCastle(king, rook));
    }
}
export { King };
