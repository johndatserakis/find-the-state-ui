import { useEffect, useState } from 'react';
import { Map } from './Map';
import { TargetDisplay } from './TargetDisplay';
import styled from 'styled-components/macro';
import { availableItemsState, targetItemState, usedItemsState } from '../recoil/game';
import { useRecoilState, useRecoilValue, useSetRecoilState, useResetRecoilState } from 'recoil';
import { sample as _sample } from 'lodash';

const Container = styled.div`
  height: 800px;
  margin: 0 auto;
  width: 1000px;
`;

export const View = () => {
  const [targetItem, setTargetItem] = useRecoilState(targetItemState);
  const resetTargetItem = useResetRecoilState(targetItemState);
  const setUsedItems = useSetRecoilState(usedItemsState);
  const resetUsedItems = useResetRecoilState(usedItemsState);
  const [selected, setSelected] = useState<string | undefined>(undefined);
  const [isWrongAnswer, setIsWrongAnswer] = useState(false);
  const [isRightAnswer, setIsRightAnswer] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);
  const availableItems = useRecoilValue(availableItemsState);

  // Set a random item on first load
  useEffect(() => {
    const randomItem = _sample(availableItems);
    if (randomItem) {
      setTargetItem(randomItem);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Deal with the selected item
  useEffect(() => {
    if (!selected) return;

    if (selected === targetItem) {
      setIsRightAnswer(true);
      setIsWrongAnswer(false);
      setUsedItems((old) => [...old, selected]);
      setSelected(undefined);
    } else {
      setIsRightAnswer(false);
      setIsWrongAnswer(true);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected]);

  // Find a new random item if possible, otherwise, end the game
  useEffect(() => {
    const randomItem = _sample(availableItems);
    if (randomItem) {
      setTargetItem(randomItem);
    } else {
      setIsGameOver(true);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [availableItems]);

  const resetGame = () => {
    resetTargetItem();
    resetUsedItems();

    const randomItem = _sample(availableItems);
    if (randomItem) {
      setTargetItem(randomItem);
    }

    setSelected(undefined);
    setIsRightAnswer(false);
    setIsWrongAnswer(false);
    setIsGameOver(false);
  };

  return (
    <Container>
      <TargetDisplay />
      <Map onClick={(item) => setSelected(item)} />
      {selected && (
        <p>
          You selected: <strong>{selected}</strong>
        </p>
      )}
      {!isGameOver && (
        <>
          {isWrongAnswer && <p>🧐 Hmm that's not it. Try again.</p>}
          {isRightAnswer && <p>🎉 That's that one!</p>}
          <p>
            <button onClick={resetGame}>Reset game</button>
          </p>
        </>
      )}
      {isGameOver && (
        <p>
          ⭐️ Great Job, you found all the states! <button onClick={resetGame}>Play again?</button>
        </p>
      )}
    </Container>
  );
};
