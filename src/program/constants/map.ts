import { LngLatBoundsLike, LngLatLike } from 'mapbox-gl';
import { colors } from '../../styles/colors';

export const DEFAULT_LNG = -96.1222;
export const DEFAULT_LAT = 38.9832;
export const DEFAULT_LNG_LAT = [DEFAULT_LNG, DEFAULT_LAT] as LngLatLike;
export const USA_BOUNDS = [
  [-66.94, 49.38],
  [-124.39, 25.82],
] as LngLatBoundsLike;
export const DEFAULT_BOUNDS_PADDING = 20;
export const DEFAULT_ZOOM = 3.4;

export const FEATURE_STATE_GUESSES_KEY = 'guesses';

export const CHOROPLETH_WRONG_ANSWERS_COLORS = [
  colors.red[100],
  colors.red[300],
  colors.red[400],
  colors.red[500],
  colors.red[600],
  colors.red[700],
];
