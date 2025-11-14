"use client";
import { BOARDSTATE } from "@/config";
import { createContext, useContext, useState } from "react";

interface BoardContextType {
  boardState: BoardStateT;
  setBoardState: (boardState: BoardStateT) => void;
  history: string[];
  setHistory: (history: string[]) => void;
}

const BoardContext = createContext<BoardContextType | undefined>(undefined);

export const BoardProvider = ({ children }: { children: React.ReactNode }) => {
  const [boardState, setBoardState] = useState<BoardStateT>(BOARDSTATE);
  const [history, setHistory] = useState<string[]>([]);

  return (
    <BoardContext.Provider value={{ boardState, setBoardState, history, setHistory }}>{children}</BoardContext.Provider>
  );
};

export const useBoard = () => {
  const context = useContext(BoardContext);
  if (!context) throw new Error("useBoard must be in a BoardProvider");
  return context;
};
