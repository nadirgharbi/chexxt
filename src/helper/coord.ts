import { FILES, RANKS } from "@/config";

/**
 * Convertit les coordonnes ("e2", "b3", ...) en index dans le tableau [0..63]
 */
export const coordToIndex = (coord: Coord): number => {
  const file = coord[0] as (typeof FILES)[number];
  const rank = Number(coord[1]) as (typeof RANKS)[number];

  const col = FILES.indexOf(file);
  const row = RANKS.indexOf(rank);

  return row * 8 + col;
};

/**
 * Convertit les index en coordonnes
 */
export const indexToCoord = (index: number): Coord => {
  const col = index % 8;
  const row = Math.floor(index / 8);

  const file = FILES[col];
  const rank = RANKS[row];

  return `${file}${rank}` as Coord;
};
