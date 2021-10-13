import Document, { Html, Head, Main, NextScript } from 'next/document';
import { ServerStyleSheet } from 'styled-components';
import { theme } from '../src/styles/theme';

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          {/* Basic settings */}
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />

          {/* Fallback Title and Description */}
          {/* eslint-disable */}
          <title>Find the State</title>
          {/* eslint-enable */}
          <meta name="description" content="Find all the States in the contiguous USA on a map. Simple enough." />

          {/* PWA primary color */}
          <meta name="theme-color" content={theme.palette.primary.main} />

          {/* Manifest */}
          <link rel="manifest" href="/manifest.json" />

          <link rel="apple-touch-icon" href="/logo192.png" />

          {/* Font */}
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@400;500;700&display=swap"
          />

          {/* Global Site Tag (gtag.js) - Google Analytics */}
          <script
            async
            src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID}`}
          />
          <script
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID}', {
                  page_path: window.location.pathname,
                });
              `,
            }}
          />

          {/* Mapbox CSS */}
          <link href="https://api.tiles.mapbox.com/mapbox-gl-js/v2.1.1/mapbox-gl.css" rel="stylesheet" />

          {/* Twitter */}
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:site" content="@johndatserakis" />
          <meta name="twitter:creator" content="@johndatserakis" />
          <meta name="twitter:title" content="Find the State" />
          <meta
            name="twitter:description"
            content="Find all the States in the contiguous USA on a map. Simple enough."
          />
          <meta name="twitter:image" content="/social.png" />
          <meta name="twitter:image:alt" content="Find the State Logo" />

          {/* Facebook */}
          <meta property="og:image" content="/social.png" />
          <meta property="og:url" content="https://find-the-state.netlify.app/" />
          <meta property="og:type" content="website" />
          <meta property="og:title" content="Find the State" />
          <meta
            property="og:description"
            content="Find all the States in the contiguous USA on a map. Simple enough."
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

// https://github.com/vercel/next.js/blob/master/examples/with-styled-components/pages/_document.js
MyDocument.getInitialProps = async (ctx) => {
  const sheet = new ServerStyleSheet();
  const originalRenderPage = ctx.renderPage;

  try {
    ctx.renderPage = () =>
      originalRenderPage({
        enhanceApp: (App) => (props) => sheet.collectStyles(<App {...props} />),
      });

    const initialProps = await Document.getInitialProps(ctx);
    return {
      ...initialProps,
      styles: (
        <>
          {initialProps.styles}
          {sheet.getStyleElement()}
        </>
      ),
    };
  } finally {
    sheet.seal();
  }
};
