import { animated } from 'react-spring';
import styled from 'styled-components/macro';

export const ContentAnimationContainer = styled(animated.div)`
  bottom: 0;
  height: 100%;
  left: 0;
  position: absolute;
  right: 0;
  top: 0;
  width: 100%;
`;

export const TextAnimationContainer = styled(animated.div)`
  position: absolute;
`;

export const AnimationContainerNormalizer = styled.div`
  align-items: center;
  display: flex;
  height: 100%;
  justify-content: center;
  width: 100%;
`;
