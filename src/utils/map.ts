import { LngLatLike, LngLatBoundsLike, Map as MapboxMap, MapMouseEvent, MapboxGeoJSONFeature } from 'mapbox-gl';

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

export const flyTo = (map: MapboxMap, center: LngLatLike, zoom: number) => {
  map.flyTo({ center, zoom });
};

export const fitBounds = (map: MapboxMap, bounds: LngLatBoundsLike, padding: number) => {
  map.fitBounds(bounds, { padding });
};

export const setMapInteractionsStatus = (map: MapboxMap, enabled: boolean) => {
  if (enabled) {
    map.boxZoom.enable();
    map.doubleClickZoom.enable();
    map.dragPan.enable();
    map.dragRotate.enable();
    map.keyboard.enable();
    map.scrollZoom.enable();
    map.touchZoomRotate.enable();
  } else {
    map.boxZoom.disable();
    map.doubleClickZoom.disable();
    map.dragPan.disable();
    map.dragRotate.disable();
    map.keyboard.disable();
    map.scrollZoom.disable();
    map.touchZoomRotate.disable();
  }
};
