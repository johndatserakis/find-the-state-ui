import { useRecoilValueLoadable } from 'recoil';
import { currentState } from '../../../recoil/game/api/index';
import { ItemInformation } from '../../../components/program/cards/ItemInformation';
import { useRecoilValue } from 'recoil';
import { isGameOverState } from '../../../recoil/game/game';

export const ItemInformationContainer = () => {
  const stateData = useRecoilValueLoadable(currentState);
  const isGameOver = useRecoilValue(isGameOverState);

  switch (stateData.state) {
    case 'hasValue':
      if (stateData.contents instanceof Error) {
        return <ItemInformation errored isGameOver={isGameOver} />;
      }

      return <ItemInformation isGameOver={isGameOver} state={stateData.contents} />;
    case 'loading':
      return <ItemInformation isGameOver={isGameOver} loading />;
    case 'hasError':
      return <ItemInformation errored isGameOver={isGameOver} />;
    default:
      return <ItemInformation errored isGameOver={isGameOver} />;
  }
};
