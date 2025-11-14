import { BoardProvider } from "@/context/BoardContext";
import { PieceProvider } from "@/context/PieceContext";

export default function PlayLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <BoardProvider>
        <PieceProvider>{children}</PieceProvider>
      </BoardProvider>
    </>
  );
}
