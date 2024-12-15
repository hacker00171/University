import React, { useEffect, useRef } from 'react';
import { Card } from '@/app/map-region-view/components/card';
import * as d3 from 'd3';

interface StateMapViewProps {
  stateName: string;
}

const StateMapView: React.FC<StateMapViewProps> = ({ stateName }) => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    // Clear any existing content
    d3.select(svgRef.current).selectAll("*").remove();

    // Load the SVG file
    d3.xml('/saudi-arabia.svg').then(data => {
      const importedNode = document.importNode(data.documentElement, true);
      
      // Find the path for the selected state
      const paths = importedNode.getElementsByTagName('path');
      let selectedPath = null;
      
      // Map state names to IDs in the SVG
      const stateToId: Record<string, string> = {
        'Riyadh': 'SA-12',
        'Makkah': 'SA-11',
        'Madinah': 'SA-08',
        'Eastern Province': 'SA-01',
        'Qassim': 'SA-10',
        'Hail': 'SA-09',
        'Tabuk': 'SA-07',
        'Northern Borders': 'SA-02',
        'Jazan': 'SA-06',
        'Najran': 'SA-04',
        'Al Bahah': 'SA-13',
        'Al Jawf': 'SA-03',
        'Asir': 'SA-05'
      };

      // Find the path for the selected state
      for (const path of paths) {
        if (path.id === stateToId[stateName]) {
          selectedPath = path.cloneNode(true) as SVGPathElement;
          break;
        }
      }

      if (selectedPath) {
        // Create a new SVG element
        const svg = d3.select(svgRef.current)
          .attr('width', '100%')
          .attr('height', '100%')
          .attr('viewBox', '0 0 800 800')
          .attr('preserveAspectRatio', 'xMidYMid meet');

        // Create a gradient for the fill
        const gradient = svg.append('defs')
          .append('linearGradient')
          .attr('id', 'stateGradient')
          .attr('x1', '0%')
          .attr('y1', '0%')
          .attr('x2', '100%')
          .attr('y2', '100%');

        gradient.append('stop')
          .attr('offset', '0%')
          .attr('style', 'stop-color:#4a5bff;stop-opacity:0.6');

        gradient.append('stop')
          .attr('offset', '100%')
          .attr('style', 'stop-color:#00E1E2;stop-opacity:0.3');

        // Create a group for the path
        const g = svg.append('g');

        // Append the selected path
        g.node()?.appendChild(selectedPath);

        // Style the path
        d3.select(selectedPath)
          .style('fill', 'url(#stateGradient)')
          .style('stroke', '#2D4393')
          .style('stroke-width', '2');

        // Get the bounding box of the path
        const bbox = (selectedPath as SVGPathElement).getBBox();

        // Calculate scale and translation to fit and center the path
        const scale = Math.min(800 / bbox.width, 800 / bbox.height) * 0.8;
        const translateX = (800 - bbox.width * scale) / 2 - bbox.x * scale;
        const translateY = (800 - bbox.height * scale) / 2 - bbox.y * scale;

        // Apply the transformation
        g.attr('transform', `translate(${translateX},${translateY}) scale(${scale})`);

        // Add university markers
        const universities = [
          { name: "King Fahd University", x: bbox.x + bbox.width * 0.3, y: bbox.y + bbox.height * 0.4 },
          { name: "Imam Abdulrahman University", x: bbox.x + bbox.width * 0.7, y: bbox.y + bbox.height * 0.6 },
          { name: "Arab Open University", x: bbox.x + bbox.width * 0.5, y: bbox.y + bbox.height * 0.5 }
        ];

        // Add markers for universities
        universities.forEach(uni => {
          const marker = g.append('g')
            .attr('transform', `translate(${uni.x},${uni.y})`);

          // Add marker circle
          marker.append('circle')
            .attr('r', 5)
            .style('fill', '#00E1E2')
            .style('stroke', '#ffffff')
            .style('stroke-width', '2');

          // Add university name
          marker.append('text')
            .attr('x', 10)
            .attr('y', 0)
            .style('fill', '#ffffff')
            .style('font-size', '12px')
            .style('font-weight', 'bold')
            .text(uni.name);
        });
      }
    }).catch(error => {
      console.error('Error loading SVG:', error);
    });
  }, [stateName]);

  return (
    <Card className="bg-[#162464]/50 border-[#2D4393] p-4 mb-4">
      <h3 className="text-[#00E1E2] mb-2 text-sm">{stateName} Map View</h3>
      <div className="aspect-square w-full">
        <svg ref={svgRef} className="w-full h-full"></svg>
      </div>
    </Card>
  );
};

export default StateMapView;
