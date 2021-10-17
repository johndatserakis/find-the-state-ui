import { waitFor } from '@testing-library/react';
import { renderComponent } from '../jest-test-utils/render';
import Home from './index.page';
import '@testing-library/jest-dom';

describe('Home', () => {
  it('renders the main navbar icon', async () => {
    const { getByText } = renderComponent({ component: <Home /> });

    const header = await waitFor(() => getByText(/🔍/i));

    expect(header).toBeInTheDocument();
  });
});
