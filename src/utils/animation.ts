import { animated } from 'react-spring';
import styled from 'styled-components/macro';

export const ContentAnimationContainer = styled(animated.div)`
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  position: absolute;
`;

export const TextAnimationContainer = styled(animated.div)`
  position: absolute;
`;

export const AnimationContainerNormalizer = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;
