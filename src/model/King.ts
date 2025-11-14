import { coordToIndex, indexToCoord } from "@/helper/coord";
import { Piece } from "./Piece";

export class King extends Piece {
  legalMoves(board: BoardStateT): Coord[] {
    if (!this.coord) return [];

    const start = coordToIndex(this.coord);

    const row = Math.floor(start / 8);
    const col = start % 8;

    const moves: Coord[] = [];

    for (let deltaRow = -1; deltaRow <= 1; deltaRow++) {
      for (let deltaCol = -1; deltaCol <= 1; deltaCol++) {
        if (deltaRow === 0 && deltaCol === 0) continue;

        const r = row + deltaRow;
        const c = col + deltaCol;

        if (r >= 0 && r < 8 && c >= 0 && c < 8) moves.push(indexToCoord(r * 8 + c));
      }
    }

    // TODO: roque ici (pour plus tard)

    return moves;
  }
}
