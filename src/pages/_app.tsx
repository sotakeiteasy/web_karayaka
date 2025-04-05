import "@styles/globals.scss";
import type { AppProps } from "next/app";
import { Header, Footer } from "@/lib/components";
import { Montserrat } from "next/font/google";
import Head from "next/head";
import Script from "next/script";

const montserrat = Montserrat({
  variable: "--font-geist-sans",
  subsets: ["latin", "cyrillic-ext"],
});

function App({ Component, pageProps }: AppProps) {
  return (
    <div className={montserrat.className}>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      
      {/* Yandex.Metrika counter */}
      <Script id="yandex-metrika" strategy="afterInteractive">
        {`
          (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
          m[i].l=1*new Date();
          for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
          k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
          (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

          ym(100805346, "init", {
               clickmap:true,
               trackLinks:true,
               accurateTrackBounce:true
          });
        `}
      </Script>
      <noscript>
        <div>
          <img src="https://mc.yandex.ru/watch/100805346" style={{ position: 'absolute', left: '-9999px' }} alt="" />
        </div>
      </noscript>
      {/* /Yandex.Metrika counter */}
      
      <Header />
      <Component {...pageProps} />
      <Footer />
    </div>
  );
}

export default App;
