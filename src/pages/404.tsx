export default function Custom404() {
  return (
    <div
      style={{
        height: '90vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        margin: '10px',
      }}
    >
      <h1
        style={{
          maxWidth: '700px',
          textAlign: 'center',
        }}
      >
        Error 404 — Page Not Found
      </h1>
      <p
        style={{
          textAlign: 'center',
        }}
      >
        <br />
        <br />
        На нашем сайте нет такой страницы, если вы считаете, что это ошибка, пожалуйста, свяжитесь с нами —
        info@karayaka.ru
      </p>
      <p
        style={{
          textAlign: 'center',
        }}
      >
        <br />
        There is no such page on our website, if you think this is mistake, please contact us — info@karayaka.ru
      </p>
    </div>
  );
}
