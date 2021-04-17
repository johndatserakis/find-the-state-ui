import { Display } from '../components/program/Display';
import { Container } from '@material-ui/core';
import { Grid } from '../components/mui/Grid';
import styled from 'styled-components/macro';
import { useProcessSelectedState } from '../recoil/game/hooks/useProcessSelectedState';
import { MapContainer } from '../containers/program/MapContainer';
import { DEFAULT_CONTAINER_MAX_WIDTH, DEFAULT_PROGRAM_BREAKPOINT } from '../constants/style';
import { pxToRem } from '../utils/style';

const StyledContainer = styled(Container)`
  height: 100%;
  padding-top: ${pxToRem(8)};
  padding-bottom: ${pxToRem(8)};

  @media (min-width: ${DEFAULT_PROGRAM_BREAKPOINT}px) {
    height: 93vh;
  }
`;

export const Home = () => {
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
