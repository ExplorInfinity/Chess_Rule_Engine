import { Bishop, King, Knight, Pawn, Queen, Rook } from "../pieces/index.js";
const PieceType = { pawn: 0, knight: 1, bishop: 2, rook: 3, queen: 4, king: 5 };
const PieceMaterialValue = { king: 0, pawn: 1, knight: 3, bishop: 3, rook: 5, queen: 9 };
const PieceCode = { pawn: "P", knight: "N", bishop: "B", rook: "R", queen: "Q", king: "K" };
const PieceClassMap = { P: Pawn, B: Bishop, N: Knight, R: Rook, Q: Queen, K: King };
export { PieceType, PieceMaterialValue, PieceCode, PieceClassMap };
