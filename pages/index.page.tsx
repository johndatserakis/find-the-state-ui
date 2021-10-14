/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';
import { Container, useMediaQuery } from '@mui/material';
import { sample as _sample } from 'lodash';
import styled from 'styled-components';
import { CookieBanner } from '../src/components/common/CookieBanner';
import { Navbar } from '../src/components/common/Navbar';
import { Grid } from '../src/components/mui/Grid';
import { GameInformation } from '../src/components/program/cards/GameInformation/GameInformation';
import { ItemToFind } from '../src/components/program/cards/ItemToFind/ItemToFind';
import { DEFAULT_CONTAINER_MAX_WIDTH, DEFAULT_PROGRAM_BREAKPOINT } from '../src/constants/style';
import { ItemInformationContainer } from '../src/containers/program/cards/ItemInformationContainer';
import { MapContainer } from '../src/containers/program/MapContainer';
import { theme } from '../src/styles/theme';
import {
  GameStatus,
  Guesses,
  Items,
  LastSelectionResult,
  SelectedItem,
  Streak,
  StreakHigh,
  TargetItem,
  Timer,
  TimerGameOver,
} from '../src/types/game';
import { getAvailableItems } from '../src/utils/game';
import { pxToRem } from '../src/utils/style';

const MainContainer = styled.div`
  height: 100%;
  width: 100%;
`;

const ContentContainer = styled(Container)`
  height: 100%;
  padding: ${pxToRem(8)} 0;

  @media (min-width: ${DEFAULT_PROGRAM_BREAKPOINT}px) {
    height: 93vh;
  }
`;

const CardsContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;

  > div:not(:last-child) {
    margin-bottom: ${pxToRem(12)} !important;
  }
`;

export default function Home() {
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));
  const spacing = isDesktop ? 2 : 0;

  const [gameStatus, setGameStatus] = useState<GameStatus>(GameStatus.UNPLAYED);
  const [lastSelectionResult, setLastSelectionResult] = useState<LastSelectionResult>('none');
  const [targetItem, setTargetItem] = useState<TargetItem>();
  const [selectedItem, setSelectedItem] = useState<SelectedItem>();
  const [usedItems, setUsedItems] = useState<Items>([]);
  const [streak, setStreak] = useState<Streak>(0);
  const [streakHigh, setStreakHigh] = useState<StreakHigh>(0);
  const [timer, setTimer] = useState<Timer>(0);
  const [timerGameOver, setTimerGameOver] = useState<TimerGameOver>();
  const [guesses, setGuesses] = useState<Guesses>({});

  const isGameOver = gameStatus === GameStatus.GAME_OVER || gameStatus === GameStatus.GAME_OVER_MANUAL_END_GAME;

  const availableItems = getAvailableItems(usedItems);
  const availableItemsCount = (availableItems || []).length;

  const endGame = () => setGameStatus(GameStatus.GAME_OVER);
  const endGameManual = () => setGameStatus(GameStatus.GAME_OVER_MANUAL_END_GAME);

  const startGame = () => {
    setGameStatus(GameStatus.ACTIVE);
    setLastSelectionResult('none');
    setSelectedItem(undefined);
    setUsedItems([]);
    setStreak(0);
    setStreakHigh(0);
    setTimer(0);

    const availableItems = getAvailableItems([]);
    const randomItem = _sample(availableItems);
    if (randomItem) {
      setTargetItem(randomItem);
    }
  };

  return (
    <MainContainer>
      <Navbar />
      <ContentContainer maxWidth={DEFAULT_CONTAINER_MAX_WIDTH}>
        <Grid container spacing={spacing}>
          <Grid item md={9}>
            <MapContainer
              gameStatus={gameStatus}
              guesses={guesses}
              setGuesses={setGuesses}
              setSelectedItem={setSelectedItem}
              targetItem={targetItem}
            />
          </Grid>
          <Grid item md={3}>
            <CardsContainer>
              <ItemToFind
                gameStatus={gameStatus}
                isGameOver={isGameOver}
                lastSelectionResult={lastSelectionResult}
                targetItem={targetItem}
              />
              <GameInformation
                availableItemsCount={availableItemsCount}
                endGameManual={endGameManual}
                gameStatus={gameStatus}
                isGameOver={isGameOver}
                setTimer={setTimer}
                setTimerGameOver={setTimerGameOver}
                startGame={startGame}
                streak={streak}
                streakHigh={streakHigh}
                timer={timer}
              />
              <ItemInformationContainer gameStatus={gameStatus} targetItem={targetItem} />
            </CardsContainer>
          </Grid>
        </Grid>
      </ContentContainer>
      <CookieBanner />
    </MainContainer>
  );
}
