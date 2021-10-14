import { ItemInformation } from '../../../components/program/cards/ItemInformation';
import { GameStatus, TargetItem } from '../../../types/game';

interface ItemInformationContainerProps {
  gameStatus: GameStatus;
  targetItem: TargetItem;
}

export const ItemInformationContainer = ({ gameStatus }: ItemInformationContainerProps) => {
  // switch (stateData.state) {
  //   case 'hasValue':
  //     if (stateData.contents instanceof Error) {
  //       return <ItemInformation errored gameStatus={gameStatus} />;
  //     }

  //     return <ItemInformation gameStatus={gameStatus} state={stateData.contents} />;
  //   case 'loading':
  //     return <ItemInformation gameStatus={gameStatus} loading />;
  //   case 'hasError':
  //     return <ItemInformation errored gameStatus={gameStatus} />;
  //   default:
  //     return <ItemInformation errored gameStatus={gameStatus} />;
  // }

  return <ItemInformation errored gameStatus={gameStatus} />;
};
