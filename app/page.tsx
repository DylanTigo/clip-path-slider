"use client";

import LoadingScreen from "@/Component/LoadingScreen";
import MorphingSVG from "@/Component/ui/MorphingSvg";
import { slides } from "@/data";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import TextWrapper from "@/Component/ui/TextWrapper";

gsap.registerPlugin(useGSAP);

export default function Home() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState<"next" | "prev">("next");
  const tl = useRef<gsap.core.Timeline | undefined>(undefined);
  const mainRef = useRef(null);
  const titleRef = useRef(null);
  const descriptionRef = useRef(null);
  const priceRef = useRef(null);
  const buttonsRef = useRef(null);
  const indexCtnRef = useRef(null);
  const indexRef = useRef(null);

  useGSAP(() => {
    gsap.from("#title", {
      y: "100%",
      opacity: 0,
      duration: 0.7,
      ease: "power2.Out",
    });

    gsap.from([buttonsRef.current, indexCtnRef.current], {
      y: 15,
      autoAlpha: 0,
      duration: 0.7,
      ease: "power2.Out",
      stagger: 0.2,
    });
  }, []);

  useGSAP(
    () => {
      if (tl.current) {
        tl.current.kill();
      }

      gsap.set([titleRef.current, descriptionRef.current], { y: "100%", opacity: 0 });
      gsap.set(priceRef.current, { x: "30%", opacity: 0 });

      tl.current = gsap.timeline({ paused: true });

      tl.current
        .to([titleRef.current, descriptionRef.current], {
          y: 0,
          opacity: 1,
          duration: 0.7,
          ease: "power2.Out",
          stagger: 0.2,
        })
        .to(
          priceRef.current,
          {
            x: 0,
            opacity: 1,
            duration: 0.4,
            ease: "power2.Out",
          },
          "0"
        )
        .to(indexRef.current, {
          y: -(currentIndex*100) / slides.length + "%",
          opacity: 1,
          duration: 0.8,
          ease: "power2.Out",
        }, "0")

      tl.current.play();
      
    },
    { scope: mainRef, dependencies: [currentIndex, direction] }
  );

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
      <LoadingScreen />
      <div className="flex justify-center h-svh p-4 relative">
        <div className="flex font-medium pb-3 border-b w-full max-w-4xl border-zinc-950/70 absolute top-4">
          <div className="overflow-hidden">
            <div id="title">Best of collection</div>
          </div>
        </div>

        <div className="flex flex-col justify-between w-full mt-14 max-w-4xl relative">
          <div className="flex justify-between gap-1 items-center w-full">
            <div className="max-md:max-w-64">
              <TextWrapper>
                <h1
                  ref={titleRef}
                  className="text-zinc-950 text-2xl md:text-3xl font-bold text-nowrap max-md:truncate mb-1 md-mb-2"
                >
                  {slides[currentIndex].title}
                </h1>
              </TextWrapper>
              <TextWrapper>
                <p
                  ref={descriptionRef}
                  className="text-zinc-950/70 text-xs md:text-sm w-full line-clamp-2 max-w-72"
                >
                  {slides[currentIndex].description}
                </p>
              </TextWrapper>
            </div>

            <TextWrapper>
              <div ref={priceRef} className="text">
                <span className="text-2xl md:text-3xl">
                  {slides[currentIndex].price}
                </span>{" "}
                $
              </div>
            </TextWrapper>
          </div>

          <div className="center-layout w-full h-full -z-10">
            <MorphingSVG
              currentIndex={currentIndex}
              slides={slides.map((slide) => slide.image)}
              direction={direction}
            />
          </div>

          <div className="flex justify-between items-end">
            <div ref={indexCtnRef} className="flex text-2xl tracking-widest gap-2">
              <div className="h-8 overflow-hidden">
                <div ref={indexRef} className="flex flex-col">
                  {Array.from({ length: slides.length }, (_, i) => (
                    <span
                      key={i}
                      className={`flex ${
                        i === currentIndex ? "text-zinc-950" : "opacity-50"
                      }`}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  ))}
                </div>
              </div>
              <span className="opacity-50">
                {" "}
                - {String(slides.length).padStart(2, "0")}
              </span>
            </div>

            <div ref={buttonsRef} className="flex items-center gap-3">
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
