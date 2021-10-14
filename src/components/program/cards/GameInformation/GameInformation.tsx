import { Box, CardActions, Chip, Typography } from '@mui/material';
import { TOTAL_ITEM_COUNT } from '../../../../constants/game';
import { bluePurpleGradient } from '../../../../styles/program/colors';
import { AvailableItemsCount, GameStatus, IsGameOver, Streak, StreakHigh, Timer } from '../../../../types/game';
import { Emoji } from '../../../common/Emoji';
import { CardWithBackground } from '../../../mui/CardWithBackground';
import { LinearProgressWithLabel } from '../../../mui/LinearProgressWithLabel';
import { ActionButton } from './ActionButton';
import { GameStatusHeader } from './GameStatusHeader';
import { Stopwatch } from './Stopwatch';

interface GameInformationProps {
  availableItemsCount: AvailableItemsCount;
  endGameManual: () => void;
  gameStatus: GameStatus;
  isGameOver: IsGameOver;
  setTimer: (time: number) => void;
  setTimerGameOver: (time: number) => void;
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
  setTimerGameOver,
  startGame,
  streak,
  streakHigh,
  timer,
}: GameInformationProps) => {
  const currentPercentage = ((TOTAL_ITEM_COUNT - availableItemsCount) / TOTAL_ITEM_COUNT) * 100;
  const actionButtonProps = { endGameManual, gameStatus, startGame };
  const stopwatchProps = { gameStatus, isGameOver, setTimer, setTimerGameOver, timer };

  if (gameStatus === GameStatus.UNPLAYED) {
    return (
      <CardWithBackground background={bluePurpleGradient}>
        <Box display="flex" flexDirection="column" alignItems="center" justifyContent="space-around">
          <Typography variant="h1" component="h3" gutterBottom>
            <Emoji symbol="🗺" label="Map" />
          </Typography>
          <ActionButton {...actionButtonProps} />
        </Box>
      </CardWithBackground>
    );
  }

  return (
    <CardWithBackground background={bluePurpleGradient}>
      <Box display="flex" alignItems="center" justifyContent="center"></Box>
      <Box mt={2} mb={3} width="100%">
        <Chip label={`Streak: ${streak} / High Streak: ${streakHigh}`} color="primary" size="small" />
      </Box>
      <GameStatusHeader availableItemsCount={availableItemsCount} isGameOver={isGameOver} />
      <Box mb={1} width="100%" display="flex" alignItems="center">
        <Box width="100%">
          <Stopwatch {...stopwatchProps} />
        </Box>
        <LinearProgressWithLabel variant="determinate" value={currentPercentage} />
      </Box>
      <CardActions>
        <ActionButton {...actionButtonProps} />
      </CardActions>
    </CardWithBackground>
  );
};
