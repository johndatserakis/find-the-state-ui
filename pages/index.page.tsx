import React, { useEffect, useState } from 'react';
import { Container, useMediaQuery } from '@mui/material';
import { sample as _sample } from 'lodash';
import styled from 'styled-components';
import { post as postScore } from '../src/api/score';
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
} from '../src/types/game';
import { getAvailableItems } from '../src/utils/game';
import { formatStopwatchForDatabase } from '../src/utils/stopwatch';
import { pxToRem } from '../src/utils/style';

const MainContainer = styled.div`
  height: 100%;
  width: 100%;
`;

const ContentContainer = styled(Container)`
  height: 100%;
  padding: ${pxToRem(8)};

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

async function postFinalScore(timer: Timer, streakHigh: StreakHigh) {
  const formattedTimeDatabase = formatStopwatchForDatabase(timer);

  try {
    await postScore({
      score: formattedTimeDatabase,
      streak_high: streakHigh,
    });
  } catch (error) {
    console.error(error);
  }
}

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
  const [guesses, setGuesses] = useState<Guesses>({});

  const isGameOver = gameStatus === GameStatus.GAME_OVER || gameStatus === GameStatus.GAME_OVER_MANUAL_END_GAME;
  const isGameOverNotUserInitiated = gameStatus === GameStatus.GAME_OVER;

  const availableItems = getAvailableItems(usedItems);
  const availableItemsCount = (availableItems || []).length;

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

    if (!randomItem) return;

    setTargetItem(randomItem);
  };

  // Main game loop. Runs on each seconds tick of timer.
  useEffect(() => {
    if (gameStatus !== GameStatus.ACTIVE) return;
    if (!selectedItem) return;
    if (!targetItem) return;

    // Incorrect guess
    if (selectedItem !== targetItem) {
      setStreak(0);
      setLastSelectionResult('incorrect');

      const currentGuesses = { ...guesses };
      const guessCountForCurrentTarget = currentGuesses[targetItem] || 0;
      currentGuesses[targetItem] = guessCountForCurrentTarget + 1;
      setGuesses(currentGuesses);

      return;
    }

    setLastSelectionResult('correct');

    // Abuse the prev value callback to allow streakHigh to use the new streak value
    setStreak((prevStreak) => {
      const newStreak = prevStreak + 1;

      setStreakHigh((prevStreakHigh) => {
        if (newStreak > prevStreakHigh) {
          return newStreak;
        }

        return prevStreakHigh;
      });

      return newStreak;
    });

    const newUsedItems = [...usedItems, selectedItem];
    setUsedItems(newUsedItems);

    const availableItems = getAvailableItems(newUsedItems);
    const randomItem = _sample(availableItems);

    // Capture proper GameStatus.GAME_OVER (not from end button)
    if (!randomItem) {
      setGameStatus(GameStatus.GAME_OVER);
      setSelectedItem(undefined);
      setTargetItem(undefined);

      return;
    }

    setSelectedItem(undefined);
    setTargetItem(randomItem);
  }, [gameStatus, guesses, selectedItem, streak, streakHigh, targetItem, timer, usedItems]);

  // Look out for a real game over situation
  useEffect(() => {
    if (!isGameOverNotUserInitiated) return;

    postFinalScore(timer, streakHigh);
  }, [gameStatus, isGameOverNotUserInitiated, streakHigh, timer]);

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
