"use client";
import { useEffect } from "react";
import Board from "./Board";
import Sidebar from "./Sidebar";

export default function ChessBoard() {
  useEffect(() => {
    console.log("hello from chessboard");
  }, []);

  return (
    <>
      <div className="flex justify-center items-start gap-6 py-20">
        <Board />
        <Sidebar />
      </div>
    </>
  );
}
