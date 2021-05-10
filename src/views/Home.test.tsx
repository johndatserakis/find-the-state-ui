import { render } from '@testing-library/react';
import { Wrapper } from '../test-utils';
import { Home } from './Home';

describe('<Home />', () => {
  it('should load correctly', async () => {
    expect.assertions(5);

    const { findByText } = render(
      <Wrapper>
        <Home />
      </Wrapper>,
    );

    const ItemInformationText = await findByText(
      'Information about the state you are looking for will show up here once you get started.',
    );
    expect(ItemInformationText).toBeInTheDocument();

    const cheatText = await findByText('Cheat');
    const lockMapText = await findByText('Prevent Scrolling');
    const showWrongAnswersText = await findByText('Show Wrong Answers');
    expect(cheatText).toBeInTheDocument();
    expect(lockMapText).toBeInTheDocument();
    expect(showWrongAnswersText).toBeInTheDocument();

    const startGameButton = await findByText('Start Game');
    expect(startGameButton).toBeInTheDocument();
  });
});
