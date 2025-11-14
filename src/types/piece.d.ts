type Color = "white" | "black"
type PieceType = "pawn" | "rook" | "knight" | "bishop" | "queen" | "king";
type Coord = `${"a"|"b"|"c"|"d"|"e"|"f"|"g"|"h"}${1|2|3|4|5|6|7|8}`;

type PieceDTO = {
    id: string
    type: PieceType
    color: Color
    coord: Coord | null
    isCaptured: boolean
    hasMoved: boolean
}