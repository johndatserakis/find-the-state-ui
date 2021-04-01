import { config, SpringValue } from 'react-spring';

export const slideUpInSlideUpOut = {
  from: {
    opacity: 0,
    transform: 'translate3d(0,-100%,0)',
  },
  enter: {
    opacity: 1,
    transform: 'translate3d(0,0%,0)',
  },
  leave: {
    opacity: 0,
    transform: 'translate3d(0,75%,0)',
  },
  config: config.gentle,
};

export const slideRightInSlideRightOut = {
  from: {
    opacity: 0,
    transform: 'translate3d(-100%,0,0)',
  },
  enter: {
    opacity: 1,
    transform: 'translate3d(0%,0,0)',
  },
  leave: {
    opacity: 0,
    transform: 'translate3d(75%,0,0)',
  },
  config: config.gentle,
};

export const slideUpInSlideDownOut = {
  from: {
    opacity: 0,
    transform: 'translate3d(0,75%,0)',
  },
  enter: {
    opacity: 1,
    transform: 'translate3d(0,0%,0)',
  },
  leave: {
    opacity: 0,
    transform: 'translate3d(0,75%,0)',
  },
  config: config.gentle,
};

export const shakeLeftRight = (springNumber: SpringValue<number>) => {
  return {
    transform: springNumber
      .to({
        range: [0, 0.25, 0.35, 0.45, 0.55, 0.65, 0.75, 1],
        output: [0, -3, 4, -4, 5, -5, 3, -1],
      })
      .to((springNumber) => `translate3d(${springNumber}px,0,0)`),
  };
};
