// pages/_document.js
import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* Google site verification */}
        <meta
          name="google-site-verification"
          content="Rp8ch_A0AdO8zWFIkG7L_o2-h4hyRNeKVn5Vo8EZDwo"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
