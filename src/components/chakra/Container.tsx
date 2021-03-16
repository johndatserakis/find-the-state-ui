// https://github.com/chakra-ui/chakra-ui/blob/main/website/src/components/container.tsx

import { Box, BoxProps } from '@chakra-ui/react';

export const Container = (props: BoxProps) => (
  <Box w="full" maxW={{ base: 'xl', md: '7xl' }} mx="auto" px={{ base: '6', md: '8' }} {...props} />
);
