import { useEffect, useRef, useState } from 'react';
import { Map as MapboxMap } from 'mapbox-gl';
import styled from 'styled-components/macro';
import { getTopFeatureAtMouseEvent } from '../utils/map';
import { blue500, blue600 } from '../utils/colors';

const DEFAULT_LNG = -96.7079;
const DEFAULT_LAT = 38.9832;
const DEFAULT_ZOOM = 3.5;

const Container = styled.div`
  height: 500px;
  margin: 0 auto;
  width: 1000px;
`;

const MapContainer = styled.div`
  height: 100%;
  width: 100%;
`;

export const Map = () => {
  const [mapboxMap, setMapboxMap] = useState<MapboxMap>();
  const mapContainer = useRef<HTMLDivElement>(null);
  const [selectedState, setSelectedState] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (!mapContainer.current) return;

    const map = new MapboxMap({
      accessToken: process.env.REACT_APP_MAPBOX_TOKEN,
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [DEFAULT_LNG, DEFAULT_LAT],
      zoom: DEFAULT_ZOOM,
    });

    map.dragPan.disable();
    map.scrollZoom.disable();

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
          'fill-color': blue500,
          'fill-opacity': ['case', ['boolean', ['feature-state', 'hover'], false], 0.85, 0.5],
        },
      });

      map.addLayer({
        id: 'state-borders',
        type: 'line',
        source: 'states',
        layout: {},
        paint: {
          'line-color': blue600,
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
        const feature = getTopFeatureAtMouseEvent(e, map, 'state-fills');
        if (!feature) return;

        const { properties } = feature;
        const state = properties?.STATE_NAME;

        setSelectedState(state);
      });
    });

    setMapboxMap(map);

    return () => map.remove();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.log('mapboxMap', mapboxMap);

  return (
    <Container>
      <MapContainer className="map-container" ref={mapContainer} />
      {selectedState}
    </Container>
  );
};
