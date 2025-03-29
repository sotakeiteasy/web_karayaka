import "@styles/globals.scss";
import type { AppProps } from "next/app";
import { appWithTranslation } from 'next-i18next'

import Header from "@components/header/header";
import { Montserrat } from "next/font/google";

const montserrat = Montserrat({
  variable: "--font-geist-sans",
  subsets: ["latin", "cyrillic-ext"],
});


function App({ Component, pageProps }: AppProps) {
  return (
    <div className={montserrat.className}>
      <Header/>
      <Component {...pageProps} />
    </div>
  );
}

export default appWithTranslation(App);


