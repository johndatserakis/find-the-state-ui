import styled from 'styled-components/macro';
import { ItemToFind } from './cards/ItemToFind';
import { ItemInformation } from './cards/ItemInformation';
import { GameInformation } from './cards/GameInformation';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;

  > div:not(:last-child) {
    margin-bottom: 0.75rem !important;
  }
`;

export const Display = () => {
  return (
    <Container>
      <ItemToFind />
      <GameInformation />
      <ItemInformation />
    </Container>
  );
};
