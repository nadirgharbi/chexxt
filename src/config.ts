import {
  BlackPawn,
  BlackRook,
  BlackKnight,
  BlackBishop,
  BlackQueen,
  BlackKing,
  WhitePawn,
  WhiteRook,
  WhiteKnight,
  WhiteBishop,
  WhiteQueen,
  WhiteKing,
} from "./assets";

export const TILES = 8;
export const TILESIZE = 96;
export const BOARDSIZE = TILES * TILESIZE;
export const BOARDCOLOR = {dark: "#628141", light: "#FFF8DF"}

export const SOUNDS = {
  move: "/sounds/move.wav",
  win: "/sounds/win.wav"
}

export const ASSETS = [
  {
    "black-pawn": BlackPawn,
    "black-rook": BlackRook,
    "black-knight": BlackKnight,
    "black-bishop": BlackBishop,
    "black-queen": BlackQueen,
    "black-king": BlackKing,
    "white-pawn": WhitePawn,
    "white-rook": WhiteRook,
    "white-knight": WhiteKnight,
    "white-bishop": WhiteBishop,
    "white-queen": WhiteQueen,
    "white-king": WhiteKing,
  },
];

export const FILES = ["a", "b", "c", "d", "e", "f", "g", "h"];
export const RANKS = [8, 7, 6, 5, 4, 3, 2, 1];

export const BOARDSTATE = [
    "r", "n", "b", "q", "k", "b", "n", "r", 
    "p", "p", "p", "p", "p", "p", "p", "p",
    undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined,
    undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined,
    undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined,
    undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined,
    "P", "P", "P", "P", "P", "P", "P", "P",
    "R", "N", "B", "Q", "K", "B", "N", "R", 
]

export const PIECEMAP: Record<string, PieceType> = {
      p: "pawn",
      r: "rook",
      n: "knight",
      b: "bishop",
      q: "queen",
      k: "king",
    };
