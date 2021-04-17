import { render } from '@testing-library/react';
import { RecoilRoot } from 'recoil';
import { ThemeProvider } from 'styled-components';
import { Navbar } from './Navbar';
import { theme } from '../../style/theme';

describe('<Navbar />', () => {
  it('should load correctly', async () => {
    expect.assertions(1);

    const { findByText } = render(
      <ThemeProvider theme={theme}>
        <RecoilRoot>
          <Navbar />
        </RecoilRoot>
      </ThemeProvider>,
    );

    const text = await findByText('FTS');
    expect(text).toBeInTheDocument();
  });
});
