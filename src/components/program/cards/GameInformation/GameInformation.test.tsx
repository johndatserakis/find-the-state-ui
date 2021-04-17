import { render, fireEvent } from '@testing-library/react';
import { Wrapper } from '../../../../test-utils';
import { GameInformation } from './GameInformation';

describe('<GameInformation />', () => {
  it('should start game correctly', () => {
    expect.assertions(1);

    const { getByText } = render(
      <Wrapper>
        <GameInformation />
      </Wrapper>,
    );

    const startGameButton = getByText('Start Game');
    fireEvent.click(startGameButton);

    const endGameButton = getByText('End Game');
    expect(endGameButton).toBeInTheDocument();
  });

  it('should end game correctly', () => {
    expect.assertions(1);

    const { getByText } = render(
      <Wrapper>
        <GameInformation />
      </Wrapper>,
    );

    const startGameButton = getByText('Start Game');
    fireEvent.click(startGameButton);

    const endGameButton = getByText('End Game');
    fireEvent.click(endGameButton);

    const startNewGameButton = getByText('Start New Game');
    expect(startNewGameButton).toBeInTheDocument();
  });

  it('should start new game correctly after ended game', () => {
    expect.assertions(1);

    const { getByText } = render(
      <Wrapper>
        <GameInformation />
      </Wrapper>,
    );

    const startGameButton = getByText('Start Game');
    fireEvent.click(startGameButton);

    const endGameButton = getByText('End Game');
    fireEvent.click(endGameButton);

    const startNewGameButton = getByText('Start New Game');
    fireEvent.click(startNewGameButton);

    expect(endGameButton).toBeInTheDocument();
  });
});
