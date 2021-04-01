import { LngLatBoundsLike, LngLatLike } from 'mapbox-gl';

export const DEFAULT_LNG = -96.1222;
export const DEFAULT_LAT = 38.9832;
export const DEFAULT_LNG_LAT = [DEFAULT_LNG, DEFAULT_LAT] as LngLatLike;
export const USA_BOUNDS = [
  [-66.94, 49.38],
  [-124.39, 25.82],
] as LngLatBoundsLike;
export const DEFAULT_BOUNDS_PADDING = 20;
export const DEFAULT_ZOOM = 3.4;
