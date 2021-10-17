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

// Add new `color` option for Buttons and other components. Add `palettes` entry below in `theme`
// https://mui.com/customization/palette/#adding-new-colors
declare module '@mui/material/styles' {
  interface Palette {
    black: Palette['primary'];
  }

  // Allow configuration using `createTheme`
  interface PaletteOptions {
    black?: PaletteOptions['primary'];
  }
}

// Update the Button's color prop options
declare module '@mui/material/Button' {
  interface ButtonPropsColorOverrides {
    black: true;
  }
}

// Default theme options: https://mui.com/customization/default-theme/
export const theme = createTheme({
  components: {
    MuiButton: {
      styleOverrides: {
        disableElevation: true,
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
  palette: {
    background: {
      default: colors.offWhite,
    },
    black: {
      main: colors.black,
      contrastText: colors.white,
    },
    error: {
      main: colors.red[500],
    },
    primary: {
      main: colors.purple[500],
    },
    secondary: {
      main: colors.purple[600],
    },
    success: {
      main: colors.green[500],
    },
    text: {
      primary: colors.black,
    },
  },
  typography: {
    fontFamily: fonts,
    fontSize: 16,
  },
});
