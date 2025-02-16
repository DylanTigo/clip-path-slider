"use client";

import * as d3 from "d3";
import Image from "next/image";
import { useEffect, useRef } from "react";

const MorphingSVG = () => {
  const ref = useRef(null);
  const width = 400,
    height = 400;

  useEffect(() => {
    const svg = d3.select(ref.current);

    // Définition de l'arc
    const arc = d3
      .arc()
      .innerRadius(0) // Cercle plein
      .outerRadius(width / 2) // Rayon max du masque
      .startAngle(0)
      .endAngle(0); // Début fermé

    // Ajout du clipPath
    const clipPath = svg
      .append("clipPath")
      .attr("id", "circle-mask")
      .append("path")
      .attr("d", arc)
      .attr("transform", `translate(${width / 2}, ${height / 2})`);

    // Animation d'ouverture
    clipPath
      .transition()
      .duration(2000)
      .attrTween("d", function () {
        const interpolate = d3.interpolate(0, 2 * Math.PI);
        return function (t: number) {
          return arc.startAngle(interpolate(t))();
        };
      });
  }, []);

  return (
    <>
      <svg ref={ref} width={width} height={height} transform="rotate(-135)" viewBox={`0 0 ${width} ${height}`}>
        {/* Image masquée par le clipPath */}
        <image
          href="/image.png"
          style={{ objectFit: "cover", transformOrigin: "center", rotate: "135deg", objectPosition: "center" }}
          width={width}
          clipPath="url(#circle-mask)"
        />
      </svg>
    </>
  );
};

export default MorphingSVG;
