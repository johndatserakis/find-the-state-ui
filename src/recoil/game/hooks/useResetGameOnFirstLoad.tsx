import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import { resetGameFunc } from '../game';

export const useResetGameOnFirstLoad = () => {
  const resetGame = useSetRecoilState(resetGameFunc);

  useEffect(() => {
    resetGame(undefined);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};
