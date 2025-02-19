"use client";

import * as d3 from "d3";
import { useEffect, useRef, useState } from "react";

const MorphingSVG = ({ image, index }: { index: number, image: string }) => {
  const [visible, setVisible] = useState(false);

  const svgRef = useRef<SVGSVGElement>(null);
  
  useEffect(() => {
    const rect = svgRef.current?.getBoundingClientRect();
    if (!rect) return;
    const { width, height } = rect;

    const svg = d3.select(svgRef.current).style("z-index", index);

    const clipPathId = `circle-mask-${index}`;
    const existingClipPath = svg.select(`#${clipPathId}`);
    if (!existingClipPath.empty()) return
    // Définition de l'arc
    const arc = d3
      .arc()
      .innerRadius(0) 
      .outerRadius(width / 2)
      .startAngle(2 * Math.PI )
      .endAngle(2 * Math.PI );
      
    const clipPath = svg
      .append("clipPath")
      .attr("id", clipPathId)
      .style("transform", "rotate(215deg)")
      .style("transform-origin", "center")
      .append("path")
      .attr("d", arc)
      .attr("transform", `translate(${width / 2}, ${height / 2})`);

    setVisible(true);

    // Animation d'ouverture
    clipPath
      .transition()
      .duration(1500)
      .attrTween("d", function () {
        const interpolate = d3.interpolate( 2 * Math.PI, 0);
        return function (t: number) {
          return arc.endAngle(interpolate(t))();
        };
      })

     return () => {
       svg.select(`#${clipPathId}`).remove();
     }
  }, [index]);

  return (
      <svg
        ref={svgRef}
        width="95%"
        height="95%"
        clipPath={`url(#circle-mask-${index})`}
        opacity={visible ? 1 : 0}
        className="center-layout"
        style={{
          maxWidth: 400,
          maxHeight: 400
        }}
      >
       <image
        href={image}
        width="100%"
        
      />
      </svg>
    );
};

export default MorphingSVG;
