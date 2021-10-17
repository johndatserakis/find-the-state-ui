import { ReactNode } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { render } from '@testing-library/react';
import { theme } from '../src/styles/theme';

interface RenderComponentProps {
  component: ReactNode;
}

export const renderComponent = ({ component }: RenderComponentProps) =>
  render(<ThemeProvider theme={theme}>{component}</ThemeProvider>);
