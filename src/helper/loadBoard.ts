import { Piece } from "@/model/Piece";
import { pieceFromSymbol } from "./pieceUtils";
import { BOARDSTATE } from "@/config";

const initFromBOARDSTATE = () => {
  const pieces: Record<string, Piece> = {};
  const board: BoardStateT = Array(64).fill(null);

  BOARDSTATE.forEach((sym, i) => {
    if (!sym) return;
    const piece = pieceFromSymbol(sym, i);
    pieces[piece.id] = piece;
    board[i] = piece.id;
  });

  return { pieces, board };
};

export { initFromBOARDSTATE };
