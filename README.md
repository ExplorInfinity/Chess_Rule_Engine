# Chess Rule Engine

`chess-rule-engine` is a TypeScript-first chess rules engine for applications that need reliable board state, legal move validation, special moves, game history, and game-ending condition detection.

It is designed to be the rules layer underneath a chess UI, game server, analysis tool, or AI project. The package has no UI dependencies and can be used in Node.js or other modern JavaScript environments that support ES modules.

## Features

- Legal move validation for all standard chess pieces
- Check and checkmate detection
- Stalemate detection
- Castling and castling-right tracking
- En passant
- Pawn promotion
- Threefold-repetition tracking using Zobrist hashing
- Fifty-move-rule detection
- Insufficient-material detection
- Move history with undo, replay, and position navigation
- Strong TypeScript types included in the package

## Installation

```bash
npm install chess-rule-engine
```

The package is published as an ES module and includes generated TypeScript declarations.

## Quick start

```ts
import { Game, GameResult, GameStatus } from "chess-rule-engine";

const game = new Game();

// Load the standard starting position.
game.setBoardLayout();

// Coordinates use x for the file and y for the rank, both from 0 to 7.
// The default board is represented from Black's back rank to White's back rank.
const result = game.playMoveWithValidation({
  from: { x: 4, y: 6 }, // e2
  to: { x: 4, y: 4 },   // e4
});

console.log(result);
// { result: "Legal Move", executed: true }

console.log(game.currentTurnColor); // "black"
console.log(game.currentStatus);
console.log(game.currentResult);    // GameResult.PENDING
```

Moves are only applied when they are valid, legal for the current position, and made by the side whose turn it is. The returned `MoveRemark` distinguishes invalid, illegal, and out-of-turn moves.

## Board layouts

The engine uses an 8×8 `BoardStringLayout`. Each occupied square is represented by a two-character code:

| Code | Meaning |
| --- | --- |
| `wP`, `wN`, `wB`, `wR`, `wQ`, `wK` | White pawn, knight, bishop, rook, queen, king |
| `bP`, `bN`, `bB`, `bR`, `bQ`, `bK` | Black pawn, knight, bishop, rook, queen, king |
| `null` | Empty square |

Rows are indexed by `y` and columns by `x`. The built-in `DefaultBoard` starts with Black's back rank at row `0` and White's back rank at row `7`.

```ts
import { Game, type BoardStringLayout } from "chess-rule-engine";

const layout: BoardStringLayout = [
  ["bK", null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
  ["wK", null, null, null, null, null, null, null],
];

const game = new Game();
const loaded = game.setBoardLayout(layout);

if (!loaded) {
  throw new Error("Invalid board layout");
}
```

`setBoardLayout()` validates the dimensions and piece codes, applies the position, updates special rights, and recalculates the game state.

## Inspecting legal moves

`ChessRuleSet` exposes position-level rule helpers. For example, use `getLegalMoves()` to list legal destinations for a piece:

```ts
import { ChessRuleSet, Game } from "chess-rule-engine";

const game = new Game();
game.setBoardLayout();

const moves = ChessRuleSet.getLegalMoves(game, { x: 1, y: 7 }); // White knight on b1
console.log(moves);
```

Other useful checks include:

```ts
ChessRuleSet.isKingInCheck(game, "white");
ChessRuleSet.isCheckmated(game);
ChessRuleSet.isDrawByStalemate(game);
ChessRuleSet.isDrawByThreeFoldRepetition(game);
ChessRuleSet.isDrawByFiftyMoveRule(game);
ChessRuleSet.isDrawByInsufficientMaterial(game);
```

## History and replay

The `Game` class keeps move records and supports undoing or navigating through the current history:

```ts
game.undoMove();
game.reverseOneMove();
game.forwardOneMove();
game.jumpToStartingMove();
game.jumpToLatestMove();
game.jumpToMove(2);

console.log(game.moveHistory);
console.log(game.board.getStrLayout());
```

`moveHistory` contains structured move, capture, and promotion changes rather than chess notation. The package currently operates on coordinates and board layouts; it does not parse or generate FEN, PGN, or SAN notation.

## Public API

The package entry point exports:

- `Game` — mutable game state, move execution, history, and status
- `Board` — board storage and layout utilities
- `ChessRuleSet` — legal-move and rule evaluation helpers
- Piece classes — `Piece`, `Pawn`, `Knight`, `Bishop`, `Rook`, `Queen`, and `King`
- Constants — `GameStatus`, `GameResult`, `CastleType`, `PieceCode`, `PieceType`, and `DefaultBoard`
- TypeScript types — positions, move queries, board layouts, move records, pieces, and game contexts

## Development

Install dependencies and build the distributable files:

```bash
pnpm install
pnpm run build
```

The compiled JavaScript and declaration files are written to `dist/`. Only `dist/` is included in the published package.

## Publishing a release

Update the version, build the package, and publish it from the project root:

```bash
npm version patch
pnpm run build
npm publish
```

Use `npm version minor` or `npm version major` when the release contains larger additions or breaking API changes.

## License

ISC
