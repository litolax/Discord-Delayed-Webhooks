import '../styles/globals.css'
import type { AppProps } from 'next/app'
import {SessionProvider} from "next-auth/react";
import {createTheme, ThemeProvider} from '@mui/material/styles';

export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
    const theme = createTheme({
        palette: {
            mode: 'dark'
        },

    });
  return (
      <ThemeProvider theme={theme}>
      <SessionProvider session={session}>
        <Component {...pageProps}/>
      </SessionProvider>
      </ThemeProvider>
  )
}