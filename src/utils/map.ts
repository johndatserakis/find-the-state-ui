import { Map as MapboxMap, MapMouseEvent, MapboxGeoJSONFeature } from 'mapbox-gl';

export const getTopFeatureAtMouseEvent = (
  event: MapMouseEvent,
  map: MapboxMap,
  layerId: string,
): MapboxGeoJSONFeature | undefined => {
  const { point } = event;
  const layers = [layerId];

  try {
    const renderedFeatures = map.queryRenderedFeatures(point, { layers });
    if (!renderedFeatures.length) return;
    return renderedFeatures[0];
  } catch (error) {
    return undefined;
  }
};
