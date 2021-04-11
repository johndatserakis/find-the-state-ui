import { useEffect, useRef, useState } from 'react';
import { Map as MapboxMap, NavigationControl } from 'mapbox-gl';
import styled from 'styled-components/macro';
import { getTopFeatureAtMouseEvent, fitBounds, setMapInteractionsStatus } from '../../../utils/map';
import { colors } from '../../../style/colors';
import { DEFAULT_LNG, DEFAULT_LAT, DEFAULT_BOUNDS_PADDING, DEFAULT_ZOOM, USA_BOUNDS } from '../../../constants/map';
import { Display } from './Display';
import { FEATURE_STATE_GUESSES_KEY } from '../../../constants/map';
// Seems to not like the .geojson filename, json works fine though
// @ts-ignore
import _states from '../../../data/states.geojson';

const MapContainer = styled.div`
  height: 100%;
  position: relative;
  width: 100%;
`;

interface MapProps {
  onLoad: (mapboxMap: MapboxMap) => void;
  onClick: (item: string) => void;
  resetBoundsOnThisValueChange?: unknown;
}

export const Map = ({ onLoad, onClick, resetBoundsOnThisValueChange }: MapProps) => {
  const [mapboxMap, setMapboxMap] = useState<MapboxMap>();
  const mapContainer = useRef<HTMLDivElement>(null);
  const [lockMap, setLockMap] = useState(false);
  const [showGuessChoropleth, setShowGuessChoropleth] = useState(false);
  const [showLabels, setShowLabels] = useState(false);

  useEffect(() => {
    if (!mapContainer.current) return;

    const map = new MapboxMap({
      accessToken: process.env.REACT_APP_MAPBOX_TOKEN,
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [DEFAULT_LNG, DEFAULT_LAT],
      zoom: DEFAULT_ZOOM,
      logoPosition: 'bottom-right',
    });

    map.addControl(new NavigationControl());

    map.on('load', () => {
      map.doubleClickZoom.disable();
      map.setLayoutProperty('state-label', 'visibility', 'none');
      map.setLayoutProperty('settlement-label', 'visibility', 'none');

      map.addSource('states', {
        type: 'geojson',
        data: _states,
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

      map.addLayer({
        id: 'guess-choropleth',
        type: 'fill',
        source: 'states',
        layout: {
          visibility: 'none',
        },
        paint: {
          'fill-color': [
            'case',
            ['==', ['feature-state', FEATURE_STATE_GUESSES_KEY], null],
            colors.red[100],
            ['==', ['feature-state', FEATURE_STATE_GUESSES_KEY], 0],
            colors.red[100],
            [
              'interpolate',
              ['linear'],
              ['feature-state', FEATURE_STATE_GUESSES_KEY],
              1,
              colors.red[200],
              20,
              colors.red[700],
            ],
          ],
          'fill-outline-color': colors.blue[500],
          'fill-opacity': 0.8,
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
        const feature = getTopFeatureAtMouseEvent(map, e, 'state-fills');
        if (!feature) return;

        const { properties } = feature;
        const state = properties?.STATE_NAME;

        onClick(state);
      });
    });

    // Kinda secret/unapproved way to mark a true complete map load
    // https://stackoverflow.com/a/54140160/8014660
    map.once('idle', () => {
      onLoad(map);
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

  const onShowGuessChoroplethChecked = (s: boolean) => {
    if (!mapboxMap) return;

    setShowGuessChoropleth(s);
    mapboxMap.setLayoutProperty('guess-choropleth', 'visibility', s ? 'visible' : 'none');
  };

  return (
    <MapContainer className="map-container" ref={mapContainer}>
      <Display
        lockMap={lockMap}
        showGuessChoropleth={showGuessChoropleth}
        showLabels={showLabels}
        onLockMapChecked={onLockMapChecked}
        onShowGuessChoroplethChecked={onShowGuessChoroplethChecked}
        onShowLabelsChecked={onShowLabelsChecked}
      />
    </MapContainer>
  );
};
