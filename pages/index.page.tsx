import { Container, useMediaQuery } from '@mui/material';
import { RecoilRoot } from 'recoil';
import styled from 'styled-components';
import { CookieBanner } from '../src/components/common/CookieBanner';
import { Navbar } from '../src/components/common/Navbar';
import { Grid } from '../src/components/mui/Grid';
import { Display } from '../src/components/program/Display';
// import { useProcessSelectedState } from '../src/recoil/game/hooks/useProcessSelectedState';
import { DEFAULT_CONTAINER_MAX_WIDTH, DEFAULT_PROGRAM_BREAKPOINT } from '../src/constants/style';
import { MapContainer } from '../src/containers/program/MapContainer';
import { theme } from '../src/styles/theme';
import { pxToRem } from '../src/utils/style';

const MainStyledContainer = styled.div`
  height: 100%;
  width: 100%;
`;

const StyledContainer = styled(Container)`
  height: 100%;
  padding-top: ${pxToRem(8)};
  padding-bottom: ${pxToRem(8)};

  @media (min-width: ${DEFAULT_PROGRAM_BREAKPOINT}px) {
    height: 93vh;
  }
`;

export default function Home() {
  // useProcessSelectedState();
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));
  const spacing = isDesktop ? 2 : 0;

  return (
    <RecoilRoot>
      <MainStyledContainer>
        <Navbar />
        <StyledContainer maxWidth={DEFAULT_CONTAINER_MAX_WIDTH}>
          <Grid container spacing={spacing}>
            <Grid item md={9}>
              <MapContainer />
            </Grid>
            <Grid item md={3}>
              <Display />
            </Grid>
          </Grid>
        </StyledContainer>
        <CookieBanner />
      </MainStyledContainer>
    </RecoilRoot>
  );
}
