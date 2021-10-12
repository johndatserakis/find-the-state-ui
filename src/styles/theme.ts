import { createTheme } from '@mui/material/styles';
import { colors } from './colors';

// https://material-ui.com/customization/typography/#self-hosted-fonts
const sourceSansPro = {
  fontFamily: 'Source Sans Pro',
  fontStyle: 'normal',
  fontDisplay: 'swap' as const,
  fontWeight: 400,
  // Get first item's src values from here
  // https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@400;500;700&display=swap
  src: `
    url(https://fonts.gstatic.com/s/sourcesanspro/v14/6xK3dSBYKcSV-LCoeQqfX1RYOo3qNa7lujVj9_mf.woff2) format('woff2')
  `,
  unicodeRange: 'U+0460-052F, U+1C80-1C88, U+20B4, U+2DE0-2DFF, U+A640-A69F, U+FE2E-FE2F',
};

const fonts = [
  'Source Sans Pro',
  '-apple-system',
  'BlinkMacSystemFont',
  '"Segoe UI"',
  'Roboto',
  '"Helvetica Neue"',
  'Arial',
  'sans-serif',
  '"Apple Color Emoji"',
  '"Segoe UI Emoji"',
  '"Segoe UI Symbol"',
].join(',');

export const theme = createTheme({
  components: {
    MuiButton: {
      styleOverrides: {
        disableElevation: true,
      },
    },
    MuiButtonBase: {
      defaultProps: {
        disableRipple: true,
      },
    },
    MuiCssBaseline: {
      styleOverrides: {
        '@global': {
          '@font-face': [sourceSansPro],
        },
      },
    },
    // https://stackoverflow.com/a/60403040/8014660
    MuiCardContent: {
      styleOverrides: {
        root: {
          padding: 16,
          '&:last-child': {
            paddingBottom: 16, // MUI has this at 24
          },
        },
      },
    },
    MuiTypography: {
      defaultProps: {
        fontFamily: fonts,
      },
    },
  },
  typography: {
    fontFamily: fonts,
    fontSize: 16,
  },
  palette: {
    primary: {
      main: colors.purple[500],
    },
    secondary: {
      main: colors.purple[600],
    },
    text: {
      primary: colors.black,
    },
  },
});
