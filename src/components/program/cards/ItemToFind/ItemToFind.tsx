import { bluePurpleGradient } from '../../../../style/program/colors';
import { CardWithBackground } from '../../../mui/CardWithBackground';
import { ContentAnimationContainer } from '../../../../utils/animation/components';
import { GameOverCardContent } from './GameOverCardContent';
import { GameStatus } from '../../../../recoil/game/types';
import { gameStatusState } from '../../../../recoil/game/game';
import { slideUpInSlideUpOut } from '../../../../utils/animation/animations';
import { useRecoilValue } from 'recoil';
import { useTransition } from 'react-spring';
import { GameActiveCardContent } from './GameActiveCardContent';

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
