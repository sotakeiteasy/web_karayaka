import '@styles/globals.scss';
import type { AppProps } from 'next/app';
import dynamic from 'next/dynamic';
import { Montserrat } from 'next/font/google';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const Header = dynamic(() => import('@/lib/components/Header/Header').then((mod) => mod.Header), {
  ssr: false,
  loading: () => (
    <div
      style={{
        height: '80px',
        width: '100%',
        backgroundColor: '#002f6c', // Цвет как у хедера
      }}
    />
  ),
});

const Footer = dynamic(() => import('@/lib/components/Footer/Footer').then((mod) => mod.Footer), { ssr: false });
const CookieConsent = dynamic(
  () => import('@/lib/components/CookiesConsent/CookiesConsent').then((mod) => mod.CookieConsent),
  {
    ssr: false,
    loading: () => null,
  }
);

const SocialContactsMobile = dynamic(
  () => import('@/lib/components/SocialContactsMobile/SocialContactsMobile').then((mod) => mod.SocialContactsMobile),
  {
    ssr: false,
    loading: () => null,
  }
);

const montserrat = Montserrat({
  variable: '--font-geist-sans',
  subsets: ['latin', 'cyrillic-ext'],
});

function App({ Component, pageProps }: AppProps) {
  const [Cookievisible, setCookieVisible] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      const consent = localStorage.getItem('cookieConsent');
      if (!consent) setCookieVisible(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={montserrat.className}>
      <Head>
        <link rel="alternate" hrefLang="ru" href={`https://karayaka.ru${router.pathname}`} />
        <link rel="alternate" hrefLang="en" href={`https://karayaka.ru${router.pathname}?lang=en`} />
        <link rel="alternate" hrefLang="x-default" href={`https://karayaka.ru${router.pathname}`} />

        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta charSet="utf-8" />
        {!router.query.lang ||
          (router.query.lang === 'ru' && <link rel="canonical" href={`https://karayaka.ru${router.pathname}`} />)}
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
