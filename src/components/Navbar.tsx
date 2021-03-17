import styled from 'styled-components/macro';
import { Container } from './chakra/Container';
import { Text } from '@chakra-ui/react';
import { colors } from '../style/colors';

const SectionContainer = styled.div`
  border-bottom: 1px solid ${colors.gray[100]};
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
