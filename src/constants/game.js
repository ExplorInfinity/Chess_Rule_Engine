var GameStatus;
(function (GameStatus) {
    GameStatus[GameStatus["NOT_STARTED"] = 0] = "NOT_STARTED";
    GameStatus[GameStatus["ACTIVE"] = 1] = "ACTIVE";
    GameStatus[GameStatus["WHITE_WON"] = 2] = "WHITE_WON";
    GameStatus[GameStatus["BLACK_WON"] = 3] = "BLACK_WON";
    GameStatus[GameStatus["DRAW"] = 4] = "DRAW";
})(GameStatus || (GameStatus = {}));
var GameResult;
(function (GameResult) {
    GameResult[GameResult["PENDING"] = -1] = "PENDING";
    GameResult[GameResult["ABORT"] = 0] = "ABORT";
    GameResult[GameResult["RESIGN"] = 1] = "RESIGN";
    GameResult[GameResult["CHECKMATE"] = 2] = "CHECKMATE";
    GameResult[GameResult["TIMEOUT"] = 3] = "TIMEOUT";
    GameResult[GameResult["ABANDONED"] = 4] = "ABANDONED";
    GameResult[GameResult["STALEMATE"] = 5] = "STALEMATE";
    GameResult[GameResult["THREE_FOLD_REPETITION"] = 6] = "THREE_FOLD_REPETITION";
    GameResult[GameResult["FIFTY_MOVE_RULE"] = 7] = "FIFTY_MOVE_RULE";
    GameResult[GameResult["DRAW_BY_AGREEMENT"] = 8] = "DRAW_BY_AGREEMENT";
    GameResult[GameResult["DRAW_BY_INSUFFICIENT_MATERIAL"] = 9] = "DRAW_BY_INSUFFICIENT_MATERIAL";
})(GameResult || (GameResult = {}));
const BOARD_SIZE = 8;
const DefaultBoard = [
    ["bR", "bN", "bB", "bQ", "bK", "bB", "bN", "bR"],
    ["bP", "bP", "bP", "bP", "bP", "bP", "bP", "bP"],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    ["wP", "wP", "wP", "wP", "wP", "wP", "wP", "wP"],
    ["wR", "wN", "wB", "wQ", "wK", "wB", "wN", "wR"],
];
export { GameStatus, GameResult, BOARD_SIZE, DefaultBoard };
