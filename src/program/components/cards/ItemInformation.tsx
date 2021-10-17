import { OpenInNewRounded } from '@mui/icons-material';
import { Alert, Button, CardContent, CardMedia, Skeleton, Typography } from '@mui/material';
import { uniqueId as _uniqueId } from 'lodash';
import styled from 'styled-components';
import { StyledFullSizeCard } from '../../../components/mui/CardWithBackground';
import { colors } from '../../../styles/colors';
import { theme } from '../../../styles/theme';
import { pxToRem } from '../../../utils/style';
import { splitLongTextIntoParagraphs } from '../../../utils/text';
import { bluePurpleGradient } from '../../styles/colors';
import { GameStatus, IsGameOver, State } from '../../types/game';

const StyledAlert = styled(Alert)`
  align-items: center;
  box-shadow: ${theme.shadows[1]};
  height: 100%;
`;

const HeaderOverlay = styled(Typography)`
  color: white;
  font-weight: bold;
  left: ${pxToRem(16)};
  position: absolute;
  text-shadow: 2px 2px 1px ${colors.gray['800']};
  top: ${pxToRem(48)};
` as typeof Typography;

const StyledCardMedia = styled(CardMedia)`
  background: ${bluePurpleGradient};
  height: ${pxToRem(100)};
` as typeof CardMedia;

const StyledCardMediaSkeleton = styled(Skeleton)`
  height: ${pxToRem(180)};
  margin-top: ${pxToRem(-50)};
`;

const StyledCardContentSkeleton = styled(CardContent)`
  margin-top: ${pxToRem(-30)};
`;

interface ItemInformationProps {
  errored?: boolean;
  gameStatus: GameStatus;
  isGameOver: IsGameOver;
  loading?: boolean;
  state?: State;
}

export const ItemInformation = ({
  errored = false,
  gameStatus,
  isGameOver,
  loading = false,
  state,
}: ItemInformationProps) => {
  const IMAGE_URL = 'https://source.unsplash.com/300x100/?';

  if (gameStatus === GameStatus.UNPLAYED) {
    return null;
  }

  if (isGameOver) {
    return null;
  }

  if (errored || !state) {
    return (
      <StyledFullSizeCard>
        <StyledAlert severity="error">There was an error getting the State information. Please try again.</StyledAlert>
      </StyledFullSizeCard>
    );
  }

  if (loading) {
    return (
      <StyledFullSizeCard>
        <StyledCardMediaSkeleton />
        <StyledCardContentSkeleton>
          <Skeleton />
          <Skeleton />
          <Skeleton />
        </StyledCardContentSkeleton>
      </StyledFullSizeCard>
    );
  }

  const { link = '', name = '', summary = '' } = state;
  const image = `${IMAGE_URL}${name}`;
  const summaryAsParagraphs = splitLongTextIntoParagraphs(summary);

  return (
    <StyledFullSizeCard>
      <StyledCardMedia component="img" alt={name} height="100" image={image} title={name} />
      <HeaderOverlay gutterBottom variant="h5" component="h2">
        {name}
      </HeaderOverlay>
      <CardContent>
        {summaryAsParagraphs.map((para) => (
          <Typography color="textSecondary" component="p" gutterBottom key={_uniqueId()} variant="body2">
            {para} <br /> <br />
          </Typography>
        ))}
      </CardContent>
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
    </StyledFullSizeCard>
  );
};
