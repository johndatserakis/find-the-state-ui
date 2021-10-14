import { useRecoilValue, useRecoilValueLoadable } from 'recoil';
import { ItemInformation } from '../../../components/program/cards/ItemInformation';
import { currentState } from '../../../recoil/api/index';
import { gameStatusState } from '../../../recoil/game';

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
