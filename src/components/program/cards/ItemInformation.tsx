import { Button, CardActions, CardContent, CardMedia, Typography } from '@material-ui/core';
import { FullSizeCard } from '../../mui/FullSizeCard';
import styled from 'styled-components/macro';
import { OpenInNewRounded, ShareRounded } from '@material-ui/icons';

const StyledCard = styled(FullSizeCard)`
  overflow: auto;
  position: relative;
`;

const HeaderOverlay = styled(Typography)`
  position: absolute;
  top: 2rem;
  left: 1rem;
  color: white;
` as typeof Typography;

export const ItemInformation = () => {
  return (
    <StyledCard>
      <CardMedia
        component="img"
        alt="Shore of Maine"
        height="80"
        image="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/A_beach_in_maine_on_a_clear_day.jpg/500px-A_beach_in_maine_on_a_clear_day.jpg"
        title="Shore of Maine"
      />
      <HeaderOverlay gutterBottom variant="h5" component="h2">
        Maine
      </HeaderOverlay>
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          Maine is a state in the New England region of the United States, bordered by New Hampshire to the west; the
          Atlantic Ocean to the southeast; and the Canadian provinces of New Brunswick and Quebec to the northeast and
          northwest, respectively. Maine is the 12th-smallest by area, the 9th-least populous, and the 13th-least
          densely populated of the 50 U.S. states. It is also the northeasternmost among the contiguous United States,
          the northernmost state east of the Great Lakes, the only state whose name consists of a single syllable, and
          the only state to border only one other state. Maine is known for its jagged, rocky coastline; low, rolling
          mountains; heavily forested interior; picturesque waterways; and its seafood cuisine, especially lobster and
          clams. There is a humid continental climate throughout most of the state, including coastal areas.[12] Its
          most populous city is Portland, and its capital is Augusta.
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" color="primary" variant="contained" endIcon={<OpenInNewRounded />} fullWidth>
          Wikipedia
        </Button>
        <Button size="small" color="secondary" variant="contained" startIcon={<ShareRounded />} fullWidth>
          Share
        </Button>
      </CardActions>
    </StyledCard>
  );
};
