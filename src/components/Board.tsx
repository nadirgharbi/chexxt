// /components/Board.tsx
"use client";
import React, { useEffect } from "react";
import Piece from "@/components/Piece";
import { BOARDCOLOR, FILES, RANKS, TILES, TILESIZE } from "@/config";
import { usePieces } from "@/context/PieceContext";

export default function Board() {
  const { highlighted, getPieceAt } = usePieces();

  const isHighlighted = (coord: Coord) => highlighted.includes(coord);

  return (
    <div className="flex flex-col items-center select-none">
      <div
        className="grid"
        style={{
          gridTemplateColumns: `32px repeat(${TILES}, ${TILESIZE}px) 32px`,
          gridTemplateRows: `32px repeat(${TILES}, ${TILESIZE}px) 32px`,
        }}
      >
        {/* top letters */}
        <div />
        {FILES.map((f) => (
          <div key={`t-${f}`} className="flex items-center justify-center text-gray-600 font-bold">
            {f}
          </div>
        ))}
        <div />

        {/* ranks rows */}
        {RANKS.map((rank, rowIndex) => (
          <React.Fragment key={rank}>
            <div className="flex items-center justify-center text-gray-600 font-bold">{rank}</div>
            {FILES.map((file, colIndex) => {
              const isDark = (rowIndex + colIndex) % 2 === 1;
              const coord = `${file}${rank}` as Coord;

              const playable = isHighlighted(coord);
              const occupant = getPieceAt(coord);
              // highlight des moves
              const showDot = playable && !occupant;
              const showRing = playable && !!occupant;

              return (
                <div
                  key={coord}
                  className="relative"
                  style={{
                    width: TILESIZE,
                    height: TILESIZE,
                    backgroundColor: isDark ? BOARDCOLOR.dark : BOARDCOLOR.light,
                  }}
                >
                  {/* point pour montrer les case legales*/}
                  {showDot && (
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <div
                        className="rounded-full opacity-60"
                        style={{ width: 20, height: 20, backgroundColor: isDark ? "#eeeed2" : "#769656" }}
                      />
                    </div>
                  )}

                  {/* anneau pour la capture */}
                  {showRing && (
                    <div
                      className="absolute inset-0 pointer-events-none rounded-full opacity-50 animate-pulse border-4 !border-red-500"
                      style={{
                        border: `4px solid ${isDark ? "#eeeed2" : "#769656"}`,
                      }}
                    />
                  )}

                  <Piece coord={coord} />
                </div>
              );
            })}
            <div className="flex items-center justify-center text-gray-600 font-bold">{rank}</div>
          </React.Fragment>
        ))}

        {/* bottom letters */}
        <div />
        {FILES.map((f) => (
          <div key={`b-${f}`} className="flex items-center justify-center text-gray-600 font-bold">
            {f}
          </div>
        ))}
        <div />
      </div>
    </div>
  );
}
