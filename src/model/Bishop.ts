import { coordToIndex, indexToCoord } from "@/helper/coord";
import { Piece } from "./Piece";

export class Bishop extends Piece {
  legalMoves(board: BoardStateT): Coord[] {
    if (!this.coord) return [];

    const start = coordToIndex(this.coord);
    const directions = [
      [1, 1],
      [1, -1],
      [-1, 1],
      [-1, -1],
    ];

    const moves: Coord[] = [];

    for (const [deltaRow, deltaCol] of directions) {
      let row = Math.floor(start / 8) + deltaRow;
      let col = (start % 8) + deltaCol;
      while (row >= 0 && row < 8 && col >= 0 && col < 8) {
        const index = row * 8 + col;
        moves.push(indexToCoord(index));

        if (board[index]) break;

        row += deltaRow;
        col += deltaCol;
      }
    }

    return moves;
  }
}
