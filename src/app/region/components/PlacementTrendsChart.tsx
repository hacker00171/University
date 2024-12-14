'use client';

import { FC, useEffect, useRef } from 'react';
import * as d3 from 'd3';

interface PlacementTrend {
  year: number;
  localMale: number;
  localFemale: number;
  internationalMale: number;
  internationalFemale: number;
}

interface Props {
  data: PlacementTrend[];
}

const PlacementTrendsChart: FC<Props> = ({ data }) => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!data || !svgRef.current) return;

    // Clear previous chart
    d3.select(svgRef.current).selectAll('*').remove();

    const margin = { top: 20, right: 30, bottom: 40, left: 60 };
    const width = 500 - margin.left - margin.right;
    const height = 340 - margin.top - margin.bottom;

    const svg = d3.select(svgRef.current)
      .attr('width', '100%')
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    // X scale
    const x = d3.scaleLinear()
      .domain(d3.extent(data, d => d.year) as [number, number])
      .range([0, width]);

    // Y scale
    const y = d3.scaleLinear()
      .domain([0, 100])
      .range([height, 0]);

    // Add grid lines
    svg.append('g')
      .attr('class', 'grid')
      .attr('opacity', 0.1)
      .call(d3.axisLeft(y)
        .tickSize(-width)
        .tickFormat(() => '')
      )
      .style('stroke', '#374151');

    // Add X axis
    svg.append('g')
      .attr('transform', `translate(0,${height})`)
      .attr('class', 'axis')
      .call(d3.axisBottom(x).ticks(5).tickFormat(d => d.toString()))
      .style('color', '#9CA3AF')
      .selectAll('line')
      .style('stroke', '#9CA3AF');

    // Add Y axis
    svg.append('g')
      .attr('class', 'axis')
      .call(d3.axisLeft(y).ticks(5).tickFormat(d => `${d}%`))
      .style('color', '#9CA3AF')
      .selectAll('line')
      .style('stroke', '#9CA3AF');

    // Define gradient
    const gradient = svg.append('defs')
      .selectAll('linearGradient')
      .data(['localMale', 'localFemale', 'internationalMale', 'internationalFemale'])
      .enter()
      .append('linearGradient')
      .attr('id', d => `line-gradient-${d}`)
      .attr('gradientUnits', 'userSpaceOnUse')
      .attr('x1', 0)
      .attr('y1', height)
      .attr('x2', 0)
      .attr('y2', 0);

    gradient.append('stop')
      .attr('offset', '0%')
      .attr('stop-color', (d, i) => {
        const colors = ['#00ff87', '#0ea5e9', '#f59e0b', '#ec4899'];
        return colors[i];
      })
      .attr('stop-opacity', 0.2);

    gradient.append('stop')
      .attr('offset', '100%')
      .attr('stop-color', (d, i) => {
        const colors = ['#00ff87', '#0ea5e9', '#f59e0b', '#ec4899'];
        return colors[i];
      })
      .attr('stop-opacity', 1);

    // Add lines with animation
    const lineColors = ['#00ff87', '#0ea5e9', '#f59e0b', '#ec4899'];
    const categories = [
      { key: 'localMale', name: 'Local Male' },
      { key: 'localFemale', name: 'Local Female' },
      { key: 'internationalMale', name: 'International Male' },
      { key: 'internationalFemale', name: 'International Female' }
    ];

    categories.forEach((category, i) => {
      const line = d3.line<PlacementTrend>()
        .x(d => x(d.year))
        .y(d => y(d[category.key as keyof PlacementTrend] as number))
        .curve(d3.curveMonotoneX);

      // Add the area
      const area = d3.area<PlacementTrend>()
        .x(d => x(d.year))
        .y0(height)
        .y1(d => y(d[category.key as keyof PlacementTrend] as number))
        .curve(d3.curveMonotoneX);

      svg.append('path')
        .datum(data)
        .attr('class', 'area')
        .attr('fill', `url(#line-gradient-${category.key})`)
        .attr('d', area);

      const path = svg.append('path')
        .datum(data)
        .attr('fill', 'none')
        .attr('stroke', lineColors[i])
        .attr('stroke-width', 3)
        .attr('d', line);

      const pathLength = path.node()?.getTotalLength() || 0;
      
      path.attr('stroke-dasharray', pathLength)
        .attr('stroke-dashoffset', pathLength)
        .transition()
        .duration(1000)
        .attr('stroke-dashoffset', 0);
    });

    // Add labels
    svg.append('text')
      .attr('transform', `translate(${width/2}, ${height + margin.top + 20})`)
      .style('text-anchor', 'middle')
      .style('fill', '#9CA3AF')
      .text('Year');

    svg.append('text')
      .attr('transform', 'rotate(-90)')
      .attr('y', 0 - margin.left)
      .attr('x', 0 - (height / 2))
      .attr('dy', '1em')
      .style('text-anchor', 'middle')
      .style('fill', '#9CA3AF')
      .text('Placement Rate (%)');
  }, [data]);

  return (
    <div className="bg-gradient-to-br from-[#2c327a] to-[#1a1f4e] rounded-lg p-5 shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-white">Placement Trends</h2>
      </div>
      <div className="flex flex-wrap gap-6 items-center mb-4">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-[#00ff87]"></div>
          <span className="text-gray-300 text-sm">Local Male</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-[#0ea5e9]"></div>
          <span className="text-gray-300 text-sm">Local Female</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-[#f59e0b]"></div>
          <span className="text-gray-300 text-sm">International Male</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-[#ec4899]"></div>
          <span className="text-gray-300 text-sm">International Female</span>
        </div>
      </div>

      <div className="h-[340px] w-[500px] mx-auto">
        <svg ref={svgRef} className="w-full h-full"></svg>
      </div>
    </div>
  );
};

export default PlacementTrendsChart;
