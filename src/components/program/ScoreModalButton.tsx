import { useState } from 'react';
import { ScoreRounded } from '@material-ui/icons';
import { Box, Button, DialogActions, DialogContent, DialogTitle, Tooltip } from '@material-ui/core';
import { ScoreModal } from './ScoreModal';
import { Dialog } from '../mui/Dialog';

export const ScoreModalButton = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Tooltip title="High Scores" arrow>
        <Button onClick={() => setOpen(true)}>
          <ScoreRounded />
        </Button>
      </Tooltip>

      <Dialog open={open} onClose={() => setOpen(false)} scroll="paper">
        <DialogTitle>
          <Box display="flex" alignItems="center">
            <ScoreRounded /> &nbsp; Scores
          </Box>
        </DialogTitle>
        <DialogContent dividers>
          <ScoreModal />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} color="secondary" variant="contained">
            Done
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
