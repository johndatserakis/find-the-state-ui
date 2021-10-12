// https://material-ui.com/components/progress/#LinearWithValueLabel.tsx

import Box from '@mui/material/Box';
import LinearProgress, { LinearProgressProps } from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';

export const LinearProgressWithLabel = (props: LinearProgressProps & { value: number }) => {
  return (
    <Box display="flex" alignItems="center" color="white" width="100%">
      <Box width="100%" mr={1}>
        <LinearProgress variant="determinate" {...props} />
      </Box>
      <Box minWidth={35}>
        <Typography variant="body2">{`${Math.round(props.value)}%`}</Typography>
      </Box>
    </Box>
  );
};
