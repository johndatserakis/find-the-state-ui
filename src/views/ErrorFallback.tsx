import { FallbackProps } from 'react-error-boundary';
import { Box, Typography } from '@material-ui/core';
import { Emoji } from '../components/common/Emoji';

export const ErrorFallback = ({ error }: FallbackProps) => (
  <Box padding="1rem 2rem">
    {/* {JSON.stringify(error.message)} */}
    <Typography variant="body1" gutterBottom>
      <Emoji symbol="🙈" label={'Sad monkey'} style={{ fontSize: '2rem' }} />
    </Typography>
    <Typography variant="body1" gutterBottom>
      <strong>Sorry, but there was an error displaying the page.</strong>
    </Typography>
    <Typography variant="body1" gutterBottom>
      Please refresh the page and try again.
    </Typography>
  </Box>
);
