import { useRecoilValueLoadable } from 'recoil';
import { currentState } from '../../../recoil/game/api/index';
import { ItemInformation } from '../../../components/program/cards/ItemInformation';
import { useRecoilValue } from 'recoil';
import { gameStatusState } from '../../../recoil/game/game';

export const ItemInformationContainer = () => {
  const stateData = useRecoilValueLoadable(currentState);
  const gameStatus = useRecoilValue(gameStatusState);

  switch (stateData.state) {
    case 'hasValue':
      if (stateData.contents instanceof Error) {
        return <ItemInformation errored gameStatus={gameStatus} />;
      }

      return <ItemInformation gameStatus={gameStatus} state={stateData.contents} />;
    case 'loading':
      return <ItemInformation gameStatus={gameStatus} loading />;
    case 'hasError':
      return <ItemInformation errored gameStatus={gameStatus} />;
    default:
      return <ItemInformation errored gameStatus={gameStatus} />;
  }
};
