import { Typography } from '@mui/material';
import styled from 'styled-components';
import { bluePurpleGradient } from '../../../../styles/program/colors';
import { GameStatus, IsGameOver, LastSelectionResult, TargetItem } from '../../../../types/game';
import { Emoji } from '../../../common/Emoji';
import { CardWithBackground } from '../../../mui/CardWithBackground';
import { SelectionResult } from './SelectionResult';

const Container = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: space-around;
  width: 100%;
`;

interface ItemToFindProps {
  gameStatus: GameStatus;
  isGameOver: IsGameOver;
  lastSelectionResult: LastSelectionResult;
  targetItem: TargetItem;
}

export const ItemToFind = ({ isGameOver, gameStatus, lastSelectionResult, targetItem }: ItemToFindProps) => {
  if (gameStatus === GameStatus.UNPLAYED) {
    return null;
  }

  const icon = gameStatus === GameStatus.GAME_OVER ? '🎉' : '🗺';

  return (
    <CardWithBackground background={bluePurpleGradient}>
      {isGameOver ? (
        <Container>
          <Typography variant="h1">
            <Emoji symbol={icon} label="Celebration" />
          </Typography>
          {gameStatus !== GameStatus.GAME_OVER_MANUAL_END_GAME && (
            <Typography variant="subtitle1">Nice Job!</Typography>
          )}
        </Container>
      ) : (
        <Container>
          <Typography variant="subtitle1">Find this state:</Typography>
          <Typography variant="h4">
            <strong>{targetItem}</strong>
          </Typography>
          <SelectionResult result={lastSelectionResult} />
        </Container>
      )}
    </CardWithBackground>
  );
};
