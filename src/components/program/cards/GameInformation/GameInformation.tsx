import { Chip, Typography } from '@mui/material';
import styled from 'styled-components';
import { TOTAL_ITEM_COUNT } from '../../../../constants/game';
import { bluePurpleGradient } from '../../../../styles/program/colors';
import { AvailableItemsCount, GameStatus, IsGameOver, Streak, StreakHigh, Timer } from '../../../../types/game';
import { pxToRem } from '../../../../utils/style';
import { Emoji } from '../../../common/Emoji';
import { CardWithBackground } from '../../../mui/CardWithBackground';
import { LinearProgressWithLabel } from '../../../mui/LinearProgressWithLabel';
import { ActionButton } from './ActionButton';
import { GameStatusHeader } from './GameStatusHeader';
import { Stopwatch } from './Stopwatch';

const Container = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: space-around;
  width: 100%;
`;

const UnplayedContainer = styled(Container)`
  justify-content: center;
`;

const LinearProgressWithLabelContainer = styled.div`
  max-width: ${pxToRem(300)};
  width: 100%;
`;

interface GameInformationProps {
  availableItemsCount: AvailableItemsCount;
  endGameManual: () => void;
  gameStatus: GameStatus;
  isGameOver: IsGameOver;
  setTimer: (time: number) => void;
  startGame: () => void;
  streak: Streak;
  streakHigh: StreakHigh;
  timer: Timer;
}

export const GameInformation = ({
  availableItemsCount,
  endGameManual,
  gameStatus,
  isGameOver,
  setTimer,
  startGame,
  streak,
  streakHigh,
  timer,
}: GameInformationProps) => {
  const currentPercentage = ((TOTAL_ITEM_COUNT - availableItemsCount) / TOTAL_ITEM_COUNT) * 100;
  const actionButtonProps = { endGameManual, gameStatus, startGame };
  const stopwatchProps = { gameStatus, isGameOver, setTimer, timer };

  if (gameStatus === GameStatus.UNPLAYED) {
    return (
      <CardWithBackground background={bluePurpleGradient}>
        <UnplayedContainer>
          <Typography variant="h1" component="h3" gutterBottom>
            <Emoji symbol="🗺" label="Map" />
          </Typography>
          <ActionButton {...actionButtonProps} />
        </UnplayedContainer>
      </CardWithBackground>
    );
  }

  return (
    <CardWithBackground background={bluePurpleGradient}>
      <Container>
        <Chip label={`Streak: ${streak} / High Streak: ${streakHigh}`} color="primary" size="small" />
        <GameStatusHeader availableItemsCount={availableItemsCount} isGameOver={isGameOver} />
        <Stopwatch {...stopwatchProps} />
        <LinearProgressWithLabelContainer>
          <LinearProgressWithLabel variant="determinate" value={currentPercentage} />
        </LinearProgressWithLabelContainer>
        <ActionButton {...actionButtonProps} />
      </Container>
    </CardWithBackground>
  );
};
