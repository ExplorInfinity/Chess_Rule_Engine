import { King, Pawn } from "../pieces/index.js";
import { BOARD_SIZE, CastleType } from "../constants/index.js";
import { PieceType } from "../constants/piece.js";
import { SplitMix64 } from "../utils/splitMix64.js";
class Zobrist {
    static rng = new SplitMix64(0x123456789abcdef0n);
    static _pieceSquareHashMap;
    static _sideToMove;
    static _castlingRights;
    static _enPassantFile;
    static initializeValues() {
        Zobrist._pieceSquareHashMap = Array.from({ length: 12 }, () => Array.from({ length: BOARD_SIZE }, () => Array.from({ length: BOARD_SIZE }, () => Zobrist.rng.next())));
        Zobrist._sideToMove = { white: Zobrist.rng.next(), black: Zobrist.rng.next() };
        Zobrist._castlingRights = {
            [CastleType.WHITE_SHORT_CASTLE]: Zobrist.rng.next(),
            [CastleType.WHITE_LONG_CASTLE]: Zobrist.rng.next(),
            [CastleType.BLACK_SHORT_CASTLE]: Zobrist.rng.next(),
            [CastleType.BLACK_LONG_CASTLE]: Zobrist.rng.next()
        };
        Zobrist._enPassantFile = Array.from({ length: BOARD_SIZE }, () => Zobrist.rng.next());
    }
    static getPieceIndex(piece) {
        return (piece.color === "black" ? 6 : 0) + PieceType[piece.name];
    }
    static getBoardHash(game) {
        let hash = Zobrist._sideToMove[game.currentTurnColor];
        const { boardSize, positionMap } = game.board;
        for (let y = 0; y < boardSize; ++y) {
            for (let x = 0; x < boardSize; ++x) {
                const piece = positionMap[y][x];
                if (!piece)
                    continue;
                hash ^= Zobrist._pieceSquareHashMap[Zobrist.getPieceIndex(piece)][y][x];
                if (piece.name === "king") {
                    if (piece.color === "white" && King.canShortCastle(game, { x, y }))
                        hash ^= Zobrist._castlingRights[CastleType.WHITE_SHORT_CASTLE];
                    if (piece.color === "white" && King.canLongCastle(game, { x, y }))
                        hash ^= Zobrist._castlingRights[CastleType.WHITE_LONG_CASTLE];
                    if (piece.color === "black" && King.canShortCastle(game, { x, y }))
                        hash ^= Zobrist._castlingRights[CastleType.BLACK_SHORT_CASTLE];
                    if (piece.color === "black" && King.canLongCastle(game, { x, y }))
                        hash ^= Zobrist._castlingRights[CastleType.BLACK_LONG_CASTLE];
                }
                else if (piece.name === "pawn") {
                    if (Pawn.isLeftEnPassantLegal(game, { x, y }))
                        hash ^= Zobrist._enPassantFile[x - 1];
                    if (Pawn.isRightEnPassantLegal(game, { x, y }))
                        hash ^= Zobrist._enPassantFile[x + 1];
                }
            }
        }
        // Adding Special Rights
        hash = Zobrist.toggleSpecialRights(game.specialRights, hash);
        // Setting Color for Side To Move
        hash ^= Zobrist._sideToMove[game.currentTurnColor];
        return hash;
    }
    static togglePieceAtPos(piece, pos, hash) {
        hash ^= Zobrist._pieceSquareHashMap[Zobrist.getPieceIndex(piece)][pos.y][pos.x];
        return hash;
    }
    static toggleEnPassantOnFile(file, hash) {
        hash ^= Zobrist._enPassantFile[file];
        return hash;
    }
    static toggleCastlingRights(castleType, hash) {
        hash ^= Zobrist._castlingRights[castleType];
        return hash;
    }
    static toggleSideToMove(color, hash) {
        hash ^= Zobrist._sideToMove[color];
        return hash;
    }
    static switchSideToMove(hash) {
        hash ^= (Zobrist._sideToMove["white"] ^ Zobrist._sideToMove["black"]);
        return hash;
    }
    static toggleSpecialRights(specialRights, hash) {
        const { castlingRights, enPassantFile } = specialRights;
        // Toggling Castling Rights
        if (castlingRights[CastleType.WHITE_SHORT_CASTLE])
            hash = Zobrist.toggleCastlingRights(CastleType.WHITE_SHORT_CASTLE, hash);
        if (castlingRights[CastleType.WHITE_LONG_CASTLE])
            hash = Zobrist.toggleCastlingRights(CastleType.WHITE_LONG_CASTLE, hash);
        if (castlingRights[CastleType.BLACK_SHORT_CASTLE])
            hash = Zobrist.toggleCastlingRights(CastleType.BLACK_SHORT_CASTLE, hash);
        if (castlingRights[CastleType.BLACK_LONG_CASTLE])
            hash = Zobrist.toggleCastlingRights(CastleType.BLACK_LONG_CASTLE, hash);
        // Toggling EnPassant File
        if (enPassantFile !== null)
            hash = Zobrist.toggleEnPassantOnFile(enPassantFile, hash);
        return hash;
    }
}
Zobrist.initializeValues();
export { Zobrist };
