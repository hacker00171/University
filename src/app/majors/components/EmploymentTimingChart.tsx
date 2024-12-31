import React from 'react';
import { ResponsiveSankey } from '@nivo/sankey';

interface EmploymentTiming {
  generalMajor?: string;
  beforeGraduation: { count: number; percentage: number };
  withinFirstYear: { count: number; percentage: number };
  afterFirstYear: { count: number; percentage: number };
}

interface Props {
  generalMajor: string | null;
  data: EmploymentTiming[];
}

interface SankeyNode {
  id: string;
}

interface SankeyLink {
  source: string;
  target: string;
  value: number;
  color?: string;
}

interface SankeyData {
  nodes: SankeyNode[];
  links: SankeyLink[];
}

const nodeColors: { [key: string]: string } = {
  'Health and Welfare': '#06b6d4',
  'Engineering, manufacturing and construction': '#8b5cf6',
  'Business, administration and law': '#f59e0b',
  'Communications and Information Technology': '#ec4899',
  'Arts and Humanities': '#10b981',
  'All Majors': '#6366f1',
  'Before': '#22c55e',
  'Within 1st': '#f59e0b',
  'After 1st': '#ef4444',
};
const linkColors: { [key: string]: string } = {
  'Before': '#4ade80',
  'Within 1st': '#fbbf24',
  'After 1st': '#f87171',
};

const EmploymentTimingChart: React.FC<Props> = ({  data }) => {
  if (data.length === 0) {
    return (
      <div className="bg-gradient-to-r from-[#1a2657] to-[#1a2657]/90 p-6 rounded-lg flex items-center justify-center h-[400px]">
        <p className="text-gray-400">No employment timing data available</p>
      </div>
    );
  }

  const transformedData = data.reduce<SankeyData>((acc, item) => {
    const majorName = item.generalMajor || 'All Majors';

    if (!acc.nodes.some(node => node.id === majorName)) {
      acc.nodes.push({ id: majorName });
    }
    if (!acc.nodes.some(node => node.id === 'Before')) {
      acc.nodes.push({ id: 'Before' });
    }
    if (!acc.nodes.some(node => node.id === 'Within 1st')) {
      acc.nodes.push({ id: 'Within 1st' });
    }
    if (!acc.nodes.some(node => node.id === 'After 1st')) {
      acc.nodes.push({ id: 'After 1st' });
    }

    acc.links.push(
      {
        source: majorName,
        target: 'Before',
        value: item.beforeGraduation.count,
        color: linkColors['Before']
      },
      {
        source: majorName,
        target: 'Within 1st',
        value: item.withinFirstYear.count,
        color: linkColors['Within 1st']
      },
      {
        source: majorName,
        target: 'After 1st',
        value: item.afterFirstYear.count,
        color: linkColors['After 1st']
      }
    );

    return acc;
  }, { nodes: [], links: [] });

  return (
    <div className="bg-gradient-to-r from-[#1a2657] to-[#1a2657]/90 p-6 rounded-lg">
      <h3 className="text-white text-lg mb-4">Employment Timing Distribution</h3>
      <div className="h-[400px]">
        <ResponsiveSankey
          data={transformedData}
          margin={{ top: 20, right: 85, bottom: 20, left: 270 }}
          align="justify"
          colors={(node) => nodeColors[node.id] || '#4f46e5'}
          nodeOpacity={1}
          nodeHoverOthersOpacity={0.35}
          nodeThickness={18}
          nodeSpacing={24}
          nodeBorderWidth={0}
          nodeBorderRadius={3}
          linkOpacity={0.8}
          linkHoverOthersOpacity={0.1}
          linkBlendMode="normal"
          linkContract={3}
          enableLinkGradient={false}
          labelPosition="outside"
          labelOrientation="horizontal"
          labelPadding={16}
          labelTextColor={{ from: 'color', modifiers: [] }}
          animate={true}
          motionConfig="gentle"
          theme={{
            background: 'transparent',
            text: {
              fontSize: 12,
              fill: '#ffffff',
              fontWeight: 600,
            },
            tooltip: {
              container: {
                background: '#0a1230',
                color: '#ffffff',
                fontSize: '14px',
                borderRadius: '6px',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.3)',
                padding: '12px 16px',
              },
            },
          }}
        />
      </div>

      {/* Displaying Values Below the Chart */}
      
    </div>
  );
};

export default EmploymentTimingChart;
