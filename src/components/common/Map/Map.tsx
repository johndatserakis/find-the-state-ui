import { useEffect, useRef, useState } from 'react';
import { Map as MapboxMap, NavigationControl } from 'mapbox-gl';
import styled from 'styled-components/macro';
import { getTopFeatureAtMouseEvent, fitBounds, setMapInteractionsStatus } from '../../../utils/map';
import { colors } from '../../../style/colors';
import { DEFAULT_LNG, DEFAULT_LAT, DEFAULT_BOUNDS_PADDING, DEFAULT_ZOOM, USA_BOUNDS } from '../../../constants/map';
import { Display } from './Display';

const MapContainer = styled.div`
  height: 100%;
  position: relative;
  width: 100%;
`;

interface MapProps {
  onLoad: () => void;
  onClick: (item: string) => void;
  resetBoundsOnThisValueChange?: unknown;
}

export const Map = ({ onLoad, onClick, resetBoundsOnThisValueChange }: MapProps) => {
  const [mapboxMap, setMapboxMap] = useState<MapboxMap>();
  const mapContainer = useRef<HTMLDivElement>(null);
  const [showLabels, setShowLabels] = useState(false);
  const [lockMap, setLockMap] = useState(false);

  useEffect(() => {
    if (!mapContainer.current) return;

    const map = new MapboxMap({
      accessToken: process.env.REACT_APP_MAPBOX_TOKEN,
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [DEFAULT_LNG, DEFAULT_LAT],
      zoom: DEFAULT_ZOOM,
    });

    map.addControl(new NavigationControl());

    map.doubleClickZoom.disable();

    map.on('load', () => {
      map.setLayoutProperty('state-label', 'visibility', 'none');
      map.setLayoutProperty('settlement-label', 'visibility', 'none');

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
          'fill-color': colors.purple[700],
          'fill-opacity': ['case', ['boolean', ['feature-state', 'hover'], false], 0.85, 0.5],
        },
      });

      map.addLayer({
        id: 'state-borders',
        type: 'line',
        source: 'states',
        layout: {},
        paint: {
          'line-color': colors.blue[500],
          'line-width': 2,
        },
      });

      let hoveredStateId: string | number | undefined = '';

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

        onClick(state);
      });
    });

    // Kinda secret/unapproved way to mark a true complete map load
    // https://stackoverflow.com/a/54140160/8014660
    map.once('idle', () => {
      onLoad();
    });

    fitBounds(map, USA_BOUNDS, DEFAULT_BOUNDS_PADDING);

    setMapboxMap(map);

    return () => map.remove();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!mapboxMap) return;

    fitBounds(mapboxMap, USA_BOUNDS, DEFAULT_BOUNDS_PADDING);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mapboxMap, resetBoundsOnThisValueChange]);

  const onShowLabelsChecked = (sl: boolean) => {
    if (!mapboxMap) return;

    setShowLabels(sl);
    mapboxMap.setLayoutProperty('state-label', 'visibility', sl ? 'visible' : 'none');
  };

  const onLockMapChecked = (l: boolean) => {
    if (!mapboxMap) return;

    setLockMap(l);
    setMapInteractionsStatus(mapboxMap, !l);
  };

  return (
    <MapContainer className="map-container" ref={mapContainer}>
      <Display
        lockMap={lockMap}
        showLabels={showLabels}
        onLockMapChecked={onLockMapChecked}
        onShowLabelsChecked={onShowLabelsChecked}
      />
    </MapContainer>
  );
};
