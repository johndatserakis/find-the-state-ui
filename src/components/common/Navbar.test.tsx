import { render } from '@testing-library/react';
import { Wrapper } from '../../test-utils';
import { Navbar } from './Navbar';

describe('<Navbar />', () => {
  it('should load correctly', async () => {
    expect.assertions(1);

    const { findByText } = render(
      <Wrapper>
        <Navbar />
      </Wrapper>,
    );

    const text = await findByText('FTS');
    expect(text).toBeInTheDocument();
  });
});
