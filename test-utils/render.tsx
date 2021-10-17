import { ReactNode } from 'react';
import { render } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import { theme } from '../src/styles/theme';

interface RenderComponentProps {
  component: ReactNode;
}

export const renderComponent = ({ component }: RenderComponentProps) =>
  render(<ThemeProvider theme={theme}>{component}</ThemeProvider>);
