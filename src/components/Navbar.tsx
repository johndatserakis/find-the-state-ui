import styled from 'styled-components/macro';
import { Container } from './chakra/Container';
import { Text } from '@chakra-ui/react';

const SectionContainer = styled.div`
  border-bottom: 1px solid black;
`;

const StyledContainer = styled(Container)`
  display: flex;
  justify-content: space-between;
`;

export const Navbar = () => {
  return (
    <SectionContainer>
      <StyledContainer py={4}>
        <Text as={'strong'}>Select The State</Text>
      </StyledContainer>
    </SectionContainer>
  );
};
