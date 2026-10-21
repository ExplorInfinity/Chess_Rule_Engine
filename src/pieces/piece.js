class Piece {
    color;
    name;
    movesPlayed = 0;
    constructor(color, name) {
        this.color = color;
        this.name = name;
    }
    static isSameType(p1, p2) {
        return p1.color === p2.color && p1.name === p2.name;
    }
    get isMoved() { return this.movesPlayed !== 0; }
}
export { Piece };
