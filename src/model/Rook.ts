import { coordToIndex, indexToCoord } from "@/helper/coord";
import { Piece } from "./Piece";

/**
 * La tour peut :
 * - Avancer sur une meme ligne, horizontale ou verticale
 * - Elle avance tant que les cases sont libres
 */
export class Rook extends Piece {
  isSameLineOrCol = (start: number, index: number, direction: number) => {
    if (direction === +1 || direction === -1) return Math.floor(start / 8) === Math.floor(index / 8);
    return true;
  };

  legalMoves(board: BoardStateT): Coord[] {
    if (!this.coord) return [];

    const start = coordToIndex(this.coord);
    const directions = [-1, +1, -8, +8]; // droite, gauche, bas, haut

    const moves: Coord[] = [];

    // on deplace le pion si c'est possible
    for (const direction of directions) {
      let index = start + direction;
      // on verifie pour combien de case la tour peut bouger
      while (index >= 0 && index < 64 && this.isSameLineOrCol(start, index, direction)) {
        if (board[index]) {
          moves.push(indexToCoord(index));
          break;
        }
      }
    }

    return moves;
  }
}
