import { useState } from 'react';
import styled from 'styled-components/macro';
import { Map } from '../../components/common/Map/Map';
import { selectedItemState, targetItemState } from '../../recoil/game/game';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { Skeleton } from '@material-ui/lab';
import { pxToRem } from '../../utils/style';
import { colors } from '../../style/colors';

const Container = styled.div`
  border: 1px solid ${colors.gray[200]};
  border-radius: ${pxToRem(4)};
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
