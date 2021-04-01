import { Display } from '../components/program/Display';
import { Container } from '@material-ui/core';
import { Grid } from '../components/mui/Grid';
import styled from 'styled-components/macro';
import { useResetGameOnFirstLoad } from '../recoil/game/hooks/useResetGameOnFirstLoad';
import { useProcessSelectedState } from '../recoil/game/hooks/useProcessSelectedState';
import { MapContainer } from '../containers/program/MapContainer';
import { DEFAULT_CONTAINER_MAX_WIDTH, DEFAULT_PROGRAM_BREAKPOINT } from '../constants/style';

const StyledContainer = styled(Container)`
  height: 100%;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;

  @media (min-width: ${DEFAULT_PROGRAM_BREAKPOINT}px) {
    height: 93vh;
  }
`;

export const Home = () => {
  useResetGameOnFirstLoad();
  useProcessSelectedState();

  return (
    <StyledContainer maxWidth={DEFAULT_CONTAINER_MAX_WIDTH}>
      <Grid container spacing={2}>
        <Grid item md={9}>
          <MapContainer />
        </Grid>
        <Grid item md={3}>
          <Display />
        </Grid>
      </Grid>
    </StyledContainer>
  );
};
