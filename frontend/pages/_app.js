import '../styles/globals.css';
import { useState } from 'react';
import Head from 'next/head';

function MyApp({ Component, pageProps }) {
	const [mode, setMode] = useState('client');

	const setAppMode = (appMode) => setMode(appMode);

	return (
		<>
			<Head>
				<meta
					name='description'
					content='Join a community and service providers and clients. Find the services you need today. Find clients for your business today.'
				/>
				<meta http-equiv='Content-Type' content='text/html; charset=utf-8' />
				<meta charset='utf-8' />
				<meta
					name='viewport'
					content='width=device-width, initial-scale=1, viewport-fit=cover'
				/>
				<link rel='preconnect' href='https://fonts.googleapis.com' />
				<link rel='preconnect' href='https://fonts.gstatic.com' crossorigin />
				<link
					href='https://fonts.googleapis.com/css2?family=Lato:wght@300;400;700;900&family=Merriweather+Sans:wght@300;400;500;600;700;800&display=swap'
					rel='stylesheet'
				/>
			</Head>
			<Component mode={mode} setAppMode={setAppMode} {...pageProps} />
		</>
	);
}

export default MyApp;
