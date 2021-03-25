import { Container } from './chakra/Container';
import { Box, Button, Flex, Heading, Spacer } from '@chakra-ui/react';
import { Icon } from '@chakra-ui/react';
import { FaGithub } from 'react-icons/fa';

export const Navbar = () => {
  return (
    <Container>
      <Flex py="3" align="center">
        <Box>
          <Heading size="md">🔍 &nbsp;Find The State</Heading>
        </Box>
        <Spacer />
        <Box>
          <Button size="sm" colorScheme="blue">
            <Icon as={FaGithub} mr="2" /> View on GitHub
          </Button>
        </Box>
      </Flex>
    </Container>
  );
};
