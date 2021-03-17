// https://chakra-ui.com/docs/features/style-props

import { extendTheme } from '@chakra-ui/react';
import { colors } from './colors';

const { black, white, gray, blue, indigo, purple, pink, red, orange, yellow, green } = colors;

export const theme = extendTheme({
  styles: {
    global: {
      'html, body': {
        backgroundColor: 'gray.50',
      },
    },
  },
  textStyles: {},
  colors: {
    black,
    white,
    gray,
    blue,
    indigo,
    purple,
    pink,
    red,
    orange,
    yellow,
    green,
  },
  fonts: {
    heading: 'Lora',
    body: 'Lora',
  },
});
