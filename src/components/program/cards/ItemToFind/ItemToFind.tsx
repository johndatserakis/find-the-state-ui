import { useTransition } from 'react-spring';
import { useRecoilValue } from 'recoil';
import { gameStatusState } from '../../../../recoil/game';
import { GameStatus } from '../../../../recoil/types';
import { bluePurpleGradient } from '../../../../styles/program/colors';
import { slideUpInSlideUpOut } from '../../../../utils/animation/animations';
import { ContentAnimationContainer } from '../../../../utils/animation/components';
import { CardWithBackground } from '../../../mui/CardWithBackground';
import { GameActiveCardContent } from './GameActiveCardContent';
import { GameOverCardContent } from './GameOverCardContent';

export const ItemToFind = () => {
  const gameStatus = useRecoilValue(gameStatusState);
  const isGameOver = gameStatus === GameStatus.GAME_OVER || gameStatus === GameStatus.GAME_OVER_MANUAL_END_GAME;
  const transitions = useTransition(isGameOver, slideUpInSlideUpOut);

  if (gameStatus === GameStatus.UNPLAYED) {
    return null;
  }

  const animatedCardContent = transitions((props, item) =>
    item ? (
      <ContentAnimationContainer style={props}>
        <GameOverCardContent />
      </ContentAnimationContainer>
    ) : (
      <ContentAnimationContainer style={props}>
        <GameActiveCardContent />
      </ContentAnimationContainer>
    ),
  );

  return <CardWithBackground background={bluePurpleGradient}>{animatedCardContent}</CardWithBackground>;
};
