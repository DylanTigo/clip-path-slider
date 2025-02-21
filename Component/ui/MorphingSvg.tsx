/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import * as d3 from "d3";
import { useEffect, useRef, useState } from "react";

type MorphingSVGProps = {
  currentIndex: number;
  slides: string[];
  direction: "next" | "prev"; // Made the direction type more specific
}

const MorphingSVG: React.FC<MorphingSVGProps> = ({
  currentIndex,
  slides,
  direction,
}) => {
  const [visible, setVisible] = useState(false);
  const [dimensions, setDimensions] = useState(400);
  const svgRef = useRef<SVGSVGElement>(null);
  const initialArc = d3
      .arc()
      .innerRadius(0)
      .outerRadius(dimensions / 2)
      .startAngle(direction === "next" ? 2 * Math.PI : 0)
      .endAngle(Math.PI * 2);

  useEffect(() => {
    const updateDimensions = () => {
      const rect = svgRef.current?.getBoundingClientRect();
      if (!rect) return;

      setDimensions(rect.width);
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);

    const svg = d3.select(svgRef.current);
    slides.forEach((slide, index) => {
      const clipPathId = `circle-mask-${index}`;
      svg
        .append("clipPath")
        .attr("id", clipPathId)
        .style("transform", "rotate(215deg)")
        .style("transform-origin", "center")
        .append("path")
        .attr(
          "transform",
          `translate(${dimensions / 2}, ${dimensions / 2})`
        )
        .attr("d", initialArc);

      svg
        .append("image")
        .attr("id", `image-${index}`)
        .style("z-index", index + 1)
        .attr("width", "100%")
        .attr("href", slide)
        .attr("clip-path", `url(#${clipPathId})`);
    });

    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  // Handle animation
  useEffect(() => {
    const svg = d3.select(svgRef.current);
    if (!svg.node()) return;

    const handleNextDirection = () => {
      const clipPathId = `circle-mask-${currentIndex}`;
      const currentClipPath = d3.select(`#${clipPathId} path`)
      setVisible(true);

      currentClipPath
        .transition()
        .delay(currentIndex === 0 ? 700 : 0)
        .ease(d3.easeQuadOut)
        .duration(1000)
        .attrTween("d", () => {
          const interpolate = d3.interpolate(2 * Math.PI, 0);
          return (t: number) => initialArc.endAngle(interpolate(t))();
        });
    };

    const handlePrevDirection = () => {
      const prevClipPath = svg.select(`#circle-mask-${currentIndex + 1} path`);

      if (!prevClipPath.empty()) {
        prevClipPath
          .transition()
          .ease(d3.easeQuadOut)
          .duration(1000)
          .attrTween("d", () => {
            const interpolate = d3.interpolate(0, 2 * Math.PI);
            return (t: number) => initialArc.startAngle(interpolate(t))();
          });
      }
    };

    // Execute animation based on direction
    if (direction === "next") {
      handleNextDirection();
    } else {
      handlePrevDirection();
    }

    // Cleanup function
    return () => {
      svg.selectAll("*.transition").interrupt();
    };
  }, [direction, currentIndex, dimensions, slides, initialArc]);

  return (
    <svg
      ref={svgRef}
      width="95%"
      height="95%"
      className="center-layout"
      style={{
        maxWidth: 400,
        maxHeight: 400,
        borderRadius: "50%",
        opacity: visible ? 1 : 0,
        transition: "opacity 0.3s ease-in-out",
      }}
    />
  );
};

export default MorphingSVG;
