import { coordToIndex, indexToCoord } from "@/helper/coord";
import { Piece } from "./Piece";

export class King extends Piece {
  legalMoves(board: BoardStateT): Coord[] {
    if (!this.coord) return [];

    const start = coordToIndex(this.coord);
    const row = Math.floor(start / 8);
    const col = start % 8;

    const moves: Coord[] = [];

    // 1️⃣ Coups "classiques" du roi (1 case autour)
    for (let deltaRow = -1; deltaRow <= 1; deltaRow++) {
      for (let deltaCol = -1; deltaCol <= 1; deltaCol++) {
        if (deltaRow === 0 && deltaCol === 0) continue;

        const r = row + deltaRow;
        const c = col + deltaCol;

        if (r >= 0 && r < 8 && c >= 0 && c < 8) {
          const idx = r * 8 + c;
          moves.push(indexToCoord(idx));
        }
      }
    }

    // 2️⃣ Roque (version simplifiée)
    // On ne propose le roque que si le roi n'a jamais bougé
    if (!this.hasMoved) {
      const isWhite = this.color === "white";

      // indices de départ "théoriques"
      const kingStartCoord: Coord = isWhite ? "e1" : ("e8" as Coord);
      const kingCurrentlyAtStart = this.coord === kingStartCoord;

      if (kingCurrentlyAtStart) {
        // petit roque (côté roi)
        // roi en e1/e8, tour en h1/h8 -> cases f1/g1 ou f8/g8 doivent être vides
        const rookKingSideIndex = isWhite ? coordToIndex("h1" as Coord) : coordToIndex("h8" as Coord);
        const fIndex = row * 8 + (col + 1); // f1/f8
        const gIndex = row * 8 + (col + 2); // g1/g8

        const rookKingSidePresent = board[rookKingSideIndex]?.includes("rook");
        const pathKingSideEmpty = !board[fIndex] && !board[gIndex];

        if (rookKingSidePresent && pathKingSideEmpty) {
          moves.push(indexToCoord(gIndex)); // case de destination du roi (g1/g8)
        }

        // grand roque (côté dame)
        // roi en e1/e8, tour en a1/a8 -> cases d1/c1/b1 ou d8/c8/b8 doivent être vides
        const rookQueenSideIndex = isWhite ? coordToIndex("a1" as Coord) : coordToIndex("a8" as Coord);
        const dIndex = row * 8 + (col - 1); // d1/d8
        const cIndex = row * 8 + (col - 2); // c1/c8
        const bIndex = row * 8 + (col - 3); // b1/b8

        const rookQueenSidePresent = board[rookQueenSideIndex]?.includes("rook");
        const pathQueenSideEmpty = !board[dIndex] && !board[cIndex] && !board[bIndex];

        if (rookQueenSidePresent && pathQueenSideEmpty) {
          moves.push(indexToCoord(cIndex)); // case de destination du roi (c1/c8)
        }
      }
    }

    return moves;
  }
}
