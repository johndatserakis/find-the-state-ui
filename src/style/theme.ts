import { createMuiTheme } from '@material-ui/core/styles';

// https://material-ui.com/customization/typography/#self-hosted-fonts
const sourceSansPro = {
  fontFamily: 'Source Sans Pro',
  fontStyle: 'normal',
  fontDisplay: 'swap' as const,
  fontWeight: 400,
  // Get first item's values from here
  // https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@400;500;700&display=swap
  src: `
    url(https://fonts.gstatic.com/s/sourcesanspro/v14/6xK3dSBYKcSV-LCoeQqfX1RYOo3qNa7lujVj9_mf.woff2) format('woff2')
  `,
  unicodeRange: 'U+0460-052F, U+1C80-1C88, U+20B4, U+2DE0-2DFF, U+A640-A69F, U+FE2E-FE2F',
};

export const theme = createMuiTheme({
  typography: {
    fontFamily: ['Source Sans Pro', '"Helvetica Neue"', 'Arial', 'sans-serif'].join(','),
    fontSize: 16,
  },
  overrides: {
    MuiCssBaseline: {
      '@global': {
        '@font-face': [sourceSansPro],
      },
    },
  },
  palette: {
    primary: {
      main: '#125bd3',
    },
    secondary: {
      main: '#e67200',
    },
  },
});
