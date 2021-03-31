import { config } from 'react-spring';

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
