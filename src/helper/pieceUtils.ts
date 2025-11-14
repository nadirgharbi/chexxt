import { Pawn } from "@/model/Pawn";
import { Rook } from "@/model/Rook";
import { Knight } from "@/model/Knight";
import { Bishop } from "@/model/Bishop";
import { Queen } from "@/model/Queen";
import { King } from "@/model/King";
import { Piece } from "@/model/Piece";
import { indexToCoord } from "./coord";
import { PIECEMAP } from "@/config";

export const isWhite = (sym: string) => sym === sym.toUpperCase();

export const pieceFromSymbol = (sym: string, index: number): Piece => {
  const color: Color = isWhite(sym) ? "white" : "black";

  const t = PIECEMAP[sym.toLowerCase()];

  const coord = indexToCoord(index);

  const dto: PieceDTO = {
    id: `${t}-${color}-${index}`,
    type: t,
    color,
    coord,
    isCaptured: false,
    hasMoved: false,
  };

  switch (t) {
    case `pawn`:
      return new Pawn(dto);
    case `rook`:
      return new Rook(dto);
    case `knight`:
      return new Knight(dto);
    case `bishop`:
      return new Bishop(dto);
    case `queen`:
      return new Queen(dto);
    case `king`:
      return new King(dto);
    default:
      throw new Error("Unknown type");
  }
};
