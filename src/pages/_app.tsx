import "@styles/globals.scss";
import type { AppProps } from "next/app";
import Header from "@components/header/header";
import Footer from "@components/footer/footer";
import { Montserrat } from "next/font/google";

const montserrat = Montserrat({
  variable: "--font-geist-sans",
  subsets: ["latin", "cyrillic-ext"],
});

function App({ Component, pageProps }: AppProps) {
  return (
    <div className={montserrat.className}>
      <Header />
      <Component {...pageProps} />
      <Footer />
    </div>
  );
}

export default App;
