import '@styles/globals.scss';
import type { AppProps } from 'next/app';
import dynamic from 'next/dynamic';
import { Montserrat } from 'next/font/google';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { CookieConsent, SocialContactsMobile } from '@/lib/components';
import { useState } from 'react';

const Header = dynamic(() => import('@/lib/components').then((mod) => mod.Header), { ssr: false });
const Footer = dynamic(() => import('@/lib/components').then((mod) => mod.Footer), { ssr: false });

const montserrat = Montserrat({
  variable: '--font-geist-sans',
  subsets: ['latin', 'cyrillic-ext'],
});

function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  const [Cookievisible, setCookieVisible] = useState(false);

  return (
    <div className={montserrat.className}>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="alternate" hrefLang="ru" href={`https://karayaka.ru${router.pathname}`} />
        <link rel="alternate" hrefLang="en" href={`https://karayaka.ru${router.pathname}?lang=en`} />

        {router.query.lang === 'ru' && <link rel="canonical" href={`https://karayaka.ru${router.pathname}`} />}
      </Head>
      {/* Yandex.Metrika counter */}
      <script type="text/javascript">
        {`
          (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
          m[i].l=1*new Date();
          for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
          k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
          (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

          ym(100868560, "init", {
                clickmap:true,
                trackLinks:true,
                accurateTrackBounce:true
          });
          `}
      </script>
      <noscript>
        <div>
          <img src="https://mc.yandex.ru/watch/100868560" style={{ position: 'absolute', left: '-9999px' }} alt="" />
        </div>
      </noscript>
      {/* /Yandex.Metrika counter */}

      <Header />
      <Component {...pageProps} />
      <CookieConsent visible={Cookievisible} setVisible={setCookieVisible} />
      <SocialContactsMobile cookieVisible={Cookievisible} />
      <Footer />
    </div>
  );
}

export default App;
