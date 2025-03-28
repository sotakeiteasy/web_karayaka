import "@styles/globals.scss";
import type { AppProps } from "next/app";
import { appWithTranslation } from 'next-i18next'

import Header from "@components/header/header";
import { Plus_Jakarta_Sans } from "next/font/google";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-geist-sans",
  subsets: ["latin", "cyrillic-ext"],
});


function App({ Component, pageProps }: AppProps) {
  return (
    <div className={plusJakartaSans.className}>
      <Header/>
      <Component {...pageProps} />
    </div>
  );
}

export default appWithTranslation(App);


