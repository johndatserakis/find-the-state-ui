import { useEffect, useState } from 'react';
import { Skeleton } from '@mui/material';
import { Map as MapboxMap } from 'mapbox-gl';
import { usePrevious } from 'react-use';
import styled from 'styled-components';
import { DEFAULT_PROGRAM_BREAKPOINT } from '../../constants/style';
import { colors } from '../../styles/colors';
import { theme } from '../../styles/theme';
import { pxToRem } from '../../utils/style';
import { Map } from '../components/Map/Map';
import { FEATURE_STATE_GUESSES_KEY } from '../constants/map';
import { GameStatus, Guesses, SelectedItem, TargetItem } from '../types/game';
import { getFeatureFromSource } from '../utils/map';

const Container = styled.div`
  background: ${colors.gray[50]};
  border-radius: ${pxToRem(4)};
  border: 1px solid ${colors.gray[50]};
  box-shadow: ${theme.shadows[3]};
  height: 100%;
  margin-bottom: ${pxToRem(16)};
  min-height: 450px;
  overflow: hidden;
  position: relative;
  width: 100%;

  @media (min-width: ${DEFAULT_PROGRAM_BREAKPOINT}px) {
    margin-bottom: 0;
    min-height: 500px;
  }
`;

const MapWrapper = styled.div<{ isLoading: boolean }>`
  background: ${colors.gray[50]};
  bottom: 0;
  height: 100%;
  left: 0;
  opacity: ${(props) => (props.isLoading ? 0 : 1)};
  position: absolute;
  right: 0;
  top: 0;
  transition: opacity 0.5s linear;
  width: 100%;
`;

const StyledSkeleton = styled(Skeleton)`
  height: 100%;
  min-height: 100%;
  transform: scale(1);
  width: 100%;
`;

const SOURCE = 'states';

interface MapContainerProps {
  gameStatus: GameStatus;
  guesses: Guesses;
  setGuesses: (guesses: Guesses) => void;
  setSelectedItem: (item: SelectedItem) => void;
  targetItem: TargetItem;
}

export const MapContainer = ({ gameStatus, guesses, setGuesses, setSelectedItem, targetItem }: MapContainerProps) => {
  const prevGameStatus = usePrevious(gameStatus);
  const isPrevGameOver =
    prevGameStatus === GameStatus.GAME_OVER || prevGameStatus === GameStatus.GAME_OVER_MANUAL_END_GAME;
  const isStartingNewGameFromGameOver = gameStatus === GameStatus.ACTIVE && isPrevGameOver;
  const [loading, setLoading] = useState(true);
  const [mapboxMap, setMapboxMap] = useState<MapboxMap>();

  const onLoad = (m: MapboxMap) => {
    setMapboxMap(m);
    setLoading(false);
  };

  // Update Choropleth data when a guess comes in
  useEffect(() => {
    if (!mapboxMap || !targetItem) return;

    const feature = getFeatureFromSource(mapboxMap, SOURCE, {
      key: 'STATE_NAME',
      value: targetItem,
    });
    if (!feature) return;

    const { id } = feature;
    mapboxMap.setFeatureState({ id, source: SOURCE }, { [FEATURE_STATE_GUESSES_KEY]: guesses[targetItem] });
  }, [guesses, mapboxMap, targetItem]);

  // Clear all dynamically added feature-states when a new game is started
  useEffect(() => {
    if (!mapboxMap || !isStartingNewGameFromGameOver) return;

    for (const [key] of Object.entries(guesses)) {
      const feature = getFeatureFromSource(mapboxMap, SOURCE, {
        key: 'STATE_NAME',
        value: key,
      });
      if (!feature) continue;

      const { id } = feature;
      mapboxMap.setFeatureState({ id, source: SOURCE }, { [FEATURE_STATE_GUESSES_KEY]: 0 });
    }

    setGuesses({});
  }, [guesses, isStartingNewGameFromGameOver, mapboxMap, setGuesses]);

  return (
    <Container>
      <StyledSkeleton animation="wave" />
      <MapWrapper isLoading={loading}>
        <Map onLoad={onLoad} onClick={(item) => setSelectedItem(item)} resetBoundsOnThisValueChange={targetItem} />
      </MapWrapper>
    </Container>
  );
};
