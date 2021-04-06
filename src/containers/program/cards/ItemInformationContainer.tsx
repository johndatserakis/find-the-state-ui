import { useRecoilValueLoadable } from 'recoil';
import { currentState } from '../../../recoil/game/api/index';
import { ItemInformation } from '../../../components/program/cards/ItemInformation';

export const ItemInformationContainer = () => {
  const stateData = useRecoilValueLoadable(currentState);

  switch (stateData.state) {
    case 'hasValue':
      if (stateData.contents instanceof Error) {
        return <ItemInformation errored />;
      }

      return <ItemInformation state={stateData.contents} />;
    case 'loading':
      return <ItemInformation loading />;
    case 'hasError':
      return <ItemInformation errored />;
    default:
      return <ItemInformation errored />;
  }
};
