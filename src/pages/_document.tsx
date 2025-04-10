import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="ru">
      <Head>
        <link rel="icon" href="https://karayaka.ru/favicon.ico" type="image/x-icon"/>
        <link rel="icon" href="https://karayaka.ru/favicon.svg" type="image/svg+xml" />
        <link rel="icon" href="https://karayaka.ru/favicon.png" type="image/png" />
        <link rel="apple-touch-icon" href="https://karayaka.ru/apple-touch-icon.png" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
