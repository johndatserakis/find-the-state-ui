import styled from 'styled-components';
import { ItemInformationContainer } from '../../containers/program/cards/ItemInformationContainer';
import { pxToRem } from '../../utils/style';
import { GameInformation } from './cards/GameInformation/GameInformation';
import { ItemToFind } from './cards/ItemToFind/ItemToFind';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;

  > div:not(:last-child) {
    margin-bottom: ${pxToRem(12)} !important;
  }
`;

export const Display = () => {
  return (
    <Container>
      <ItemToFind />
      <GameInformation />
      <ItemInformationContainer />
    </Container>
  );
};
