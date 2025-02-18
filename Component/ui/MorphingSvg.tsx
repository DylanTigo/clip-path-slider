"use client";

import * as d3 from "d3";
import { i } from "motion/react-client";
import { useEffect, useRef, useState } from "react";

const MorphingSVG = ({ image, index }: { image: string, index: number }) => {
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

    // Animation d'ouverture
    clipPath
      .transition()
      .duration(2000)
      .ease(d3.easeCubicOut)
      .attrTween("d", function () {
        const interpolate = d3.interpolate( 2 * Math.PI, 0);
        return function (t: number) {
          return arc.endAngle(interpolate(t))();
        };
      });
  }, []);

  return (
      <svg
        ref={ref}
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        opacity={visible ? 1 : 0}
        className="center-layout"
      >
        {/* Image masquée par le clipPath */}
        <image
          href={image}
          width={width}
          clipPath="url(#circle-mask)"
        />
      </svg>
    );
};

export default MorphingSVG;
