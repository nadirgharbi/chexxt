export abstract class Piece {
  public id: string;
  public type: PieceType;
  public color: Color;
  public coord: Coord | null;
  public isCaptured: boolean;
  public hasMoved: boolean;

  constructor(dto: PieceDTO) {
    this.id = dto.id;
    this.type = dto.type;
    this.color = dto.color;
    this.coord = dto.coord;
    this.isCaptured = dto.isCaptured;
    this.hasMoved = dto.hasMoved;
  }

  abstract legalMoves(board: BoardStateT): Coord[];

  public getDto(): PieceDTO {
    return {
      id: this.id,
      type: this.type,
      color: this.color,
      coord: this.coord,
      isCaptured: this.isCaptured,
      hasMoved: this.hasMoved,
    };
  }

  public canMoveTo(board: BoardStateT, target: Coord): boolean {
    return this.legalMoves(board).includes(target);
  }

  public moveTo(target: Coord): void {
    this.coord = target;
    this.hasMoved = true;
  }

  public capture(): void {
    console.log("piece capturer")
    this.isCaptured = true;
    this.coord = null;
  }
}
