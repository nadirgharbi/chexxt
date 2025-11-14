import { Bishop } from "./Bishop";
import { Piece } from "./Piece";
import { Rook } from "./Rook";

/**
 * La reine : combo tour + fou
 */
export class Queen extends Piece {
  legalMoves(board: BoardStateT): Coord[] {
    const rookLegalMoves = new Rook({ ...this.getDto() }).legalMoves(board);
    const bishopLegalMoves = new Bishop({ ...this.getDto() }).legalMoves(board);

    return rookLegalMoves.concat(bishopLegalMoves);
  }
}
