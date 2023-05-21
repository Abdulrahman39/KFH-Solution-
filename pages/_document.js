import Document, { Head, Html, Main, NextScript } from 'next/document';
import process from "next/dist/build/webpack/loaders/resolve-url-loader/lib/postcss";
import {noOverlayWorkaroundScript} from "./_app";

class MyDocument extends Document {
    static async getInitialProps(ctx) {
        const initialProps = await Document.getInitialProps(ctx);
        return { ...initialProps };
    }

    render() {
        return (
            <Html lang="en">
                <Head>
                    {process.env.NODE_ENV !== 'production' && <script dangerouslySetInnerHTML={{ __html: noOverlayWorkaroundScript }} />}
                    <link id="theme-css" href={`/themes/lara-light-teal/theme.css`} rel="stylesheet"></link>
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}

export default MyDocument;
