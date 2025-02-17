"use client";

import * as d3 from "d3";
import { useEffect, useRef, useState } from "react";

const MorphingSVG = () => {
  const [visible, setVisible] = useState(false);

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
      .startAngle(2 * Math.PI ) // Début fermé
      .endAngle(2 * Math.PI ); // Fin fermé

    // Ajout du clipPath
    const clipPath = svg
      .append("clipPath")
      .attr("id", "circle-mask")
      .append("path")
      .attr("d", arc)
      .attr("transform", `translate(${width / 2}, ${height / 2})`);

    setVisible(true);

    console.log("Render");

    // Animation d'ouverture
    clipPath
      .transition()
      .duration(2000)
      .attrTween("d", function () {
        const interpolate = d3.interpolate( 2 * Math.PI, 0);
        return function (t: number) {
          return arc.endAngle(interpolate(t))();
        };
      });
  }, []);

  return (
    <>
      <svg
        ref={ref}
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        opacity={visible ? 1 : 0}
      >
        {/* Image masquée par le clipPath */}
        <image
          href="/image.png"
          width={width}
          clipPath="url(#circle-mask)"
        />
      </svg>
    </>
  );
};

export default MorphingSVG;
