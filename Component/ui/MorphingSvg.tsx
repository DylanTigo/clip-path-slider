"use client";

import * as d3 from "d3";
import { useEffect, useRef, useState } from "react";

const MorphingSVG = ({ image, index, direction }: { index: number, image: string, direction: string }) => {
  const [visible, setVisible] = useState(false);

  const svgRef = useRef<SVGSVGElement>(null);
  
  useEffect(() => {
    const rect = svgRef.current?.getBoundingClientRect();
    if (!rect) return;
    const { width, height } = rect;

    const svg = d3.select(svgRef.current).style("z-index", index+1);

    const clipPathId = `circle-mask-${index}`;

    const startAngle = direction === 'next' ? 2 * Math.PI : 0;

    // Définition de l'arc
    const arc = d3
      .arc()
      .innerRadius(0) 
      .outerRadius(width / 2)
      .startAngle( startAngle)
      .endAngle(2 * Math.PI );
    
    if (direction === 'next') {
      const clipPath = svg
      .append("clipPath")
      .attr("id", clipPathId)
      .style("transform", "rotate(215deg)")
      .style("transform-origin", "center")
      .append("path")
      .attr("d", arc)
      .attr("transform", `translate(${width / 2}, ${height / 2})`);

    setVisible(true);

    clipPath
      .transition()
      .duration(1500)
      .attrTween("d", function () {
        const interpolate = d3.interpolate( 2 * Math.PI, 0);
        return function (t: number) {
          return arc.endAngle(interpolate(t))();
        };
      })

    } else {
      const prevClipPathId = `#circle-mask-${index+1}`;
      console.log(prevClipPathId)
      const clipPath = svg
        .select(prevClipPathId + " path")
        .transition()
        .duration(1500)
        .attrTween("d", function () {
          const interpolate = d3.interpolate( 0, 2 * Math.PI);
          return function (t: number) {
            return arc.startAngle(interpolate(t))();
          };
        })
        .on("end", () => {
          svg.select(prevClipPathId).remove();
        });
      
    }
    

  }, [index, direction]);

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
          maxHeight: 400,
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
