import MorphingSVG from "@/Component/ui/MorphingSvg";
import { ChevronLeft, ChevronRight, Circle } from "lucide-react";

export default function Home() {
  return (
    <main className="flex justify-center h-svh p-4 relative">
      <div className="flex justify-center pb-3 border-b-2 w-full border-black/70 absolute top-4">
        Dylan Noel
      </div>
      <div className="flex justify-between w-full mt-12 max-w-5xl relative">
        <div className="flex flex-col justify-between">
          <h1 className="text-black text-2xl font-bold">Title of Elements</h1>
          <div className="flex items-center gap-3">
            <ChevronLeft className="text-black/70 size-5" />
            <ChevronRight className="text-black/70 size-5" />
          </div>
        </div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <MorphingSVG />
        </div>
        <div className="flex flex-col justify-between items-center">
          <nav className="flex items-center justify-center gap-1.5">
            <Circle className="text-black/70 size-3" />
            <Circle className="text-black/70 size-3" />
            <Circle className="text-black/70 size-3" />
            <Circle className="text-black/70 size-3" />
            <Circle className="text-black/70 size-3" />
          </nav>
          <div className="">01/06</div>
        </div>
      </div>
    </main>
  );
}
