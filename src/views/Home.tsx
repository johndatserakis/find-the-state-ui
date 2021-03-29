import { Map } from '../components/program/Map';
import { Display } from '../components/program/Display';
import { selectedItemState } from '../recoil/game/game';
import { useSetRecoilState } from 'recoil';
import { Container } from '@material-ui/core';
import { Grid } from '../components/mui/Grid';
import styled from 'styled-components/macro';
import { useResetGameOnFirstLoad } from '../recoil/game/hooks/useResetGameOnFirstLoad';
import { useProcessSelectedState } from '../recoil/game/hooks/useProcessSelectedState';

const StyledContainer = styled(Container)`
  height: 100%;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;

  @media (min-width: 960px) {
    height: 93vh;
  }
`;

const MapContainer = styled.div`
  border-radius: 0.25rem;
  box-shadow: ${({ theme }) => theme.shadows[3]};
  height: 100%;
  min-height: 500px;
  overflow: hidden;
  width: 100%;
`;

export const Home = () => {
  const setSelectedItem = useSetRecoilState(selectedItemState);
  useResetGameOnFirstLoad();
  useProcessSelectedState();

  return (
    <StyledContainer>
      <Grid container spacing={2}>
        <Grid item md={9}>
          <MapContainer>
            <Map onClick={(item) => setSelectedItem(item)} />
          </MapContainer>
        </Grid>
        <Grid item md={3}>
          <Display />
        </Grid>
      </Grid>
    </StyledContainer>
  );
};
