import { waitFor } from '@testing-library/react';
import { renderComponent } from '../test-utils/render';
import Home from './index.page';

describe('Home', () => {
  it('renders a heading', async () => {
    const { getByText } = renderComponent({ component: <Home /> });

    const header = await waitFor(() => getByText(/Find the State/i));

    expect(header).toBeInTheDocument();
  });
});
