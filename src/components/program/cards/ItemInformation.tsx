import { Button, CardActions, CardContent, CardMedia, Typography } from '@material-ui/core';
import { Alert, Skeleton } from '@material-ui/lab';
import { FullSizeCard } from '../../mui/FullSizeCard';
import styled from 'styled-components/macro';
import { OpenInNewRounded } from '@material-ui/icons';
import { pxToRem } from '../../../utils/style';
import { State } from '../../../recoil/game/types';
import { colors } from '../../../style/colors';
import { bluePurpleGradient } from '../../../style/program/colors';

const StyledCard = styled(FullSizeCard)`
  overflow: auto;
  position: relative;
`;

const HeaderOverlay = styled(Typography)`
  color: white;
  font-weight: bold;
  left: ${pxToRem(16)};
  position: absolute;
  top: ${pxToRem(48)};
  text-shadow: 2px 2px 1px ${colors.gray['800']};
` as typeof Typography;

const StyledCardMedia = styled(CardMedia)`
  background: ${bluePurpleGradient};
` as typeof CardMedia;

const StyledCardMediaSkeleton = styled(Skeleton)`
  height: 180px;
  margin-top: -50px;
`;

const StyledCardContentSkeleton = styled(CardContent)`
  margin-top: -30px;
`;

interface ItemInformationProps {
  errored?: boolean;
  loading?: boolean;
  state?: State;
}

export const ItemInformation = ({ errored = false, loading = false, state }: ItemInformationProps) => {
  if (errored) {
    return <Alert severity="error">There was an error getting the State information. Please try again.</Alert>;
  }

  const { link = '', name = '', summary = '' } = state || {};
  const image = `https://source.unsplash.com/300x100/?${name}`;

  return (
    <StyledCard>
      {loading ? (
        <StyledCardMediaSkeleton />
      ) : (
        <StyledCardMedia component="img" alt={name} height="100" image={image} title={name} />
      )}

      <HeaderOverlay gutterBottom variant="h5" component="h2">
        {name}
      </HeaderOverlay>

      {loading ? (
        <StyledCardContentSkeleton>
          <Skeleton />
          <Skeleton />
          <Skeleton />
        </StyledCardContentSkeleton>
      ) : (
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            {summary}
          </Typography>
        </CardContent>
      )}

      {!loading && (
        <CardActions>
          <Button
            size="small"
            color="primary"
            variant="contained"
            endIcon={<OpenInNewRounded />}
            fullWidth
            href={link}
            title="View on Wikipedia"
            target="_blank"
            rel="noopener noreferrer"
          >
            Wikipedia
          </Button>
        </CardActions>
      )}
    </StyledCard>
  );
};
