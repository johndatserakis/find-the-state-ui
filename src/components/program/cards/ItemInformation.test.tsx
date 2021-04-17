import { render } from '@testing-library/react';
import { GameStatus } from '../../../recoil/game/types';
import { Wrapper } from '../../../test-utils';
import { ItemInformation } from './ItemInformation';

describe('<ItemInformation />', () => {
  it('should load correctly', async () => {
    expect.assertions(1);

    const { findByText } = render(
      <Wrapper>
        <ItemInformation gameStatus={GameStatus.UNPLAYED} />
      </Wrapper>,
    );

    const text = await findByText(
      'Information about the state you are looking for will show up here once you get started.',
    );
    expect(text).toBeInTheDocument();
  });
});
