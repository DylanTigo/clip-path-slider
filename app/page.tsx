import Slide from "@/Component/Slide";
import MorphingSVG from "@/Component/ui/MorphingSvg";
import { ChevronLeft, ChevronRight, Circle } from "lucide-react";

export default function Home() {
  const slides = [
    {
      title: "Title of Element 1",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ultricies, ligula sit amet pharetra fermentum, lorem nisl",
      image: "https://picsum.photos/id/10/400/400",
    },
    {
      title: "Title of Element 2",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ultricies, ligula sit amet pharetra fermentum, lorem nisl",
      image: "https://picsum.photos/id/10/400/400",
    },
    {
      title: "Title of Element 3",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ultricies, ligula sit amet pharetra fermentum, lorem nisl",
      image: "https://picsum.photos/id/10/400/400",
    },
    {
      title: "Title of Element 4",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ultricies, ligula sit amet pharetra fermentum, lorem nisl",
      image: "/image.png",
    },
  ];

  return (
    <main className="flex justify-center h-svh p-4 relative">
      <div className="flex justify-center pb-3 border-b-2 w-full border-zinc-950/70 absolute top-4">
        Dylan Noel
      </div>

      <div className="flex flex-col justify-between w-full mt-14 max-w-4xl relative">
        <div className="flex justify-between items-center w-full">
          <div className="max-w-64">
            <h1 className="text-zinc-950 text-3xl md:text-4xl font-bold text-nowrap mb-2">
              {slides[0].title}
            </h1>
            <p className="text-zinc-950/70 text-xs md:text-sm w-full line-clamp-2">
              {slides[0].description}
            </p>
          </div>
          <div className="flex text-2xl tracking-widest gap-2">
            <span>01</span>
            <span className="opacity-50"> - 04</span>
          </div>
        </div>
        <div className="center-layout w-full h-full">
          <MorphingSVG image={slides[0].image} index={0} />
        </div>

        <div className="flex justify-end items-center gap-3">
          <button type="button" className="p-2.5 bg-zinc-900 rounded-full">
            <ChevronLeft className="text-white size-5" />
          </button>
          <button type="button" className="p-2.5 bg-zinc-900 rounded-full">
            <ChevronRight className="text-white size-5" />
          </button>
        </div>
      </div>
    </main>
  );
}
