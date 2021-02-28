import React, { useEffect, useRef, useState } from 'react';
import { Map as MapboxMap } from 'mapbox-gl';

export const Map = () => {
  const [mapboxMap, setMapboxMap] = useState<MapboxMap>();
  const mapContainer = useRef<HTMLDivElement>(null);
  const [lng, setLng] = useState(-70.9);
  const [lat, setLat] = useState(42.35);
  const [zoom, setZoom] = useState(9);

  useEffect(() => {
    if (!mapContainer.current) return;

    const map = new MapboxMap({
      accessToken: process.env.REACT_APP_MAPBOX_TOKEN,
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [lng, lat],
      zoom: zoom,
    });

    setMapboxMap(map);

    return () => map.remove();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {mapboxMap && (
        <div>
          <div className="map-container" ref={mapContainer} style={{ height: '600px', width: '100%' }} />
        </div>
      )}
      <div>Loading...</div>
    </>
  );
};
