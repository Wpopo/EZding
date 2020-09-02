import flush from 'styled-jsx/server';
import Document, { Head, Main, NextScript } from 'next/document';
import { ServerStyleSheets } from '@material-ui/styles';
import { ServerStyleSheet } from 'styled-components';

export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const sheet = new ServerStyleSheet();
    const sheets = new ServerStyleSheets();
    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) => ({
            ...sheet.collectStyles(<App {...props} />),
            ...sheets.collect(<App {...props} />),
          }),
        });
      const initialProps = await Document.getInitialProps(ctx);
      return {
        ...initialProps,
        styles: (
          <React.Fragment>
            {sheets.getStyleElement()}
            {sheet.getStyleElement()}
            {flush() || null}
          </React.Fragment>
        ),
      };
    } finally {
      sheet.seal();
    }
  }

  render() {
    return (
      <html type="text/html">
        <Head>
          <link rel="icon" href="../../static/common/favicon.jpg" type="image/x-icon" />
          <meta name="viewport" content="initial-scale=1.0, viewport-fit=cover, width=device-width" />
          <meta name="google-site-verification" content="ZjST6veyKcEgE_FmGkg5FJLdWDrgTwHVDz5rW_rsPcE" />

          {/* Google Tag Manager */}
          <script
            dangerouslySetInnerHTML={{
              __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','GTM-KHC9WZW');`,
            }}
            charset="UTF-8"
          />
          {/* End Google Tag Manager */}

          <title>My page</title>
          {this.props.styleTags}
        </Head>
        <body style={{ margin: '0', marginBottom: '0' }}>
          <noscript>
            <iframe
              src="https://www.googletagmanager.com/ns.html?id=GTM-KHC9WZW"
              height="0"
              width="0"
              style={{ display: 'none', visibility: 'hidden' }}
            />
          </noscript>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}
