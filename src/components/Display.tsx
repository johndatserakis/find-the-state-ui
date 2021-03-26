// /* eslint-disable @typescript-eslint/no-unused-vars */
import { availableItemsCount, targetItemState } from '../recoil/game';
import { useRecoilValue } from 'recoil';
import { Button, Card, CardActions, CardActionArea, CardContent, CardMedia, Typography } from '@material-ui/core';
import styled from 'styled-components/macro';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;

  > div:not(:last-child) {
    margin-bottom: 0.75rem !important;
  }
`;

const StyledCard = styled(Card)`
  height: 100%;
  width: 100%;
  overflow: auto;
`;

export const Display = () => {
  const targetItem = useRecoilValue(targetItemState);
  const availableItems = useRecoilValue(availableItemsCount);

  return (
    <Container>
      <StyledCard>
        <CardContent>
          <Typography color="textSecondary" gutterBottom>
            Find this state:
          </Typography>
          <Typography variant="h5">Maine</Typography>
        </CardContent>
      </StyledCard>
      <StyledCard>
        <CardContent>
          <Typography color="textSecondary" gutterBottom>
            Streak: 10
          </Typography>
          <Typography variant="h5">48 States Left</Typography>
        </CardContent>
      </StyledCard>
      <StyledCard>
        <CardActionArea>
          <CardMedia
            component="img"
            alt="Shore of Maine"
            height="70"
            image="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/A_beach_in_maine_on_a_clear_day.jpg/500px-A_beach_in_maine_on_a_clear_day.jpg"
            title="Shore of Maine"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              Maine
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              Maine is a state in the New England region of the United States, bordered by New Hampshire to the west;
              the Atlantic Ocean to the southeast; and the Canadian provinces of New Brunswick and Quebec to the
              northeast and northwest, respectively. Maine is the 12th-smallest by area, the 9th-least populous, and the
              13th-least densely populated of the 50 U.S. states. It is also the northeasternmost among the contiguous
              United States, the northernmost state east of the Great Lakes, the only state whose name consists of a
              single syllable, and the only state to border only one other state. Maine is known for its jagged, rocky
              coastline; low, rolling mountains; heavily forested interior; picturesque waterways; and its seafood
              cuisine, especially lobster and clams. There is a humid continental climate throughout most of the state,
              including coastal areas.[12] Its most populous city is Portland, and its capital is Augusta.
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button size="small" color="primary">
            Share
          </Button>
          <Button size="small" color="primary">
            Learn More
          </Button>
        </CardActions>
      </StyledCard>
    </Container>
  );
};
