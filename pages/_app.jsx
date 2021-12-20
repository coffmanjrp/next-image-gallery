import { ThemeProvider } from 'next-themes';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider
      attribute="data-theme"
      defaultTheme="light"
      enableColorScheme={false}
    >
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default MyApp;
