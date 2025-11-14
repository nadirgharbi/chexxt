import { coordToIndex, indexToCoord } from "@/helper/coord";
import { Piece } from "./Piece";

/**
 * Le pion peut :
 * - Avancer de deux cases au premier mouvement
 * - Avancer d'une case (ssi personne devant)
 * - Manger en diagonale
 */
export class Pawn extends Piece {
  legalMoves(board: BoardStateT): Coord[] {
    if (!this.coord) return []; // si le pion a ete capturer, pas de move

    const direction = this.color === "white" ? -1 : 1;
    const index = coordToIndex(this.coord);

    const row = Math.floor(index / 8);
    const col = Number(index) % 8;

    const moves: Coord[] = [];

    // on fait avancer le pion
    const forwardRow = row + direction;
    if (forwardRow >= 0 && forwardRow < 8) {
      // case devant vide ?
      const forwardIndex = forwardRow * 8 + col;
      if (!board[forwardIndex]) moves.push(indexToCoord(forwardIndex));

      // avance de deux cases si au debut
      const startRow = this.color === "white" ? 6 : 1;
      if (!this.hasMoved && row === startRow) {
        const forward2Index = (row + 2 * direction) * 8 + col;
        if (!board[forward2Index] && !board[forward2Index]) moves.push(indexToCoord(forward2Index));
      }
    }

    // move diagonale (pour la capture)
    for (const deltaCol of [-1, 1]) {
      const c = col + deltaCol; // decalage vers la case cible
      const r = row + direction; // 1 case toujours

      if (c >= 0 && c < 8 && r >= 0 && r < 8) {
        const i = r * 8 + c;
        const targetId = board[i];
        if (targetId) moves.push(indexToCoord(i));
      }
    }

    return moves // on retourne les mouvements possibles 
  }
}
