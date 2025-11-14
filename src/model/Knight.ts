import { coordToIndex, indexToCoord } from "@/helper/coord";
import { Piece } from "./Piece";

/**
 * Le chevalier se deplace en L, soit :
 * - 1 case a droite, 2 case en bas
 * - 1 case a gauche, 2 case en bas
 * - 1 case en haut, 2 case en droite
 * - 1 case en bas, 2 case en droite
 * - 1 case en haut, 2 case en gauche
 * - 1 case en bas, 2 case en gauche
 * - 1 case a droite, 2 case en haut
 * - 1 case a gauche, 2 case en haut
 */
export class Knight extends Piece {
  legalMoves(board: BoardStateT): Coord[] {
    if (!this.coord) return [];

    const start = coordToIndex(this.coord);

    const row = Math.floor(start / 8);
    const col = start % 8;

    const directions = [
      [+1, -2],
      [-1, -2],
      [-1, +2],
      [+1, +2],
      [-2, +1],
      [-2, -1],
      [+2, -1],
      [+2, +1],
    ];

    const moves: Coord[] = [];

    for (const [deltaRow, deltaCol] of directions) {
      const r = row + deltaRow;
      const c = col + deltaCol;

      if (c >= 0 && c < 8 && r >= 0 && r < 8) {
        const index = r * 8 + c;
        moves.push(indexToCoord(index));
      }
    }

    return moves;
  }
}
