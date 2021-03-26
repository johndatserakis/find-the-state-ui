/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from 'react';
import { Map } from '../components/Map';
import { Display } from '../components/Display';
import { availableItemsState, targetItemState, usedItemsState } from '../recoil/game';
import { useRecoilState, useRecoilValue, useSetRecoilState, useResetRecoilState } from 'recoil';
import { sample as _sample } from 'lodash';
import { Container } from '@material-ui/core';
import { Grid } from '../components/mui/Grid';
import styled from 'styled-components/macro';
import { shadows } from '@material-ui/system';
import { withTheme } from '@material-ui/core/styles';

const StyledContainer = styled(Container)`
  height: 100%;
  padding-top: 2rem;
  padding-bottom: 2rem;

  @media (min-width: 960px) {
    height: 95vh;
  }
`;

const MapContainer = styled.div`
  border-radius: 0.25rem;
  box-shadow: ${({ theme }) => theme.shadows[3]};
  height: 100%;
  min-height: 500px;
  overflow: hidden;
  width: 100%;
`;

export const Home = () => {
  const [targetItem, setTargetItem] = useRecoilState(targetItemState);
  const resetTargetItem = useResetRecoilState(targetItemState);
  const setUsedItems = useSetRecoilState(usedItemsState);
  const resetUsedItems = useResetRecoilState(usedItemsState);
  const [selected, setSelected] = useState<string | undefined>(undefined);
  const [isWrongAnswer, setIsWrongAnswer] = useState(false);
  const [isRightAnswer, setIsRightAnswer] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);
  const availableItems = useRecoilValue(availableItemsState);

  // Set a random item on first load
  useEffect(() => {
    const randomItem = _sample(availableItems);
    if (randomItem) {
      setTargetItem(randomItem);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Deal with the selected item
  useEffect(() => {
    if (!selected) return;

    if (selected === targetItem) {
      setIsRightAnswer(true);
      setIsWrongAnswer(false);
      setUsedItems((old) => [...old, selected]);
      setSelected(undefined);
    } else {
      setIsRightAnswer(false);
      setIsWrongAnswer(true);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected]);

  // Find a new random item if possible, otherwise, end the game
  useEffect(() => {
    const randomItem = _sample(availableItems);
    if (randomItem) {
      setTargetItem(randomItem);
    } else {
      setIsGameOver(true);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [availableItems]);

  const resetGame = () => {
    resetTargetItem();
    resetUsedItems();

    const randomItem = _sample(availableItems);
    if (randomItem) {
      setTargetItem(randomItem);
    }

    setSelected(undefined);
    setIsRightAnswer(false);
    setIsWrongAnswer(false);
    setIsGameOver(false);
  };

  return (
    <StyledContainer>
      <Grid container spacing={2}>
        <Grid item md={9}>
          <MapContainer>
            <Map onClick={(item) => setSelected(item)} />
          </MapContainer>
        </Grid>
        <Grid item md={3}>
          <Display />
        </Grid>
      </Grid>
    </StyledContainer>
  );
};
