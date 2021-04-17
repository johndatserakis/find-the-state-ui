import { Box, Typography } from '@material-ui/core';
import { CardWithBackgroundContent } from '../../../mui/CardWithBackground';
import { Emoji } from '../../../common/Emoji';

export const GameOverCardContent = () => (
  <CardWithBackgroundContent>
    <Box display="flex" flexDirection="column" alignItems="center">
      <Typography variant="h1" gutterBottom>
        <Emoji symbol="🎉" label="Celebration" />
      </Typography>
      <Typography variant="subtitle1">Nice Job!</Typography>
    </Box>
  </CardWithBackgroundContent>
);
