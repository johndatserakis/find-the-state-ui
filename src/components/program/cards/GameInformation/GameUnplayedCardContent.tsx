import { Box, Typography } from '@mui/material';
import { bluePurpleGradient } from '../../../../styles/program/colors';
import { Emoji } from '../../../common/Emoji';
import { CardWithBackground } from '../../../mui/CardWithBackground';
import { ActionButton } from './ActionButton';

export const GameUnplayedCardContent = () => (
  <CardWithBackground background={bluePurpleGradient}>
    <Box display="flex" flexDirection="column" alignItems="center" justifyContent="space-around">
      <Typography variant="h1" component="h3" gutterBottom>
        <Emoji symbol="🗺" label="Map" />
      </Typography>
      <ActionButton />
    </Box>
  </CardWithBackground>
);
