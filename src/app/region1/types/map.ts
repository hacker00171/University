import { GeoJsonProperties, Geometry } from 'geojson';

export interface MapFeature {
  type: string;
  properties: GeoJsonProperties;
  geometry: Geometry;
}

export interface MapTopology {
  type: string;
  objects: {
    [key: string]: {
      type: string;
      geometries: Geometry[];
    };
  };
  arcs: number[][][];
  transform: {
    scale: [number, number];
    translate: [number, number];
  };
}

export interface MapData {
  type: string;
  features: MapFeature[];
}
