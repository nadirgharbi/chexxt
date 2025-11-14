"use client";
import { Button } from "@/components/ui/button";
import { MyIcon } from "@/components/ui/my-icon";
import { redirect } from "next/navigation";

export default function Home() {
  return (
    <div className="flex flex-col gap-3 min-h-screen items-center justify-center">
      <h1 className="uppercase font-extrabold text-5xl">chexxt</h1>
      <div className="flex gap-3">
        <Button size={"lg"} className="group uppercase text-lg" onClick={() => redirect("/play")}>
          <MyIcon stroke={2} name="ChessKnight" className="group-hover:rotate-12 scale-125 group-focus:scale-90 transition-all"/>
          Jouer !
        </Button>
      </div>
    </div>
  );
}
