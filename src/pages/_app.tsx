import "@styles/globals.scss";
import type { AppProps } from "next/app";
import { appWithTranslation } from 'next-i18next'

import Header from "@components/header/header";



function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Header/>
      <Component {...pageProps} />
    </>
  );
}

export default appWithTranslation(App);


