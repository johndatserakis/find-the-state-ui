import { useState } from 'react';
import { ScoreRounded } from '@mui/icons-material';
import { Box, Button, DialogActions, DialogContent, DialogTitle, Tooltip } from '@mui/material';
import { Dialog } from '../mui/Dialog';
import { ScoreModal } from './ScoreModal';

export const ScoreModalButton = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Tooltip title="High Scores" arrow>
        <Button color="black" onClick={() => setOpen(true)}>
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
