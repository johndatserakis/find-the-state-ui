import { useGetState } from '../../api/state';
import { ItemInformation } from '../../components/cards/ItemInformation';
import { GameStatus, IsGameOver, TargetItem } from '../../types/game';

interface ItemInformationContainerProps {
  gameStatus: GameStatus;
  isGameOver: IsGameOver;
  targetItem: TargetItem;
}

export const ItemInformationContainer = ({ gameStatus, isGameOver, targetItem }: ItemInformationContainerProps) => {
  const { data, loading, errored } = useGetState(targetItem);

  if (loading) {
    <ItemInformation gameStatus={gameStatus} isGameOver={isGameOver} loading />;
  }

  if (errored) {
    return <ItemInformation errored gameStatus={gameStatus} isGameOver={isGameOver} />;
  }

  return <ItemInformation gameStatus={gameStatus} isGameOver={isGameOver} state={data} />;
};
