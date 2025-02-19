'use client'

import MorphingSVG from "@/Component/ui/MorphingSvg";
import { slides } from "@/data";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

export default function Home() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [svgComponents, setSvgComponents] = useState([{ image: slides[0].image, index: 0 }]);
  const [direction, setDirection] = useState("next");

  const handlePrev = () => {
    if (currentIndex > 0) {
      /* setTimeout(() => { */
        setDirection("prev")
        setCurrentIndex((prevIndex) => prevIndex - 1);
        setSvgComponents((prevComponents) => prevComponents.slice(0, -1));
      /* }, 1500); */
    }
  };

  const handleNext = () => {
    if (currentIndex < slides.length - 1) {
      setCurrentIndex((prevIndex) => prevIndex + 1);
      setSvgComponents((prevComponents) => [
        ...prevComponents,
        { image: slides[currentIndex + 1].image, index: currentIndex + 1 },
      ]);
      setDirection("next")
    }
  };

  return (
    <main className="flex justify-center h-svh p-4 relative">
      <div className="flex justify-center pb-3 border-b-2 w-full border-zinc-950/70 absolute top-4">
        Dylan Noel
      </div>

      <div className="flex flex-col justify-between w-full mt-14 max-w-4xl relative">

        <div className="flex justify-between items-center w-full">
          <div className="max-w-64">
            <h1 className="text-zinc-950 text-2xl md:text-3xl font-bold text-nowrap mb-2">
              {slides[currentIndex].title}
            </h1>
            <p className="text-zinc-950/70 text-xs md:text-sm w-full line-clamp-2">
              {slides[currentIndex].description}
            </p>
          </div>

          <div className="flex text-2xl tracking-widest gap-2">
            <span>{String(currentIndex + 1).padStart(2, '0')}</span>
            <span className="opacity-50"> - {String(slides.length).padStart(2, '0')}</span>
          </div>
        </div>

        <div className="center-layout w-full h-full pointer-events-none">
          {svgComponents.map((svg, idx) => (
            <MorphingSVG key={idx+"slide"} index={svg.index} image={svg.image} direction={direction}></MorphingSVG>
            ))}
        </div>

        <div className="flex justify-end items-center gap-3">
          <button className="p-2.5 bg-zinc-900 rounded-full" onClick={handlePrev}>
            <ChevronLeft className="text-white size-5" />
          </button>
          <button className="p-2.5 bg-zinc-900 rounded-full" onClick={handleNext}>
            <ChevronRight className="text-white size-5" />
          </button>
        </div>

      </div>
    </main>
  );
}
