"use client";
import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { Piece } from "@/model/Piece";
import { coordToIndex, indexToCoord } from "@/helper/coord";
import { initFromBOARDSTATE } from "@/helper/loadBoard";
import { SOUNDS, FILES } from "@/config";

type Turn = "white" | "black";

interface PieceContextType {
  pieces: Record<string, Piece>;
  board: BoardStateT;
  selectedId: string | null;
  turn: Turn;
  history: string[];
  highlighted: Coord[];
  getPieceAt: (coord: Coord) => Piece | null;
  selectPiece: (id: string | null) => void;
  moveSelectedTo: (coord: Coord) => void;
  playMoveSound: () => void;
}

const PieceContext = createContext<PieceContextType | undefined>(undefined);

export const PieceProvider = ({ children }: { children: React.ReactNode }) => {
  const { pieces: initPieces, board: initBoard } = useMemo(initFromBOARDSTATE, []);
  const [pieces, setPieces] = useState<Record<string, Piece>>(initPieces);
  const [board, setBoard] = useState<BoardStateT>(initBoard);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [turn, setTurn] = useState<Turn>("white");
  const [history, setHistory] = useState<string[]>([]);
  const [highlighted, setHighlighted] = useState<Coord[]>([]);

  const getPieceAt = (coord: Coord) => {
    const id = board[coordToIndex(coord)];
    return id ? pieces[id] : null;
  };

  const isEnemyAt = (coord: Coord, color: "white" | "black") => {
    const p = getPieceAt(coord);
    return !!p && p.color !== color;
  };

  const isAllyAt = (coord: Coord, color: "white" | "black") => {
    const p = getPieceAt(coord);
    return !!p && p.color === color;
  };

  const selectPiece = (id: string | null) => {
    if (!id) {
      setSelectedId(null);
      setHighlighted([]);
      return;
    }
    const p = pieces[id];
    if (!p) return;

    // autoriser sélection seulement si c'est son tour
    if (p.color !== turn) return;

    setSelectedId(id);

    const raw = p.legalMoves(board) as Coord[];
    const legal = raw.filter((c) => !isAllyAt(c, p.color));

    setHighlighted(legal);
  };

  const getHilightsMoves = () => {
    if (!selectedId) return;
    const move = pieces[selectedId];
    return move.legalMoves(board);
  };

  const moveSelectedTo = (coord: Coord) => {
    if (!selectedId) return;
    const mover = pieces[selectedId];
    if (!mover || mover.color !== turn) return;

    if (!highlighted.includes(coord)) {
      const ally = getPieceAt(coord);
      if (ally && ally.color === turn) {
        selectPiece(ally.id);
      }
      return;
    }

    // capture éventuelle
    const target = getPieceAt(coord);
    const newPieces = { ...pieces };
    const newBoard = [...board];

    if (target) {
      newPieces[target.id] = Object.assign(Object.create(Object.getPrototypeOf(target)), target);
      newPieces[target.id].capture();
      newBoard[coordToIndex(coord)] = undefined;
    }

    // déplacer
    const fromIdx = coordToIndex(mover.coord!);
    newBoard[fromIdx] = undefined;

    const moved = Object.assign(Object.create(Object.getPrototypeOf(mover)), mover);
    moved.moveTo(coord);
    newBoard[coordToIndex(coord)] = moved.id;

    newPieces[moved.id] = moved;

    // petit / grand roque
    if (moved.type === "king") {
      const fromFile = mover.coord![0];
      const toFile = coord[0];

      const fromFileIndex = FILES.indexOf(fromFile);
      const toFileIndex = FILES.indexOf(toFile);
      const fileDiff = toFileIndex - fromFileIndex;

      if (Math.abs(fileDiff) === 2) {
        const row = Math.floor(fromIdx / 8);

        if (fileDiff > 0) {
          const rookFromIdx = row * 8 + 7;
          const rookToIdx = row * 8 + 5;

          const rookId = newBoard[rookFromIdx];
          if (rookId) {
            const rook = newPieces[rookId];
            const rookMoved = Object.assign(Object.create(Object.getPrototypeOf(rook)), rook);
            rookMoved.moveTo(indexToCoord(rookToIdx));
            newPieces[rookId] = rookMoved;

            newBoard[rookFromIdx] = undefined;
            newBoard[rookToIdx] = rookId;
          }
        } else {
          const rookFromIdx = row * 8 + 0;
          const rookToIdx = row * 8 + 3;

          const rookId = newBoard[rookFromIdx];
          if (rookId) {
            const rook = newPieces[rookId];
            const rookMoved = Object.assign(Object.create(Object.getPrototypeOf(rook)), rook);
            rookMoved.moveTo(indexToCoord(rookToIdx));
            newPieces[rookId] = rookMoved;

            newBoard[rookFromIdx] = undefined;
            newBoard[rookToIdx] = rookId;
          }
        }
      }
    }

    setPieces(newPieces);
    setBoard(newBoard);
    setHistory((h) => [...h, `${moved.color} ${moved.type} ${mover.coord} -> ${coord}${target ? " x" : ""}`]);
    setSelectedId(null);
    setHighlighted([]);
    setTurn(turn === "white" ? "black" : "white");
  };

  const playMoveSound = () => {
    const moveSound = new Audio(SOUNDS.move);
    moveSound.play();
  };

  // if (!isLoaded) return "Chargement..."

  return (
    <PieceContext.Provider
      value={{
        pieces,
        board,
        selectedId,
        turn,
        history,
        highlighted,
        getPieceAt,
        selectPiece,
        moveSelectedTo,
        playMoveSound,
      }}
    >
      {children}
    </PieceContext.Provider>
  );
};

export const usePieces = () => {
  const context = useContext(PieceContext);
  if (!context) throw new Error("usePieces must be used within PieceProvider");
  return context;
};
