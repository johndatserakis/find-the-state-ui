import { Text, TextProps } from '@chakra-ui/react';
import styled from 'styled-components/macro';

const StyledText = styled(Text)`
  margin-bottom: 1rem;
`;

export const Paragraph = (props: TextProps) => <StyledText {...props} />;
