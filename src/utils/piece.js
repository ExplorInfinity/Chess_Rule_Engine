function checkPieceColorAndName(piece, color, name) {
    return (piece !== null && piece.color === color && piece.name === name);
}
function checkPieceName(piece, name) {
    return (piece !== null && piece.name === name);
}
export { checkPieceColorAndName, checkPieceName };
