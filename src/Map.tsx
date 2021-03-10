import React, { useEffect, useRef, useState } from 'react';
import { Map as MapboxMap, MapMouseEvent, MapboxGeoJSONFeature } from 'mapbox-gl';

const getFeatureAtMouseEvent = (
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

export const Map = () => {
  const [mapboxMap, setMapboxMap] = useState<MapboxMap>();
  const mapContainer = useRef<HTMLDivElement>(null);
  const [lng, setLng] = useState(-100.486052);
  const [lat, setLat] = useState(37.830348);
  const [zoom, setZoom] = useState(3.75);

  useEffect(() => {
    console.log('mapContainer', mapContainer);

    if (!mapContainer.current) return;

    const map = new MapboxMap({
      accessToken: process.env.REACT_APP_MAPBOX_TOKEN,
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [lng, lat],
      zoom: zoom,
    });

    var hoveredStateId: string | number | undefined = '';

    map.on('load', () => {
      map.addSource('states', {
        type: 'geojson',
        data: 'https://docs.mapbox.com/mapbox-gl-js/assets/us_states.geojson',
      });

      map.addLayer({
        id: 'state-fills',
        type: 'fill',
        source: 'states',
        layout: {},
        paint: {
          'fill-color': '#627BC1',
          'fill-opacity': ['case', ['boolean', ['feature-state', 'hover'], false], 1, 0.5],
        },
      });

      map.addLayer({
        id: 'state-borders',
        type: 'line',
        source: 'states',
        layout: {},
        paint: {
          'line-color': '#627BC1',
          'line-width': 2,
        },
      });

      map.on('mousemove', 'state-fills', function (e) {
        if (e && e.features && e.features.length > 0) {
          if (hoveredStateId) {
            map.setFeatureState({ source: 'states', id: hoveredStateId }, { hover: false });
          }
          hoveredStateId = e.features[0].id;
          map.setFeatureState({ source: 'states', id: hoveredStateId }, { hover: true });
        }
      });

      map.on('mouseleave', 'state-fills', function () {
        if (hoveredStateId) {
          map.setFeatureState({ source: 'states', id: hoveredStateId }, { hover: false });
        }
        hoveredStateId = undefined;
      });

      map.on('click', (e) => {
        const feature = getFeatureAtMouseEvent(e, map, 'state-fills');
        if (!feature) return;

        const { properties } = feature;
        const state = properties?.STATE_NAME;

        console.log('feature', feature);
        console.log('properties', properties);
        console.log('state', state);
      });
    });

    console.log('map', map);
    setMapboxMap(map);

    return () => map.remove();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.log('mapboxMap', mapboxMap);

  return (
    <>
      <div className="map-container" ref={mapContainer} style={{ height: '600px', width: '100%' }} />
      {/* {mapboxMap && (
        <div>
          <div className="map-container" ref={mapContainer} style={{ height: '600px', width: '100%' }} />
        </div>
      )} */}
      {/* <div>Loading...</div> */}
    </>
  );
};
