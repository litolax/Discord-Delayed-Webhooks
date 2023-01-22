import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { appWithTranslation } from 'next-i18next';

const App = ({ Component, pageProps: { session, ...pageProps } }: AppProps) => {
	const theme = createTheme({
		palette: {
			mode: 'dark'
		}
	});
	return (
		<ThemeProvider theme={theme}>
			<SessionProvider session={session}>
				<Component {...pageProps} />
			</SessionProvider>
		</ThemeProvider>
	);
};

export default appWithTranslation(App);
