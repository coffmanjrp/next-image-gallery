import { RecoilRoot } from 'recoil';
import { ThemeProvider } from 'next-themes';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '@/styles/globals.css';

function MyApp({ Component, pageProps }) {
  return (
    <RecoilRoot>
      <ThemeProvider
        attribute="data-theme"
        defaultTheme="light"
        enableColorScheme={false}
      >
        <Component {...pageProps} />
        <ToastContainer pauseOnFocusLoss={false} />
      </ThemeProvider>
    </RecoilRoot>
  );
}

export default MyApp;
