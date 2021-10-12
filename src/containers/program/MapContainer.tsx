import { useEffect, useState } from 'react';
import { Skeleton } from '@mui/material';
import { Map as MapboxMap } from 'mapbox-gl';
import { usePrevious } from 'react-use';
import { useRecoilValue, useSetRecoilState, useResetRecoilState } from 'recoil';
import styled from 'styled-components';
import { Map } from '../../components/common/Map/Map';
import { FEATURE_STATE_GUESSES_KEY } from '../../constants/map';
import { DEFAULT_PROGRAM_BREAKPOINT } from '../../constants/style';
import { gameStatusState, guessesState, selectedItemState, targetItemState } from '../../recoil/game/game';
import { GameStatus } from '../../recoil/game/types';
import { colors } from '../../styles/colors';
import { theme } from '../../styles/theme';
import { getFeatureFromSource } from '../../utils/map';
import { pxToRem } from '../../utils/style';

const Container = styled.div`
  border: 1px solid ${colors.gray[200]};
  border-radius: ${pxToRem(4)};
  box-shadow: ${theme.shadows[3]};
  height: 100%;
  min-height: 450px;
  overflow: hidden;
  width: 100%;
  position: relative;
  margin-bottom: ${pxToRem(16)};

  @media (min-width: ${DEFAULT_PROGRAM_BREAKPOINT}px) {
    margin-bottom: 0;
    min-height: 500px;
  }
`;

const MapWrapper = styled.div<{ isLoading: boolean }>`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  opacity: ${(props) => (props.isLoading ? 0 : 1)};
  height: 100%;
  width: 100%;
  transition: opacity 1s linear;
`;

const StyledSkeleton = styled(Skeleton)`
  height: 100%;
  width: 100%;
`;

const SOURCE = 'states';

export const MapContainer = () => {
  const setSelectedItem = useSetRecoilState(selectedItemState);
  const targetItem = useRecoilValue(targetItemState);
  const guesses = useRecoilValue(guessesState);
  const resetGuesses = useResetRecoilState(guessesState);
  const gameStatus = useRecoilValue(gameStatusState);
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

    resetGuesses();
  }, [guesses, isStartingNewGameFromGameOver, mapboxMap, resetGuesses]);

  return (
    <Container>
      <StyledSkeleton animation="wave" />
      <MapWrapper isLoading={loading}>
        <Map onLoad={onLoad} onClick={(item) => setSelectedItem(item)} resetBoundsOnThisValueChange={targetItem} />
      </MapWrapper>
    </Container>
  );
};
