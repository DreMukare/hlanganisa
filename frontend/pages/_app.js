import '../styles/globals.css';
import { useState } from 'react';
import Head from 'next/head';
import { CookiesProvider } from 'react-cookie';

function MyApp({ Component, pageProps }) {
	const [mode, setMode] = useState('client');
	const [workAround, setWorkAround] = useState('');

	const setAppMode = (appMode) => setMode(appMode);

	return (
		<CookiesProvider>
			<Head>
				<meta
					name='description'
					content='Join a community and service providers and clients. Find the services you need today. Find clients for your business today.'
				/>
				<meta httpEquiv='Content-Type' content='text/html; charset=utf-8' />
				<meta charSet='utf-8' />
				<meta
					name='viewport'
					content='width=device-width, initial-scale=1, viewport-fit=cover'
				/>
				<link rel='preconnect' href='https://fonts.googleapis.com' />
				<link
					rel='preconnect'
					href='https://fonts.gstatic.com'
					crossOrigin='true'
				/>
				<link
					href='https://fonts.googleapis.com/css2?family=Lato:wght@300;400;700;900&family=Merriweather+Sans:wght@300;400;500;600;700;800&display=swap'
					rel='stylesheet'
				/>
			</Head>
			<Component
				mode={mode}
				workAround={workAround}
				setWorkAround={setWorkAround}
				setAppMode={setAppMode}
				{...pageProps}
			/>
		</CookiesProvider>
	);
}

export default MyApp;
