import { availableItemsCount, targetItemState } from '../recoil/game';
import { useRecoilValue } from 'recoil';
import { Box, Button, ButtonGroup, Heading, Link, Stack, Text } from '@chakra-ui/react';
import { ExternalLinkIcon } from '@chakra-ui/icons';
import { FaRedoAlt, FaTimes } from 'react-icons/fa';

export const Display = () => {
  const targetItem = useRecoilValue(targetItemState);
  const availableItems = useRecoilValue(availableItemsCount);

  return (
    <Stack spacing={2}>
      <Box
        alignItems="center"
        bg="white"
        borderRadius="lg"
        display="flex"
        flexDirection="column"
        height={40}
        justifyContent="center"
        shadow="lg"
        w="300px"
      >
        <Text fontSize="md" color="gray">
          Find this state:
        </Text>
        <Text fontSize="4xl" fontWeight="bold" isTruncated>
          Maine
        </Text>
      </Box>
      <Box
        alignItems="center"
        bg="white"
        borderRadius="lg"
        display="flex"
        flexDirection="column"
        height={40}
        justifyContent="center"
        shadow="lg"
        w="300px"
      >
        <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" mb="4">
          <Text fontSize="md" color="gray" mb="1">
            Streak: 10
          </Text>
          <Text fontSize="2xl" fontWeight="bold" isTruncated>
            48 States Left
          </Text>
        </Box>

        <ButtonGroup spacing="2" size="sm">
          <Button colorScheme="blue" leftIcon={<FaRedoAlt />}>
            Reset
          </Button>
          <Button colorScheme="red" leftIcon={<FaTimes />}>
            End
          </Button>
        </ButtonGroup>
      </Box>
      <Box w="300px" bg="white" height="50%" borderRadius="lg" shadow="lg" p="4" overflow="auto">
        <Heading size="lg" mb="1">
          Maine
        </Heading>
        <Box mb="1">
          <Link href="https://en.wikipedia.org/wiki/Maine" isExternal>
            Maine on Wikipedia <ExternalLinkIcon mx="2px" />
          </Link>
        </Box>
        <Text fontSize="sm">
          Maine is a state in the New England region of the United States, bordered by New Hampshire to the west; the
          Atlantic Ocean to the southeast; and the Canadian provinces of New Brunswick and Quebec to the northeast and
          northwest, respectively. Maine is the 12th-smallest by area, the 9th-least populous, and the 13th-least
          densely populated of the 50 U.S. states. It is also the northeasternmost among the contiguous United States,
          the northernmost state east of the Great Lakes, the only state whose name consists of a single syllable, and
          the only state to border only one other state. Maine is known for its jagged, rocky coastline; low, rolling
          mountains; heavily forested interior; picturesque waterways; and its seafood cuisine, especially lobster and
          clams. There is a humid continental climate throughout most of the state, including coastal areas.[12] Its
          most populous city is Portland, and its capital is Augusta.
        </Text>
      </Box>
    </Stack>
  );
};
