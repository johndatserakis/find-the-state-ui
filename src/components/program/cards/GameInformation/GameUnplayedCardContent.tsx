import { ActionButton } from './ActionButton';
import { bluePurpleGradient } from '../../../../style/program/colors';
import { CardWithBackground } from '../../../mui/CardWithBackground';
import { Emoji } from '../../../common/Emoji';
import { Box, Typography } from '@material-ui/core';

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
