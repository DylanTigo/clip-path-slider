"use client";

import LoadingScreen from "@/Component/LoadingScreen";
import MorphingSVG from "@/Component/ui/MorphingSvg";
import { slides } from "@/data";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

export default function Home() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState<"next" | "prev">("next");
  const [tl, setTl] = useState<gsap.core.Timeline | undefined>();
  const mainRef = useRef(null);

  useGSAP(() => {
    const timeline = gsap.timeline({ paused: true });
      
    setTl(timeline);
  })

  const handlePrev = () => {
    setDirection("prev");
    if (currentIndex > 0) {
      setCurrentIndex((prevIndex) => prevIndex - 1);
    }
  };

  const handleNext = () => {
    setDirection("next");
    if (currentIndex < slides.length - 1) {
      setCurrentIndex((prevIndex) => prevIndex + 1);
    }
  };

  return (
    <main ref={mainRef}>
      <LoadingScreen/>
      <div className="flex justify-center h-svh p-4 relative">
        <div className="flex justify-center pb-3 border-b w-full max-w-4xl border-zinc-950/70 absolute top-4">
          Best of collection
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
            
            <div className=""></div>
          </div>

          <div className="center-layout w-full h-full -z-10">
            <MorphingSVG
              currentIndex={currentIndex}
              slides={slides.map(slide => slide.image)}
              direction={direction}
            />
          </div>

          <div className="flex justify-between items-end">
            <div className="flex text-2xl content-center tracking-widest gap-2">
              <span>{String(currentIndex + 1).padStart(2, "0")}</span>
              <span className="opacity-50">
                {" "}
                - {String(slides.length).padStart(2, "0")}
              </span>
            </div>

            <div className="flex items-center gap-3">
              <button
                className="p-2.5 border border-zinc-900 rounded-full"
                onClick={handlePrev}
              >
                <ChevronLeft className="text-zinc-900 size-5" />
              </button>
              <button
                className="p-2.5 border border-zinc-900 rounded-full"
                onClick={handleNext}
              >
                <ChevronRight className="text-zinc-900 size-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
