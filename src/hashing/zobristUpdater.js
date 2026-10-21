import { Zobrist } from "./zobrist.js";
class ZobristUpdater {
    _currentHash = 0n;
    _hashMap = new Map();
    _hashMoveHistory = [];
    // Getters
    get currentHash() { return this._currentHash; }
    // Update Hash Methods
    rebuildHash(game) {
        this._hashMap.clear();
        this._currentHash = Zobrist.getBoardHash(game);
        this._hashMap.set(this._currentHash, [-1]);
    }
    toggleMoveChanges(moveRecord) {
        const { moves, captures, promotions } = moveRecord;
        for (const { from, piece } of captures)
            this._currentHash = Zobrist.togglePieceAtPos(piece, from, this._currentHash);
        for (const { from, to, piece } of moves) {
            this._currentHash = Zobrist.togglePieceAtPos(piece, from, this._currentHash);
            this._currentHash = Zobrist.togglePieceAtPos(piece, to, this._currentHash);
        }
        for (const { to, piece } of promotions)
            this._currentHash = Zobrist.togglePieceAtPos(piece, to, this._currentHash);
    }
    switchSideToMove() {
        this._currentHash = Zobrist.switchSideToMove(this._currentHash);
    }
    toggleSpecialRights(specialRights) {
        this._currentHash = Zobrist.toggleSpecialRights(specialRights, this._currentHash);
    }
    addMoveRecord(game, moveRecordIndex) {
        if (moveRecordIndex < 0 || moveRecordIndex >= game.moveHistory.length)
            return;
        const moveRecord = game.moveHistory[moveRecordIndex];
        // Removing old info from hash
        this.toggleSpecialRights(game.specialRights);
        // Applying new changes
        game.updateSpecialRights();
        this.switchSideToMove();
        this.toggleMoveChanges(moveRecord);
        this.toggleSpecialRights(game.specialRights);
        this._hashMoveHistory.push(moveRecord);
        // Adding New Occurrence
        this.recordCurrentHashOccurrence(moveRecordIndex);
    }
    removeMoveRecord(game, moveRecordIndex) {
        if (moveRecordIndex < 0 || moveRecordIndex >= game.moveHistory.length)
            return;
        const { _hashMoveHistory: hashMoveHistory } = this;
        const moveRecord = game.moveHistory[moveRecordIndex];
        if (hashMoveHistory.length === 0 || hashMoveHistory[hashMoveHistory.length - 1] !== moveRecord)
            return;
        // Removing Latest Occurrence
        this.removeCurrentHashOccurrence();
        // Reversing Hash
        this.toggleMoveChanges(moveRecord);
        this.toggleSpecialRights(game.specialRights);
        this.switchSideToMove();
        hashMoveHistory.pop();
        game.updateSpecialRights();
        this.toggleSpecialRights(game.specialRights);
    }
    // Hash Occurrences
    recordCurrentHashOccurrence(index) {
        const indexes = this._hashMap.get(this._currentHash) ?? [];
        indexes.push(index);
        this._hashMap.set(this._currentHash, indexes);
    }
    removeCurrentHashOccurrence() {
        const indexes = this._hashMap.get(this._currentHash);
        if (indexes) {
            indexes.pop();
            if (indexes.length === 0)
                this._hashMap.delete(this._currentHash);
        }
    }
    clearAllPreviousOccurrences() {
        const indexes = this._hashMap.get(this._currentHash);
        this._hashMap.clear();
        if (indexes)
            this._hashMap.set(this._currentHash, indexes);
    }
    checkThreeFoldRepetition(game) {
        const occurrences = this._hashMap.get(this._currentHash);
        if (!occurrences || occurrences.length < 3)
            return false;
        // Current Position Snapshot
        const currentBoard = game.board.copyBoard();
        const currentTurnColor = game.currentTurnColor;
        const currentSpecialRights = {
            castlingRights: { ...game.specialRights.castlingRights },
            enPassantFile: game.specialRights.enPassantFile
        };
        // Comparing all positions
        const matches = game.evaluateAt(occurrences, (game) => {
            game.updateSpecialRights();
            return game.isSamePosition(currentBoard, currentTurnColor, currentSpecialRights);
        });
        let totalMatches = 0;
        for (let i = 0; i < matches.length; ++i)
            totalMatches += matches[i] ? 1 : 0;
        return totalMatches === 3;
    }
}
export { ZobristUpdater };
