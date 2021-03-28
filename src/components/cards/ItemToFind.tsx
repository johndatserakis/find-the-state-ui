import { CardContent, Typography } from '@material-ui/core';
import { FullSizeCard } from '../mui/FullSizeCard';
import { targetItemState } from '../../recoil/game/game';
import { useRecoilValue } from 'recoil';

export const ItemToFind = () => {
  const targetItem = useRecoilValue(targetItemState);

  return (
    <FullSizeCard>
      <CardContent>
        <Typography color="textSecondary" gutterBottom>
          Find this state:
        </Typography>
        <Typography variant="h5">{targetItem}</Typography>
      </CardContent>
    </FullSizeCard>
  );
};
