import { usePieces } from "@/context/PieceContext";

export default function Sidebar() {
  const { history, turn } = usePieces();
  return (
    <aside className="w-64 p-4 space-y-2">
      <h2 className="font-bold">Tour: {turn}</h2>
      <h3 className="font-semibold">Historique</h3>
      <ul className="text-sm max-h-64 overflow-auto">
        {history.map((h, i) => (
          <li key={i}>{h}</li>
        ))}
      </ul>
    </aside>
  );
}
