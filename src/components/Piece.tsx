"use client";
import Image from "next/image";
import { usePieces } from "@/context/PieceContext";
import { TILESIZE, ASSETS } from "@/config";
import { useEffect } from "react";

export default function Piece({ coord }: { coord: Coord }) {
  const { getPieceAt, selectPiece, selectedId, moveSelectedTo, pieces, highlighted, playMoveSound } = usePieces();
  const piece = getPieceAt(coord);

  const assetKey = (type: string, color: "white" | "black") => `${color}-${type}` as const;

  const isSelected = piece && selectedId === piece.id;
  const isHighlighted = highlighted.includes(coord);

  const onClick = () => {
    if (selectedId && isHighlighted) {
      moveSelectedTo(coord);
      playMoveSound()
      return;
    }

    if (piece) {
      selectPiece(piece.id);
    }
   
  };

  // si case vide : clickable pour déplacement seulement
  if (!piece) {
    return <div onClick={onClick} className="w-full h-full"></div>;
  }

  const src = (ASSETS[0] as any)[assetKey(piece.type, piece.color)];

  return (
    <button
      onClick={onClick}
      className={`flex items-center justify-center w-full h-full ${
        isSelected ? "border-4 rounded-xl border-amber-400" : ""
      }`}
      aria-label={`${piece.color} ${piece.type} ${coord}`}
    >
      <Image
        src={src}
        alt={`${piece.color} ${piece.type}`}
        width={TILESIZE * 0.4}
        height={TILESIZE * 0.4}
        draggable={false}
        className="select-none"
      />
    </button>
  );
}
