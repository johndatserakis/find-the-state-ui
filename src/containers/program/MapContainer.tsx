import { useState } from 'react';
import styled from 'styled-components/macro';
import { Map } from '../../components/program/Map';
import { selectedItemState, targetItemState } from '../../recoil/game/game';
import { useSetRecoilState } from 'recoil';
import { useRecoilValue } from 'recoil';
import { Skeleton } from '@material-ui/lab';

const Container = styled.div`
  border-radius: 0.25rem;
  box-shadow: ${({ theme }) => theme.shadows[3]};
  height: 100%;
  min-height: 500px;
  overflow: hidden;
  width: 100%;
  position: relative;
`;

const MapWrapper = styled.div<{ isLoading: boolean }>`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  opacity: ${(props) => (props.isLoading ? 0 : 1)};
  height: 100%;
  width: 100%;
  transition: opacity 1s linear;
`;

const StyledSkeleton = styled(Skeleton)`
  height: 100%;
  width: 100%;
`;

export const MapContainer = () => {
  const setSelectedItem = useSetRecoilState(selectedItemState);
  const targetItem = useRecoilValue(targetItemState);
  const [loading, setLoading] = useState(true);

  return (
    <Container>
      <StyledSkeleton animation="wave" variant="rect" />
      <MapWrapper isLoading={loading}>
        <Map
          onLoad={() => setLoading(false)}
          onClick={(item) => setSelectedItem(item)}
          resetBoundsOnThisValueChange={targetItem}
        />
      </MapWrapper>
    </Container>
  );
};
