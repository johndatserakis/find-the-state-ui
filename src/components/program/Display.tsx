import styled from 'styled-components/macro';
import { ItemToFind } from './cards/ItemToFind';
import { ItemInformationContainer } from '../../containers/program/cards/ItemInformationContainer';
import { GameInformation } from './cards/GameInformation';
import { pxToRem } from '../../utils/style';

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
