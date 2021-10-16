import { OpenInNewRounded } from '@mui/icons-material';
import { Alert, Button, CardContent, CardMedia, Skeleton, Typography } from '@mui/material';
import { uniqueId as _uniqueId } from 'lodash';
import styled from 'styled-components';
import { colors } from '../../../styles/colors';
import { bluePurpleGradient } from '../../../styles/program/colors';
import { theme } from '../../../styles/theme';
import { GameStatus, State } from '../../../types/game';
import { pxToRem } from '../../../utils/style';
import { splitLongTextIntoParagraphs } from '../../../utils/text';
import { FullSizeCard } from '../../mui/FullSizeCard';

const StyledCard = styled(FullSizeCard)`
  overflow: auto;
  position: relative;
`;

const StyledAlert = styled(Alert)`
  box-shadow: ${theme.shadows[2]};
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
` as typeof CardMedia;

const StyledCardMediaSkeleton = styled(Skeleton)`
  height: 180px;
  margin-top: ${pxToRem(-50)};
`;

const StyledCardContentSkeleton = styled(CardContent)`
  margin-top: ${pxToRem(-30)};
`;

interface ItemInformationProps {
  errored?: boolean;
  gameStatus: GameStatus;
  loading?: boolean;
  state?: State;
}

export const ItemInformation = ({ errored = false, gameStatus, loading = false, state }: ItemInformationProps) => {
  const url = 'https://source.unsplash.com/300x100/?';
  const isGameOver = gameStatus === GameStatus.GAME_OVER || gameStatus === GameStatus.GAME_OVER_MANUAL_END_GAME;

  if (gameStatus === GameStatus.UNPLAYED) {
    return (
      <StyledAlert severity="info">
        Information about the state you are looking for will show up here once you get started.
      </StyledAlert>
    );
  }

  if (isGameOver) {
    return <StyledAlert severity="info">Start a new game to play again.</StyledAlert>;
  }

  if (errored) {
    return (
      <StyledAlert severity="error">There was an error getting the State information. Please try again.</StyledAlert>
    );
  }

  const { link = '', name = '', summary = '' } = state || {};
  const image = `${url}${name}`;
  const summaryAsParagraphs = splitLongTextIntoParagraphs(summary);

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
          {summaryAsParagraphs.map((para) => {
            return (
              <Typography color="textSecondary" component="p" gutterBottom key={_uniqueId()} variant="body2">
                {para} <br /> <br />
              </Typography>
            );
          })}
        </CardContent>
      )}

      {!loading && (
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
      )}
    </StyledCard>
  );
};
